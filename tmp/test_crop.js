const fs = require('fs');
const svg = fs.readFileSync('public/logo-new.svg', 'utf8');

// There are two major groups of logos:
// Logo 1: viewBox around tx=167 to 440, ty=590 to 620
// Logo 2: viewBox around ty=430 to 460
// The text is around tx=415, ty=462 (which belongs to Logo 2?)
// Actually, why don't I just create top-logo.svg and bottom-logo.svg and see them in Firefox? Wait, I don't have Firefox.

// Let's just create an HTML file that uses `<svg viewBox="...">` referencing the `<use>` or just wrapping the exact SVG.

let html = `
<html>
<body style="background: #ccc;">
  <h2>Top Logo</h2>
  <svg viewBox="130 490 350 140" style="width: 500px; border: 1px solid red; background: white;">
    \${svg.replace(/<svg[^>]*>/, '').replace(/<\\/svg>/, '')}
  </svg>
  <h2>Bottom Logo</h2>
  <svg viewBox="130 360 350 140" style="width: 500px; border: 1px solid blue; background: #222;">
    \${svg.replace(/<svg[^>]*>/, '').replace(/<\\/svg>/, '')}
  </svg>
  <style>
    /* Turn off the global clipPath on <g id="layer-MC0"> to prevent clipping from the A4 document bounds */
  </style>
</body>
</html>
`;

fs.writeFileSync('public/test2.html', html);
