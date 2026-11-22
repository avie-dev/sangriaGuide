// Adds the site's base path to root-relative links in articles, so the wiki works when it's served
// from a sub-path such as https://avie-dev.github.io/sangriaGuide/.
//
// Articles keep writing links from the site root ([Classes](/classes/), <LinkCard href="/classes/">).
// This rewrites them at build time, as a hast plugin for Astro's Markdown processor (Sätteri). It's
// registered by an integration placed before Starlight, so it runs before starlight-links-validator
// and the validator checks the final links. It does nothing when the base is "/".

/** @param {string} base e.g. "/sangriaGuide" */
export function baseLinksHastPlugin(base) {
	const prefix = base.replace(/\/$/, '');
	/** @param {unknown} url */
	const fix = (url) =>
		typeof url === 'string' && prefix && url.startsWith('/') && !url.startsWith('//') && url !== prefix && !url.startsWith(prefix + '/') ? prefix + url : url;
	// Sätteri hands visitors read-only snapshots: change a property with ctx.setProperty, or return a
	// replacement node.
	/** @param {any} node */
	const fixJsx = (node) => {
		let changed = false;
		const attributes = (node.attributes ?? []).map((/** @type {any} */ attr) => {
			if (attr.type !== 'mdxJsxAttribute' || (attr.name !== 'href' && attr.name !== 'link') || typeof attr.value !== 'string') return attr;
			const value = fix(attr.value);
			if (value === attr.value) return attr;
			changed = true;
			return { ...attr, value };
		});
		return changed ? { ...node, attributes } : undefined;
	};
	return {
		name: 'sangria-base-links',
		element: {
			filter: ['a'],
			/** @param {any} node @param {any} ctx */
			visit(node, ctx) {
				const href = node.properties?.href;
				const fixed = fix(href);
				if (fixed !== href) ctx.setProperty(node, 'href', fixed);
			},
		},
		mdxJsxFlowElement: { filter: [], visit: fixJsx },
		mdxJsxTextElement: { filter: [], visit: fixJsx },
	};
}

/**
 * Astro integration that adds the plugin to the Markdown processor. List it before Starlight.
 * @param {string} base
 * @returns {import('astro').AstroIntegration}
 */
export function baseLinks(base) {
	return {
		name: 'sangria-base-links',
		hooks: {
			'astro:config:setup': ({ config }) => {
				if (base.replace(/\/$/, '') === '') return;
				const processor = /** @type {any} */ (config.markdown).processor;
				if (processor?.name !== 'satteri' || !Array.isArray(processor.options?.hastPlugins))
					throw new Error('base-links: expected the Sätteri Markdown processor (Astro 7 default)');
				processor.options.hastPlugins.unshift(baseLinksHastPlugin(base));
			},
		},
	};
}
