import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { LABELS } from './data/labels';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Writing state. Only `verified` pages count as finished content. */
				status: z.enum(['planned', 'draft', 'written', 'verified']).default('planned'),
				/** Date every claim on the page was last checked against its sources (YYYY-MM-DD). */
				lastVerified: z.coerce.date().optional(),
				/** Official source ids from src/data/official-sources.json (e.g. "guias_meditacao"). */
				sources: z.array(z.string()).default([]),
				/** Page-level labels shown under the title. */
				labels: z.array(z.enum(LABELS)).default([]),
				/** Short summary for Discord embeds; falls back to `description`. */
				summary: z.string().optional(),
			}),
		}),
	}),
};
