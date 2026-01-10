import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

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
    <html lang={locale}>
      <body>
        <div style={{ padding: 20 }}>Current locale: {locale}</div>
        <div style={{ padding: 20 }}>{t("title")}</div>
        {children}
      </body>
    </html>
  );
}
