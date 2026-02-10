import express from "express";
import songsRouter from "./routes/songs.js";
import cors from "cors";
import "dotenv";

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
	}),
);
app.use("/api/songs", songsRouter);

export default app;
