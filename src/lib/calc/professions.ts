// Gathering income. Published: Ourosangue per action at prestige 0 and the bonus per prestige
// (Miner 25 +10%, Fisher 70 +15%, Woodcutter 10 +10%). Actions per hour are NOT published
// (Q-012), so the player supplies them; nothing here guesses a rate.
import { k, round2, type Constants } from './constants.ts';

export type Gatherer = 'miner' | 'fisher' | 'woodcutter';
export const GATHERERS: Gatherer[] = ['miner', 'fisher', 'woodcutter'];

export function payPerAction(c: Constants, trade: Gatherer, prestige: number): number {
	const p = Math.min(Math.max(0, Math.floor(prestige)), k(c, 'profession-max-prestige'));
	return round2(k(c, `${trade}-pay`) * (1 + k(c, `${trade}-pay-per-prestige`) * p));
}

export interface GatheringRow {
	trade: Gatherer;
	prestige: number;
	actionsPerHour: number;
	payPerAction: number;
	perHour: number;
	/** Extra resources from prestige, as the guide states them. */
	extra: string;
}

export function gatheringIncome(c: Constants, trade: Gatherer, prestige: number, actionsPerHour: number): GatheringRow {
	const p = Math.min(Math.max(0, Math.floor(prestige)), k(c, 'profession-max-prestige'));
	const pay = payPerAction(c, trade, p);
	const a = Math.max(0, actionsPerHour);
	const extra =
		trade === 'fisher'
			? `+${Math.floor(p / 2)} fish per catch (dropped on the ground)`
			: `+${p * 5}% extra ${trade === 'miner' ? 'ore' : 'wood'}, rounded up`;
	return { trade, prestige: p, actionsPerHour: a, payPerAction: pay, perHour: round2(pay * a), extra };
}
