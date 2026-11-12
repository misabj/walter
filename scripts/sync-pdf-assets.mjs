import {cp, mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const require = createRequire(import.meta.url);
const source = dirname(require.resolve('pdfjs-dist/package.json'));
const destination = fileURLToPath(new URL('../public/pdfjs/', import.meta.url));

await mkdir(destination, {recursive: true});
await Promise.all([
  cp(join(source, 'build/pdf.worker.min.mjs'), join(destination, 'pdf.worker.min.mjs')),
  ...['cmaps', 'standard_fonts', 'wasm', 'LICENSE'].map((name) => cp(join(source, name), join(destination, name), {recursive: true}))
]);
console.log('Local PDF worker, fonts and decoding assets are ready.');
