import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/widgets/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/widgets/components/ui/accordion";
import { ScrollArea } from "@/widgets/components/ui/scroll-area";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/widgets/components/ui/pagination";

export default function SongsTable({ songs, page, setPage }: { songs: any[]; setPage: (args: number) => void; page: number }) {
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
				<ScrollArea className="h-[calc(100vh-150px)]">
					{songs.map((song) => (
						<TableRow key={song.index} className="w-full">
							<TableCell className="p-0" colSpan={4}>
								<Accordion type="multiple" className="w-full" defaultValue={["notifications"]}>
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
				</ScrollArea>
			</TableBody>
			<TableFooter className="mt-1">
				<Pagination className="pt-1">
					<PaginationContent>
						{Array.from({ length: 5 }).map((_, i) => {
							return (
								<PaginationItem onClick={() => setPage(i)}>
									<PaginationLink isActive={page == i}>{i + 1}</PaginationLink>
								</PaginationItem>
							);
						})}
					</PaginationContent>
				</Pagination>
			</TableFooter>
		</Table>
	);
}
