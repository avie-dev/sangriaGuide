// Source audit (Phase 9). Checks every wiki page against the official text snapshots in research/text/.
//
//   node scripts/audit.mjs           writes docs/audit-report.md, exits 1 on hard failures
//   node scripts/audit.mjs --quiet   same, prints only the summary
//
// Hard failures (the build of trust breaks):
//   - a command shown on a page that doesn't appear in any official source
//   - a page with an <Unverified> block but no `verify` label
//   - a page still marked `status: planned`
//   - a number not found in the page's sources and not explained in docs/audit-allowlist.yaml
// Reported for information:
//   - numbers found only in a source the page doesn't cite (add the source)
//   - official sources no page cites
//
// Needs research/text/ (run `npm run research` first if it's missing; it's gitignored).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const quiet = process.argv.includes('--quiet');
const TEXT = path.join(root, 'research/text');
if (!fs.existsSync(TEXT)) {
	console.error('research/text/ is missing. Run `npm run research` first.');
	process.exit(2);
}

// ---------- Source texts ----------
const sources = JSON.parse(fs.readFileSync(path.join(root, 'src/data/official-sources.json'), 'utf8'));
const HUB_FILES = { home: ['en.md'], 'class-hub': ['en_classes.md'], 'guides-hub': ['en_guias.md'], 'community-guides': ['en_guias_comunidade.md'], builds: ['en_builds.md'], interface: ['en_interface.md'], 'vip-page': ['en_vip.md'] };
const filesFor = (id) => {
	if (HUB_FILES[id]) return HUB_FILES[id];
	if (id.startsWith('class-')) {
		const s = id.slice(6);
		return [`en/classes_${s}.md`, `pt/classes_${s}.md`];
	}
	return [`en/guias_${id}.md`, `en-chat/guias_${id}.md`, `pt/guias_${id}.md`];
};
const textOf = new Map();
for (const s of sources) {
	const parts = filesFor(s.id)
		.map((f) => path.join(TEXT, f))
		.filter((f) => fs.existsSync(f))
		.map((f) => fs.readFileSync(f, 'utf8'));
	if (!parts.length) throw new Error(`No text snapshot for source "${s.id}"`);
	textOf.set(s.id, parts.join('\n'));
}
const allText = [...textOf.values()].join('\n');

// ---------- Numbers ----------
// Normalise "22,760" / "22.760" (thousands) and "0,35" (PT decimal) to plain JS numbers.
const NUM = /(?<![\w.,-])(\d{1,3}(?:[.,]\d{3})+|\d+(?:[.,]\d+)?)(?![\w])/g;
const toNumber = (tok) => {
	if (/^\d{1,3}(?:[.,]\d{3})+$/.test(tok)) return Number(tok.replace(/[.,]/g, ''));
	return Number(tok.replace(',', '.'));
};
const numbersIn = (text) => {
	const out = new Set();
	for (const m of text.matchAll(NUM)) out.add(toNumber(m[1]));
	return out;
};
// Some PT tokens like "1.5" are ambiguous; index both readings for the sources.
const sourceNumbers = new Map();
for (const [id, t] of textOf) {
	const set = numbersIn(t);
	for (const m of t.matchAll(/\b(\d)[.,](\d{3})\b/g)) set.add(Number(`${m[1]}.${m[2]}`));
	// Numbers with a unit glued on ("1,8s", "1,65m", "12h") or a sign ("-40%", "+160%").
	for (const m of t.matchAll(/(?<![\w.,])(\d+(?:[.,]\d+)?)(?=[a-zA-Z])/g)) set.add(toNumber(m[1]));
	for (const m of t.matchAll(/[-+−](\d{1,3}(?:[.,]\d{3})+|\d+(?:[.,]\d+)?)/g)) set.add(toNumber(m[1]));
	// Durations like "1h14" → 74 minutes, "1h30" → 90, "3h" → 180.
	for (const m of t.matchAll(/\b(\d+)h(\d{2})?\b/g)) set.add(Number(m[1]) * 60 + Number(m[2] ?? 0));
	sourceNumbers.set(id, set);
}
const anySource = new Set([...sourceNumbers.values()].flatMap((s) => [...s]));

