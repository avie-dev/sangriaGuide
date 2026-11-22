// Build planner logic. It collects the published bonuses each source gives, per source, and
// never adds bonuses from different sources together: how they stack isn't documented (Q-009).
// Within one source the published figures are cumulative (e.g. a class's evolutions, the prestige
// buffs), so those are summed the way the official tables do.

export interface Attr {
	name: string;
	value: string; // "+12", "-20%", or "✓" for a flag such as "No Physical Critical Strike Chance"
}

export interface ClassGroup {
	name: string;
	/** Stages in order Base, I, II, III, each with English attribute names. */
	stages: { stage: string; attrs: Attr[] }[];
	/** The official page's "Total" column (= Base + I + II + III, except where the page is inconsistent). */
	total?: Attr[];
}

export interface PlannerClass {
	id: string;
	name: string;
	groups: ClassGroup[];
	benefitsFrom: string[];
	doesNotUse: string[];
	defaults: { mastery: string[]; blood: string[] };
}

export interface SourceBlock {
	source: string;
	attrs: Attr[];
	note?: string;
}

const parse = (v: string) => {
	const m = v.match(/^([+-])(\d+(?:\.\d+)?)(%?)$/);
	return m ? { n: (m[1] === '-' ? -1 : 1) * Number(m[2]), pct: m[3] === '%' } : null;
};
const show = (n: number, pct: boolean) => `${n >= 0 ? '+' : ''}${Math.round(n * 100) / 100}${pct ? '%' : ''}`;

/** Adds attribute lists *within one source*, keyed by name and unit. */
export function sumWithinSource(lists: Attr[][]): Attr[] {
	const order: string[] = [];
	const acc = new Map<string, { name: string; n: number; pct: boolean; flag: boolean }>();
	for (const list of lists)
		for (const a of list) {
			const p = parse(a.value);
			const key = p ? `${a.name}|${p.pct}` : `${a.name}|flag`;
			if (!acc.has(key)) {
				order.push(key);
				acc.set(key, { name: a.name, n: 0, pct: p?.pct ?? false, flag: !p });
			}
			if (p) acc.get(key)!.n += p.n;
		}
	return order.map((key) => {
		const x = acc.get(key)!;
		return { name: x.name, value: x.flag ? '✓' : show(x.n, x.pct) };
	});
}

/** A class group's bonuses at an evolution (0 = base only, 3 = all three evolutions). */
export function classBonus(group: ClassGroup, evolution: number): Attr[] {
	return sumWithinSource(group.stages.slice(0, Math.max(0, Math.min(3, evolution)) + 1).map((s) => s.attrs));
}

/**
 * At Evolution III, the official "Total" column, plus any attribute where it disagrees with the sum
 * of the grades (the class pages have a few such inconsistencies, Q-018 and Q-019). Below III, the
 * sum of the grades reached (the pages publish no partial totals).
 */
export function classBonusOfficial(group: ClassGroup, evolution: number): { attrs: Attr[]; mismatches: { name: string; published: string; summed: string }[] } {
	const summed = classBonus(group, evolution);
	if (evolution < 3 || !group.total) return { attrs: summed, mismatches: [] };
	const mismatches = group.total
		.map((t) => ({ name: t.name, published: t.value, summed: summed.find((x) => x.name === t.name)?.value ?? '—' }))
		.filter((m) => m.published !== m.summed);
	return { attrs: group.total, mismatches };
}

export interface Overlap {
	name: string;
	from: { source: string; value: string }[];
}

/** Attributes that appear in more than one source; listed, never added up. */
export function overlaps(blocks: SourceBlock[]): Overlap[] {
	const map = new Map<string, { source: string; value: string }[]>();
	for (const b of blocks)
		for (const a of b.attrs) {
			if (!map.has(a.name)) map.set(a.name, []);
			map.get(a.name)!.push({ source: b.source, value: a.value });
		}
	return [...map].filter(([, v]) => new Set(v.map((x) => x.source)).size > 1).map(([name, from]) => ({ name, from }));
}

/** Attributes in the build that the class page says the class doesn't use. */
export function unusedByClass(cls: PlannerClass, blocks: SourceBlock[]): string[] {
	const out = new Set<string>();
	for (const b of blocks)
		for (const a of b.attrs)
			if (cls.doesNotUse.some((d) => a.name === d || a.name.startsWith(d + ' '))) out.add(a.name);
	return [...out];
}
