// English names for the Portuguese attribute names used on the official class pages
// (src/data/class-details.json). Where the English guides already use a name (for example the
// prestige buffs in the Level and Prestige guide), that name is used; otherwise these are this
// wiki's translations. The components fail the build if a name has no entry here.
export const ATTRIBUTE_NAMES: Record<string, string> = {
	'Alcance do Ataque Básico': 'Basic Attack Range',
	'Chance de Acerto Crítico Físico': 'Physical Critical Strike Chance',
	'Chance de Acerto Crítico Mágico': 'Spell Critical Strike Chance',
	'Chance de Crítico Físico': 'Physical Critical Strike Chance',
	'Chance de Crítico Mágico': 'Spell Critical Strike Chance',
	'Crítico Físico': 'Physical Critical Strike',
	'Crítico Mágico': 'Spell Critical Strike',
	'Cura Recebida': 'Healing Received',
	'Dano Crítico Físico': 'Physical Critical Strike Damage',
	'Dano Crítico Mágico': 'Spell Critical Strike Damage',
	'Dano contra V Bloods': 'Damage against V Bloods',
	'Dano de Lacaios': 'Minion Damage',
	'Poder Físico': 'Physical Power',
	'Poder Mágico': 'Spell Power',
	'Poder Supremo': 'Ultimate Power',
	'Poder da Habilidade de Armas': 'Weapon Skill Power',
	'Poder de Acerto Crítico Físico': 'Physical Critical Strike Damage',
	'Poder de Acerto Crítico Mágico': 'Spell Critical Strike Damage',
	'Recarga da Suprema': 'Ultimate Cooldown',
	'Recarga de Feitiços': 'Spell Cooldown',
	'Recarga de Habilidades de Arma': 'Weapon Skill Cooldown',
	'Redução da Drenagem de Sangue': 'Blood Drain Reduction',
	'Redução de Dano': 'Damage Reduction',
	'Redução de Dano de Corrupção': 'Corruption Damage Reduction',
	'Resistência Física': 'Physical Resistance',
	'Resistência Mágica': 'Spell Resistance',
	'Roubo de Vida Mágico': 'Spell Life Leech',
	'Roubo de Vida Primário': 'Primary Attack Life Leech',
	'Sem Chance de Crítico Físico': 'No Physical Critical Strike Chance',
	'Sem Redução de Dano': 'No Damage Reduction',
	'Sem Resistência Física': 'No Physical Resistance',
	'Sem Resistência Mágica': 'No Spell Resistance',
	'Tempo de Recarga da Arma': 'Weapon Cooldown',
	'Velocidade das Habilidades de Arma': 'Weapon Skill Speed',
	'Velocidade de Ataque': 'Attack Speed',
	'Velocidade de Ataque Primário': 'Primary Attack Speed',
	'Velocidade de Habilidade': 'Ability Speed',
	'Velocidade de Habilidades': 'Ability Speed',
	'Velocidade de Movimento': 'Movement Speed',
	'Velocidade de Movimento em Forma Bestial': 'Movement Speed in Beast Form',
	'Velocidade de Recarga de Feitiços': 'Spell Cooldown Recovery',
	'Velocidade de Recarga do Véu': 'Veil Cooldown Recovery',
	'Vida Máxima': 'Max Health',
};

export function attributeName(pt: string): string {
	const en = ATTRIBUTE_NAMES[pt];
	if (!en) throw new Error(`No English name for attribute "${pt}" (add it to src/data/attribute-names.ts)`);
	return en;
}
