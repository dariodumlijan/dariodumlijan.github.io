import { defineCollection, z } from 'astro:content';

const jobs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		company: z.object({
			name: z.string(),
			url: z.string().optional(),
		}),
		client: z.object({
			name: z.string(),
			url: z.string().optional(),
		}),
		from: z.string(),
		to: z.string(),
	}),
});

const project = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		language: z.string(),
	}),
});

export const collections = { jobs, project };
