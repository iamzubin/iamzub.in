/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  images : {
    unoptimized : true
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/Resume_iamzubin.pdf",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
