// Build-time data for the calculators, read from the validated collections.
import { getCollection } from 'astro:content';
import type { Constants } from './calc/constants.ts';

export async function constantsMap(): Promise<Constants> {
	return Object.fromEntries((await getCollection('constants')).map((e) => [e.id, e.data.value]));
}

export async function chapterTransfusions(): Promise<number[]> {
	return (await getCollection('lostBook')).map((e) => e.data.transfusion).sort((a, b) => a - b);
}
