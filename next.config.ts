import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Protected images must be fetched directly with the user's cookie, not by
  // the shared image optimizer/cache (which does not forward auth headers).
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
