import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/widgets/components/ui/select";
import { Button } from "@/widgets/components/ui/button";
import { ButtonGroup } from "@/widgets/components/ui/button-group";
import { Field } from "@/widgets/components/ui/field";
import { Input } from "@/widgets/components/ui/input";
import { Label } from "@/widgets/components/ui/label";
import { Slider } from "@/widgets/components/ui/slider";
import { useState } from "react";
import type { Locales } from "@/types";

export default function Nav() {
	const [locale, setLocale] = useState<Locales | "">("");
	const [seedNum, setSeedNum] = useState<string>("");
	const [isExceeded, setIsExceeded] = useState(false);
	const [value, setValue] = useState([10]);
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
		<nav className="bg-gray-50 flex gap-24 p-4 items-center">
			<Select value={locale} onValueChange={(value: Locales) => setLocale(value)}>
				<SelectTrigger className="w-45 bg-white">
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
			<div className="flex flex-col w-50 gap-3">
				<div className="flex items-center justify-between gap-2">
					<Label htmlFor="slider-demo-temperature">Likes</Label>
					<span className="text-muted-foreground text-sm">{value[0]}</span>
				</div>
				<Slider id="slider-demo-temperature" value={value} onValueChange={setValue} max={10} step={0.1} />
			</div>
		</nav>
	);
}
