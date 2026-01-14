'use client';

import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/components/ui/sidebar';
import type { ComponentProps } from 'react';

export function SidebarNavItem({ href, ...props }: ComponentProps<typeof SidebarItem>) {
	const pathname = usePathname();
	let isCurrent = false;

	if (typeof href === 'string' && pathname) {
		// Exact match
		if (pathname === href) {
			isCurrent = true;
		}
		// Handle trailing slash differences (e.g. /ja vs /ja/)
		else if (pathname.replace(/\/$/, '') === href.replace(/\/$/, '')) {
			isCurrent = true;
		}
	}

	return <SidebarItem isCurrent={isCurrent} href={href} {...props} />;
}
