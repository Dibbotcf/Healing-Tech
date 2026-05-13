const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function run() {
  try {
    // Try to connect to Coolify server to get DB container info
    await ssh.connect({
      host: '91.98.166.101',
      port: 22,
      username: 'root',
      // Coolify typically sets up with SSH key, try common approaches
      // Will fail gracefully if no key
    });
    
    console.log('Connected to Coolify server!');
    
    // Find the postgres container name
    const containers = await ssh.execCommand('docker ps --filter "name=postgresql" --format "{{.Names}}"');
    console.log('Postgres containers:', containers.stdout);
    
    // Get postgres password from container env
    const containerName = containers.stdout.trim().split('\n')[0];
    if (containerName) {
      const envResult = await ssh.execCommand(`docker exec ${containerName} env | grep POSTGRES`);
      console.log('Env vars:', envResult.stdout);
    }
    
    ssh.dispose();
  } catch (err) {
    console.error('SSH Error:', err.message);
    process.exit(1);
  }
}

run();
