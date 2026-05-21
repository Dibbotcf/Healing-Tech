import { execSync } from 'child_process'

export async function GET() {
  try {
    execSync(`psql "${process.env.DATABASE_URI}" -f "public/latest_plesk_dump.sql"`)
    return Response.json({ ok: true, message: "Import completed successfully!" })
  } catch (error: any) {
    return Response.json({ ok: false, error: error.message, stderr: error.stderr?.toString() })
  }
}
