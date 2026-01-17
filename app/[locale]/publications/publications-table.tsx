'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@/components/ui/link';
import type { Publication } from './get-publications';

interface PublicationsTableProps {
	items: (Publication & { index: number })[];
	label: string;
	publicationHeader: string;
}

export function PublicationsTable({ items, label, publicationHeader }: PublicationsTableProps) {
	return (
		<Table bleed striped className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]" aria-label={label}>
			<TableHeader>
				<TableColumn className="w-0">#</TableColumn>
				<TableColumn isRowHeader className="w-full">
					{publicationHeader}
				</TableColumn>
			</TableHeader>
			<TableBody items={items}>
				{(p) => (
					<TableRow>
						<TableCell>{p.index}</TableCell>
						<TableCell className="whitespace-normal">
							{p.url ? (
								<Link href={p.url} target="_blank" rel="noreferrer" className="text-primary underline font-normal">
									{p.str}
								</Link>
							) : (
								p.str
							)}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
