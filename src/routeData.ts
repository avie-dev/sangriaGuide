import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// Use a page's `summary` (when set) for link previews in Discord and other apps.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const summary = route.entry.data.summary;
	if (!summary) return;
	const previewKeys = new Set(['description', 'og:description', 'twitter:description']);
	for (const tag of route.head) {
		const key = tag.attrs?.name ?? tag.attrs?.property;
		if (tag.tag === 'meta' && typeof key === 'string' && previewKeys.has(key)) tag.attrs!.content = summary;
	}
});
