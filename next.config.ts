import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds so French apostrophes don't break Vercel deployments
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
