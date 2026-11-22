// Class evolution calculator. Published: evolutions cost 15,000 / 30,000 / 45,000 Ourosangue,
// switching to an unlocked class costs 3,000, unlocking a class (its Master's quest) makes it
// active for free, and three classes need evolutions in others first.
import { k, type Constants } from './constants.ts';

export interface ClassInfo {
	id: string;
	name: string;
	tributes: number[]; // [I, II, III]
	requires: { class: string; evolution: number }[];
	starting?: boolean;
}

/** Player state per class: -1 = locked, 0 = unlocked with no evolutions, 1–3 = evolution reached. */
export type ClassState = Record<string, number>;

export interface ClassStep {
	class: string;
	name: string;
	unlock: boolean;
	fromEvolution: number;
	toEvolution: number;
	tribute: number;
	switchCost: number;
	reason: string;
}

export interface ClassPlanResult {
	steps: ClassStep[];
	tributes: number;
	switches: number;
	switchCost: number;
	total: number;
	unlocks: number;
}

/**
 * Plan to reach `targetEvolution` (0 = just unlocked) in `targetClass`, including prerequisites.
 * Assumes you finish each class's evolutions before moving on, so a class you already own but
 * isn't active costs one switch, and unlocking a class makes it active at no cost.
 */
export function classPlan(c: Constants, classes: ClassInfo[], state: ClassState, active: string | null, targetClass: string, targetEvolution: number): ClassPlanResult {
	const byId = new Map(classes.map((x) => [x.id, x]));
	if (!byId.has(targetClass)) throw new Error(`Unknown class "${targetClass}"`);
	const need = new Map<string, { evo: number; reason: string }>();
	const want = (id: string, evo: number, reason: string) => {
		const prev = need.get(id);
		if (!prev || prev.evo < evo) need.set(id, { evo, reason });
		for (const r of byId.get(id)!.requires) want(r.class, r.evolution, `Required by ${byId.get(id)!.name}`);
	};
	want(targetClass, Math.max(0, Math.min(3, Math.floor(targetEvolution))), 'Your goal');

	const switchCost = k(c, 'class-switch-cost');
	const steps: ClassStep[] = [];
	let current = active;
	// Order: the class you're on first (no switch needed), then classes you still have to unlock
	// (unlocking makes them active for free), then owned-but-inactive ones, and the target last.
	const rank = (id: string) => (id === targetClass ? 3 : id === active ? 0 : (state[id] ?? -1) < 0 ? 1 : 2);
	const order = [...need.keys()].sort((a, b) => rank(a) - rank(b));
	for (const id of order) {
		const info = byId.get(id)!;
		const have = state[id] ?? -1;
		const { evo, reason } = need.get(id)!;
		if (have >= evo) continue;
		const unlock = have < 0;
		const from = Math.max(0, have);
		const tribute = info.tributes.slice(from, evo).reduce((s, t) => s + t, 0);
		const pay = !unlock && current !== id ? switchCost : 0;
		steps.push({ class: id, name: info.name, unlock, fromEvolution: from, toEvolution: evo, tribute, switchCost: pay, reason });
		current = id;
	}
	const tributes = steps.reduce((s, x) => s + x.tribute, 0);
	const switches = steps.filter((x) => x.switchCost > 0).length;
	return {
		steps,
		tributes,
		switches,
		switchCost: switches * switchCost,
		total: tributes + switches * switchCost,
		unlocks: steps.filter((x) => x.unlock).length,
	};
}
