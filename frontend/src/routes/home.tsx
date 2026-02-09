import { client } from "@/entities/client";
import type { Locales } from "@/types";
import Nav from "@/widgets/Nav";
import SongsTable from "@/widgets/Table";
import { useEffect, useRef, useState } from "react";

export function App() {
	const [songs, setSongs] = useState([]);
	const [locale, setLocale] = useState<Locales>("en");
	const [seedNum, setSeedNum] = useState<string>("");
	const [isExceeded, setIsExceeded] = useState(false);
	const [likesRange, setLikesRange] = useState([10]);
	const [page, setPage] = useState<number>(1);
	const debounceRef = useRef<number | null>(null);

	useEffect(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			client.getSongs(seedNum, locale, likesRange[0], page).then((data) => setSongs(data.songs));
		}, 750);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, [locale, seedNum, likesRange, page]);
	return (
		<section className="h-screen overflow-hidden">
			<Nav locale={locale} setLocale={setLocale} isExceeded={isExceeded} setIsExceeded={setIsExceeded} seedNum={seedNum} setSeedNum={setSeedNum} likesRange={likesRange} setLikesRange={setLikesRange} />
			<SongsTable songs={songs} page={page} setPage={setPage} />
		</section>
	);
}

export default App;
