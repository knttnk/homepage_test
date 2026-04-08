import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsetPadding } from '@/components/inset-padding';
import { Link } from '@/components/ui/link';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list';
import Image from 'next/image';
import face2 from '@/public/mines/face2.webp';
import { CareerTable } from './career-table';
import { WorkItemCard } from './works-section';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('ProfilePage');
	const tc = await getTranslations('Common');

	const careerItems = (t.raw('career_items') as Array<{ date: string; description: string }>).map((item, index) => ({
		...item,
		index: index + 1,
	}));
	const workItems = t.raw('works_items') as Array<{ title: string; description: string; url: string }>;

	return (
		<InsetPadding>
			{/* プロフィール基本情報 */}
			<Card className="[--card-spacing:var(--gutter)]">
				<CardHeader>
					<CardTitle>{t('title')}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center m-4">
						<Image className="w-[min(25rem,50vw,500px)]" src={face2} alt={t('title')} loading="eager" />
					</div>
					<DescriptionList>
						<DescriptionTerm>{t('name_label')}</DescriptionTerm>
						<DescriptionDetails>{tc('knttnk')}</DescriptionDetails>

						<DescriptionTerm>{t('affiliation_label')}</DescriptionTerm>
						<DescriptionDetails>{tc('affiliation_long')}</DescriptionDetails>

						<DescriptionTerm>{t('birth_date_label')}</DescriptionTerm>
						<DescriptionDetails>{t('birth_date_value')}</DescriptionDetails>
					</DescriptionList>
					<CareerTable items={careerItems} dateHeader={t('career_date_header')} descriptionHeader={t('career_description_header')} />
				</CardContent>
			</Card>

			{/* 制作物 */}

			<Card>
				<CardHeader>
					<CardTitle>{t('works_title')}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{workItems.map((item, index) => (
							<WorkItemCard key={index} item={item} />
						))}
					</div>
				</CardContent>
			</Card>

			{/* 連絡先 */}
			<Card>
				<CardHeader>
					<CardTitle>{t('contact_title')}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{/* リンク */}
						<div className="flex flex-wrap gap-3">
							<Link href="https://github.com/knttnk" target="_blank" rel="noopener noreferrer" className="text-primary underline font-normal text-sm">
								{t('github_label')}
							</Link>
							<Link
								href="https://twitter.com/Aqr_Tbn_eng"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary underline font-normal text-sm"
							>
								{t('twitter_label')}
							</Link>
						</div>

						{/* 住所とメール */}
						<DescriptionList>
							<DescriptionTerm>{t('address_label')}</DescriptionTerm>
							<DescriptionDetails>
								<div>〒671-2280</div>
								<div>兵庫県姫路市書写2167</div>
							</DescriptionDetails>

							<DescriptionTerm>{t('email_label')}</DescriptionTerm>
							<DescriptionDetails>{t('email_value')}</DescriptionDetails>
						</DescriptionList>
					</div>
				</CardContent>
			</Card>
		</InsetPadding>
	);
}
