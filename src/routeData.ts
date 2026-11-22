import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const data = route.entry.data;

	// Hero buttons are written from the site root; add the base path (e.g. /sangriaGuide).
	for (const action of data.hero?.actions ?? [])
		if (base && action.link.startsWith('/') && !action.link.startsWith(base + '/')) action.link = base + action.link;

	// Use a page's `summary` (when set) for link previews in chat apps and search results.
	const summary = data.summary;
	if (!summary) return;
	const previewKeys = new Set(['description', 'og:description', 'twitter:description']);
	for (const tag of route.head) {
		const key = tag.attrs?.name ?? tag.attrs?.property;
		if (tag.tag === 'meta' && typeof key === 'string' && previewKeys.has(key)) tag.attrs!.content = summary;
	}
});
