import { exec } from 'child_process'
export async function GET() {
  exec(`psql "${process.env.DATABASE_URI}" -f "public/latest_plesk_dump.sql"`)
  return Response.json({ ok: true })
}
