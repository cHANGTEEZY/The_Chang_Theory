import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mdxeditor/editor"],
  reactStrictMode: true,
  // Add empty turbopack config to acknowledge we're using Turbopack
  turbopack: {},
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};

export default nextConfig;
