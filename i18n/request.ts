import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

import json5 from 'json5';
import fs from 'fs/promises';
import path from 'path';

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	const filePath = path.join(process.cwd(), 'messages', `${locale}.json5`);
	const fileContents = await fs.readFile(filePath, 'utf8');
	const messages = json5.parse(fileContents);

	return {
		locale,
		messages,
	};
});
