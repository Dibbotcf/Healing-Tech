const fs = require('fs');
const file = '/var/www/vhosts/healingtechnology.com.bd/httpdocs/node_modules/payload/dist/bin/loadEnv.js';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    'const { loadEnvConfig } = nextEnvImport;', 
    'const { loadEnvConfig } = nextEnvImport.loadEnvConfig ? nextEnvImport : (nextEnvImport.default || {});'
  );
  fs.writeFileSync(file, content);
  console.log('Patch applied successfully.');
} else {
  console.log('File not found:', file);
}
