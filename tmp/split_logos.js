const fs = require('fs');

const svgContent = fs.readFileSync('public/logo-new.svg', 'utf8');

// The file contains two logos in <g id="layer-MC0">
// One set of paths has translateY ~500-650
// Another set of paths has translateY ~350-480

// We can just create two SVGs, one with viewBox focused on the top one, and one on the bottom one.

// Let's find the bounding box roughly.
// Top logo:
// X from ~130 to ~460. Let's use viewBox="130 520 330 110"
// Bottom logo:
// X from ~130 to ~460. Let's use viewBox="130 370 330 110" ... wait, the matrix has negative ty? No, matrix(1.33, 0, 0, -1.33, tx, ty) means ty is positive, but since scaling is negative, it goes upward. In SVG coordinates, the origin is top-left, so the image is drawn from ty upwards. 
// Thus the bounding box Y is between (ty - height) to ty.
// Let's just output two files with the original content but different viewBoxes.

const topViewBox = "165 480 290 145"; // Adjusted after examining tx/ty
const bottomViewBox = "130 365 290 145"; // Adjusted

// Actually, wait, let's just write a file that outputs them.
const topSvg = svgContent.replace(/viewBox="[^"]+"/, `viewBox="${topViewBox}"`);
const bottomSvg = svgContent.replace(/viewBox="[^"]+"/, `viewBox="${bottomViewBox}"`);

fs.writeFileSync('public/logo-top.svg', topSvg);
fs.writeFileSync('public/logo-bottom.svg', bottomSvg);

console.log("Done");
