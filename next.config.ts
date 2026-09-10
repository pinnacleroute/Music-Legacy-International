import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.BUILD_TARGET === 'github' ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
