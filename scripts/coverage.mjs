// Validates docs/coverage.yaml and regenerates the article tables in docs/progress.md.
//   node scripts/coverage.mjs          validate + write docs/progress.md
//   node scripts/coverage.mjs --check  validate only; fails if docs/progress.md is out of date
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const checkOnly = process.argv.includes('--check');

const { sections } = parse(read('docs/coverage.yaml'));
const sourceIds = new Set(JSON.parse(read('src/data/official-sources.json')).map((s) => s.id));
const questionIds = new Set([...read('research/open-questions.md').matchAll(/\| (Q-\d{3}) \|/g)].map((m) => m[1]));

const STATUS = {
	research: ['—', 'sources found', 'read', 'done'],
	writing: ['—', 'draft', 'written'],
	verified: ['—', 'partly checked', 'verified'],
	built: ['—', 'page stub', 'published', 'built', 'tested'],
};
const errors = [];
const articles = [];
const seen = new Set();

for (const sec of sections) {
	for (const a of sec.articles) {
		const where = `${a.slug ?? '(no slug)'}`;
		for (const k of ['slug', 'title', 'brief', 'sources', 'phase']) if (a[k] === undefined) errors.push(`${where}: missing "${k}"`);
		if (seen.has(a.slug)) errors.push(`${where}: duplicate slug`);
		seen.add(a.slug);
		if (a.slug !== sec.dir && !a.slug.startsWith(sec.dir + '/')) errors.push(`${where}: not inside section "${sec.dir}"`);
		for (const s of a.sources ?? []) if (!sourceIds.has(s)) errors.push(`${where}: unknown source id "${s}"`);
		for (const q of a.missing ?? []) if (/^Q-\d+$/.test(q) && !questionIds.has(q)) errors.push(`${where}: unknown open question ${q}`);
		if (!(a.phase >= 4 && a.phase <= 9)) errors.push(`${where}: phase must be 4–9`);
		const row = {
			...a,
			section: sec,
			needs: a.needs ?? [],
			missing: a.missing ?? [],
			research: a.research ?? (a.sources?.length ? 'sources found' : '—'),
			writing: a.writing ?? '—',
			verified: a.verified ?? '—',
			built: a.built ?? '—',
		};
		for (const [k, allowed] of Object.entries(STATUS)) if (!allowed.includes(row[k])) errors.push(`${where}: bad ${k} "${row[k]}"`);
		articles.push(row);
	}
}

// `needs` must point at real articles and must not loop.
const bySlug = new Map(articles.map((a) => [a.slug, a]));
for (const a of articles) for (const n of a.needs) if (!bySlug.has(n)) errors.push(`${a.slug}: needs unknown slug "${n}"`);
const state = new Map();
const visit = (slug, trail) => {
	if (state.get(slug) === 'done') return;
	if (state.get(slug) === 'active') return errors.push(`needs cycle: ${[...trail, slug].join(' → ')}`);
	state.set(slug, 'active');
	for (const n of bySlug.get(slug)?.needs ?? []) visit(n, [...trail, slug]);
	state.set(slug, 'done');
};
for (const a of articles) visit(a.slug, []);

// Pages on disk and pages in the matrix must agree.
const docsDir = path.join(root, 'src/content/docs');
const fileFor = (slug) =>
	[`${slug}.mdx`, `${slug}.md`, `${slug}/index.mdx`, `${slug}/index.md`].find((f) => fs.existsSync(path.join(docsDir, f)));
for (const a of articles) {
	const exists = Boolean(fileFor(a.slug));
	if (a.built !== '—' && !exists) errors.push(`${a.slug}: marked "${a.built}" but no page file exists`);
	if (a.built === '—' && exists) errors.push(`${a.slug}: page file exists but built is "—"`);
}
const walk = (dir) =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
for (const f of walk(docsDir).filter((f) => /\.mdx?$/.test(f))) {
	const slug = path.relative(docsDir, f).replace(/\\/g, '/').replace(/(\/index)?\.mdx?$/, '');
	if (slug === 'index' || slug === 'about' || slug.startsWith('about/')) continue;
	if (!bySlug.has(slug)) errors.push(`src/content/docs/${path.relative(docsDir, f)}: page has no entry in docs/coverage.yaml`);
}

if (errors.length) {
	console.error(`docs/coverage.yaml: ${errors.length} problem(s)\n- ` + errors.join('\n- '));
	process.exit(1);
}

// Render the tracker.
const cell = (s) => String(s).replace(/\|/g, '\\|');
const count = (k, v) => articles.filter((a) => a[k] === v).length;
let md = `_Generated from \`docs/coverage.yaml\` by \`npm run coverage\`. Edit the YAML, not these tables._\n\n`;
md += `**${articles.length} pages planned** · written: ${count('writing', 'written')} · drafts: ${count('writing', 'draft')} · verified: ${count('verified', 'verified')} · published: ${count('built', 'published') + count('built', 'tested')} · page stubs: ${count('built', 'page stub')}\n\n`;
md += `| Phase | Pages |\n|---|---|\n`;
for (const p of [4, 5, 6, 7, 8, 9]) md += `| ${p} | ${articles.filter((a) => a.phase === p).length} |\n`;
for (const sec of sections) {
	const rows = articles.filter((a) => a.section === sec);
	md += `\n### ${sec.title}\n\n| Article | Sources | Research | Writing | Verification | Implementation | Missing information |\n|---|---|---|---|---|---|---|\n`;
	for (const a of rows) {
		md += `| ${cell(a.title)} <br>\`/${a.slug}/\` · phase ${a.phase} | ${a.sources.length ? a.sources.map((s) => `\`${s}\``).join(', ') : '—'} | ${a.research} | ${a.writing} | ${a.verified} | ${a.built} | ${a.missing.length ? cell(a.missing.join('; ')) : ''} |\n`;
	}
}

const START = '<!-- coverage:start -->';
const END = '<!-- coverage:end -->';
const progress = read('docs/progress.md');
const i = progress.indexOf(START);
const j = progress.indexOf(END);
if (i < 0 || j < 0) {
	console.error('docs/progress.md is missing the coverage markers');
	process.exit(1);
}
const next = progress.slice(0, i + START.length) + '\n' + md + progress.slice(j);
if (checkOnly) {
	if (next !== progress) {
		console.error('docs/progress.md is out of date: run `npm run coverage`');
		process.exit(1);
	}
} else fs.writeFileSync(path.join(root, 'docs/progress.md'), next);
console.log(`coverage ok: ${articles.length} pages in ${sections.length} sections`);
