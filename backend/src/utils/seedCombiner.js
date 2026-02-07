import { XORShift64 } from "random-seedable";
import { hashSeedToBigInt } from "./seed.js";

export function rng(...parts) {
	const seed64 = hashSeedToBigInt(...parts);
	const gen = new XORShift64(seed64);
	return {
		next: () => gen.bigInt(),
	};
}
