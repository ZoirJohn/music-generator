import express from "express";
import cors from "cors"
import songsRouter from "./api/songs.route.js";

const app = express();

app.use(
	cors({
		origin: "*",
		methods: ["GET"],
	}),
);

app.use(express.json());

app.use("/api/songs", songsRouter);

app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

export default app;
