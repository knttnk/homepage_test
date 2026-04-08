'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/16/solid';
import { useClipboard } from '@/hooks/use-clipboard';

interface CopyButtonProps {
	copyText: string;
}

export function CopyButton({ copyText }: CopyButtonProps) {
	const { copy, copied } = useClipboard();

	const handleCopy = async () => {
		await copy(copyText.replace(/\s*\+at\+\s*/g, '@'));
	};

	return (
		<Button onPress={handleCopy} intent={copied ? 'success' : 'primary'} aria-label={copied ? 'Copied!' : 'Copy'}>
			Copy {copied ? <CheckIcon /> : <DocumentDuplicateIcon />}
		</Button>
	);
}
