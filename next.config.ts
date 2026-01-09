import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: "export",

  // GitHub Pages では _next の最適化機能を利用できないため無効
  images: {
    unoptimized: true
  },

  ...(isProd && {
    basePath: "/my-website",
    assetPrefix: "/my-website/"
  })
};

export default nextConfig;
