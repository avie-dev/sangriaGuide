// Builds src/data/class-details.json from the official class pages in research/text/en/classes_*.md.
// The class pages are in Portuguese even under /en/, so attribute names stay in Portuguese here;
// src/data/attribute-names.yaml maps them to English for display.
//
// Also reports every "Total" that doesn't equal the sum of Base + Evolutions I–III, because the
// official pages contain a few such inconsistencies. Run: node research/class-data.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));

const ID = { despertado: 'awakened', lamuerte: 'la-muerte' };
const SOURCE = (f) => 'class-' + f;
const lines = (t) => t.split('\n').map((l) => l.trim()).filter(Boolean);
const section = (ls, head) => {
	const i = ls.findIndex((l) => l === head);
	if (i < 0) return [];
	const j = ls.findIndex((l, k) => k > i && /^## /.test(l));
	return ls.slice(i + 1, j < 0 ? undefined : j);
};
const num = (v) => {
	const m = v.match(/^([+-])(\d+(?:[.,]\d+)?)(%?)$/);
	return m ? { n: (m[1] === '-' ? -1 : 1) * parseFloat(m[2].replace(',', '.')), pct: !!m[3] } : null;
};
// "Evolução IIniciado" is Evolution I titled "Iniciado", so the numeral is only accepted when what
// follows it is empty, an evolution title, or "Ambas as armas" (both weapons).
function stageOf(l, titles) {
	if (l === 'Base') return { stage: 'Base', label: null };
	if (l === 'Total' || l === 'Total máximo') return { stage: 'Total', label: null };
	if (!l.startsWith('Evolução ')) return null;
	const rest = l.slice('Evolução '.length);
	for (const k of ['III', 'II', 'I']) {
		const label = rest.slice(k.length);
		if (rest.startsWith(k) && (label === '' || label === 'Ambas as armas' || titles.includes(label))) return { stage: k, label: label || null };
	}
	throw new Error('Unrecognised stage line: ' + l);
}

function parseAttributes(block, titles) {
	const groups = [];
	let g = null;
	let st = null;
	const newGroup = (name) => {
		g = { name, stages: [] };
		groups.push(g);
	};
	for (let i = 0; i < block.length; i++) {
		const l = block[i];
		if (l.startsWith('What each class weapon adds') ) continue;
		if (l.startsWith('### ')) {
			newGroup(l.slice(4));
			continue;
		}
		const m = stageOf(l, titles);
		if (m) {
			if (!g) newGroup(null);
			st = { ...m, attrs: [] };
			g.stages.push(st);
			continue;
		}
		if (!st) continue;
		const next = block[i + 1];
		if (next && num(next)) {
			st.attrs.push({ name: l, value: next });
			i++;
		} else st.attrs.push({ name: l, flag: true });
	}
	return groups;
}

function checkTotals(id, groups, problems) {
	for (const g of groups) {
		const total = g.stages.find((s) => s.stage === 'Total');
		if (!total) continue;
		const parts = g.stages.filter((s) => s.stage !== 'Total');
		for (const a of total.attrs.filter((a) => !a.flag)) {
			const t = num(a.value);
			const sum = parts.flatMap((s) => s.attrs).filter((x) => x.name === a.name && !x.flag).reduce((s, x) => s + num(x.value).n, 0);
			if (Math.abs(sum - t.n) > 1e-9) problems.push(`${id}${g.name ? ' / ' + g.name : ''}: ${a.name} total ${a.value} but Base+I+II+III = ${sum}${t.pct ? '%' : ''}`);
		}
		for (const s of parts)
			for (const a of s.attrs.filter((a) => !a.flag))
				if (!total.attrs.some((x) => x.name === a.name))
					problems.push(`${id}${g.name ? ' / ' + g.name : ''}: ${a.name} appears in ${s.stage} but not in Total`);
	}
}

const out = {};
const problems = [];
for (const f of fs.readdirSync('text/en').filter((f) => f.startsWith('classes_'))) {
	const slug = f.replace(/^classes_|\.md$/g, '');
	const id = ID[slug] ?? slug;
	const ls = lines(fs.readFileSync('text/en/' + f, 'utf8').split('\n## On this page')[0] + '\n## End');
	const after = (label) => {
		const i = ls.indexOf(label);
		return i < 0 ? null : ls[i + 1];
	};
	const tagline = ls[ls.findIndex((l) => l.startsWith('# ')) - 1];
	const evo = section(ls, '## Evolutions')
		.filter((l) => /^\|Evo /.test(l))
		.map((l) => {
			const [grade, title, journey, tribute] = l.split('|').slice(1, 5).map((x) => x.trim());
			return { grade: grade.replace('Evo ', ''), title, journey, tribute: Number(tribute.replace(/\./g, '')) };
		});
	const defaults = section(ls, '## Default attributes')
		.filter((l) => l.startsWith('|') && !l.startsWith('|Weapon mastery'))
		.map((l) => l.split('|').slice(1, 3).map((x) => x.trim()));
	const cmds = [];
	const cs = section(ls, '## Commands');
	for (const l of cs) {
		const m = l.match(/^`([^`]+)`(.*)$/);
		if (m) cmds.push({ cmd: m[1], ptDescription: m[2].trim() });
	}
	// The sidebar runs the Master's name into their epithet: "Lady Aria BastienA Lança Alugada da Luz".
	const h1 = ls.find((l) => l.startsWith('# ')).slice(2).replace(/\s/g, '');
	const mentorLine = after('Mentor');
	const cut = mentorLine ? mentorLine.indexOf(h1) + h1.length : -1;
	const groups = parseAttributes(section(ls, '## Attributes by weapon'), evo.map((e) => e.title));
	checkTotals(id, groups, problems);
	const prof = ls.find((l) => l.startsWith('Scaling profile'));
	const benefits = ls.find((l) => l.startsWith('Benefits from'));
	const notUsed = ls.find((l) => l.startsWith("Doesn't use"));
	const split = (s, p) => (s ? s.slice(p.length).split(/(?=Poder|Crítico|Chance|Velocidade|Eficiência|Vida|Dano)/).map((x) => x.trim()).filter(Boolean) : []);
	out[id] = {
		source: SOURCE(slug),
		tagline,
		profile: prof ? prof.replace('Scaling profile', '') : null,
		benefitsFrom: split(benefits, 'Benefits from'),
		doesNotUse: split(notUsed, "Doesn't use"),
		mentorEpithet: mentorLine && cut > h1.length - 1 ? mentorLine.slice(cut).trim() : null,
		unlockJourney: after('Unlock'),
		evolutions: evo,
		attributes: groups,
		defaultAttributes: { mastery: defaults.map((d) => d[0]), blood: defaults.map((d) => d[1]) },
		commands: cmds,
	};
}
fs.writeFileSync('../src/data/class-details.json', JSON.stringify(out, null, '\t') + '\n');
console.log(`class-details.json: ${Object.keys(out).length} classes`);
if (problems.length) {
	console.log(`\n${problems.length} inconsistencies in the official class pages:`);
	for (const p of problems) console.log('  - ' + p);
}
