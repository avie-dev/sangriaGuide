/** Content labels from the brief (section 5). Keys are what authors write in frontmatter and in <Label />. */
export const LABELS = ['official', 'community', 'rpg04', 'verify', 'vip', 'purchase'] as const;
export type LabelKey = (typeof LABELS)[number];

export const LABEL_INFO: Record<LabelKey, { text: string; meaning: string }> = {
	official: {
		text: 'Officially confirmed',
		meaning: 'Stated in an official Sangria Falls guide or class page, linked in the sources.',
	},
	community: {
		text: 'Community recommendation',
		meaning: 'Advice from players or from this wiki. Useful, but not an official rule.',
	},
	rpg04: {
		text: 'RPG 04 specific',
		meaning: 'Applies to [GLOBAL] Sangria Falls [RPG 04] [2X]; other Sangria Falls servers may differ.',
	},
	verify: {
		text: 'Requires verification',
		meaning: 'Not documented officially, or the sources disagree. Treat it as unconfirmed.',
	},
	vip: {
		text: 'VIP feature',
		meaning: 'Needs active VIP status.',
	},
	purchase: {
		text: 'Optional purchase',
		meaning: 'Unlocked separately by donation (for example Double Meditation or the Bloody Pass).',
	},
};
