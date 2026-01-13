import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { use } from "react";
import { SidebarNav, SidebarTrigger } from "@/components/ui/sidebar";
import { Text } from "@/components/ui/text";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations("HomePage");

  return (
    <>
      <SidebarNav></SidebarNav>
      <Text>ホーム</Text>
      {Array.from({ length: 399 }).map((_, i) => (
        <Text key={i}>あああ</Text>
      ))}
    </>
  );
}
