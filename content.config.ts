import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const resourceCollection = defineCollection({
  type: "data",
  source: "resources.json",
  schema: z.object({
    resources: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        topics: z.array(z.string()),
        type: z.string(),
        difficulty: z.string(),
        tags: z.array(z.string()),
        addedAt: z.string(),
        popularity: z.number(),
        url: z.string(),
        provider: z.string(),
      })
    ),
  }),
});

const topicCollection = defineCollection({
  type: "data",
  source: "topics.json",
  schema: z.object({
    topics: z.array(
        z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
  }),
});
export default defineContentConfig({
  collections: {
    resources: resourceCollection,
    topics: topicCollection
  },
});