'use client';

import { LanguageIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, MenuContent, MenuHeader, MenuItem, MenuLabel, MenuTrigger } from '@/components/ui/menu';
import { routing } from '@/i18n/routing';

const languageLabels: Record<string, string> = {
	en: 'English',
	ja: '日本語',
};

function replaceLocaleInPath(pathname: string, targetLocale: string) {
	const segments = pathname.split('/');
	const currentLocale = segments[1];

	if (routing.locales.includes(currentLocale as (typeof routing.locales)[number])) {
		segments[1] = targetLocale;
	} else {
		segments.splice(1, 0, targetLocale);
	}

	return segments.join('/');
}

export function LanguageSwitcher({ languageText }: { languageText: string }) {
	const pathname = usePathname();
	const router = useRouter();
	const currentLocale = pathname.split('/')[1];
	const selectedLocale = routing.locales.includes(currentLocale as (typeof routing.locales)[number]) ? currentLocale : routing.defaultLocale;

	return (
		<div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50">
			<Menu>
				<Button aria-label="Switch language" intent="primary" size="sq-lg" isCircle>
					<LanguageIcon data-slot="icon" />
				</Button>
				<MenuContent
					placement="top end"
					selectedKeys={[selectedLocale]}
					selectionMode="single"
					onAction={(key) => {
						const targetLocale = String(key);
						const targetPath = replaceLocaleInPath(pathname, targetLocale);
						router.push(targetPath);
					}}
				>
					<MenuHeader separator>{languageText}</MenuHeader>
					{routing.locales.map((supportedLocale) => (
						<MenuItem
							id={supportedLocale}
							key={supportedLocale}
							className="data-hovered:bg-accent/20 data-focused:bg-accent/20 data-selected:bg-accent/15"
						>
							<MenuLabel>{languageLabels[supportedLocale] ?? supportedLocale.toUpperCase()}</MenuLabel>
						</MenuItem>
					))}
				</MenuContent>
			</Menu>
		</div>
	);
}
