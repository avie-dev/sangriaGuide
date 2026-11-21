// Downloads every official Sangria Falls guide and class page (English, Portuguese and the
// English "without the interface" variant) into research/raw/. Snapshots are gitignored: they
// are copies of official text, kept locally only for research.
// Usage: node research/fetch.mjs   (then: node research/extract.mjs && node research/inventory.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://www.sangriafalls.com';
const here = fileURLToPath(new URL('.', import.meta.url));
const raw = path.join(here, 'raw');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (sangria-wiki research)' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}
function save(dir, name, html) {
  fs.mkdirSync(path.join(raw, dir), { recursive: true });
  fs.writeFileSync(path.join(raw, dir, name + '.html'), html);
}
const fileId = (p) => p.replace(/^\/en\//, '').replace(/\/$/, '').replace(/\//g, '_');

const hubs = ['/en/', '/en/guias/', '/en/classes/', '/en/interface/', '/en/guias/comunidade/', '/en/builds/', '/en/vip/'];
const hubHtml = {};
for (const h of hubs) {
  hubHtml[h] = await get(BASE + h);
  fs.mkdirSync(raw, { recursive: true });
  fs.writeFileSync(path.join(raw, (h === '/en/' ? 'en' : 'en_' + fileId(h)) + '.html'), hubHtml[h]);
}
const links = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(BASE, ''));
const guides = [...new Set(links(hubHtml['/en/guias/']).filter((l) => /^\/en\/guias\/[a-z0-9-]+\/$/.test(l) && !l.includes('comunidade')))];
const classes = [...new Set(links(hubHtml['/en/classes/']).filter((l) => /^\/en\/classes\/[a-z0-9-]+\/$/.test(l)))];
fs.writeFileSync(path.join(raw, 'guide-slugs.txt'), guides.join('\n') + '\n');

for (const p of [...guides, ...classes]) {
  const id = fileId(p);
  const en = await get(BASE + p);
  save('en', id, en);
  save('pt', id, await get(BASE + p.replace(/^\/en/, '')));
  if (en.includes(`href="${p}sem-interface/"`)) save('en-chat', id, await get(BASE + p + 'sem-interface/'));
  console.log('ok', p);
  await sleep(300);
}
console.log(`${guides.length} guides, ${classes.length} class pages`);
