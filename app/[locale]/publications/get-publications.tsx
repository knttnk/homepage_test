'use server';

import { Cite, Publication } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

export async function getPublications(locale: string): Promise<Publication[]> {
	assert(locale === 'ja' || locale === 'en', 'Unsupported locale'); // 'ja'か'en'のみ許可 する
	const filePath = path.join(process.cwd(), 'public', 'mines', `kenta_tanaka_biblist_${locale}.bib`);
	const fileContent = await fs.promises.readFile(filePath, 'utf-8');
	const publications = new Cite(fileContent);
	const ret = publications.get({ type: 'json' }) as Publication[];
	console.log(ret);

	return ret;
}
