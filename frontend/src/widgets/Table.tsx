import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/widgets/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/widgets/components/ui/accordion";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/widgets/components/ui/pagination";
import type { ModeType } from "@/routes/home";

export default function SongsTable({ songs, page, setPage, mode }: { songs: any[]; setPage: (args: number) => void; page: number; mode: ModeType }) {
	const HEAD_BODY_STYLE = "grid py-2 grid-cols-[25px_100px_1fr_1fr_1fr_1fr] justify-items-start";
	return (
		<Table>
			<TableHeader>
				<TableRow className={HEAD_BODY_STYLE + " " + "[&>th]:font-bold"}>
					<TableHead className="h-auto"></TableHead>
					<TableHead className="h-auto">#</TableHead>
					<TableHead className="h-auto">Song</TableHead>
					<TableHead className="h-auto">Artist</TableHead>
					<TableHead className="h-auto">Album</TableHead>
					<TableHead className="h-auto">Genre</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<div className={(mode == "list" ? "h-[calc(100vh-110px)]" : "h-[calc(100vh-150px)]") + " overflow-auto"}>
					{songs.map((song) => (
						<TableRow key={song.index} className="w-full block" data-row>
							<TableCell  colSpan={4} className="w-full block p-0">
								<Accordion type="multiple" defaultValue={["notifications"]}>
									<AccordionItem key={song.title} value={song.title}>
										<AccordionTrigger className={HEAD_BODY_STYLE + " " + "p-0 no-underline! items-center cursor-pointer [&>p]:max-w-full [&>p]:overflow-hidden [&>p]:text-ellipsis"}>
											<p className="p-2">{song.index}</p>
											<p className="p-2">{song.title}</p>
											<p className="p-2">{song.artist}</p>
											<p className="p-2">{song.album}</p>
											<p className="p-2">{song.genre}</p>
										</AccordionTrigger>
										<AccordionContent>{song.album}</AccordionContent>
									</AccordionItem>
								</Accordion>
							</TableCell>
						</TableRow>
					))}
				</div>
			</TableBody>
			{mode == "table" ? (
				<TableFooter className="mt-1">
					<Pagination className="pt-1">
						<PaginationContent>
							{Array.from({ length: 5 }).map((_, i) => {
								const index = i + 1;
								return (
									<PaginationItem onClick={() => setPage(index)} key={index}>
										<PaginationLink isActive={page == index} className={page == index ? "bg-gray-400 hover:bg-gray-500" : ""}>
											{index}
										</PaginationLink>
									</PaginationItem>
								);
							})}
						</PaginationContent>
					</Pagination>
				</TableFooter>
			) : (
				<></>
			)}
		</Table>
	);
}
