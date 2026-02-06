export function generateLikes(avg, rng) {
	if (avg <= 0) return 0;
	if (avg >= 10) return 10;

	const base = Math.floor(avg);
	const frac = avg - base;
	return base + (rng() < frac ? 1 : 0);
}
