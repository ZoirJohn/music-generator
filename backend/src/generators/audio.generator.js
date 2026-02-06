import scribble from "scribbletune";
import fs from "fs";
import path from "path";

const AUDIO_DIR = "./audio";

if (!fs.existsSync(AUDIO_DIR)) {
	fs.mkdirSync(AUDIO_DIR);
}

export function generateAudio(seed, index) {
	const file = path.join(AUDIO_DIR, `song-${seed}-${index}.mid`);
	if (fs.existsSync(file)) return file;

	const clip = scribble.clip({
		seed: `${seed}-${index}`,
		notes: "C4 D4 E4 G4 A4",
		pattern: "x-x_x-x-",
	});

	scribble.midi(clip, file);
	return file;
}
