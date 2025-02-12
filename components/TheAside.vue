<template>
  <!-- Sidebar -->
  <div class="w-64 hidden lg:block">
    <div class="sticky top-[80px] px-8 space-y-6">
      <div class="space-y-4">
        <h3 class="font-semibold text-primary dark:text-primary-dark">Categories</h3>
        <div class="space-y-2">
          <UCheckbox
            v-for="topic in topics"
            :key="topic.id"
            v-model="selectedTopics"
            :label="topic.name"
            :value="topic.id"
            @change="handleTopicChange"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-semibold text-primary dark:text-primary-dark">Type</h3>
        <div class="space-y-2">
          <UCheckbox
            v-for="type in resourceTypes"
            :key="type.value"
            v-model="selectedTypes"
            :label="type.label"
            :value="type.value"
            @change="handleTypeChange"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-semibold text-primary dark:text-primary-dark">Difficulty</h3>
        <div class="space-y-2">
          <UCheckbox
            v-for="level in difficultyLevels"
            :key="level.value"
            v-model="selectedDifficulties"
            :label="level.label"
            :value="level.value"
            @change="handleDifficultyChange"
          />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-semibold text-primary dark:text-primary-dark">Sort By</h3>
        <USelect v-model="sortBy" :options="sortOptions" @update:model-value="handleSortChange" />
      </div>

      <UButton
        color="gray"
        class="bg-secondary dark:bg-secondary-dark"
        variant="soft"
        block
        @click="clearFilters"
      >
        Clear Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourcesStore } from "~/stores/resources";
import type { Topic, ResourceType, DifficultyLevel } from "~/types";

const store = useResourcesStore();
const route = useRoute();

const selectedTypes = ref<ResourceType[]>([]);
const selectedDifficulties = ref<DifficultyLevel[]>([]);
const selectedTopics = ref<string[]>([]);

const sortBy = ref<string>("popularity");

const topics: Topic[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "i-logos-javascript",
    description: "Learn modern JavaScript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "i-logos-typescript-icon",
    description: "Master TypeScript",
  },
  {
    id: "react",
    name: "React",
    icon: "i-logos-react",
    description: "Build with React",
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "i-logos-vue",
    description: "Create with Vue",
  },
  {
    id: "angular",
    name: "Angular",
    icon: "i-logos-angular-icon",
    description: "Develop with Angular",
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: "i-logos-svelte-icon",
    description: "Build with Svelte",
  },
  {
    id: "node",
    name: "Node.js",
    icon: "i-logos-nodejs-icon",
    description: "Server-side JavaScript",
  },
];

const resourceTypes = [
  { label: "Video", value: "video" },
  { label: "Blog", value: "blog" },
  { label: "Interactive", value: "interactive" },
  { label: "Documentation", value: "documentation" },
  { label: "Course", value: "course" },
];

const difficultyLevels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const sortOptions = [
  { label: "Most Popular", value: "popularity" },
  { label: "Newest First", value: "date" },
  { label: "Alphabetical", value: "title" },
];

const handleTopicChange = () => {
  store.setSelectedTopics(selectedTopics.value);
};

const handleTypeChange = () => {
  store.setSelectedTypes(selectedTypes.value);
};

const handleDifficultyChange = () => {
  store.setSelectedDifficulties(selectedDifficulties.value);
};

const handleSortChange = (sort: string) => {
  store.setSortBy(sort as "popularity" | "date" | "title");
};

// If topic is provided in URL, select it
if (route.query.topic) {
  selectedTopics.value = [route.query.topic as string];
  store.setSelectedTopics(selectedTopics.value);
}
const clearFilters = () => {
  selectedTopics.value = [];
  selectedTypes.value = [];
  selectedDifficulties.value = [];
  sortBy.value = "popularity";
  store.clearFilters();
};
</script>
