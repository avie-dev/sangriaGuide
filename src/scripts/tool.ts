// Shared client-side helpers for the calculators.
// Each calculator is a custom element containing a <form>, an output area, and a
// <script type="application/json" data-tool-data> with the build-time data it needs.

/** Reads the JSON data block rendered at build time inside a calculator element. */
export function toolData<T>(root: HTMLElement): T {
	const el = root.querySelector<HTMLScriptElement>('script[data-tool-data]');
	if (!el?.textContent) throw new Error('Calculator data block missing');
	return JSON.parse(el.textContent) as T;
}

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
/** 12,345.67 */
export const fmt = (n: number) => nf.format(Math.abs(n) < 0.005 ? 0 : n);
/** 12,346 */
export const fmt0 = (n: number) => nf0.format(Math.abs(n) < 0.5 ? 0 : n);

/** "2h 05m" from minutes. */
export function duration(minutes: number): string {
	const d = Math.floor(minutes / 1440);
	const h = Math.floor((minutes % 1440) / 60);
	const m = Math.round(minutes % 60);
	return [d ? `${d}d` : '', d || h ? `${h}h` : '', `${String(m).padStart(d || h ? 2 : 1, '0')}m`].filter(Boolean).join(' ');
}

/** Number value of a named form field (NaN-safe, defaulting to 0). */
export function num(form: HTMLFormElement, name: string): number {
	const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
	const v = el ? Number(el.value) : NaN;
	return Number.isFinite(v) ? v : 0;
}
export function str(form: HTMLFormElement, name: string): string {
	return (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? '';
}
export function bool(form: HTMLFormElement, name: string): boolean {
	return (form.elements.namedItem(name) as HTMLInputElement | null)?.checked ?? false;
}

/** HTML-escapes text for the result templates. */
export const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

/**
 * Wires a form: recalculates on every input, and keeps the inputs in the URL hash so a
 * calculation can be shared as a link. `key` namespaces the hash for pages with several tools.
 */
export function wireForm(form: HTMLFormElement, key: string, recalc: () => void) {
	const prefix = `${key}.`;
	const params = new URLSearchParams(location.hash.slice(1));
	for (const el of Array.from(form.elements) as HTMLInputElement[]) {
		if (!el.name) continue;
		const v = params.get(prefix + el.name);
		if (v === null) continue;
		if (el.type === 'checkbox') el.checked = v === '1';
		else el.value = v;
	}
	const save = () => {
		const p = new URLSearchParams(location.hash.slice(1));
		for (const el of Array.from(form.elements) as HTMLInputElement[]) {
			if (!el.name) continue;
			p.set(prefix + el.name, el.type === 'checkbox' ? (el.checked ? '1' : '0') : el.value);
		}
		history.replaceState(null, '', `#${p.toString()}`);
	};
	const run = () => {
		try {
			recalc();
		} catch (e) {
			const out = form.closest('[data-tool]')?.querySelector('[data-out]');
			if (out) out.innerHTML = `<p class="sf-tool__error">${esc(e instanceof Error ? e.message : String(e))}</p>`;
		}
	};
	form.addEventListener('input', () => {
		run();
		save();
	});
	form.addEventListener('submit', (e) => e.preventDefault());
	run();
}
