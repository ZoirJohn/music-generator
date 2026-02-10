import fs from "fs";
import path from "path";
import WavEncoder from "wav-encoder";
import { rng } from "../utils/seedCombiner.js";

const AUDIO_DIR = path.join(process.cwd(), "audio");
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR);

const SAMPLE_RATE = 44100;

const NOTE_FREQUENCIES = {
	C4: 261.63,
	D4: 293.66,
	E4: 329.63,
	F4: 349.23,
	G4: 392.0,
	A4: 440.0,
	B4: 493.88,
};

function pick(rngInstance, array) {
	const i = Number(rngInstance.next() % BigInt(array.length));
	return array[i];
}

function generatePattern(rngInstance, length) {
	const chars = ["x", "_"];
	let pattern = "";
	for (let i = 0; i < length; i++) {
		pattern += pick(rngInstance, chars);
	}
	return pattern;
}

function generateNoteSamples(frequency, duration, sampleRate, amplitude) {
	const numSamples = Math.floor(duration * sampleRate);
	const samples = new Float32Array(numSamples);

	const attack = 0.02;
	const release = 0.15;

	for (let i = 0; i < numSamples; i++) {
		const t = i / sampleRate;

		let envelope = 1;
		if (t < attack) envelope = t / attack;
		else if (t > duration - release) envelope = (duration - t) / release;

		samples[i] = amplitude * envelope * Math.sin(2 * Math.PI * frequency * t);
	}

	return samples;
}

async function generateWavFile(notes, sections, filePath) {
	const noteDuration = 0.4;
	const restDuration = 0.2;

	let totalDuration = 0;
	for (const { pattern } of sections) {
		for (const beat of pattern) {
			totalDuration += beat === "x" ? noteDuration : restDuration;
		}
	}

	const totalSamples = Math.floor(totalDuration * SAMPLE_RATE);
	const audioData = new Float32Array(totalSamples);

	let currentTime = 0;

	for (const { pattern, amplitude } of sections) {
		for (let i = 0; i < pattern.length; i++) {
			const beat = pattern[i];
			const note = notes[i % notes.length];

			if (beat === "x") {
				const freq = NOTE_FREQUENCIES[note];
				const samples = generateNoteSamples(freq, noteDuration, SAMPLE_RATE, amplitude);

				const start = Math.floor(currentTime * SAMPLE_RATE);

				for (let j = 0; j < samples.length; j++) {
					if (start + j < audioData.length) {
						audioData[start + j] += samples[j];
					}
				}

				currentTime += noteDuration;
			} else {
				currentTime += restDuration;
			}
		}
	}

	const fadeSamples = SAMPLE_RATE * 1.5;
	for (let i = 0; i < fadeSamples; i++) {
		const idx = audioData.length - 1 - i;
		if (idx < 0) break;
		audioData[idx] *= i / fadeSamples;
	}

	const buffer = {
		sampleRate: SAMPLE_RATE,
		channelData: [audioData],
	};

	const wav = await WavEncoder.encode(buffer);
	fs.writeFileSync(filePath, Buffer.from(wav));
}

export async function generateAudio(seed, index) {
	const wavFile = path.join(AUDIO_DIR, `song-${seed}-${index}.wav`);
	if (fs.existsSync(wavFile)) return wavFile;

	const songRng = rng(seed, index);

	const notesPool = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
	const notes = Array.from({ length: 8 }, () => pick(songRng, notesPool));

	const intro = generatePattern(songRng, 8);
	const verse = generatePattern(songRng, 16);
	const chorus = generatePattern(songRng, 16);
	const outro = generatePattern(songRng, 8);

	await generateWavFile(
		notes,
		[
			{ pattern: intro, amplitude: 0.25 },
			{ pattern: verse, amplitude: 0.3 },
			{ pattern: chorus, amplitude: 0.4 },
			{ pattern: verse, amplitude: 0.3 },
			{ pattern: chorus, amplitude: 0.4 },
			{ pattern: outro, amplitude: 0.25 },
		],
		wavFile,
	);

	return wavFile;
}
