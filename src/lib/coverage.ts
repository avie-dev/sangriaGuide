// Build-time access to docs/coverage.yaml (the page plan) and research/open-questions.md.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

export interface PlannedPage {
	slug: string;
	title: string;
	sources: string[];
	needs: string[];
	built: string;
	writing: string;
	verified: string;
	section: string;
}

let pages: PlannedPage[] | undefined;
let sectionTitles: Map<string, string> | undefined;

/** Sidebar section titles keyed by directory, e.g. "meditation" → "Meditation". */
export function sectionTitle(dir: string): string | undefined {
	plannedPages();
	return sectionTitles!.get(dir);
}

export function plannedPages(): PlannedPage[] {
	if (pages) return pages;
	const { sections } = parse(fs.readFileSync(path.join(process.cwd(), 'docs/coverage.yaml'), 'utf8'));
	sectionTitles = new Map(sections.map((s: { dir: string; title: string }) => [s.dir, s.title]));
	pages = sections.flatMap((s: { dir: string; articles: Record<string, any>[] }) =>
		s.articles.map((a) => ({
			slug: a.slug,
			title: a.title,
			sources: a.sources ?? [],
			needs: a.needs ?? [],
			built: a.built ?? '—',
			writing: a.writing ?? '—',
			verified: a.verified ?? '—',
			section: s.dir,
		})),
	);
	return pages!;
}

/** True when the page has a file on the site (so it is safe to link to). */
export const isLive = (p: PlannedPage) => p.built !== '—';

export interface OpenQuestion {
	id: string;
	area: string;
	question: string;
	why: string;
	checked: string;
	status: string;
}
export function openQuestions(): OpenQuestion[] {
	const md = fs.readFileSync(path.join(process.cwd(), 'research/open-questions.md'), 'utf8');
	return md
		.split('\n')
		.filter((l) => /^\| Q-\d{3} \|/.test(l))
		.map((l) => {
			const [id, area, question, why, checked, status] = l
				.slice(1, -1)
				.split(/(?<!\\)\|/)
				.map((c) => c.trim());
			return { id, area, question, why, checked, status };
		});
}

/** Site path for a planned page if it exists yet, otherwise undefined (so callers render plain text). */
export function liveHref(slug: string): string | undefined {
	const p = plannedPages().find((x) => x.slug === slug);
	return p && isLive(p) ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${slug}/` : undefined;
}
