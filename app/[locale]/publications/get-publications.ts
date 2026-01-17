import fs from 'fs/promises';
import path from 'path';
import JSON5 from 'json5';

export interface PublicationItem {
	year: number;
	month: number | null;
	day: number | null;
	str: string | null;
	url: string | null;
}

export type Publication = PublicationItem & { id: string; category: string };

export type PublicationsMap = Record<string, Publication[]>;

export async function getPublications(locale: string): Promise<PublicationsMap> {
	const filePathJa = path.join(process.cwd(), 'app/[locale]/publications/publications_ja.json5');
	const filePathEn = path.join(process.cwd(), 'app/[locale]/publications/publications_en.json5');

	const [fileContentJa, fileContentEn] = await Promise.all([
		fs.readFile(filePathJa, 'utf8'),
		fs.readFile(filePathEn, 'utf8'),
	]);

	const dataJa = JSON5.parse(fileContentJa) as Record<string, Record<string, PublicationItem>>;
	const dataEn = JSON5.parse(fileContentEn) as Record<string, Record<string, PublicationItem>>;

	const result: PublicationsMap = {};
	const categories = Object.keys(dataJa);

	for (const category of categories) {
		const itemsJa = dataJa[category] || {};
		const itemsEn = dataEn[category] || {};
		const list: Publication[] = [];

		for (const id of Object.keys(itemsJa)) {
			const itemJa = itemsJa[id];
			const itemEn = itemsEn[id];

			const merged: PublicationItem = { ...itemJa };

			if (locale !== 'ja' && itemEn) {
				// If English file has a string, use it. Otherwise fallback to JA (or keep JA if that's the behavior)
				// The requirement says "same value is null", so fallback to JA is correct if null.
				if (itemEn.str) {
					merged.str = itemEn.str;
				}
				// URL/Date usually shared, but if EN has specific overrides they would support it. 
				// Based on file content, EN only has 'str' mostly.
			}

			list.push({
				id,
				category,
				...merged,
			});
		}

		// Sort by Date Descending
		list.sort((a, b) => {
			if (a.year !== b.year) return b.year - a.year;
			if (a.month !== b.month) return (b.month ?? 0) - (a.month ?? 0);
			return (b.day ?? 0) - (a.day ?? 0);
		});

		result[category] = list;
	}

	return result;
}
