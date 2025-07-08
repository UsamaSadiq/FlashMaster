const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const htmlFile = path.join(distPath, 'index.html');

if (!fs.existsSync(htmlFile)) {
  console.error('❌ index.html not found in dist/');
  process.exit(1);
}

let html = fs.readFileSync(htmlFile, 'utf-8');

// Inline JS
const jsFile = fs.readdirSync(distPath).find(f => f.endsWith('.js'));
if (jsFile) {
  const jsPath = path.join(distPath, jsFile);
  const jsContent = fs.readFileSync(jsPath, 'utf-8');
  html = html.replace(/<script type="module".*?<\/script>/s, `<script>\n${jsContent}\n</script>`);
  console.log(`✅ Inlined JS from ${jsFile}`);
} else {
  console.warn('⚠️ No JS file found to inline.');
}

// // Inline CSS
// const cssFile = fs.readdirSync(distPath).find(f => f.endsWith('.css'));
// if (cssFile) {
//   const cssPath = path.join(distPath, cssFile);
//   const cssContent = fs.readFileSync(cssPath, 'utf-8');
//   html = html.replace(/<link rel="stylesheet".*?>/s, `<style>\n${cssContent}\n</style>`);
//   console.log(`✅ Inlined CSS from ${cssFile}`);
// } else {
//   console.warn('⚠️ No CSS file found to inline.');
// }

fs.writeFileSync(htmlFile, html);
console.log('✅ Final single-file index.html created.');

// Optional: delete assets folder
// fs.rmSync(assetsDir, { recursive: true, force: true });
