// Builds src/data/commands.json from the official commands page (research/text/en/guias_comandos.md,
// which is in Portuguese even under /en/) and the "Quick commands" lists of the English chat-only
// guides (research/text/en-chat/*.md).
//
// Each command keeps the exact syntax and Portuguese description from the commands page. When an
// English guide lists the very same command, its English description is attached. Commands are never
// translated. Run: node research/commands-data.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));

// Commands-page section → source id of the guide it belongs to.
const SECTION_SOURCE = {
	'Primeiros passos': 'primeiros-passos',
	'Nível e Prestígio': 'nivel-e-prestigio',
	'Maestria de Arma': 'maestria-de-arma',
	'Linhagem Sanguínea': 'linhagem-de-sangue',
	'Auto-Prestígio': 'auto-prestigio',
	'Pulsos, Transfusões e Plasmas': 'transfusao-e-plasmas',
	Meditação: 'meditacao',
	Classes: 'classes',
	'Sala de Treinamento': 'sala-de-treinamento',
	Perfil: 'perfil',
	Rankings: 'rankings',
	Pets: 'pets',
	Sangrulhos: 'sangrulhos',
	Prisioneiros: 'prisioneiros',
	Profissões: 'profissoes',
	'Ofícios: Ferreiro, Alfaiate e Encantador': 'oficios-ferreiro-alfaiate-encantador',
	'Coleta: Minerador, Pescador e Lenhador': 'coleta-minerador-pescador-lenhador',
	'Serviços de profissão': 'servicos-de-profissao',
	Aquário: 'aquario',
	Masmorras: 'masmorras',
	'Arena Ilusional': 'arena-ilusional',
	'Torre dos Imortais': 'torre-dos-imortais',
	'Ruptura da Realidade': 'ruptura-da-realidade',
	'Julgamento de Goreswine': 'julgamento-de-goreswine',
	'Quadro de grupos': 'quadro-de-grupos',
	'Incursões às Fendas': 'incursoes',
	'Caçada de V Bloods': 'cacada-de-v-bloods',
	'Escolas Vampíricas': 'escolas',
	Banco: 'banco',
	Cofre: 'cofre',
	Mercado: 'mercado',
	Contratos: 'contratos',
	'Mercador Sombrio': 'mercador-sombrio',
	Cassino: 'cassino',
	'Recompensa Online': 'recompensa-online',
	Missões: 'missoes',
	Conquistas: 'conquistas',
	Façanhas: 'facanhas',
	'O Livro Perdido': 'livro-perdido',
	'Postos Avançados': 'postos-avancados',
	Teleportes: 'teleportes',
	Castelo: 'castelo',
	Móveis: 'moveis',
	Clã: 'clan',
	Casamento: 'casamento',
	Correio: 'correio',
	VIP: 'vip',
	'Passe de Batalha': 'passe-de-batalha',
};

const CMD_LINE = /^`([^`]+)`(.*)$/;

// English descriptions from the chat-only guides' "Quick commands" lists, keyed by guide.
// A command takes the description from its own system's guide first, then from any other guide.
const english = new Map(); // cmd -> Map(sourceId -> description)
for (const f of fs.readdirSync('text/en-chat')) {
	const sourceId = f.replace(/^guias_|\.md$/g, '');
	const t = fs.readFileSync('text/en-chat/' + f, 'utf8');
	const block = t.split('## Quick commands')[1]?.split('## On this page')[0];
	if (!block) continue;
	for (const l of block.split('\n').map((x) => x.trim())) {
		const m = l.match(CMD_LINE);
		if (!m || !m[2].trim()) continue;
		if (!english.has(m[1])) english.set(m[1], new Map());
		english.get(m[1]).set(sourceId, m[2].trim());
	}
}
const englishFor = (cmd, source) => {
	const byGuide = english.get(cmd);
	return byGuide ? (byGuide.get(source) ?? byGuide.values().next().value) : undefined;
};

const sources = JSON.parse(fs.readFileSync('../src/data/official-sources.json', 'utf8'));
const titleOf = (id) => sources.find((s) => s.id === id)?.title ?? id;

const out = [];
let section = null;
const lines = fs.readFileSync('text/en/guias_comandos.md', 'utf8').split('## On this page')[0].split('\n').map((x) => x.trim());
for (const l of lines) {
	const h = l.match(/^## (.+)$/);
	if (h) {
		section = h[1];
		if (!(section in SECTION_SOURCE)) throw new Error('Unknown commands section: ' + section);
		continue;
	}
	const m = l.match(CMD_LINE);
	if (!m || !section) continue;
	const source = SECTION_SOURCE[section];
	out.push({
		cmd: m[1],
		system: titleOf(source),
		source,
		pt: m[2].trim(),
		...(englishFor(m[1], source) ? { en: englishFor(m[1], source) } : {}),
	});
}
fs.writeFileSync('../src/data/commands.json', JSON.stringify(out, null, '\t') + '\n');
console.log(`commands.json: ${out.length} commands in ${new Set(out.map((c) => c.system)).size} systems, ${out.filter((c) => c.en).length} with an English description`);
