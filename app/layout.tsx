import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';
import { Metadata } from 'next';
import { metadataFrom } from './metadata';
import { routing } from '@/i18n/routing';

const notosansjp = Noto_Sans_JP({
	subsets: ['latin'],
	variable: '--font-noto-sans-jp',
});

export async function generateMetadata(
	params: Promise<{
		locale: string;
	}>,
): Promise<Metadata> {
	const { locale } = await params;
	return metadataFrom({ locale: locale ?? routing.defaultLocale, root: '/' });
}

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning className={notosansjp.variable}>
			<body>{children}</body>
		</html>
	);
}
