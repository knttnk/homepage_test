interface HeaderProps {
	children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
	return <header className="sticky top-0 h-16 z-10 flex shrink-0 items-center gap-x-4 border-b bg-bg px-4 md:hidden">{children}</header>;
}
