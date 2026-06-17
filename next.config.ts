import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { execSync } from 'child_process'

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  generateBuildId: async () => {
    // Use current git SHA so action IDs (and chunk filenames) change with every commit.
    // git is in nixpacks nixPkgs and .git is present in the Coolify build context.
    // Falls back to NEXT_BUILD_ID env var (set in Coolify to ${SOURCE_COMMIT}),
    // then to a fixed string — never random, random breaks server action IDs.
    try {
      const sha = execSync('git rev-parse HEAD').toString().trim()
      if (sha) return sha
    } catch {}
    return process.env.NEXT_BUILD_ID ?? 'stable-build'
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
