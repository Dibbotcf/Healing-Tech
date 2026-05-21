import { execSync } from 'child_process'

export async function GET() {
  try {
    // We use execSync so the Node process BLOCKS and WAITS until the entire SQL import is 100% finished.
    // This prevents Coolify from shutting down the container halfway through the import.
    execSync(`psql "${process.env.DATABASE_URI}" -f "public/latest_plesk_dump.sql"`)
    return Response.json({ ok: true, message: "Import completed successfully!" })
  } catch (error: any) {
    return Response.json({ ok: false, error: error.message, stdout: error.stdout?.toString(), stderr: error.stderr?.toString() })
  }
}
