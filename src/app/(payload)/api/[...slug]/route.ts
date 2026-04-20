// @ts-nocheck
import config from '@/payload.config'
import { REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_DELETE } from '@payloadcms/next/routes'

// Allow large file uploads (videos, high-res images) — no body size limit
export const maxDuration = 300 // 5 minutes max for large uploads
export const dynamic = 'force-dynamic'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const OPTIONS = REST_OPTIONS(config)
