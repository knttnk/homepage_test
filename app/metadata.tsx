import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/** サーバーコンポーネントでメタデータを生成する関数．
 *
 * @param {string} params.locale - 現在のロケールコード（例: "en", "ja"）．
 * @param {string} params.root - このページのルートパス．（例: "/", "/research"）．
 */
export async function metadataFrom({
  locale,
  root,
}: {
  locale: string;
  root: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    alternates: {
      canonical: `https://knttnk.github.io/homepage_test/ja${root}`,
      languages: {
        en: `https://knttnk.github.io/homepage_test/en${root}`,
        ja: `https://knttnk.github.io/homepage_test/ja${root}`,
      },
    },
  };
}
