import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// GitHub Pages では，リポジトリ名をベースパスとして使用
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGitHubActions ? '/homepage_test' : ''

// ソースマップを作成
const isProduction = process.env.NODE_ENV === 'production';
process.env.GENERATE_SOURCEMAP = isProduction ? 'true' : 'false';

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: "export",

  images: {
    unoptimized: true  // GitHub Pages では _next の最適化機能を利用できないため無効
  },

  productionBrowserSourceMaps: isProduction,
  webpack: (config, { dev, isServer }) => {
    // サーバーサイド(Node.js)のソースマップ
    if (!dev) {
      config.devtool = 'source-map';
    }
    return config;
  },

  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
