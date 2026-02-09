export function generateLikes(avg, rng) {
	const base = Math.floor(avg);
	const fraction = avg - base;

	const rand = Number(rng.next() % 1_000_000n) / 1_000_000;

	return rand < fraction ? base + 1 : base;
}
