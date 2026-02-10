import express from "express";
import { generateSong } from "../song.generator.js";
import { generateAudio } from "../services/audio.service.js";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
	const seed = req.query.seed || "1";
	const locale = req.query.locale || "en";
	const likesAvg = Number(req.query.likes ?? 10);
	const page = Math.max(1, Number(req.query.page ?? 1));
	const pageSize = Math.min(100, Number(req.query.pageSize ?? 50));

	const start = (page - 1) * pageSize + 1;
	const end = start + pageSize - 1;

	const songs = [];
	for (let i = start; i <= end; i++) {
		songs.push(
			generateSong({
				seed,
				index: i,
				locale,
				likesAvg,
			}),
		);
	}

	res.status(200).json({
		ok: true,
		page,
		pageSize,
		count: songs.length,
		songs,
	});
});

router.get("/audio/:seed/:index.wav", async (req, res) => {
	const seed = String(req.params.seed);
	const index = Number(req.params.index);

	try {
		const filePath = await generateAudio(seed, index);

		res.setHeader("Content-Type", "audio/wav");
		res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
		res.sendFile(path.resolve(filePath));
	} catch (error) {
		console.error("Error generating audio:", error);
		res.status(500).json({
			error: "Failed to generate audio",
			message: error.message,
		});
	}
});

export default router;
