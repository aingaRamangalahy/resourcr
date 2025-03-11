export interface Resource {
  title: string;
  description: string;
  url: string;
  type: "video" | "blog" | "interactive" | "documentation" | "course";
  difficulty: "beginner" | "intermediate" | "advanced";
  topics: string[];
  tags: string[];
  popularity: number;
  addedAt: string;
  provider: string;
}

export type ResourceType = Resource["type"];
export type DifficultyLevel = Resource["difficulty"];

export const resourceTypes: ResourceType[] = [
  "video",
  "blog",
  "interactive",
  "documentation",
  "course",
] as const;
export const difficultyLevels: DifficultyLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
