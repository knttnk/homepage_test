import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { use } from 'react';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';
import { InsetPadding } from '@/components/inset-padding';
import { Carousel, CarouselButton, CarouselContent, CarouselHandler, CarouselItem } from '@/components/ui/carousel';
import conceptEn from '@/public/mines/concept-en.webp';
import conceptJa from '@/public/mines/concept-ja.webp';
import { Link } from '@/components/ui/link';

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
	const tResearch = useTranslations('ResearchPage');

	return (
		<>
			<div style={{ position: 'relative', width: '100%', height: '60vh' }}>
				<Image src="/mines/face.webp" alt="Profile Picture" fill style={{ objectFit: 'cover' }} loading="eager" />
			</div>
			<InsetPadding>
				<Carousel opts={{ loop: true }} className="w-full">
					<CarouselContent>
						<CarouselItem className="basis-[min(25rem,70vw)]">
							<Link href={`/${locale}/research`}>
								<Card>
									<CardHeader>
										<Text>{tResearch('title')}</Text>
									</CardHeader>
									<CardContent>
										<Image src={locale === 'ja' ? conceptJa : conceptEn} alt={tResearch('title')} loading="eager" />
									</CardContent>
								</Card>
							</Link>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<Text>ああ</Text>
							</Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<Text>ああ</Text>
							</Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<Text>ああ</Text>
							</Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<Text>ああ</Text>
							</Card>
						</CarouselItem>
						<CarouselItem>
							<Card>
								<Text>ああ</Text>
							</Card>
						</CarouselItem>
					</CarouselContent>
					<CarouselHandler>
						<CarouselButton segment="previous" />
						<CarouselButton segment="next" />
					</CarouselHandler>
				</Carousel>
			</InsetPadding>
		</>
	);
}
