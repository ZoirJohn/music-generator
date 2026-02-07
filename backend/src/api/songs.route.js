import express from "express";
import fs from "fs";
import path from "path";
import { generateSong } from "../services/song.service.js";

const router = express.Router();

router.get("/", (req, res) => {
	const seed = req.query.seed || "1";
	const locale = req.query.locale || "en";
	const likesAvg = Number(req.query.likes ?? 5);
	const page = Number(req.query.page ?? 1);
	const pageSize = Number(req.query.pageSize ?? 20);

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

	res.json({ page, songs });
});

router.get("/audio/:seed/:index", (req, res) => {
	const { seed, index } = req.params;
	const file = path.resolve("./audio", `song-${seed}-${index}.mid`);

	if (!fs.existsSync(file)) {
		return res.status(404).json({ error: "Audio not found" });
	}

	res.sendFile(file);
});

export default router;
