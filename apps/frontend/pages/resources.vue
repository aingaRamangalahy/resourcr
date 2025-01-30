<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8">
        <!-- Sidebar -->
        <div class="w-64 hidden lg:block">
          <div class="sticky top-[73px] space-y-6">
            <div class="space-y-4">
              <h3 class="font-semibold text-slate-900 dark:text-white">Topics</h3>
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
              <h3 class="font-semibold text-slate-900 dark:text-white">Type</h3>
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
              <h3 class="font-semibold text-slate-900 dark:text-white">Difficulty</h3>
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
              <h3 class="font-semibold text-slate-900 dark:text-white">Sort By</h3>
              <USelect
                v-model="sortBy"
                :options="sortOptions"
                @update:model-value="handleSortChange"
              />
            </div>

            <UButton color="gray" variant="soft" block @click="clearFilters">
              Clear Filters
            </UButton>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Learning Resources</h2>
            <UButtonGroup>
              <UButton
                :color="viewMode === 'grid' ? 'primary' : 'gray'"
                @click="setViewMode('grid')"
              >
                <UIcon name="i-heroicons-squares-2x2" />
              </UButton>
              <UButton
                :color="viewMode === 'list' ? 'primary' : 'gray'"
                @click="setViewMode('list')"
              >
                <UIcon name="i-heroicons-bars-3" />
              </UButton>
            </UButtonGroup>
          </div>

          <div
            :class="[
              viewMode === 'grid' ? 'grid gap-6' : 'space-y-4',
              viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : '',
            ]"
          >
            <ResourceCard
              v-for="resource in filteredResources"
              :key="resource.id"
              :resource="resource"
              :view-mode="viewMode"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourcesStore } from "~/stores/resources";
import type { Topic } from "~/types/resource";

const store = useResourcesStore();
const route = useRoute();

// Initialize with default values from the store
const viewMode = computed(() => store.viewMode);
const searchQuery = ref<string>("");
const selectedTopics = ref<string[]>([]);
const selectedTypes = ref<string[]>([]);
const selectedDifficulties = ref<string[]>([]);
const sortBy = ref<string>("popularity");

// If topic is provided in URL, select it
if (route.query.topic) {
  selectedTopics.value = [route.query.topic as string];
  store.setSelectedTopics(selectedTopics.value);
}

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

const filteredResources = computed(() => store.filteredResources);

const setViewMode = (mode: "grid" | "list") => {
  store.setViewMode(mode);
};

const handleSearch = () => {
  store.setSearchQuery(searchQuery.value);
};

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

const clearFilters = () => {
  searchQuery.value = "";
  selectedTopics.value = [];
  selectedTypes.value = [];
  selectedDifficulties.value = [];
  sortBy.value = "popularity";
  store.clearFilters();
};
</script>
