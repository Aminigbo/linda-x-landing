/** @type {import('next').NextConfig} */
const nextConfig = {
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tcijrogmncatfkddtyzm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
