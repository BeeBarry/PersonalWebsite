import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// draft: true döljs i prod-bygget (filtreras via showEntry i src/utils/content.ts),
// men syns alltid i `astro dev`. Default false = publik.
const draftField = z.boolean().default(false);

// Lucide-ikoner som tillåts för post-cover-glow.
const postIcon = z.enum([
  "Activity",
  "Bug",
  "Server",
  "BookOpen",
  "Palette",
  "Terminal",
]).default("BookOpen");

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Portfolio-grupperingen: "Smrtec · IoT-drift" eller "Eget · open source"
    kind: z.string().default("Eget · open source"),
    year: z.string().default(""),
    // Huvudbild överst i projektvyn (16:9). Saknas → ingen cover-ruta.
    cover: z.object({ url: z.string(), alt: z.string() }).optional(),
    // Långform-paragrafer för sheet-drawer / projektdetalj-sida.
    body: z.array(z.string()).optional(),
    // Bildtexter för media-frames i sheet.
    media: z.array(z.string()).optional(),
    logo: z.string().optional(),
    // Genuina projektens fält — alla optional för bakåtkompabilitet.
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage1: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage2: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage3: z.object({ url: z.string(), alt: z.string() }).optional(),
    worksImage4: z.object({ url: z.string(), alt: z.string() }).optional(),
    platform: z.string().optional(),
    stack: z.string().default(""),
    website: z.string().optional(),
    github: z.string().optional(),
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

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().default("Barry"),
    date: z.string(),
    // Ämne för filtrering på /posts/ (chip-rad). Saknas → "Övrigt".
    category: z.enum(["IoT", "Cloud & DevOps", "Övrigt"]).default("Övrigt"),
    // Portfolio-fält för artikelvyn
    read: z.string().optional(),
    tags: z.string().optional(),
    icon: postIcon,
    // Huvudbild överst i artikelvyn (16:9). Saknas → ingen cover-ruta.
    cover: z.object({ url: z.string(), alt: z.string() }).optional(),
    // Långform-paragrafer (alternativ till markdown-body)
    body: z.array(z.string()).optional(),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    draft: draftField,
  }),
});

export const collections = { projects, learn, posts };
