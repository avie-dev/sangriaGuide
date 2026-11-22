// Constants passed into the calculators: id → value, from src/data/constants.yaml.
// The calculators take this map as an argument so the site (build-time collection) and the tests
// (reading the YAML directly) use the same numbers.
export type Constants = Readonly<Record<string, number>>;

/** Reads a constant, failing loudly if a calculator asks for one that isn't in the data file. */
export function k(c: Constants, id: string): number {
	const v = c[id];
	if (v === undefined) throw new Error(`Missing constant "${id}" (add it to src/data/constants.yaml)`);
	return v;
}

/** Rounds to 2 decimals for money-like outputs (Sangricoins have fractional amounts). */
export const round2 = (n: number) => Math.round(n * 100) / 100;
