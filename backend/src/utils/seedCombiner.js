import { XORShift64 } from "random-seedable";

export function rng(seed) {
	const generator = new XORShift64(seed.toString());
	return generator.bigInt();
}