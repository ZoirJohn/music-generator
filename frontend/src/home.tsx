import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/widgets/components/ui/select";
import { Button } from "@/widgets/components/ui/button";
import { ButtonGroup } from "@/widgets/components/ui/button-group";
import { Field } from "@/widgets/components/ui/field";
import { Input } from "@/widgets/components/ui/input";
import { useState } from "react";
import type { Locales } from "./types";

export function App() {
	const [locale, setLocale] = useState<Locales | "">("");
	return (
		<>
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
			<Field className="w-120">
				<ButtonGroup>
					<Input
						id="input-button-group"
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						defaultValue={crypto.getRandomValues(new BigUint64Array(1))[0].toString()}
						onInput={(e) => {
							e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
						}}
					/>
					<Button variant="outline">Random</Button>
				</ButtonGroup>
			</Field>
		</>
	);
}

export default App;
