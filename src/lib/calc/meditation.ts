// Meditation calculator. Uses only published figures:
//   10,500 XP per minute (15,750 with VIP), 0.35 Sangricoin per minute per path,
//   level 1 → 90 in about 74 minutes (50 with VIP), Online Reward rules.
// What it can't do (and doesn't pretend to): XP for a partial level range (no XP curve is published,
// Q-011), weapon/blood/pet path rates (Q-021, Q-010), or how a server XP event combines with VIP
// (shown both ways). The session is simulated minute by minute.
import { k, round2, type Constants } from './constants.ts';

export interface MeditationInput {
	/** Sangricoin balance at the start. */
	balance: number;
	/** 1 for a single path, 2 for Double Meditation. */
	paths: 1 | 2;
	vip: boolean;
	/** Server XP event bonus in percent (e.g. 100 for double XP); 0 for none. */
	serverBonusPct: number;
	/** Stop after this many minutes; null = run until the balance runs out (capped at `maxMinutes`). */
	minutes: number | null;
	/** Count Online Reward income during the session. */
	onlineReward: boolean;
	/** Online Reward streak day (1 = first day). */
	streakDay: number;
	/** Minutes already online today before the session starts. */
	onlineToday: number;
	/** Minutes from session start to midnight (Brasília); null = ignore the day change. */
	minutesToMidnight: number | null;
}

export interface MeditationResult {
	minutes: number;
	stoppedBecause: 'duration' | 'balance' | 'cap';
	sangricoinsSpent: number;
	onlineRewardEarned: number;
	onlineRewards: number;
	remainingBalance: number;
	/** XP per path. When a server bonus and VIP are both on, the two readings differ. */
	xpPerPath: { single: number } | { additive: number; multiplicative: number };
	/** Approximate full level 1 → 90 climbs on the Character path (published ~74-minute climb). */
	climbs: { single: number } | { additive: number; multiplicative: number };
	/** XP of one level 1 → 90 climb implied by the published figures (≈ 777,000). */
	climbXp: number;
}

export const MAX_MINUTES = 7 * 24 * 60;

export function onlineRewardValue(c: Constants, streakDay: number): number {
	const days = Math.min(Math.max(1, Math.floor(streakDay)), k(c, 'online-max-streak-days'));
	return round2(k(c, 'online-base') + k(c, 'online-per-streak-day') * days);
}

export function simulateMeditation(c: Constants, input: MeditationInput): MeditationResult {
	const cost = k(c, 'meditation-cost-per-minute') * input.paths;
	const unlock = k(c, 'online-unlock-minutes');
	const interval = k(c, 'online-interval-minutes');
	let balance = input.balance;
	let spent = 0;
	let earned = 0;
	let rewards = 0;
	let dayMinutes = Math.max(0, Math.floor(input.onlineToday));
	let streak = Math.max(1, Math.floor(input.streakDay));
	let completedToday = dayMinutes >= unlock;
	const limit = input.minutes === null ? MAX_MINUTES : Math.min(Math.max(0, Math.floor(input.minutes)), MAX_MINUTES);
	let m = 0;
	let stoppedBecause: MeditationResult['stoppedBecause'] = input.minutes === null ? 'cap' : 'duration';

	while (m < limit) {
		// Midnight: online time resets; the streak advances if yesterday's 30 minutes were done.
		if (input.minutesToMidnight !== null && m > 0 && (m - input.minutesToMidnight) % 1440 === 0 && m >= input.minutesToMidnight) {
			if (completedToday) streak++;
			dayMinutes = 0;
			completedToday = false;
		}
		if (balance + 1e-9 < cost) {
			stoppedBecause = 'balance';
			break;
		}
		balance -= cost;
		spent += cost;
		m++;
		dayMinutes++;
		if (input.onlineReward && dayMinutes >= unlock && (dayMinutes - unlock) % interval === 0) {
			if (dayMinutes === unlock) completedToday = true;
			const v = onlineRewardValue(c, streak);
			balance += v;
			earned += v;
			rewards++;
		}
	}

	const tick = k(c, 'meditation-xp-per-tick');
	const tickVip = k(c, 'meditation-xp-per-tick-vip');
	const climbXp = k(c, 'meditation-climb-minutes') * tick;
	const b = Math.max(0, input.serverBonusPct) / 100;
	const vipFactor = tickVip / tick; // 1.5
	let xpPerPath: MeditationResult['xpPerPath'];
	if (input.vip && b > 0) {
		xpPerPath = { additive: m * tick * (vipFactor + b), multiplicative: m * tickVip * (1 + b) };
	} else {
		xpPerPath = { single: m * (input.vip ? tickVip : tick) * (1 + b) };
	}
	const climbs: MeditationResult['climbs'] =
		'single' in xpPerPath
			? { single: xpPerPath.single / climbXp }
			: { additive: xpPerPath.additive / climbXp, multiplicative: xpPerPath.multiplicative / climbXp };

	return {
		minutes: m,
		stoppedBecause,
		sangricoinsSpent: round2(spent),
		onlineRewardEarned: round2(earned),
		onlineRewards: rewards,
		remainingBalance: round2(balance),
		xpPerPath,
		climbs,
		climbXp,
	};
}
