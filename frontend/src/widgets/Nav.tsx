import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/widgets/components/ui/select";
import { Button } from "@/widgets/components/ui/button";
import { ButtonGroup } from "@/widgets/components/ui/button-group";
import { Field } from "@/widgets/components/ui/field";
import { Input } from "@/widgets/components/ui/input";
import { Slider } from "@/widgets/components/ui/slider";
import type { Locales } from "@/types";

export default function Nav({ setSeedNum, setIsExceeded, locale, setLocale, seedNum, isExceeded, likesRange, setLikesRange }: { likesRange: number[]; setLikesRange: (args: number[]) => void; isExceeded: boolean; setIsExceeded: (args: boolean) => void; setSeedNum: (args: string) => void; locale: string; setLocale: (args: Locales) => void; seedNum: string }) {
	const MAX_64_BIT = 18446744073709551615n;
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value.replace(/[^0-9]/g, "");

		if (!rawValue) {
			setSeedNum("");
			setIsExceeded(false);
			return;
		}

		const bigIntValue = BigInt(rawValue);

		if (bigIntValue > MAX_64_BIT) {
			setSeedNum(MAX_64_BIT.toString());
			setIsExceeded(true);
		} else {
			setSeedNum(rawValue);
			setIsExceeded(false);
		}
	};

	return (
		<nav className="flex items-center gap-24 bg-gray-50 p-4">
			<Select value={locale} onValueChange={(value: Locales) => setLocale(value)}>
				<SelectTrigger className="bg-white w-45">
					<SelectValue placeholder="Language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="en">English (USA)</SelectItem>
						<SelectItem value="de">German</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Field className="w-70">
				<ButtonGroup>
					<Input id="input-button-group" type="text" inputMode="numeric" value={seedNum} onChange={handleInputChange} className={`bg-white transition-all`} aria-invalid={isExceeded} />
					<Button
						variant="outline"
						onClick={() => {
							setSeedNum(crypto.getRandomValues(new BigUint64Array(1))[0].toString());
							setIsExceeded(false);
						}}
					>
						Random
					</Button>
				</ButtonGroup>
			</Field>
			<div className="flex flex-col gap-3 w-50">
				<div className="flex justify-between items-center gap-2">
					<p className="text-sm">Likes</p>
					<span className="text-muted-foreground text-sm">{likesRange[0]}</span>
				</div>
				<Slider id="likes" value={likesRange} onValueChange={setLikesRange} max={10} step={0.1} />
			</div>
		</nav>
	);
}
