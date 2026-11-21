// Builds research/sources.json, research/source-inventory.md and src/data/official-sources.json
// from the text snapshots in research/text/.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const BASE = 'https://www.sangriafalls.com';
const RETRIEVED = '2026-11-22';
const ptWords = /\b(você|não|são|também|seu|sua|até|então|pelo|quando|está|para o|com o|uma|dano)\b/gi;
const enWords = /\b(you|the|and|your|with|when|this|that|each|from)\b/gi;
const lang = (t) => {
	const p = (t.match(ptWords) || []).length;
	const e = (t.match(enWords) || []).length;
	return p > e ? 'pt' : p > e * 0.25 ? 'mixed' : 'en';
};
const bodyOf = (t) => t.split('\n## On this page')[0];
const sectionsOf = (body) => [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const CATEGORY_FIX = { referência: 'Reference' };

const out = [];
for (const f of fs.readdirSync('text/en').filter((f) => f.endsWith('.md'))) {
	const file = f.replace('.md', '');
	const t = fs.readFileSync('text/en/' + f, 'utf8');
	const [kind, ...rest] = file.split('_');
	const s = rest.join('/');
	const path = kind === 'guias' ? `/guias/${s}/` : `/classes/${s}/`;
	const title = (t.match(/^# (.+)$/m) || [])[1]?.trim();
	const crumb = t.split('\n').find((l) => /^(Guide|Guias) ·/.test(l));
	const rawCat = crumb ? crumb.split('·')[1].trim() : 'Classes';
	const lines = t.split('\n');
	const ti = lines.findIndex((l) => l.startsWith('# '));
	const summary = lines.slice(ti + 1).find((l) => l.trim() && !l.startsWith('-') && !l.startsWith('#'))?.trim();
	const body = bodyOf(t);
	const chat = fs.existsSync('text/en-chat/' + f);
	out.push({
		id: kind === 'guias' ? s : 'class-' + s,
		title,
		category: CATEGORY_FIX[rawCat] ?? rawCat,
		kind: kind === 'guias' ? 'guide' : 'class',
		summary,
		url_en: BASE + '/en' + path,
		url_pt: BASE + path,
		url_en_chat: chat ? BASE + '/en' + path + 'sem-interface/' : null,
		content_language: lang(body),
		words: body.split(/\s+/).length,
		sections: sectionsOf(body),
		retrieved: RETRIEVED,
	});
}

const hubs = [
	['home', '/', 'Sangria Falls home', 'en'],
	['guides-hub', '/guias/', 'Guides directory', 'en_guias'],
	['class-hub', '/classes/', 'Classes hub', 'en_classes'],
	['interface', '/interface/', 'Install the interface', 'en_interface'],
	['community-guides', '/guias/comunidade/', 'Community Guides', 'en_guias_comunidade'],
	['builds', '/builds/', 'Builds gallery', 'en_builds'],
	['vip-page', '/vip/', 'VIP (support page)', 'en_vip'],
];
for (const [id, p, title, file] of hubs) {
	const body = bodyOf(fs.readFileSync('text/' + file + '.md', 'utf8'));
	out.push({
		id, title, category: 'Hubs', kind: 'hub', summary: '',
		url_en: BASE + '/en' + p, url_pt: BASE + p, url_en_chat: null,
		content_language: lang(body), words: body.split(/\s+/).length, sections: sectionsOf(body), retrieved: RETRIEVED,
	});
}

const order = ['Start', 'Character', 'Companions', 'Professions', 'Events', 'Economy', 'World', 'Community & account', 'Reference', 'Classes', 'Hubs'];
const unknown = out.filter((o) => !order.includes(o.category));
if (unknown.length) throw new Error('Uncategorised: ' + unknown.map((o) => o.id).join(', '));
out.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || a.title.localeCompare(b.title));
fs.writeFileSync('sources.json', JSON.stringify(out, null, 2) + '\n');

const cell = (s) => String(s ?? '').replace(/\|/g, '/');
let md = '';
for (const c of order) {
	const g = out.filter((o) => o.category === c);
	md += `\n### ${c} (${g.length})\n\n| Id | Page | Summary | Sections | Words | Lang | Chat-only variant |\n|---|---|---|---|---|---|---|\n`;
	for (const o of g)
		md += `| \`${o.id}\` | [${cell(o.title)}](${o.url_en}) · [PT](${o.url_pt}) | ${cell(o.summary)} | ${cell(o.sections.join('; '))} | ${o.words} | ${o.content_language} | ${o.url_en_chat ? `[yes](${o.url_en_chat})` : 'no'} |\n`;
}
fs.writeFileSync('source-inventory.md', fs.readFileSync('inventory-intro.md', 'utf8') + md);

// Source registry used by the site (<Sources /> and the About › Sources page).
const registry = out.map(({ id, title, category, kind, url_en, url_pt, url_en_chat, content_language, retrieved }) => ({
	id, title, category, kind, url_en, url_pt, url_en_chat, content_language, retrieved,
}));
fs.writeFileSync('../src/data/official-sources.json', JSON.stringify(registry, null, 2) + '\n');

console.log(`${out.length} sources, ${out.reduce((a, o) => a + o.words, 0)} words`);