// What a page says, minus things that aren't claims: code fences, imports, link targets, ids,
// open-question numbers, dates, ordered-list markers, heading anchors and component props that
// are data references.
function claimText(body) {
	return body
		.replace(/^import .*$/gm, '')
		.replace(/^export .*$/gm, '')
		.replace(/\]\([^)]*\)/g, ']')
		.replace(/href=\{?["'`][^"'`]*["'`]\}?/g, '')
		.replace(/\b(id|q|source|type|slot|order|tier|from|to)=["'{][^"'}]*["'}]/g, '')
		.replace(/\bQ-\d{3}\b/g, '')
		.replace(/\b\d{4}-\d{2}-\d{2}\b/g, '')
		.replace(/\b\d{2}\/\d{2}\/\d{4}\b/g, '')
		.replace(/^\s*\d+\.\s/gm, '')
		// Positions, not claims: walkthrough stage numbers, prestige positions in the official
		// ordered buff list ("prestige 14", "prestiges 2–19"), and row numbers in the first table cell.
		.replace(/\b[Ss]tages? \d+(?:\s*[–-]\s*\d+)?/g, '')
		.replace(/\b[Pp]restiges? \d+(?:\s*(?:[–-]|to|and|,)\s*\d+)*/g, '')
		.replace(/^\|\s*\d+\s*\|/gm, '|')
		.replace(/\b\d{1,2}:\d{2}\b/g, (t) => ` ${t.replace(':', ' ')} `);
}

// Numbers too generic to audit: 0–9 (counts, list items, ranks I–X). Everything ≥ 10, every
// decimal and every percentage is checked.
const auditable = (n, raw) => Number.isFinite(n) && (n >= 10 || /[.,]/.test(raw));

// ---------- Commands ----------
// Commands in sources: backticked strings starting with "." or "!".
const sourceCommands = new Set([...allText.matchAll(/`([.!][^`]+)`/g)].map((m) => m[1].trim()));
// A command shown on a page passes if a source shows it in code, mentions it in prose (short forms
// like "(.ar também funciona)"), or it's the start of a sourced command (e.g. `.tp criar` for
// `.tp criar casa`). File extensions in contributor docs aren't commands.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const knownCommand = (cmd) =>
	sourceCommands.has(cmd) ||
	new RegExp(`(^|[\\s(\`'"])${escapeRe(cmd)}(?![\\w-])`, 'm').test(allText) ||
	[...sourceCommands].some((c) => c.startsWith(cmd + ' '));
const NOT_COMMANDS = /^\.(mdx?|astro|tsx?|json|ya?ml|css|js|mjs)$/;
const commandsIn = (body) => {
	const out = new Set();
	for (const m of body.matchAll(/<Command\s+cmd=(["'])(.*?)\1/g)) out.add(m[2].trim());
	for (const m of body.matchAll(/`([.!][a-z][^`]*)`/gi)) out.add(m[1].trim());
	return out;
};

// ---------- Pages ----------
const DOCS = path.join(root, 'src/content/docs');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.mdx') ? [path.join(d, e.name)] : []));
const allow = parse(fs.readFileSync(path.join(root, 'docs/audit-allowlist.yaml'), 'utf8')) ?? {};

const findings = { numbers: [], elsewhere: [], commands: [], labels: [], planned: [] };
const cited = new Set();
let pages = 0;
let numbersChecked = 0;
let commandsChecked = 0;
for (const file of walk(DOCS).sort()) {
	pages++;
	const rel = path.relative(DOCS, file).replace(/\\/g, '/').replace(/\.mdx$/, '').replace(/\/index$/, ''); // the homepage stays "index"
	const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
	const [, fmText, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
	const fm = parse(fmText);
	(fm.sources ?? []).forEach((s) => cited.add(s));
	if (fm.status === 'planned') findings.planned.push(rel);
	// about/components demonstrates the components with examples, so it's exempt.
	if (/<Unverified\b/.test(body) && !(fm.labels ?? []).includes('verify') && rel !== 'about/components') findings.labels.push(rel);

	// Numbers: in the body and the description/summary.
	const pageSources = (fm.sources ?? []).filter((s) => sourceNumbers.has(s));
	const pageSet = new Set(pageSources.flatMap((s) => [...sourceNumbers.get(s)]));
	const allowed = new Set((allow[rel] ?? []).map((a) => Number(a.n)));
	const text = claimText(`${fm.description ?? ''}\n${fm.summary ?? ''}\n${body}`);
	const seen = new Set();
	for (const m of text.matchAll(NUM)) {
		const n = toNumber(m[1]);
		if (!auditable(n, m[1]) || seen.has(n)) continue;
		seen.add(n);
		numbersChecked++;
		if (pageSet.has(n) || allowed.has(n)) continue;
		const line = text.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ').trim();
		if (anySource.has(n)) findings.elsewhere.push({ page: rel, n, line });
		else findings.numbers.push({ page: rel, n, line });
	}

	for (const cmd of commandsIn(body)) {
		if (NOT_COMMANDS.test(cmd)) continue;
		commandsChecked++;
		if (!knownCommand(cmd)) findings.commands.push({ page: rel, cmd });
	}
}
const uncited = sources.map((s) => s.id).filter((id) => !cited.has(id));

// ---------- Report ----------
const hard = findings.numbers.length + findings.commands.length + findings.labels.length + findings.planned.length;
const esc = (s) => String(s).replace(/\|/g, '\\|');
let md = `# Source audit report\n\n_Generated by \`node scripts/audit.mjs\`. Don't edit by hand._\n\n`;
md += `**${pages} pages** · ${numbersChecked} numbers and ${commandsChecked} commands checked against ${sources.length} official sources.\n\n`;
md += `| Check | Result |\n|---|---|\n`;
md += `| Numbers not in any official source (and not explained in \`docs/audit-allowlist.yaml\`) | ${findings.numbers.length} |\n`;
md += `| Commands not found in any official source | ${findings.commands.length} |\n`;
md += `| Pages with unverified claims but no \`verify\` label | ${findings.labels.length} |\n`;
md += `| Pages still marked planned | ${findings.planned.length} |\n`;
md += `| Numbers found only in a source the page doesn't cite (informational) | ${findings.elsewhere.length} |\n`;
md += `| Official sources no page cites | ${uncited.length} |\n\n`;
const section = (title, rows, head, fn) => {
	if (!rows.length) return;
	md += `## ${title}\n\n| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n`;
	for (const r of rows) md += `| ${fn(r).map(esc).join(' | ')} |\n`;
	md += '\n';
};
section('Numbers not in any source', findings.numbers, ['Page', 'Number', 'Context'], (r) => [r.page, r.n, r.line]);
section('Commands not found', findings.commands, ['Page', 'Command'], (r) => [r.page, '`' + r.cmd + '`']);
section('Missing verify label', findings.labels.map((p) => ({ p })), ['Page'], (r) => [r.p]);
section('Planned pages', findings.planned.map((p) => ({ p })), ['Page'], (r) => [r.p]);
section('Numbers from an uncited source', findings.elsewhere, ['Page', 'Number', 'Context'], (r) => [r.page, r.n, r.line]);
if (uncited.length) md += `## Uncited sources\n\n${uncited.map((s) => `- \`${s}\``).join('\n')}\n`;
fs.writeFileSync(path.join(root, 'docs/audit-report.md'), md);

const summary = `audit: ${pages} pages, ${numbersChecked} numbers, ${commandsChecked} commands · unexplained numbers ${findings.numbers.length} · unknown commands ${findings.commands.length} · missing verify labels ${findings.labels.length} · planned ${findings.planned.length} · uncited-source numbers ${findings.elsewhere.length} · uncited sources ${uncited.length}`;
console.log(summary);
if (!quiet && hard) console.log('See docs/audit-report.md');
process.exit(hard ? 1 : 0);
