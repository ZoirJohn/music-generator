import express from "express";
import path from "path";
import { generateAudio } from "../services/audio.service.js";

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

router.get("/audio/:seed/:index.mp3", (req, res) => {
	const { seed, index } = req.params;
	const filePath = generateAudio(seed, index);

	res.setHeader("Content-Type", "audio/mpeg");
	res.sendFile(path.resolve(filePath));
});

export default router;
