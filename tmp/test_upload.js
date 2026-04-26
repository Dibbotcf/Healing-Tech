const fs = require('fs');
async function testUpload() {
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const dummySize = 15 * 1024 * 1024; // 15MB
  const dummyContent = Buffer.alloc(dummySize, '0');
  
  let body = `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file"; filename="test-video.mp4"\r\n`;
  body += `Content-Type: video/mp4\r\n\r\n`;
  const bodyEnd = `\r\n--${boundary}--\r\n`;
  
  const payload = Buffer.concat([
    Buffer.from(body, 'utf8'),
    dummyContent,
    Buffer.from(bodyEnd, 'utf8')
  ]);

  try {
    const res = await fetch('http://localhost:12000/api/media', {
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
      body: payload
    });
    console.log('Status:', res.status, await res.text());
  } catch (err) { console.error('Fetch error:', err); }
}
testUpload();
