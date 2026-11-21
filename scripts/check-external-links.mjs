// Checks every external link in the built site (dist/). Run after `npm run build`:
//   npm run check:external
// Internal links are checked during the build by starlight-links-validator.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
if (!fs.existsSync(dist)) {
	console.error('dist/ not found: run `npm run build` first');
	process.exit(1);
}
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

// url → pages that use it
const uses = new Map();
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
	const html = fs.readFileSync(f, 'utf8');
	for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="(https?:\/\/[^"#]+)/g)) {
		const page = '/' + path.relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '');
		if (!uses.has(href)) uses.set(href, new Set());
		uses.get(href).add(page);
	}
}
// Hosts that block automated requests or need sign-in; listed, not fetched.
const SKIP = [/^https:\/\/discord\.gg\//, /^https:\/\/(www\.)?instagram\.com\//];

async function check(url) {
	for (const method of ['HEAD', 'GET']) {
		try {
			const res = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (link checker)' }, signal: AbortSignal.timeout(15000) });
			if (res.ok) return null;
			if (method === 'GET') return `${res.status}`;
		} catch (e) {
			if (method === 'GET') return e.name === 'TimeoutError' ? 'timeout' : e.message;
		}
	}
}

const urls = [...uses.keys()].filter((u) => !SKIP.some((r) => r.test(u)));
const failures = [];
const queue = [...urls];
await Promise.all(
	Array.from({ length: 4 }, async () => {
		while (queue.length) {
			const url = queue.shift();
			const err = await check(url);
			if (err) failures.push([url, err]);
		}
	}),
);
console.log(`Checked ${urls.length} external links (${uses.size - urls.length} skipped).`);
for (const [url, err] of failures) console.log(`✗ ${err}  ${url}\n    on ${[...uses.get(url)].join(', ')}`);
process.exit(failures.length ? 1 : 0);
