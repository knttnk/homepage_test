// ルーティングを /en/about のようにロケール付きにするための設定
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'ja'],

    // Used when no locale matches
    defaultLocale: 'ja'
});