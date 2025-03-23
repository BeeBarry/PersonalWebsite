import { z, defineCollection } from "astro:content";

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    worksImage1: z.object({
      url: z.string(),
      alt: z.string()
    }),
    worksImage2: z.object({
      url: z.string(),
      alt: z.string()
    }),
    worksImage3: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(), // optional gör att äldre projekt utan dessa fortfarande fungerar
    worksImage4: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    platform: z.string(),
    stack: z.string(),
    website: z.string(),
    github: z.string(),
  })
});

const learnCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['docker', 'kubernetes','terraform','azure','cybersecurity']),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    order: z.number(),
    date: z.string(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = {
  projects: projectsCollection,
  learn: learnCollection,
};