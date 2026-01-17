'use client';
export function InsetPadding({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className="p-4 lg:p-6 flex flex-col gap-6">{children}</div>
		</main>
	);
}
