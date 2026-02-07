import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/widgets/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/widgets/components/ui/accordion";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];

export default function SongsTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>#</TableHead> <TableHead>Status</TableHead> <TableHead>Method</TableHead> 
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice} className="w-full">
						<TableCell className="p-0" colSpan={4}>
							<Accordion type="multiple" className="w-full cursor-pointer" defaultValue={["notifications"]}>
								<AccordionItem key={invoice.invoice} value={invoice.invoice}>
									<AccordionTrigger className="p-2 ">
										<TableCell className="p-0">1</TableCell>
										<TableCell className="p-0">1</TableCell>
									</AccordionTrigger>
									<AccordionContent>{invoice.invoice}</AccordionContent>
								</AccordionItem>
							</Accordion>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
