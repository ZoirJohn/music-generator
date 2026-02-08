import { faker } from "@faker-js/faker";

const SUPPORTED_LOCALES = ["en", "de"];

function bigIntToNumberArray(bigint, length = 8) {
	const arr = [];
	let temp = bigint;
	const TWO32 = 2n ** 32n;

	for (let i = 0; i < length; i++) {
		arr.push(Number(temp % TWO32));
		temp = temp / TWO32;
	}

	return arr;
}

export function generateText(locale, rng) {
	const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
	faker.locale = safeLocale;

	const seedNumbers = bigIntToNumberArray(rng.next(),2);
	faker.seed(seedNumbers);

	return {
		title: faker.music.songName(),
		artist: faker.music.artist(),
		album: faker.music.album(),
		genre: faker.music.genre(),
	};
}
