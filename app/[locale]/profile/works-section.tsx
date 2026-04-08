'use client';

import { Link } from '@/components/ui/link';
import { IconOpenLink2Fill } from '@intentui/icons';
import { buttonStyles } from '@/components/ui/button';

interface WorkItem {
	title: string;
	description: string;
	url: string;
}

export function WorkItemCard({ item }: { item: WorkItem }) {
	return (
		<div className="border-t pt-4 first:border-none first:pt-0 flex items-start justify-between gap-4">
			<div className="flex-1">
				<h3 className="font-semibold text-base mb-1">{item.title}</h3>
				<p className="text-sm text-muted-fg mb-3">{item.description}</p>
			</div>
			<Link href={item.url} target="_blank" rel="noopener noreferrer" className={buttonStyles()}>
				<IconOpenLink2Fill />
			</Link>
		</div>
	);
}
