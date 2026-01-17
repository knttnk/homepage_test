'use client';

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@/components/ui/link';
import { Publication } from './get-publications';
import { useTranslations } from 'next-intl';

interface PublicationsTableProps {
	publications: Publication[];
	ariaLabel: string;
}
export function PublicationsTable({ publications, ariaLabel }: PublicationsTableProps) {
	// publicationsにindexをつける
	const items = publications.map((item, index) => ({ ...item, index: index + 1 }));
	const t = useTranslations('PublicationsPage');

	return (
		// CardとTableの余白をclassNameで調整
		<Table bleed striped className="[--gutter:var(--card-spacing)] sm:[--gutter:var(--card-spacing)]" aria-label={ariaLabel}>
			<TableHeader>
				<TableColumn className="w-0">#</TableColumn>
				<TableColumn isRowHeader className="w-full">
					{t('publication')}
				</TableColumn>
			</TableHeader>
			<TableBody items={items}>
				{(p) => (
					<TableRow>
						<TableCell>{p.index}</TableCell>
						<TableCell className="whitespace-normal">
							{p.url ? (
								<Link href={p.url} target="_blank" rel="noreferrer">
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
