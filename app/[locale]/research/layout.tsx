import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { metadataFrom } from "../../metadata";

export async function generateMetadata(
  params: Promise<{
    locale: string;
  }>
): Promise<Metadata> {
  const { locale } = await params;
  return metadataFrom({ locale, root: "/research" });
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <body>
      <header>
        <div style={{ padding: 20 }}>けんきゅうだ！ﾍｯﾀﾞｰ: {locale}</div>
      </header>
      {children}
    </body>
  );
}
