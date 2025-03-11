<template>
  <div class="w-96 hidden lg:block">
    <div class="sticky top-[80px] px-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
      <CategoriesFilterContent />

      <!-- Clear filters button -->
      <UButton
        v-if="hasCategoryOrTopicFilters"
        color="gray"
        variant="soft"
        block
        @click="clearCategoryAndTopicFilters"
      >
        Clear Category Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourceFilters } from "~/composables/useResourceFilters";

const { selectedSubcategories, selectedTopics, handleSubcategoryChange, handleTopicChange } =
  useResourceFilters();

// Check if any category or topic filters are active
const hasCategoryOrTopicFilters = computed(() => {
  return selectedSubcategories.value.length > 0 || selectedTopics.value.length > 0;
});

// Clear only category and topic filters
const clearCategoryAndTopicFilters = () => {
  selectedSubcategories.value = [];
  handleSubcategoryChange();
  selectedTopics.value = [];
  handleTopicChange();
};
</script>
