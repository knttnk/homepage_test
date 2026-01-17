'use server';

import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/ui/table';
import { getPublications } from './get-publications';

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	// Enable static rendering
	setRequestLocale(locale);

	const t = await getTranslations('PublicationsPage');

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
							<TableColumn isRowHeader className="w-full">
								Name
							</TableColumn>
						</TableHeader>
						<TableBody items={await getPublications(locale)}>
							{(p) => {
								const sep = locale === 'ja' ? '，' : ', ';
								const colon = locale === 'ja' ? '：' : ': ';
								const semicolon = locale === 'ja' ? '；' : '; ';
								return (
									<TableRow>
										<TableCell>2 </TableCell>
										<TableCell>
											{/* 田中 健太，南 裕樹，石川 将人： 人間機械系の制御性能向上のための視覚情報の改変； 自動制御連合講演会講演論文集 第 65 回 自動制御連合講演会, pp. 824–827 (2022) */}
											{p.author?.join(sep)}
											{colon}
											{p.title}
											{semicolon}
											{p.containerTitle}
										</TableCell>
									</TableRow>
								);
							}}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
