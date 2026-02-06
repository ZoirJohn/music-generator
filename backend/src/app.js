import express from "express";
import songsRouter from "./api/songs.route.js";

const app = express();
app.use(express.json());

app.use("/api/songs", songsRouter);

export default app;
