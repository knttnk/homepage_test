import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = use(params);

	// Enable static rendering
	setRequestLocale(locale);

	// Once the request locale is set, you
	// can call hooks from `next-intl`
	const t = useTranslations('HomePage');

	return <Text>研究ページ</Text>;
}
