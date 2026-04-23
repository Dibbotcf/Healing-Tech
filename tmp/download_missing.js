const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();
const path = require('path');

// Map: DB expects this local filename -> closest matching file on VPS
const MAPPING = [
  { localName: 'Double Dom.jpg',         remoteName: 'Double Do.jpg' },
  { localName: 'Double Dome-2.jpg',      remoteName: 'Double Dome-2.png' }, // save as jpg name
  { localName: 'Double Dome-1hjgcv.jpg', remoteName: 'Double Dome-1.jpg' },
];

const REMOTE_DIR = '/var/www/vhosts/healingtechnology.com.bd/httpdocs/public/media';

async function run() {
  await ssh.connect({ host: '97.74.90.189', username: 'healingtechnology', password: 'S_hJ4NZ*rxr4i1zsw' });
  console.log('Connected to VPS');

  for (const { localName, remoteName } of MAPPING) {
    const localPath = path.join('public', 'media', localName);
    const remotePath = `${REMOTE_DIR}/${remoteName}`;
    try {
      await ssh.getFile(localPath, remotePath);
      console.log(`✅ Saved "${remoteName}" as "${localName}"`);
    } catch (e) {
      console.error(`❌ Failed: ${e.message}`);
    }
  }

  ssh.dispose();
  console.log('\nDone!');
}

run().catch(e => { console.error(e); process.exit(1); });
