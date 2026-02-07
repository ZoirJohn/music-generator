import crypto from "crypto";

export function hashSeedToBigInt(...parts) {
	const input = parts.join(":");
	const hash = crypto.createHash("sha256").update(input).digest("hex");
	return BigInt("0x" + hash.slice(0, 16));
}
