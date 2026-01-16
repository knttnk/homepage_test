import { Metadata } from 'next';
import { metadataFrom } from '../metadata';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarLabel,
	SidebarNav,
	SidebarRail,
	SidebarSection,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNavItem } from '@/components/sidebar-nav-item';
import { Providers } from '@/components/providers';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Link } from '@/components/ui/link';
import { Heading } from '@/components/ui/heading';
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui/breadcrumbs';
import { HomeIcon, AcademicCapIcon, BookOpenIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Header } from '@/components/header';
import { InsetPadding } from '@/components/inset-padding';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata(
	params: Promise<{
		locale: string;
	}>,
): Promise<Metadata> {
	const { locale } = await params;
	return metadataFrom({ locale, root: '/' });
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);
	const tc = await getTranslations('Common');
	const t = await getTranslations('Layout');

	return (
		<Providers>
			<SidebarProvider defaultOpen={true} isOpen={true}>
				<Sidebar collapsible="dock" side="left" closeButton={true} intent="default">
					<SidebarHeader>
						<Link href={`/${locale}/`}>
							<SidebarLabel>{tc('knttnk')}</SidebarLabel>
						</Link>
					</SidebarHeader>
					<SidebarContent>
						<SidebarSection>
							<SidebarNavItem href={`/${locale}/`}>
								<HomeIcon />
								<SidebarLabel>{t('home')}</SidebarLabel>
							</SidebarNavItem>
						</SidebarSection>
						<SidebarSection label={t('about_research')}>
							<SidebarNavItem href={`/${locale}/research`}>
								<AcademicCapIcon />
								<SidebarLabel>{t('research')}</SidebarLabel>
							</SidebarNavItem>
							<SidebarNavItem href={`/${locale}/publications`}>
								<BookOpenIcon />
								<SidebarLabel>{t('publications')}</SidebarLabel>
							</SidebarNavItem>
						</SidebarSection>
						<SidebarSection label={t('other')}>
							<SidebarNavItem href={`/${locale}/profile`}>
								<UserCircleIcon />
								<SidebarLabel>{t('profile')}</SidebarLabel>
							</SidebarNavItem>
						</SidebarSection>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<Header>
						<SidebarTrigger />
						<Link href={`/${locale}/`}>
							<Heading level={1}>{tc('knttnk')}</Heading>
						</Link>
					</Header>
					<InsetPadding>{children}</InsetPadding>
				</SidebarInset>
			</SidebarProvider>
		</Providers>
	);
}
