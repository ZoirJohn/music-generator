export function generateLikes(avg, rng) {
	const variation = Number(rng.next() % 20n);
	return avg + variation;
}
