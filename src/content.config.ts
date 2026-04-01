import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from "astro/zod";

const shared = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/shared" }),
	schema: z.object({
		// bio.md
		component: z.string().optional(),
		// misc.md
		experience: z.object({
			component: z.string()
		}).optional(),
		featured: z.object({
			component: z.string(),
			cta: z.string()
		}).optional(),
		project: z.object({
			component: z.string(),
			cta: z.string()
		}).optional(),
		// skills.md
		sortBy: z.object({
			label: z.string(),
			option: z.string()
		}).optional(),
		skills: z.array(z.object({
			language: z.string(),
			link: z.string(),
			year: z.number()
		})).optional(),
		// profile.md - SEO
		baseUrl: z.string().optional(),
		title: z.string().optional(),
		description: z.string().optional(),
		keywords: z.array(z.string()).optional(),
		// profile.md - component
		name: z.string().optional(),
		location: z.string().optional(),
		cta: z.object({
			label: z.string(),
			value: z.string()
		}).optional(),
		socials: z.array(z.object({
			icon: z.string(),
			label: z.string(),
			value: z.string()
		})).optional(),
	}),
});

const jobs = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
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
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
	schema: z.object({
		order: z.number(),
		title: z.string(),
		description: z.string(),
		language: z.string(),
	}),
});

export const collections = { shared, jobs, projects };
