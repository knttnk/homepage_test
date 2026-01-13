import { Metadata } from "next";
import { metadataFrom } from "../metadata";

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
} from "@/components/ui/sidebar";
import { Providers } from "@/components/providers";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Link } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";
import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs";
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

export async function generateMetadata(
  params: Promise<{
    locale: string;
  }>
): Promise<Metadata> {
  const { locale } = await params;
  return metadataFrom({ locale, root: "/" });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <Providers>
      <SidebarProvider defaultOpen={true} isOpen={true}>
        <Sidebar
          collapsible="dock"
          side="left"
          closeButton={true}
          intent="default"
        >
          <SidebarTrigger />
          <SidebarHeader>
            <Link href="https://knttnk.github.io/homepage/">
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
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
