import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = use(params);

	// Enable static rendering
	setRequestLocale(locale);

	// Once the request locale is set, you
	// can call hooks from `next-intl`
	const t = useTranslations('PublicationsPage');

	return (
		<>
			<Heading level={2}>{t('title')}</Heading>
			<Card></Card>
		</>
	);
}
