import { faker } from "@faker-js/faker";

const SUPPORTED_LOCALES = ["en", "fr"];

function normalizeSeed(seed) {
	let hash = 0;
	const str = String(seed);
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

export function generateText(locale, seed) {
	const safeLocale = SUPPORTED_LOCALES.includes(locale);

	faker.locale = safeLocale;
	faker.seed(normalizeSeed(seed));

	return {
		title: faker.music.songName(),
		artist: faker.music.artist(),
		album: faker.music.album(),
		genre: faker.music.genre(),
	};
}
