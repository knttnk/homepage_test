import "./globals.css";

import { Metadata } from "next";
import { metadataFrom } from "./metadata";
import { routing } from "@/i18n/routing";

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
      <body>{children}</body>
    </html>
  );
}
