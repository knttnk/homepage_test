'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Text } from '@/components/ui/text';
import { InsetPadding } from '@/components/inset-padding';
import { Link } from '@/components/ui/link';
import { buttonStyles } from "@/components/ui/button";

/** ブラウザの言語設定を検出し、対応する言語コードを返す．
 *  わからなければ "ja" を返す．
 *
 * @returns {string} 特定された言語コード ("en" または "ja")
 */
function detectLanguage(): string {
	// ブラウザの言語設定を取得
	const browserLocales = navigator.languages || [navigator.language];

	// サポートしているロケールの中から、ブラウザの言語に合うものを探す
	const supportedLocales: readonly string[] = routing.locales;
	const detectedLocale = browserLocales
		.map((locale) => locale.split('-')[0]) // 'en-US' -> 'en'
		.find((locale) => supportedLocales.includes(locale));

	// マッチしたロケール、またはデフォルトロケールにリダイレクト
	return detectedLocale || routing.defaultLocale;
}

// Static export doesn't support server-side redirects.
// Do a client-side redirect to the default locale.
export default function RootPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace(`/${detectLanguage()}`);
	}, [router]);

	return (
		<InsetPadding>
			<Text>Redirecting...</Text>
			<Text>You should enable JavaScript to use this site.</Text>
			<Link href="/en" className={buttonStyles({ intent: "primary" })} >Open manually</Link>
			<Text>リダイレクトしています．</Text>
			<Text>このサイトの閲覧には，JavaScriptが必要です．</Text>
			<Link href="/ja" className={buttonStyles({ intent: "primary" })} >手動で開く</Link>
		</InsetPadding>
	);
}
