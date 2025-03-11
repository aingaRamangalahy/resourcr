import { useResourcesStore } from "~/stores/resources";
import type { Topic, ResourceType, DifficultyLevel } from "~/types";
import type { Category } from "~/types/category";

export function useResourceFilters() {
  const store = useResourcesStore();
  const route = useRoute();

  // Filter state
  const selectedSubcategories = ref<string[]>([]);
  const selectedTopics = ref<string[]>([]);
  const selectedTypes = ref<ResourceType[]>([]);
  const selectedDifficulties = ref<DifficultyLevel[]>([]);
  const searchQuery = ref<string>("");
  const sortBy = ref<string>("popularity");
  
  // Loading states
  const isLoadingTopics = ref(true);
  const isLoadingCategories = ref(true);

  // Fetch data from Nuxt Content
  const { data: topicsData, pending: topicsPending } = useAsyncData(
    'topics', 
    () => queryCollection('topics').first()
  );
  
  const { data: categoriesData, pending: categoriesPending } = useAsyncData(
    'categories', 
    () => queryCollection('categories').first()
  );

  watch(topicsPending, (val) => {
    isLoadingTopics.value = val;
  });

  watch(categoriesPending, (val) => {
    isLoadingCategories.value = val;
  });

  // Computed properties for topics and categories
  const topics = computed(() => {
    if (!topicsData.value || !topicsData.value.topics) return [];
    return topicsData.value.topics as Topic[];
  });
  
  const categories = computed(() => {
    if (!categoriesData.value || !categoriesData.value.categories) return [];
    return categoriesData.value.categories as Category[];
  });

  // Get topic name by ID
  const getTopicName = (topicId: string) => {
    if (isLoadingTopics.value) return topicId;
    
    const topic = topics.value.find(t => t.id === topicId);
    return topic ? topic.name : topicId;
  };

  // Resource type options
  const resourceTypes = [
    { label: "Video", value: "video" },
    { label: "Blog", value: "blog" },
    { label: "Interactive", value: "interactive" },
    { label: "Documentation", value: "documentation" },
    { label: "Course", value: "course" },
  ];

  const getTypeName = (typeId: string) => {
    const type = resourceTypes.find(t => t.value === typeId);
    return type ? type.label : typeId;
  };

  // Difficulty level options
  const difficultyLevels = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const getDifficultyName = (difficultyId: string) => {
    const difficulty = difficultyLevels.find(d => d.value === difficultyId);
    return difficulty ? difficulty.label : difficultyId;
  };

  // Sort options
  const sortOptions = [
    { label: "Most Popular", value: "popularity" },
    { label: "Newest", value: "date" },
    { label: "Alphabetical", value: "title" },
  ];

  // Check if category is expanded
  const isExpanded = (categoryId: string) => {
    return store.expandedCategories.includes(categoryId);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    store.toggleCategory(categoryId);
  };

  // Get resource counts
  const resourceCountByCategory = (categoryId: string) => {
    return store.resourceCountByCategory(categoryId);
  };

  const resourceCountByTopic = (topicId: string) => {
    return store.resourceCountByTopic(topicId);
  };

  // Handle filter changes
  const handleSubcategoryChange = () => {
    store.setSelectedSubcategories(selectedSubcategories.value);
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

  const handleSearchChange = () => {
    store.setSearchQuery(searchQuery.value);
  };

  const handleSortChange = (sort: string) => {
    store.setSortBy(sort as "popularity" | "date" | "title");
  };

  // Remove individual filters
  const removeTopic = (topicId: string) => {
    selectedTopics.value = selectedTopics.value.filter(id => id !== topicId);
    handleTopicChange();
  };

  const removeType = (typeId: string) => {
    selectedTypes.value = selectedTypes.value.filter(id => id !== typeId);
    handleTypeChange();
  };

  const removeDifficulty = (difficultyId: string) => {
    selectedDifficulties.value = selectedDifficulties.value.filter(id => id !== difficultyId);
    handleDifficultyChange();
  };

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return (
      selectedTopics.value.length > 0 ||
      selectedTypes.value.length > 0 ||
      selectedDifficulties.value.length > 0 ||
      searchQuery.value.length > 0
    );
  });

  // Clear all filters
  const clearFilters = () => {
    selectedSubcategories.value = [];
    selectedTopics.value = [];
    selectedTypes.value = [];
    selectedDifficulties.value = [];
    searchQuery.value = "";
    sortBy.value = "popularity";
    store.clearFilters();
  };

  // Apply all filters at once
  const applyFilters = () => {
    handleSubcategoryChange();
    handleTopicChange();
    handleTypeChange();
    handleDifficultyChange();
    handleSearchChange();
    handleSortChange(sortBy.value);
  };

  // Initialize with URL parameters if provided
  const initializeFromRoute = () => {
    if (route.query.topic) {
      const topicId = route.query.topic as string;
      selectedTopics.value = [topicId];
      store.setSelectedTopics(selectedTopics.value);
      
      // Expand the parent category of this topic
      if (!isLoadingCategories.value) {
        for (const category of categories.value) {
          for (const subcategory of category.subcategories) {
            if (subcategory.topics.includes(topicId)) {
              store.toggleCategory(category.id);
              break;
            }
          }
        }
      }
    }
  };

  onMounted(() => {
    // Wait for categories to be loaded before initializing from route
    watch([isLoadingCategories, isLoadingTopics], ([catLoading, topLoading]) => {
      if (!catLoading && !topLoading) {
        initializeFromRoute();
      }
    }, { immediate: true });
    
    // Also fetch resources when composable is mounted
    store.fetchResources();
  });

  return {
    // State
    selectedSubcategories,
    selectedTopics,
    selectedTypes,
    selectedDifficulties,
    searchQuery,
    sortBy,
    isLoadingTopics,
    isLoadingCategories,
    
    // Data
    topics,
    categories,
    resourceTypes,
    difficultyLevels,
    sortOptions,
    
    // Computed
    hasActiveFilters,
    
    // Methods
    getTopicName,
    getTypeName,
    getDifficultyName,
    isExpanded,
    toggleCategory,
    resourceCountByCategory,
    resourceCountByTopic,
    handleSubcategoryChange,
    handleTopicChange,
    handleTypeChange,
    handleDifficultyChange,
    handleSearchChange,
    handleSortChange,
    removeTopic,
    removeType,
    removeDifficulty,
    clearFilters,
    applyFilters
  };
}