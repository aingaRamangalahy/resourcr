<template>
  <div>
    <!-- Filter button -->
    <UButton
      icon="i-heroicons-adjustments-horizontal"
      color="gray"
      variant="soft"
      class="fixed bottom-4 right-4 lg:hidden rounded-full shadow-lg z-20"
      @click="isOpen = true"
    >
      Filters
    </UButton>

    <!-- Drawer -->
    <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-md' }">
      <div class="p-4 space-y-6 h-[90vh] overflow-y-auto scrollbar-primary">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-primary dark:text-primary-dark">Categories & Topics</h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            class="p-1"
            @click="isOpen = false"
          />
        </div>

        <CategoriesFilterContent />

        <!-- Apply filters button -->
        <div class="sticky bottom-0 bg-white dark:bg-gray-900 pt-4">
          <UButton block color="primary" @click="applyAndClose"> Apply Filters </UButton>

          <UButton
            v-if="hasCategoryOrTopicFilters"
            block
            color="gray"
            variant="soft"
            class="mt-2"
            @click="clearCategoryAndTopicFilters"
          >
            Clear Category Filters
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useResourceFilters } from "~/composables/useResourceFilters";

const isOpen = ref(false);
const {
  applyFilters,
  selectedSubcategories,
  selectedTopics,
  handleSubcategoryChange,
  handleTopicChange,
} = useResourceFilters();

const applyAndClose = () => {
  applyFilters();
  isOpen.value = false;
};

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
  isOpen.value = false;
};
</script>
