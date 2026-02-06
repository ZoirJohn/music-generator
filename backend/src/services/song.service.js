import { rng } from "../utils/seedCombiner.js";
import { hashSeed } from "../utils/seed.js";
import { generateText } from "../generators/text.generator.js";
import { generateLikes } from "../generators/likes.generator.js";
import { generateAudio } from "../generators/audio.generator.js";

export function generateSong({ seed, index, locale, likesAvg }) {
	const contentSeed = hashSeed(seed, index);
	const likesSeed = hashSeed(seed, "likes", index);

	const text = generateText(locale, contentSeed);
	const likes = generateLikes(likesAvg, rng(likesSeed));
	const audioPath = generateAudio(seed, index);

	return {
		index,
		...text,
		likes,
		audio: `/api/songs/audio/${seed}/${index}`,
		audioFile: audioPath,
	};
}
