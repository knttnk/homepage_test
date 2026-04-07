'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/ui/table';

interface CareerItem {
	date: string;
	description: string;
	index: number;
}

interface CareerTableProps {
	items: CareerItem[];
	dateHeader: string;
	descriptionHeader: string;
}

export function CareerTable({ items, dateHeader, descriptionHeader }: CareerTableProps) {
	// react-aria-componentsのTableBodyが各アイテムを識別できるようにkeyプロパティを追加
	const itemsWithKey = items.map((item) => ({
		...item,
		key: `career-${item.index}`,
	}));

	return (
		<Table bleed striped className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]">
			<TableHeader>
				<TableColumn className="w-0">{dateHeader}</TableColumn>
				<TableColumn isRowHeader className="w-full">
					{descriptionHeader}
				</TableColumn>
			</TableHeader>
			<TableBody items={itemsWithKey}>
				{(item) => (
					<TableRow>
						<TableCell>{item.date}</TableCell>
						<TableCell className="whitespace-normal">{item.description}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
