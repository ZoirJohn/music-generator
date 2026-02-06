import seedrandom from "seedrandom";

export function rng(seed) {
	return seedrandom(seed.toString(), { entropy: false });
}
