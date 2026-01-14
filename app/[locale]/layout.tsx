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
import { HomeIcon, AcademicCapIcon, BookOpenIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Header } from '@/components/header';
import { InsetPadding } from '@/components/inset-padding';

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
	return (
		<Providers>
			<SidebarProvider defaultOpen={true} isOpen={true}>
				<Sidebar collapsible="dock" side="left" closeButton={true} intent="default">
					<SidebarHeader>
						<Link href={`/${locale}/`}>
							<SidebarLabel>田中 健太</SidebarLabel>
						</Link>
					</SidebarHeader>
					<SidebarContent>
						<SidebarSection label="研究">
							<SidebarNavItem href={`/${locale}/`}>
								<HomeIcon />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarNavItem>
							<SidebarNavItem href={`/${locale}/research`}>
								<AcademicCapIcon />
								<SidebarLabel>Research</SidebarLabel>
							</SidebarNavItem>
						</SidebarSection>
						<SidebarSection label="その他">
							<SidebarNavItem href={`/${locale}/about`}>
								<SidebarLabel>About</SidebarLabel>
							</SidebarNavItem>
						</SidebarSection>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<Header>
						<SidebarTrigger />
						<Link href={`/${locale}/`}>
							<Heading level={1}>田中 健太</Heading>
						</Link>
					</Header>
					<InsetPadding>{children}</InsetPadding>
				</SidebarInset>
			</SidebarProvider>
		</Providers>
	);
}
