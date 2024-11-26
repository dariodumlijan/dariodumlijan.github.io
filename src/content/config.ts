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
		}).optional(),
		type: z.string(),
		from: z.string(),
		to: z.string(),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		order: z.number(),
		title: z.string(),
		description: z.string(),
		language: z.string(),
	}),
});

export const collections = { jobs, projects };
