/** Wires every `[data-copy]` button on the page to copy its value. Safe to call more than once. */
export function wireCopyButtons() {
	for (const btn of document.querySelectorAll<HTMLButtonElement>('button[data-copy]')) {
		if (btn.dataset.copyWired) continue;
		btn.dataset.copyWired = '1';
		const label = btn.textContent;
		btn.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(btn.dataset.copy ?? '');
				btn.textContent = 'Copied';
			} catch {
				btn.textContent = 'Copy failed';
			}
			setTimeout(() => (btn.textContent = label), 1500);
		});
	}
}
