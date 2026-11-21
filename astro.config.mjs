// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Sidebar sections follow the wiki structure in docs/master-prompt.md (sections A–S).
/** @param {string} label @param {string} directory */
const section = (label, directory) => ({ label, collapsed: true, items: [{ autogenerate: { directory } }] });

export default defineConfig({
	// Placeholder until a domain is chosen; used for the sitemap and canonical URLs.
	site: 'https://sangria-falls-wiki.pages.dev',
	integrations: [
		starlight({
			title: 'Sangria Falls Wiki',
			description:
				'Unofficial, English-first community wiki for the Sangria Falls V Rising server: from your first login to endgame.',
			lastUpdated: true,
			// Off while every section has only an "Overview" page (prev/next would all read "Overview").
			// Turn back on once sections have real articles.
			pagination: false,
			customCss: [
				'@fontsource/cinzel/600.css',
				'@fontsource/cinzel/700.css',
				'@fontsource-variable/inter',
				'./src/styles/theme.css',
			],
			components: {
				// Dark mode by default; a stored choice still wins.
				ThemeProvider: './src/components/overrides/ThemeProvider.astro',
				// Unofficial-site notice on every page.
				Footer: './src/components/overrides/Footer.astro',
				// Labels and work-in-progress notice under the title.
				PageTitle: './src/components/overrides/PageTitle.astro',
				// Official sources and last-verified date at the end of each article.
				MarkdownContent: './src/components/overrides/MarkdownContent.astro',
			},
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#14110f' } },
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'Sangria Falls Wiki (unofficial)' } },
			],
			sidebar: [
				{ label: 'About this wiki', items: ['about', 'about/labels', 'about/sources'] },
				section('Getting started', 'getting-started'),
				section('Progression walkthrough', 'walkthrough'),
				section('Character progression', 'character'),
				section('Meditation', 'meditation'),
				section('Classes', 'classes'),
				section('Equipment and builds', 'equipment'),
				section('Pets and Sangrulhos', 'companions'),
				section('Professions', 'professions'),
				section('Economy', 'economy'),
				section('Dungeons', 'dungeons'),
				section('Events', 'events'),
				section('Outposts and quests', 'quests'),
				section('Vampiric Schools', 'schools'),
				section('Endgame', 'endgame'),
				section('Battle Pass and VIP', 'support'),
				section('World and community', 'world'),
				section('Reference', 'reference'),
				section('Tools', 'tools'),
			],
		}),
	],
});
