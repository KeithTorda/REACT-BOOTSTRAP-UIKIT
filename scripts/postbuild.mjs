/**
 * After the library build, Vite inlines the Bootstrap Icons font as base64 (lib mode always does).
 * That balloons styles.css, so we swap the inlined @font-face for real font files copied next to it.
 * Result: admin-ui-kit/styles.css is still a single self-contained import, but stays small.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cssPath = resolve(root, 'dist/admin-ui-kit.css');
const fontDir = resolve(root, 'dist/fonts');
const source = resolve(root, 'node_modules/bootstrap-icons/font/fonts');

if (!existsSync(cssPath)) {
  console.error('postbuild: dist/admin-ui-kit.css not found — run the lib build first.');
  process.exit(1);
}

mkdirSync(fontDir, { recursive: true });
for (const file of ['bootstrap-icons.woff2', 'bootstrap-icons.woff']) {
  const from = resolve(source, file);
  if (existsSync(from)) copyFileSync(from, resolve(fontDir, file));
}

const before = readFileSync(cssPath, 'utf8');
const after = before.replace(
  /@font-face\{[^}]*font-family:bootstrap-icons;[^}]*url\(data:font\/woff2;base64,[^)]+\)[^}]*\}/g,
  '@font-face{font-family:bootstrap-icons;font-display:block;' +
    'src:url("./fonts/bootstrap-icons.woff2") format("woff2"),' +
    'url("./fonts/bootstrap-icons.woff") format("woff")}'
);

// Prepend @charset so the icon glyphs decode correctly even when a consumer's
// index.html forgets <meta charset="utf-8">.
const withCharset = after.startsWith('@charset') ? after : `@charset "UTF-8";\n${after}`;
writeFileSync(cssPath, withCharset);
const saved = (before.length - withCharset.length) / 1024;
console.log(
  saved > 1
    ? `postbuild: externalised the icon font (-${saved.toFixed(0)} kB), fonts copied to dist/fonts/`
    : 'postbuild: no inlined icon font found (nothing to do)'
);
