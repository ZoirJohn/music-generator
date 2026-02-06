import express from "express";
import fs from "fs";
import archiver from "archiver";
import { generateSong } from "../services/song.service.js";

const router = express.Router();

router.get("/", (req, res) => {
	const { seed = "1", locale = "en", likes = 5, page = 1, pageSize = 20 } = req.query;

	const start = (page - 1) * pageSize + 1;
	const end = start + Number(pageSize) - 1;

	const songs = [];
	for (let i = start; i <= end; i++) {
		songs.push(
			generateSong({
				seed,
				index: i,
				locale,
				likesAvg: Number(likes),
			}),
		);
	}

	res.json({ page: Number(page), songs });
});

router.get("/audio/:seed/:index", (req, res) => {
	const { seed, index } = req.params;
	const file = `./audio/song-${seed}-${index}.mid`;

	if (!fs.existsSync(file)) {
		return res.status(404).end();
	}

	res.sendFile(process.cwd() + "/" + file);
});

router.get("/export", (req, res) => {
	const { seed = "1", locale = "en", likes = 5, count = 10 } = req.query;

	res.setHeader("Content-Type", "application/zip");
	res.setHeader("Content-Disposition", "attachment; filename=songs.zip");

	const archive = archiver("zip");
	archive.pipe(res);

	for (let i = 1; i <= count; i++) {
		const song = generateSong({
			seed,
			index: i,
			locale,
			likesAvg: Number(likes),
		});
		archive.file(song.audioFile, { name: `song-${i}.mid` });
	}

	archive.finalize();
});

export default router;
