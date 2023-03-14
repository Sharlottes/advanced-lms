//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          assert: false,
          path: false,
          fs: false,
          events: false,
          process: false,
        },
      };
    }
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
