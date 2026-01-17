import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/ui/table';

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
			<Card className="[--card-spacing:var(--gutter)]">
				<CardHeader>
					<CardTitle>{t('journal_papers')}</CardTitle>
				</CardHeader>
				<CardContent>
					{/* CardとTableの余白をclassNameで調整 */}
					<Table bleed striped className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]" aria-label="Users">
						<TableHeader>
							<TableColumn className="w-0">#</TableColumn>
							<TableColumn isRowHeader className="w-full">Name</TableColumn>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>1</TableCell>
								<TableCell className="whitespace-normal">えお</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>2</TableCell>
								<TableCell className="whitespace-normal">
									ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
