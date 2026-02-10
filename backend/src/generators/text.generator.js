import { faker } from "@faker-js/faker";
import translate from "translate";

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

async function translateText(text, lang) {
	translate.engine = "google";
	return await translate(text, { to: lang });
}

export async function generateText(locale, rng) {
	const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
	faker.locale = safeLocale;

	const seedNumbers = bigIntToNumberArray(rng.next(), 2);
	faker.seed(seedNumbers);

	const title = faker.music.songName();
	const artist = faker.music.artist();
	const album = faker.music.album();
	const genre = faker.music.genre();

	return {
		title: await translateText(title, safeLocale),
		artist: await translateText(artist, safeLocale),
		album: await translateText(album, safeLocale),
		genre: await translateText(genre, safeLocale),
	};
}
