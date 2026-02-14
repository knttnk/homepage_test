import { getRequestConfig } from 'next-intl/server';
import { hasLocale, AbstractIntlMessages } from 'next-intl';
import { routing } from './routing';

import json5 from 'json5';
import fs from 'fs/promises';
import path from 'path';

function processMessages(messages: unknown): unknown {
	if (Array.isArray(messages)) {
		if (messages.every((item): item is string => typeof item === 'string')) {
			return messages.join('');
		}
		return messages.map(processMessages);
	} else if (typeof messages === 'object' && messages !== null) {
		const result: Record<string, unknown> = {};
		for (const key in messages) {
			result[key] = processMessages((messages as Record<string, unknown>)[key]);
		}
		return result;
	}
	return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	const filePath = path.join(process.cwd(), 'messages', `${locale}.json5`);
	const fileContents = await fs.readFile(filePath, 'utf8');
	const messages = json5.parse(fileContents);

	return {
		locale,
		messages: processMessages(messages) as AbstractIntlMessages,
	};
});
