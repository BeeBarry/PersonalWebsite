import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// draft: true döljs i prod-bygget (filtreras via showEntry i src/utils/content.ts),
// men syns alltid i `astro dev`. Default false = publik.
const draftField = z.boolean().default(false);

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({ url: z.string(), alt: z.string() }),
    worksImage1: z.object({ url: z.string(), alt: z.string() }),
    worksImage2: z.object({ url: z.string(), alt: z.string() }),
    // optional gör att äldre projekt utan dessa fortfarande fungerar
    worksImage3: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage4: z.object({ url: z.string(), alt: z.string() }).optional(),
    platform: z.string(),
    stack: z.string(),
    website: z.string(),
    github: z.string(),
    draft: draftField,
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["docker", "kubernetes", "terraform", "azure", "cybersecurity"]),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    order: z.number(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    draft: draftField,
  }),
});

// posts saknade tidigare schema (auto-genererades). Nu definierat.
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string(),
    date: z.string(),
    image: z.object({ url: z.string(), alt: z.string() }),
    draft: draftField,
  }),
});

export const collections = { projects, learn, posts };
