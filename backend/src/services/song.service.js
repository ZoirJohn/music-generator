import { rng } from "../utils/seedCombiner.js";
import { generateText } from "../generators/text.generator.js";
import { generateLikes } from "../generators/likes.generator.js";
import { generateAudio } from "../generators/audio.generator.js";

export function generateSong({ seed, index, locale, likesAvg }) {
	const contentRng = rng(seed, "content", likesAvg, index);
	const likesRng = rng(seed, "likes", likesAvg, index);

	const text = generateText(locale, contentRng);
	const likes = generateLikes(likesAvg, likesRng);

	generateAudio(seed, index);

	return {
		index,
		...text,
		likes,
		audio: `/api/songs/audio/${seed}/${index}.mp3`,
	};
}

