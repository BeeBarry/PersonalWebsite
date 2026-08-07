import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { DOMAIN_SLUGS } from "./data/domains";

// draft: true döljs i prod-bygget (filtreras via showEntry i src/utils/content.ts),
// men syns alltid i `astro dev`. Default false = publik.
const draftField = z.boolean().default(false);

// Domäner ett innehåll tillhör (kan vara flera). z.enum mot DOMAIN_SLUGS gör att
// stavfel failar bygget. .default([]) → äldre innehåll utan fältet validerar.
const domainsField = z.array(z.enum(DOMAIN_SLUGS)).default([]);

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
    // Portfolio (byggt & deployat, i produktion) vs lab (experiment/open source).
    type: z.enum(["portfolio", "lab"]).default("lab"),
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
    domains: domainsField,
    draft: draftField,
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Måste hållas i synk med src/data/categories.ts — enum:en gör att en
    // felstavad kategori failar bygget i stället för att tyst tappa artikeln.
    category: z.enum([
      "docker",
      "kubernetes",
      "terraform",
      "azure",
      "aws",
      "cicd",
      "observability",
      "cybersecurity",
      "linux",
      "natverk",
      "git",
      "api",
      "sql",
    ]),
    image: z.object({ url: z.string(), alt: z.string() }).optional(),
    // Serienumreringen är tvånivåig: DEL.STEG (1.0, 1.1, 2.0 …). `part` är delen
    // artikeln hör till, `order` dess plats i delen och är 1-baserad — visat
    // nummer blir `${part}.${order - 1}`, så delens FÖRSTA artikel heter X.0.
    // Default part: 1 gör att befintliga artiklar med bara `order` fortsätter
    // validera och hamnar i del 1.
    part: z.number().default(1),
    order: z.number(),
    // Namn på delen, t.ex. ”Grunderna”, visas som rubrik över gruppen.
    // Räcker att sätta på en artikel i delen.
    partTitle: z.string().optional(),
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
    // Domäner inlägget tillhör (för filter på /posts + startsidans explorer).
    domains: domainsField,
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
