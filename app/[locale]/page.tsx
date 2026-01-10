import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function IndexPage(params: Promise<{ locale: string }>) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations("HomePage");

  return (
    <div style={{ padding: 20 }}>
      <div>Current locale: {locale}</div>
      <div>{t("title")}</div>
    </div>
  );
}
