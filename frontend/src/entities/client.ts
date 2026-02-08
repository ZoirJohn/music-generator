export const client = {
	getSongs: async (seed: string = "", locale: string = "", likes: number = 0, page: number = 1) => {
		const params = new URLSearchParams({ seed, locale, likes: likes.toString(), page: page.toString() });
		const res = await fetch(import.meta.env.VITE_BASE_URL + "/songs?" + params.toString());
		const data = await res.json();
		return data;
	},
};
