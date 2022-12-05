/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  images : {
    unoptimized : true
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/links": { page: "/links" },
    };
  },
  assetPrefix: !debug
    ? "https://anotherplanet-io.github.io/Next-React-Components/"
    : "",

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
