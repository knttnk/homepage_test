'use client';

import { ReactNode } from 'react';
import { Link } from '@/components/ui/link';
import { buttonStyles } from '@/components/ui/button';
import { cx } from '@/lib/primitive';
import type { VariantProps } from 'tailwind-variants';

interface ButtonLinkProps extends VariantProps<typeof buttonStyles> {
	href: string;
	children: ReactNode;
	icon?: ReactNode;
	target?: string;
	rel?: string;
	className?: string;
}

export function ButtonLink({
	href,
	children,
	icon,
	target,
	rel,
	intent,
	size,
	isCircle,
	className,
}: ButtonLinkProps) {
	return (
		<Link
			href={href}
			target={target}
			rel={rel}
			className={cx(buttonStyles({ intent, size, isCircle }), className)}
		>
			{icon && <span data-slot="icon">{icon}</span>}
			{children}
		</Link>
	);
}
