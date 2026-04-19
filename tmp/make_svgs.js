const fs = require('fs');

const svg03 = fs.readFileSync('public/healing technology logo SVG-03.svg', 'utf8');
const svg04 = fs.readFileSync('public/healing technology logo SVG-04.svg', 'utf8');

// SVG 03 handles the colored (dark) version
// Expand viewBox from "0 0 1199 178.62" to "0 0 1199 220" and add <text>
let newSvg03 = svg03.replace('viewBox="0 0 1199 178.62"', 'viewBox="0 0 1199 230"');
newSvg03 = newSvg03.replace('</svg>', `
  <text x="1195" y="215" font-family="'Bahnschrift', 'Inter', sans-serif" font-size="46" font-weight="500" fill="#006837" text-anchor="end" letter-spacing="1">Your Trusted Business Partner</text>
</svg>
`);
fs.writeFileSync('public/logo-dark.svg', newSvg03);


// SVG 04 handles the uncolored (light) version
let newSvg04 = svg04.replace('viewBox="0 0 1199 178.62"', 'viewBox="0 0 1199 230"');
// Make the icon parts pure white (or we can just use CSS filter on it later)
newSvg04 = newSvg04.replace('</svg>', `
  <text x="1195" y="215" font-family="'Bahnschrift', 'Inter', sans-serif" font-size="46" font-weight="500" fill="#12B5CB" text-anchor="end" letter-spacing="1">Your Trusted Business Partner</text>
</svg>
`);
fs.writeFileSync('public/logo-light.svg', newSvg04);

console.log("Created logo-dark.svg and logo-light.svg");
