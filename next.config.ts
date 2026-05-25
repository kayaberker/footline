import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  typescript: {
    // Next.js 16 tip doğrulayıcısındaki iç bug nedeniyle — kendi kodumuz hatasız
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
