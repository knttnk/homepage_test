import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsetPadding } from '@/components/inset-padding';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/ui/description-list';
import Image from 'next/image';
import face2 from '@/public/mines/face2.webp';
import { CareerTable } from './career-table';
import { ButtonLink } from '@/components/button-link';
import { IconOpenLink } from '@intentui/icons';
import { CopyButton } from '@/components/copy-button';

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

	const addressText = `${t('address_1')} ${t('address_2')}`;
	const emailText = t('email_value');
	const phoneText = t('phone_value');

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
							<div key={index} className="border-t pt-4 first:border-none first:pt-0 flex items-start justify-between gap-4">
								<div className="flex-1">
									<h3 className="font-semibold text-base mb-1">{item.title}</h3>
									<p className="text-sm text-muted-fg mb-3">{item.description}</p>
								</div>
								<ButtonLink href={item.url} target="_blank" rel="noopener noreferrer" size="sq-md">
									<IconOpenLink />
								</ButtonLink>
							</div>
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
							<ButtonLink href="https://github.com/knttnk" target="_blank" rel="noopener noreferrer">
								{t('github_label')}
								<IconOpenLink />
							</ButtonLink>
							<ButtonLink href="https://twitter.com/Aqr_Tbn_eng" target="_blank" rel="noopener noreferrer">
								{t('twitter_label')}
								<IconOpenLink />
							</ButtonLink>
						</div>

						{/* 住所とメール */}
						<DescriptionList>
							<DescriptionTerm>{t('address_label')}</DescriptionTerm>
							<DescriptionDetails className="flex items-center gap-2">
								<span>
									{t('address_1')} {t('address_2')}
								</span>
								<CopyButton copyText={addressText} />
							</DescriptionDetails>
							<DescriptionTerm>{t('email_label')}</DescriptionTerm>
							<DescriptionDetails className="flex items-center gap-2">
								<span>{emailText}</span>
								<CopyButton copyText={emailText} />
							</DescriptionDetails>
							<DescriptionTerm>{t('phone_label')}</DescriptionTerm>
							<DescriptionDetails className="flex items-center gap-2">
								<span>{phoneText}</span>
								<CopyButton copyText={phoneText} />
							</DescriptionDetails>
						</DescriptionList>
					</div>
				</CardContent>
			</Card>
		</InsetPadding>
	);
}
