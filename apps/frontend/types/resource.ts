export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "blog" | "interactive" | "documentation" | "course";
  difficulty: "beginner" | "intermediate" | "advanced";
  topics: string[];
  tags: string[];
  popularity: number;
  dateAdded: string;
  provider: string;
}

export type ResourceType = Resource["type"];
export type DifficultyLevel = Resource["difficulty"];

export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
}
