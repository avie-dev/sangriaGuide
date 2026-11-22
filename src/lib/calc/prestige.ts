// Prestige cost calculator. The official guide publishes only the 1st prestige (75), the 20th
// (4,467) and the total for all 20 (22,760). Costs "rise with each prestige", so every unpublished
// cost (prestiges 2–19) lies between the first and the last, and together they sum to
// 22,760 − 75 − 4,467 = 18,218. From that we can give the exact cost of a range when it only uses
// published figures, and otherwise the tightest bounds those three facts allow. Nothing else is
// assumed: no curve is fitted (see open question Q-017).
import { k, type Constants } from './constants.ts';

export interface PrestigeCost {
	/** Exact cost, when the range only involves published figures. */
	exact: number | null;
	/** Lower and upper bound (equal to `exact` when it's known). */
	min: number;
	max: number;
	/** How many of the prestiges in the range have unpublished individual costs. */
	unknown: number;
}

/**
 * Cost of going from `from` prestiges to `to` prestiges (0 ≤ from ≤ to ≤ 20).
 * `freeFirst` drops the 1st prestige's cost (weapon and blood: Vlad Parker does it for free).
 */
export function prestigeCost(c: Constants, from: number, to: number, freeFirst = false): PrestigeCost {
	const first = k(c, 'prestige-first');
	const last = k(c, 'prestige-last');
	const total = k(c, 'prestige-total');
	const count = k(c, 'prestige-count');
	if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to > count || from > to)
		throw new RangeError(`Prestige range must satisfy 0 ≤ from ≤ to ≤ ${count}`);

	const middleCount = count - 2; // prestiges 2..19
	const middleTotal = total - first - last;
	let known = 0;
	let unknown = 0;
	let before = 0; // unpublished prestiges below the range
	for (let p = 2; p <= Math.min(from, count - 1); p++) before++;
	for (let p = from + 1; p <= to; p++) {
		if (p === 1) known += freeFirst ? 0 : first;
		else if (p === count) known += last;
		else unknown++;
	}
	const after = middleCount - before - unknown; // unpublished prestiges above the range
	if (unknown === 0) return { exact: known, min: known, max: known, unknown };
	if (unknown === middleCount) return { exact: known + middleTotal, min: known + middleTotal, max: known + middleTotal, unknown };
	// Facts used: each unpublished cost is between `first` and `last`; all 18 sum to `middleTotal`;
	// and costs rise with each prestige, so any run of the lowest n unpublished costs averages at most
	// the overall average, and any run of the highest n averages at least that.
	const avg = middleTotal / middleCount;
	const min = Math.max(unknown * first, middleTotal - (middleCount - unknown) * last, (after + unknown) * avg - after * last);
	const max = Math.min(unknown * last, middleTotal - (middleCount - unknown) * first, (before + unknown) * avg - before * first);
	return { exact: null, min: known + Math.ceil(min), max: known + Math.floor(max), unknown };
}

export interface PrestigePlan {
	character: PrestigeCost;
	weapon: PrestigeCost;
	blood: PrestigeCost;
	total: PrestigeCost;
}

export interface TrackRange {
	from: number;
	to: number;
}

/** Character, weapon and blood prestige together; weapon and blood get the free first prestige. */
export function prestigePlan(
	c: Constants,
	character: TrackRange,
	weapon: TrackRange,
	blood: TrackRange,
	freeFirstWeaponAndBlood = true
): PrestigePlan {
	const ch = prestigeCost(c, character.from, character.to);
	const w = prestigeCost(c, weapon.from, weapon.to, freeFirstWeaponAndBlood);
	const b = prestigeCost(c, blood.from, blood.to, freeFirstWeaponAndBlood);
	const exact = ch.exact !== null && w.exact !== null && b.exact !== null ? ch.exact + w.exact + b.exact : null;
	return {
		character: ch,
		weapon: w,
		blood: b,
		total: { exact, min: ch.min + w.min + b.min, max: ch.max + w.max + b.max, unknown: ch.unknown + w.unknown + b.unknown },
	};
}
