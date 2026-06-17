import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { execSync } from 'child_process'

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  generateBuildId: async () => {
    // CRITICAL: NEXT_BUILD_ID must be a STABLE value that never changes between deploys.
    // Action IDs are derived from BUILD_ID + file path, but chunk filenames are NOT
    // re-hashed when action IDs change. So if BUILD_ID changes, server has new action IDs
    // but browsers serve immutable-cached chunks with old IDs → UnrecognizedActionError.
    // Keep NEXT_BUILD_ID in Coolify as a fixed SHA — never change it.
    if (process.env.NEXT_BUILD_ID) return process.env.NEXT_BUILD_ID
    try {
      return execSync('git rev-parse HEAD').toString().trim()
    } catch {
      return 'stable-build'
    }
  },
  experimental: {
    proxyClientMaxBodySize: '2gb',
    serverActions: {
      bodySizeLimit: '2gb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
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

const withPayloadConfig = withPayload(nextConfig) as NextConfig & { experimental?: Record<string, unknown> }
// withPayload injects turbopackServerFastRefresh which is invalid in Next.js 16.2.2
delete withPayloadConfig.experimental?.turbopackServerFastRefresh
export default withPayloadConfig
