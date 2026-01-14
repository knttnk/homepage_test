import { Metadata } from 'next';
import { metadataFrom } from '../metadata';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarItem,
	SidebarLabel,
	SidebarNav,
	SidebarRail,
	SidebarSection,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Providers } from '@/components/providers';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Link } from '@/components/ui/link';
import { Heading } from '@/components/ui/heading';
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui/breadcrumbs';
import { HomeIcon, AcademicCapIcon, BookOpenIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Header } from '@/components/header';

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
							<SidebarItem isCurrent={true} href={`/${locale}/`}>
								<HomeIcon />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarItem>
							<SidebarItem isCurrent={false} href={`/${locale}/research`}>
								<AcademicCapIcon />
								<SidebarLabel>Research</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
						<SidebarSection label="その他">
							<SidebarItem isCurrent={true} href={`/${locale}/about`}>
								<SidebarLabel>About</SidebarLabel>
							</SidebarItem>
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
					<div className="p-4 lg:p-6">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</Providers>
	);
}
