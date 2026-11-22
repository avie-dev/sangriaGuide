// Pulse and Transfusion calculator. Published rules: 10 Pulses + 10,000 Ourosangue (8,000 VIP)
// per Transfusion, 10 plasmas each, at most 250; Transfusion 1 and each Lost Book chapter
// transfusion are sealed until you hear Nyxaris. Meditation time per Pulse uses the published
// level 1 → 90 time (about 74 minutes, 50 with VIP), so it's an estimate.
import { k, round2, type Constants } from './constants.ts';

export interface PulseInput {
	transfusionsDone: number;
	targetTransfusions: number;
	storedPulses: number;
	vip: boolean;
}

export interface PulseResult {
	transfusions: number;
	pulsesNeeded: number;
	pulsesLeftOver: number;
	ourosangue: number;
	plasmas: number;
	totalPlasmasAfter: number;
	meditationMinutes: number;
	meditationSangricoins: number;
	/** Transfusions in the range that are sealed (each needs an Echo or the First Transfusion quest). */
	sealed: number[];
	/** Achievement thresholds crossed (10 → Luminance, 30 → Thanatos, 250 → Kill Points). */
	milestones: { at: number; name: string }[];
}

const MILESTONES = [
	{ at: 10, name: 'Luminance achievement available' },
	{ at: 30, name: 'Thanatos achievement available' },
	{ at: 250, name: 'Pulses end; Kill Points begin' },
];

export function pulsePlan(c: Constants, chapterTransfusions: readonly number[], input: PulseInput): PulseResult {
	const max = k(c, 'transfusion-max');
	const per = k(c, 'pulses-per-transfusion');
	const done = clamp(Math.floor(input.transfusionsDone), 0, max);
	const target = clamp(Math.floor(input.targetTransfusions), done, max);
	const transfusions = target - done;
	const stored = Math.max(0, Math.floor(input.storedPulses));
	const pulsesNeeded = Math.max(0, transfusions * per - stored);
	const climb = k(c, input.vip ? 'meditation-climb-minutes-vip' : 'meditation-climb-minutes');
	const minutes = pulsesNeeded * climb;
	const sealedSet = new Set([1, ...chapterTransfusions]);
	const sealed: number[] = [];
	for (let t = done + 1; t <= target; t++) if (sealedSet.has(t)) sealed.push(t);
	return {
		transfusions,
		pulsesNeeded,
		pulsesLeftOver: Math.max(0, stored - transfusions * per),
		ourosangue: transfusions * k(c, input.vip ? 'transfusion-cost-vip' : 'transfusion-cost'),
		plasmas: transfusions * k(c, 'plasmas-per-transfusion'),
		totalPlasmasAfter: target * k(c, 'plasmas-per-transfusion'),
		meditationMinutes: minutes,
		meditationSangricoins: round2(minutes * k(c, 'meditation-cost-per-minute')),
		sealed,
		milestones: MILESTONES.filter((m) => m.at > done && m.at <= target),
	};
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
