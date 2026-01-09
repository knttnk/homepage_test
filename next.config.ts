import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? "/homepage_test" : ""

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: "export",

  // GitHub Pages では _next の最適化機能を利用できないため無効
  images: {
    unoptimized: true
  },

  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  }
};

export default nextConfig;
