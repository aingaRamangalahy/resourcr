import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const resourceCollection = defineCollection({
  type: "data",
  source: "resources.json",
  schema: z.object({
    resources: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        topics: z.array(z.string()),
        type: z.enum(["video", "blog", "interactive", "documentation", "course"]),
        difficulty: z.enum(["beginner", "intermediate", "advanced"]),
        tags: z.array(z.string()),
        addedAt: z.string(),
        popularity: z.number(),
        url: z.string(),
        provider: z.string(),
      })
    ),
  }),
});

const categoryCollection = defineCollection({
  type: "data",
  source: "categories.json",
  schema: z.object({
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        icon: z.string(),
        subcategories: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            topics: z.array(z.string()),
          })
        ),
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
    topics: topicCollection,
    categories: categoryCollection,
  },
});
