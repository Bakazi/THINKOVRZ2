const nextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'pdfkit'],
  },

  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    if (!dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

module.exports = nextConfig;
