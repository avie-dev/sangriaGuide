import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { LABELS } from './data/labels';
import officialSources from './data/official-sources.json';

// Every `sources` list, in articles and data files, must use ids from the source registry.
const SOURCE_IDS = new Set(officialSources.map((s) => s.id));
const sourceIds = z
	.array(z.string())
	.default([])
	.superRefine((ids, ctx) => {
		for (const id of ids)
			if (!SOURCE_IDS.has(id)) ctx.addIssue({ code: 'custom', message: `Unknown source id "${id}" (see src/data/official-sources.json)` });
	});
const questionIds = z.array(z.string().regex(/^Q-\d{3}$/)).default([]);

const currencies = defineCollection({
	loader: file('src/data/currencies.yaml'),
	schema: z.object({
		name: z.string(),
		ptName: z.string().optional(),
		aliases: z.array(z.string()).default([]),
		summary: z.string(),
		earn: z.array(z.string()),
		spend: z.array(z.string()),
		item: z.string().optional(),
		sources: sourceIds,
	}),
});

const classes = defineCollection({
	loader: file('src/data/classes.yaml'),
	schema: z.object({
		order: z.number().int(),
		name: z.string(),
		ptName: z.string().optional(),
		role: z.string(),
		scaling: z.enum(['physical', 'magic', 'hybrid']),
		weapons: z.array(z.string()).min(1),
		mentor: z.string().nullable(),
		evolutions: z.array(z.string()).max(3),
		requires: z.array(z.object({ class: reference('classes'), evolution: z.number().int().min(1).max(3) })).default([]),
		starting: z.boolean().default(false),
		sources: sourceIds,
	}),
});

const costTables = defineCollection({
	loader: file('src/data/cost-tables.yaml'),
	schema: z
		.object({
			title: z.string(),
			currency: reference('currencies'),
			rowLabel: z.string(),
			rows: z.array(z.object({ label: z.string(), cost: z.number().nonnegative().nullable() })).min(1),
			total: z.number().optional(),
			note: z.string().optional(),
			missing: questionIds,
			sources: sourceIds.pipe(z.array(z.string()).min(1)),
		})
		.superRefine((t, ctx) => {
			// When every row has a cost, a stated total must equal their sum.
			const known = t.rows.every((r) => r.cost !== null);
			const sum = t.rows.reduce((a, r) => a + (r.cost ?? 0), 0);
			if (known && t.total !== undefined && t.total !== sum)
				ctx.addIssue({ code: 'custom', message: `total ${t.total} ≠ sum of rows ${sum}` });
		}),
});

const npcs = defineCollection({
	loader: file('src/data/npcs.yaml'),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		where: z.string().nullable(),
		beginner: z.boolean().default(false),
		sources: sourceIds.pipe(z.array(z.string()).min(1)),
	}),
});

const constants = defineCollection({
	loader: file('src/data/constants.yaml'),
	schema: z.object({
		value: z.number(),
		unit: z.string(),
		note: z.string().optional(),
		derived: z.boolean().default(false),
		sources: sourceIds.pipe(z.array(z.string()).min(1)),
	}),
});

const dungeonKeys = defineCollection({
	loader: file('src/data/dungeon-keys.yaml'),
	schema: z.object({
		name: z.string(),
		order: z.number().int(),
		materials: z.array(z.object({ item: z.string(), qty: z.number().int().positive() })).min(1),
		fuseFrom: z.number().int().positive().nullable(),
		sources: sourceIds.pipe(z.array(z.string()).min(1)),
	}),
});

const attrList = z.array(z.object({ name: z.string(), value: z.string().regex(/^[+-]\d+(\.\d+)?%?$/) })).min(1);
const buffs = defineCollection({
	loader: file('src/data/buffs.yaml'),
	schema: z.discriminatedUnion('kind', [
		z.object({ kind: z.literal('prestige'), prestige: z.number().int().min(1).max(20), attrs: attrList, sources: sourceIds }),
		z.object({ kind: z.literal('achievement'), name: z.string(), attrs: attrList, sources: sourceIds }),
	]),
});

const lostBook = defineCollection({
	loader: file('src/data/lost-book.yaml'),
	schema: z.object({
		chapter: z.number().int().min(1).max(23),
		book: z.number().int().min(1).max(3),
		transfusion: z.number().int().min(1).max(250),
		sources: sourceIds,
	}),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Writing state. Only `verified` pages count as finished content. */
				status: z.enum(['planned', 'draft', 'written', 'verified']).default('planned'),
				/** Date every claim on the page was last checked against its sources (YYYY-MM-DD). */
				lastVerified: z.coerce.date().optional(),
				/** Official source ids from src/data/official-sources.json (e.g. "meditacao"). */
				sources: sourceIds,
				/** Page-level labels shown under the title. */
				labels: z.array(z.enum(LABELS)).default([]),
				/** One- or two-sentence summary for Discord and social previews; falls back to `description`. */
				summary: z.string().max(300).optional(),
			}),
		}),
	}),
	currencies,
	classes,
	costTables,
	npcs,
	constants,
	dungeonKeys,
	buffs,
	lostBook,
};
