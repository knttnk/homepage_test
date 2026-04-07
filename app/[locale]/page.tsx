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
						<CarouselItem className="w-50 aspect-auto">
							<Card>
								<CardContent>
									<div style={{ position: 'relative', width: '25rem', height: '25rem' }}>
										<Image src={`/mines/concept-${locale}.webp`} alt="Concept Art" fill style={{ objectFit: 'contain' }} loading="eager" />
									</div>
								</CardContent>
								<CardFooter>
									<Text>{tResearch('title')}</Text>
								</CardFooter>
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
