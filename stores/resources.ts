import { defineStore } from "pinia";
import type { Resource, ResourceType, DifficultyLevel } from "~/types/resource";

interface ResourcesState {
  resources: Resource[];
  selectedTopics: string[];
  selectedTypes: ResourceType[];
  selectedDifficulties: DifficultyLevel[];
  selectedTags: string[];
  searchQuery: string;
  sortBy: "popularity" | "date" | "title";
  viewMode: "grid" | "list";
}

export const useResourcesStore = defineStore("resources", {
  state: (): ResourcesState => ({
    resources: [],
    selectedTopics: [],
    selectedTypes: [],
    selectedDifficulties: [],
    selectedTags: [],
    searchQuery: "",
    sortBy: "popularity",
    viewMode: "list",
  }),

  getters: {
    filteredResources: (state) => {
      let filtered = [...state.resources];

      if (state.selectedTopics.length > 0) {
        filtered = filtered.filter((r) =>
          r.topics.some((topic) => state.selectedTopics.includes(topic))
        );
      }

      if (state.selectedTypes.length > 0) {
        filtered = filtered.filter((r) => state.selectedTypes.includes(r.type));
      }

      if (state.selectedDifficulties.length > 0) {
        filtered = filtered.filter((r) => state.selectedDifficulties.includes(r.difficulty));
      }

      if (state.selectedTags.length > 0) {
        filtered = filtered.filter((r) => state.selectedTags.some((tag) => r.tags.includes(tag)));
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
        );
      }

      switch (state.sortBy) {
        case "popularity":
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
        case "date":
          filtered.sort(
            (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          );
          break;
        case "title":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }

      return filtered;
    },
  },

  actions: {
    async fetchResources() {
      const { data } = await useAsyncData('resources', () =>
        queryCollection('resources').first()
      );
      this.resources = data.value?.resources.map((resource: any) => ({
        ...resource,
        type: resource.type as ResourceType,
        difficulty: resource.difficulty as DifficultyLevel,
      })) || [];
    },
    setSortBy(sort: "popularity" | "date" | "title") {
      this.sortBy = sort;
    },
    setSelectedTopics(topics: string[]) {
      this.selectedTopics = topics;
    },
    setSelectedTypes(types: ResourceType[]) {
      this.selectedTypes = types;
    },
    setSelectedDifficulties(difficulties: DifficultyLevel[]) {
      this.selectedDifficulties = difficulties;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    clearFilters() {
      this.selectedTopics = [];
      this.selectedTypes = [];
      this.selectedDifficulties = [];
      this.selectedTags = [];
      this.searchQuery = "";
    },
  },
});
