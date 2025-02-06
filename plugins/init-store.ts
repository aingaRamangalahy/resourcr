import { useResourcesStore } from "~/stores/resources";
import type { Resource } from "~/types/resource";

const sampleResources: Resource[] = [
  {
    id: "1",
    title: "Complete JavaScript Course",
    description:
      "Learn JavaScript from scratch with this comprehensive course covering ES6+, async programming, and modern best practices.",
    url: "https://example.com/js-course",
    type: "course",
    difficulty: "beginner",
    tags: ["javascript", "es6", "web development"],
    popularity: 985,
    dateAdded: "2024-03-15",
    provider: "freeCodeCamp",
  },
  {
    id: "2",
    title: "React Hooks Deep Dive",
    description:
      "Master React Hooks with practical examples and advanced patterns for state management and side effects.",
    url: "https://example.com/react-hooks",
    type: "video",
    difficulty: "intermediate",
    tags: ["react", "hooks", "javascript"],
    popularity: 756,
    dateAdded: "2024-03-20",
    provider: "Fireship",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    description:
      "Official TypeScript documentation covering types, interfaces, generics, and advanced features.",
    url: "https://example.com/ts-handbook",
    type: "documentation",
    difficulty: "intermediate",
    tags: ["typescript", "javascript", "programming"],
    popularity: 892,
    dateAdded: "2024-03-10",
    provider: "Microsoft",
  },
  {
    id: "4",
    title: "System Design Interview Guide",
    description:
      "Learn how to design scalable systems with real-world examples and best practices.",
    url: "https://example.com/system-design",
    type: "blog",
    difficulty: "advanced",
    tags: ["system design", "architecture", "scalability"],
    popularity: 654,
    dateAdded: "2024-03-18",
    provider: "ByteByteGo",
  },
  {
    id: "5",
    title: "Build a Full-Stack App",
    description:
      "Interactive tutorial to build a full-stack application using modern technologies.",
    url: "https://example.com/fullstack-tutorial",
    type: "interactive",
    difficulty: "intermediate",
    tags: ["full-stack", "web development", "nodejs"],
    popularity: 823,
    dateAdded: "2024-03-22",
    provider: "Frontend Masters",
  },
  {
    id: "6",
    title: "Advanced CSS Techniques",
    description: "Learn modern CSS features, animations, and responsive design patterns.",
    url: "https://example.com/advanced-css",
    type: "course",
    difficulty: "advanced",
    tags: ["css", "web development", "animations"],
    popularity: 567,
    dateAdded: "2024-03-12",
    provider: "CSS-Tricks",
  },
  {
    id: "7",
    title: "Git & GitHub Basics",
    description:
      "Master the fundamentals of version control with Git and collaboration with GitHub.",
    url: "https://example.com/git-basics",
    type: "video",
    difficulty: "beginner",
    tags: ["git", "github", "version control"],
    popularity: 934,
    dateAdded: "2024-03-19",
    provider: "GitHub",
  },
  {
    id: "8",
    title: "Docker for Developers",
    description: "Practical guide to containerization with Docker for development environments.",
    url: "https://example.com/docker-guide",
    type: "documentation",
    difficulty: "intermediate",
    tags: ["docker", "devops", "containers"],
    popularity: 745,
    dateAdded: "2024-03-16",
    provider: "Docker",
  },
  {
    id: "9",
    title: "Algorithm Challenges",
    description:
      "Interactive coding challenges to improve your algorithm and data structure skills.",
    url: "https://example.com/algo-challenges",
    type: "interactive",
    difficulty: "advanced",
    tags: ["algorithms", "data structures", "programming"],
    popularity: 678,
    dateAdded: "2024-03-21",
    provider: "LeetCode",
  },
];

export default defineNuxtPlugin(() => {
  const store = useResourcesStore();
  store.$patch({ resources: sampleResources });
});
