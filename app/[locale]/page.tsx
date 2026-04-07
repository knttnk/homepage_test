import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { InsetPadding } from '@/components/inset-padding';
import { Carousel, CarouselButton, CarouselContent, CarouselHandler, CarouselItem } from '@/components/ui/carousel';
import conceptEn from '@/public/mines/concept-en.webp';
import conceptJa from '@/public/mines/concept-ja.webp';
import face2 from '@/public/mines/face2.webp';
import { Link } from '@/components/ui/link';
import { getPublications, type Publication } from './publications/get-publications';
import { AcademicCapIcon, BookOpenIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/**
 * 研究業績のテキストを適当に切る関数
 */
function toNewsText(text: string | null, maxLength = 96) {
	const normalized = (text ?? '').replace(/\s+/g, ' ').trim();
	if (!normalized) return '';
	if (normalized.length > maxLength) {
		return `${normalized.slice(0, maxLength).trimEnd()}…`;
	}
	return `${normalized}`;
}

function sortByDateDesc(a: Publication, b: Publication) {
	if (a.year !== b.year) return b.year - a.year;
	if (a.month !== b.month) return (b.month ?? 0) - (a.month ?? 0);
	return (b.day ?? 0) - (a.day ?? 0);
}

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	// Enable static rendering
	setRequestLocale(locale);

	// Once the request locale is set, you
	// can call hooks from `next-intl`
	const tResearch = await getTranslations('ResearchPage');
	const tPublications = await getTranslations('PublicationsPage');
	const tLayout = await getTranslations('Layout');

	const publications = await getPublications(locale);
	const latestPublications = Object.values(publications).flat().sort(sortByDateDesc).slice(0, 2);

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
										<CardTitle className="flex gap-2">
											<AcademicCapIcon className="size-6" />
											{tResearch('title')}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Image src={locale === 'ja' ? conceptJa : conceptEn} alt={tResearch('title')} loading="eager" />
									</CardContent>
								</Card>
							</Link>
						</CarouselItem>
						<CarouselItem className="basis-[min(25rem,70vw)]">
							<Link href={`/${locale}/publications`}>
								<Card>
									<CardHeader>
										<CardTitle className="flex gap-2">
											<BookOpenIcon className="size-6" />
											{tPublications('title')}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{latestPublications.map((item) => (
												<li key={`${item.category}-${item.id}`}>{toNewsText(item.str)}</li>
											))}
											<li>⋮</li>
										</ul>
									</CardContent>
								</Card>
							</Link>
						</CarouselItem>
						<CarouselItem className="basis-[min(25rem,70vw)]">
							<Link href={`/${locale}/profile`}>
								<Card>
									<CardHeader className="flex items-center gap-2">
										<UserCircleIcon className="size-6" />
										<CardTitle>{tLayout('profile')}</CardTitle>
									</CardHeader>
									<CardContent>
										<Image src={face2} alt={tLayout('profile')} loading="eager" />
									</CardContent>
								</Card>
							</Link>
						</CarouselItem>
					</CarouselContent>
					<CarouselHandler className="justify-center">
						<CarouselButton segment="previous" />
						<CarouselButton segment="next" />
					</CarouselHandler>
				</Carousel>
			</InsetPadding>
		</>
	);
}
