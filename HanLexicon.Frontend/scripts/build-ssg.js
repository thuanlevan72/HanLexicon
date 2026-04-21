import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function formatSSG() {
  try {
    // 1. Dynamic import of the built server entry point using 'file://' protocol
    const serverEntryPath = path.resolve(__dirname, '../dist/server/entry-server.js');
    const { render } = await import('file://' + serverEntryPath);

    // 2. Render the application using the entry point
    const appHtml = render('/');

    // 3. Inject into standard index.html
    const templatePath = path.resolve(__dirname, '../dist/index.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Make sure we output exactly the same ID as React expects hydration for
    const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    fs.writeFileSync(templatePath, finalHtml);
    console.log('Static Site Generation (SSG) Complete! SEO HTML injected into dist/index.html');
  } catch (err) {
    console.error("SSG Build Failed:", err);
    process.exit(1);
  }
}

formatSSG();
