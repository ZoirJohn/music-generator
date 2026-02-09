import { client } from "@/entities/client";
import type { Locales } from "@/types";
import Nav from "@/widgets/Nav";
import SongsTable from "@/widgets/Table";
import { useEffect, useRef, useState } from "react";

export type ModeType = "table" | "list";

export function App() {
	const [songs, setSongs] = useState<any[]>([]);
	const [locale, setLocale] = useState<Locales>("en");
	const [seedNum, setSeedNum] = useState("");
	const [isExceeded, setIsExceeded] = useState(false);
	const [likesRange, setLikesRange] = useState([10]);
	const [page, setPage] = useState(1);
	const [mode, setMode] = useState<ModeType>("table");

	const listPageRef = useRef(1);
	const debounceRef = useRef<number | null>(null);

	const cacheRef = useRef<{
		table: any[];
		list: any[];
	}>({
		table: [],
		list: [],
	});

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(async () => {
			const fetchPage = mode === "list" ? 1 : page;

			const data = await client.getSongs(seedNum, locale, likesRange[0], fetchPage);

			if (mode === "table") {
				cacheRef.current.table = data.songs;
				setSongs(data.songs);
			}

			if (mode === "list") {
				cacheRef.current.list = data.songs;
				setSongs(data.songs);
			}
		}, 750);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [locale, seedNum, likesRange, page, mode]);

	useEffect(() => {
		listPageRef.current = 1;
		cacheRef.current.list = [];

		if (mode === "list") {
			setSongs([]);
		}
	}, [locale, seedNum, likesRange]);

	useEffect(() => {
		if (mode === "list") {
			listPageRef.current = 1;
			cacheRef.current.list = [];
			setSongs([]);
		}

		if (mode === "table") {
			setSongs(cacheRef.current.table);
		}
	}, [mode]);

	useEffect(() => {
		if (mode !== "list") return;

		const lastRow = document.querySelector("[data-row]:last-child");
		if (!lastRow) return;

		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return;

				listPageRef.current += 1;

				const data = await client.getSongs(seedNum, locale, likesRange[0], listPageRef.current);

				cacheRef.current.list = [...cacheRef.current.list, ...data.songs];

				setSongs(cacheRef.current.list);
			},
			{ rootMargin: "100px" },
		);

		observer.observe(lastRow);

		return () => observer.disconnect();
	}, [songs, mode]);

	return (
		<section className="h-screen overflow-hidden">
			<Nav locale={locale} setLocale={setLocale} isExceeded={isExceeded} setIsExceeded={setIsExceeded} seedNum={seedNum} setSeedNum={setSeedNum} likesRange={likesRange} setLikesRange={setLikesRange} mode={mode} setMode={setMode} />
			<SongsTable songs={songs} page={page} setPage={setPage} mode={mode} />
		</section>
	);
}

export default App;
