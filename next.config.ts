import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { execSync } from 'child_process'

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  generateBuildId: async () => {
    // NEXT_BUILD_ID is set in Coolify env vars as a stable commit hash.
    // Falls back to git hash (works if .git dir is present in build env),
    // then to a fixed string (never random — random breaks server action IDs).
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
