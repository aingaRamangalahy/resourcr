<!-- filepath: c:\Users\ainga\Documents\workspace\resourcr\components\ResourceListFilters.vue -->
<template>
  <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-16 z-10">
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div class="flex flex-wrap gap-4 items-center">
        <!-- Type filter -->
        <div>
          <UPopover :ui="{ width: 'w-64' }">
            <UButton color="primary" variant="outline" trailing-icon="i-heroicons-chevron-down">
              Type {{ selectedTypes.length ? `(${selectedTypes.length})` : "" }}
            </UButton>

            <template #panel>
              <div class="p-4 space-y-2">
                <UCheckbox
                  v-for="type in resourceTypes"
                  :key="type.value"
                  v-model="selectedTypes"
                  :label="type.label"
                  :value="type.value"
                  @change="handleTypeChange"
                />
              </div>
            </template>
          </UPopover>
        </div>

        <!-- Difficulty filter -->
        <div>
          <UPopover :ui="{ width: 'w-64' }">
            <UButton variant="outline" trailing-icon="i-heroicons-chevron-down">
              Difficulty {{ selectedDifficulties.length ? `(${selectedDifficulties.length})` : "" }}
            </UButton>

            <template #panel>
              <div class="p-4 space-y-2">
                <UCheckbox
                  v-for="level in difficultyLevels"
                  :key="level.value"
                  v-model="selectedDifficulties"
                  :label="level.label"
                  :value="level.value"
                  @change="handleDifficultyChange"
                />
              </div>
            </template>
          </UPopover>
        </div>

        <!-- Active filters display -->
        <div class="flex flex-wrap gap-2 items-center">
          <UBadge
            v-for="type in selectedTypes"
            :key="`type-${type}`"
            color="blue"
            variant="soft"
            class="flex gap-1 items-center"
          >
            {{ getTypeName(type) }}
            <button @click="removeType(type)" class="rounded-full hover:bg-gray-200 p-0.5">
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
            </button>
          </UBadge>

          <UBadge
            v-for="difficulty in selectedDifficulties"
            :key="`diff-${difficulty}`"
            color="green"
            variant="soft"
            class="flex gap-1 items-center"
          >
            {{ getDifficultyName(difficulty) }}
            <button
              @click="removeDifficulty(difficulty)"
              class="rounded-full hover:bg-gray-200 p-0.5"
            >
              <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
            </button>
          </UBadge>

          <UButton
            v-if="hasTypeOrDifficultyFilters"
            size="xs"
            color="gray"
            variant="ghost"
            @click="clearTypeAndDifficultyFilters"
          >
            Clear filters
          </UButton>
        </div>
      </div>

      <!-- Sort options -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Sort by:</span>
        <USelect
          v-model="sortBy"
          :options="sortOptions"
          @update:model-value="handleSortChange"
          size="sm"
          :ui="{
            width: 'w-40',
            height: 'h-8',
          }"
        />
        <!-- filtered resources count -->
        <div class="text-sm ml-4 text-secondary dark:text-secondary-dark">
            {{ filteredResources.length }} resources
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useResourceFilters } from "~/composables/useResourceFilters";

const store = useResourcesStore()

const {
  selectedTypes,
  selectedDifficulties,
  sortBy,
  resourceTypes,
  difficultyLevels,
  sortOptions,
  getTypeName,
  getDifficultyName,
  handleTypeChange,
  handleDifficultyChange,
  handleSortChange,
  removeType,
  removeDifficulty,
} = useResourceFilters();

const filteredResources = computed(() => store.filteredResources);

// Check if any type or difficulty filters are active
const hasTypeOrDifficultyFilters = computed(() => {
  return selectedTypes.value.length > 0 || selectedDifficulties.value.length > 0;
});

// Clear only type and difficulty filters
const clearTypeAndDifficultyFilters = () => {
  selectedTypes.value = [];
  handleTypeChange();
  selectedDifficulties.value = [];
  handleDifficultyChange();
};
</script>

<style scoped>
@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-item {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
