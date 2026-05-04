const csp = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data:; font-src * data:; img-src * data: blob:; connect-src * data: blob:; worker-src * blob: data:; frame-src *; frame-ancestors *;"

const nextConfig = {
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ['mongodb', 'pdfkit'],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = { poll: 2000, aggregateTimeout: 300, ignored: ['**/node_modules'] }
    }
    config.devtool = false
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
