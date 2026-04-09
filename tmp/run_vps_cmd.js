const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();
const fs = require('fs');

async function run() {
  try {
    const mode = process.argv[2];
    const arg1 = process.argv[3];
    const arg2 = process.argv[4];

    await ssh.connect({
      host: '97.74.90.189',
      username: 'healingtechnology',
      password: 'S_hJ4NZ*rxr4i1zsw'
    });

    if (mode === 'upload') {
      console.log(`Uploading ${arg1} to ${arg2}`);
      await ssh.putFile(arg1, arg2);
      console.log('Upload complete.');
    } else {
      const cmd = process.argv[2];
      console.log(`Executing: ${cmd}`);
      const result = await ssh.execCommand(cmd, { cwd: '/var/www/vhosts/healingtechnology.com.bd/httpdocs/' });
      console.log('STDOUT:\n', result.stdout);
      if(result.stderr) console.error('STDERR:\n', result.stderr);
    }
    
    ssh.dispose();
  } catch (err) {
    console.error('SSH Error:', err);
    process.exit(1);
  }
}

run();
