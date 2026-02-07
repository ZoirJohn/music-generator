import scribble from "scribbletune";
import fs from "fs";
import path from "path";
import { rng } from "../utils/seedCombiner.js";

const AUDIO_DIR = "./audio";
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

function pick(rng, array) {
	const i = Number(rng.next() % BigInt(array.length));
	return array[i];
}

function generatePattern(rng, length = 8) {
	const chars = ["x", "_"];
	let pattern = "";
	for (let i = 0; i < length; i++) {
		pattern += pick(rng, chars);
	}
	return pattern;
}

export function generateAudio(seed, index) {
	const file = path.join(AUDIO_DIR, `song-${seed}-${index}.mid`);
	if (fs.existsSync(file)) return file;

	const songGenerator = rng(seed, index);

	const notesPool = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

	const notes = Array.from({ length: 5 }, () => pick(songGenerator, notesPool));

	const pattern = generatePattern(songGenerator, 8);

	const clip = scribble.clip({ notes, pattern });

	scribble.midi(clip, file);
	return file;
}
