import "./globals.css";

import { Metadata } from "next";
import { metadataFrom } from "./metadata";
import { routing } from "@/i18n/routing";

import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarLabel,
  SidebarNav,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Providers } from "@/components/providers";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Link } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";
import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs";

export async function generateMetadata(
  params: Promise<{
    locale: string;
  }>
): Promise<Metadata> {
  const { locale } = await params;
  return metadataFrom({ locale: locale ?? routing.defaultLocale, root: "/" });
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <SidebarProvider>
            <Sidebar collapsible="dock" side="left" closeButton={false}>
              <SidebarHeader>
                <Link href="https://knttnk.github.io/homepage/">
                  <SidebarLabel className="font-medium">田中 健太</SidebarLabel>
                </Link>
              </SidebarHeader>
            </Sidebar>
            <SidebarInset>
              {children}
            </SidebarInset>
            <Sidebar collapsible="hidden" side="right" closeButton={false} />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
