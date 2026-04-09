const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 12000;
const NEXT_PORT = 12001;

// The current directory on VPS will be /var/www/vhosts/healingtechnology.com.bd/httpdocs
// In standalone, public and .next/static must be accessible.
// Next standalone puts files in .next/standalone/.next/static normally if we copied them,
// but the user's prompt mentioned "cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/."
// Let's assume we run this proxy from httpdocs root, so we map to .next/standalone/ paths.
// Actually, it's easier to serve .next/standalone/.next/static:
app.use('/_next/static', express.static(path.join(__dirname, '.next/standalone/.next/static')));
app.use('/', express.static(path.join(__dirname, '.next/standalone/public')));

app.use('/', createProxyMiddleware({
    target: `http://127.0.0.1:${NEXT_PORT}`,
    changeOrigin: true,
}));

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Express wrapper listening on port ${PORT}...`);
});
