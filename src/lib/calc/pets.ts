// Pet upgrade calculator. Published: each tier raise costs 1 soul of the pet itself, plus
// sacrificed souls from its act (T2 1, T3 2, T4 4, T5 8); Cristais cap at +2 per tier; up to
// 5 attributes; 1 Cristal per attempt. The evolve success chance is NOT published, so only the
// minimum Cristals (every attempt succeeding) can be given.
import { k, type Constants } from './constants.ts';

export interface PetTierCost {
	ownSouls: number;
	sacrificedSouls: number;
	perTier: { tier: number; ownSouls: number; sacrificedSouls: number }[];
}

export function tierCost(c: Constants, fromTier: number, toTier: number): PetTierCost {
	if (!(Number.isInteger(fromTier) && Number.isInteger(toTier) && 0 <= fromTier && fromTier <= toTier && toTier <= 5))
		throw new RangeError('Tiers must satisfy 0 ≤ from ≤ to ≤ 5');
	const perTier = [];
	for (let t = fromTier + 1; t <= toTier; t++)
		perTier.push({ tier: t, ownSouls: k(c, 'pet-own-souls-per-tier'), sacrificedSouls: k(c, `pet-sacrifice-t${t}`) });
	return {
		ownSouls: perTier.reduce((s, r) => s + r.ownSouls, 0),
		sacrificedSouls: perTier.reduce((s, r) => s + r.sacrificedSouls, 0),
		perTier,
	};
}

export function crystalCap(c: Constants, tier: number): number {
	return Math.max(0, Math.min(5, Math.floor(tier))) * k(c, 'pet-crystal-cap-per-tier');
}

export interface CrystalPlan {
	cap: number;
	/** Target levels after applying the tier cap. */
	targets: number[];
	cappedAttributes: number;
	/** Cristals needed if every attempt succeeds (the real number is higher; the chance isn't published). */
	minimumCristais: number;
}

/** `current` and `target` are per-attribute levels (at most 5 attributes). */
export function crystalPlan(c: Constants, tier: number, current: number[], target: number[]): CrystalPlan {
	const max = k(c, 'pet-crystal-max-attributes');
	if (target.length > max) throw new RangeError(`A pet has at most ${max} attributes`);
	const cap = crystalCap(c, tier);
	let capped = 0;
	let min = 0;
	const targets = target.map((t, i) => {
		const want = Math.max(0, Math.floor(t));
		const got = Math.min(want, cap);
		if (got < want) capped++;
		min += Math.max(0, got - Math.max(0, Math.floor(current[i] ?? 0)));
		return got;
	});
	return { cap, targets, cappedAttributes: capped, minimumCristais: min };
}
