import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? "/homepage_test" : ""

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: "export",

  images: {
    unoptimized: true  // GitHub Pages では _next の最適化機能を利用できないため無効
  },

  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
