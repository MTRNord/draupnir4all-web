import type { NextConfig } from "next";
import analyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    useCache: true,
    dynamicIO: true,
  },
  output: 'standalone'
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)