import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getPublications } from './get-publications';
import { PublicationsTable } from './publications-table';

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	// locale の設定
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('PublicationsPage');

	// 論文データの取得
	const publications = await getPublications(locale);
	const categories = ['journal_papers', 'international_conference', 'domestic_conference', 'awards', 'others'];

	return (
		<>
			<Heading level={2}>{t('title')}</Heading>
			{categories.map((category) => (
				<Card key={category} className="[--card-spacing:var(--gutter)]">
					<CardHeader>
						<CardTitle>{t(category)}</CardTitle>
					</CardHeader>
					<CardContent>
						<PublicationsTable publications={publications[category]} ariaLabel={t(category)} />
					</CardContent>
				</Card>
			))}
		</>
	);
}
