import { defineStore } from "pinia";
import type { Resource, ResourceType, DifficultyLevel } from "~/types/resource";

interface ResourcesState {
  resources: Resource[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedTopics: string[];
  selectedTypes: ResourceType[];
  selectedDifficulties: DifficultyLevel[];
  selectedTags: string[];
  searchQuery: string;
  sortBy: "popularity" | "date" | "title";
  expandedCategories: string[];
  isLoading: boolean;
}

export const useResourcesStore = defineStore("resources", {
  state: (): ResourcesState => ({
    resources: [],
    selectedCategories: [],
    selectedSubcategories: [],
    selectedTopics: [],
    selectedTypes: [],
    selectedDifficulties: [],
    selectedTags: [],
    searchQuery: "",
    sortBy: "popularity",
    expandedCategories: [],
    isLoading: false,
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

      // Apply sorting
      switch (state.sortBy) {
        case "popularity":
          filtered.sort((a, b) => b.popularity - a.popularity);
          break;
        case "date":
          filtered.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
          break;
        case "title":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }

      return filtered;
    },

    // Count resources by category
    resourceCountByCategory: (state) => (categoryId: string) => {
      return state.resources.filter((r) =>
        r.topics.some(
          (topic) =>
            state.selectedCategories.includes(categoryId) ||
            state.selectedSubcategories.includes(categoryId)
        )
      ).length;
    },

    // Count resources by topic
    resourceCountByTopic: (state) => (topicId: string) => {
      return state.resources.filter((r) => r.topics.includes(topicId)).length;
    },
  },

  actions: {
    async fetchResources() {
      const maxRetries = 3;
      const retryDelay = 1000;

      let attempts = 0;
      let success = false;

      this.isLoading = true;

      while (!success && attempts < maxRetries) { 
        try {
          const { data } = await useAsyncData("resources", () =>
            queryCollection("resources").first()
          );
  
          if (data.value && data.value.resources) {
            this.resources = data.value.resources.map((resource: any) => ({
              ...resource,
              type: resource.type as ResourceType,
              difficulty: resource.difficulty as DifficultyLevel,
            }));
            success = true;
          } else {
            attempts++;
            console.warn(`Resources data not ready (attempt ${attempts}/${maxRetries}):`, data.value);
            if (attempts < maxRetries) {
              await new Promise((resolve) => setTimeout(resolve, retryDelay));
            } else {
              console.error("Failed to fetch resources data after multiple attempts.");
              this.resources = [];
            }
          }
        } catch (error) {
          console.error("Error fetching resources:", error);
          this.resources = [];
          attempts = maxRetries;// stop retrying
        } finally {
          if (attempts === maxRetries || success) { 
            this.isLoading = false;
          }
        }
      }
      
    },

    toggleCategory(categoryId: string) {
      const index = this.expandedCategories.indexOf(categoryId);
      if (index === -1) {
        this.expandedCategories.push(categoryId);
      } else {
        this.expandedCategories.splice(index, 1);
      }
    },

    setSelectedCategories(categories: string[]) {
      this.selectedCategories = categories;
    },

    setSelectedSubcategories(subcategories: string[]) {
      this.selectedSubcategories = subcategories;
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

    setSortBy(sortBy: "popularity" | "date" | "title") {
      this.sortBy = sortBy;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    clearFilters() {
      this.selectedCategories = [];
      this.selectedSubcategories = [];
      this.selectedTopics = [];
      this.selectedTypes = [];
      this.selectedDifficulties = [];
      this.selectedTags = [];
      this.searchQuery = "";
    },
  },
});
