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
	const debounceRef = useRef<number | null>(null);

	useEffect(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			client.getSongs(seedNum, locale, likesRange[0], 1).then((data) => setSongs(data.songs));
			console.log("NEW");
		}, 750);

		return () => {
			if (debounceRef.current) {
				clearTimeout(debounceRef.current);
			}
		};
	}, [locale, seedNum, likesRange]);
	return (
		<section className="p-2">
			<Nav locale={locale} setLocale={setLocale} isExceeded={isExceeded} setIsExceeded={setIsExceeded} seedNum={seedNum} setSeedNum={setSeedNum} likesRange={likesRange} setLikesRange={setLikesRange} />
			<SongsTable songs={songs} />
		</section>
	);
}

export default App;
