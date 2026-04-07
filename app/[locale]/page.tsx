import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = use(params);

	// Enable static rendering
	setRequestLocale(locale);

	// Once the request locale is set, you
	// can call hooks from `next-intl`
	const t = useTranslations('HomePage');
	const tCommon = useTranslations('Common');

	return (
		<>
			<Card>
				<CardContent>
					<div style={{ position: 'relative',width: '100%', height: '50vh' }}>
						<Image src="/mines/face.webp" alt="Profile Picture" fill style={{ objectFit: 'cover' }} loading='eager'/>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
