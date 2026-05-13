import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic'; // Prevent caching

export async function GET(): Promise<NextResponse> {
  return new Promise<NextResponse>((resolve) => {
    console.log("Starting DB restore process...");
    
    // First, verify psql exists
    exec('psql --version', (err) => {
      if (err) {
        return resolve(NextResponse.json({ error: 'psql is not installed in the container' }, { status: 500 }));
      }
      
      const dbUri = process.env.DATABASE_URI;
      if (!dbUri) {
        return resolve(NextResponse.json({ error: 'DATABASE_URI env var is missing' }, { status: 500 }));
      }
      
      // Step 1: Wipe the schema
      console.log("Wiping schema...");
      const wipeCmd = `psql "${dbUri}" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`;
      
      exec(wipeCmd, (error, stdout, stderr) => {
        if (error) {
          console.error("Wipe failed:", stderr);
          return resolve(NextResponse.json({ error: 'Schema wipe failed', details: stderr }, { status: 500 }));
        }
        
        console.log("Schema wiped successfully.");
        
        // Step 2: Restore the dump
        const dumpPath = path.join(process.cwd(), 'public', 'latest_plesk_dump.sql');
        console.log("Restoring dump from:", dumpPath);
        
        // Use -f to execute the file
        const restoreCmd = `psql "${dbUri}" -f "${dumpPath}"`;
        
        exec(restoreCmd, (err2, stdout2, stderr2) => {
          if (err2) {
            console.error("Restore failed:", stderr2);
            return resolve(NextResponse.json({ error: 'Database restore failed', details: stderr2 }, { status: 500 }));
          }
          
          console.log("Restore complete!");
          return resolve(NextResponse.json({ 
            success: true, 
            message: 'Database restored successfully from Plesk dump!',
            stdout: stdout2.substring(0, 1000) // Truncate to avoid massive payload
          }));
        });
      });
    });
  });
}
