import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({ label: z.string(), url: z.string().url() });

const niche = z.object({
  question: z.string(),
  hint: z.string().optional(),
});

const scenarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scenarios' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    region: z.string(),
    introduced: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    sources: z.array(source),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const eras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eras' }),
  schema: z.object({
    title: z.string(),
    label: z.string(), // short label for the timeline, e.g. "+1 Myr"
    yearsFromNow: z.number(),
    order: z.number(),
    summary: z.string(),
    climate: z.string(),
    niches: z.array(niche).default([]),
  }),
});

const species = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/species' }),
  schema: z.object({
    name: z.string(),
    binomial: z.string(),
    era: reference('eras'),
    ancestor: reference('species').optional(),
    // "real" = living species today, "canon" = written by the editors, "community" = accepted submission
    status: z.enum(['real', 'canon', 'community']),
    shape: z.enum(['hippo', 'croc', 'fish', 'bird', 'sirenian']),
    summary: z.string(),
    niche: z.string(),
    diet: z.string(),
    size: z.string(),
    habitat: z.string(),
    confidence: z.enum(['established', 'plausible', 'speculative']),
    credit: z.object({ name: z.string(), url: z.string().url().optional() }).optional(),
    niches: z.array(niche).default([]),
    sources: z.array(source).default([]),
  }),
});

export const collections = { scenarios, eras, species };
