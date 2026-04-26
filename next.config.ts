import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: '2gb',
    },
    // Lift the 10MB body clone limit for middleware/route handlers (Payload's /api/media)
    proxyClientMaxBodySize: '2gb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '12000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      '@payload-config': path.resolve('./src/payload.config.ts'),
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig)
