<template>
  <div class="space-y-6">
    <!-- Search filter -->
    <div class="space-y-2">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search resources..."
        class="w-full"
        variant="none"
        @input="handleSearchChange"
      />
    </div>

    <!-- Categories -->
    <div class="space-y-4">
      <h3 class="font-semibold text-primary dark:text-primary-dark text-lg">Categories</h3>
      
      <!-- Loading state -->
      <USkeletonGroup v-if="isLoadingCategories" class="space-y-4">
        <USkeleton v-for="i in 3" :key="i" class="h-8 w-full" />
      </USkeletonGroup>
      
      <!-- Categories content -->
      <div v-else class="space-y-4">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="border-b border-gray-200 dark:border-gray-800 pb-2"
        >
          <!-- Category header -->
          <button 
            class="w-full flex justify-between items-center py-2"
            @click="toggleCategory(category.id)"
          >
            <div class="flex items-center gap-2">
              <UIcon :name="category.icon" class="w-5 h-5" />
              <span class="font-medium">{{ category.name }}</span>
            </div>
            
            <UIcon 
              :name="isExpanded(category.id) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
              class="w-5 h-5"
            />
          </button>
          
          <!-- Subcategories (collapsible) -->
          <div v-if="isExpanded(category.id)" class="ml-4 mt-2 space-y-2">
            <div 
              v-for="subcategory in category.subcategories" 
              :key="subcategory.id"
            >
              <!-- Subcategory header -->
              <div class="flex items-center gap-2 py-1">
                <UCheckbox
                  v-model="selectedSubcategories"
                  :value="subcategory.id"
                  @change="handleSubcategoryChange"
                />
                <span>{{ subcategory.name }}</span>
              </div>
              
              <!-- Topics under subcategory -->
              <div class="ml-6 space-y-1">
                <div 
                  v-for="topicId in subcategory.topics" 
                  :key="topicId" 
                  class="flex items-center justify-between"
                >
                  <div class="flex items-center gap-2">
                    <UCheckbox
                      v-model="selectedTopics"
                      :value="topicId"
                      @change="handleTopicChange"
                      :ui="{
                        base: 'cursor-pointer',
                      }"
                    />
                    <span class="cursor-pointer">{{ getTopicName(topicId) }}</span>
                  </div>
                  <span class="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    {{ resourceCountByTopic(topicId) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourceFilters } from "~/composables/useResourceFilters";

const {
  // State
  selectedSubcategories,
  selectedTopics,
  searchQuery,
  isLoadingCategories,
  
  // Data
  categories,
  
  // Methods
  getTopicName,
  isExpanded,
  toggleCategory,
  resourceCountByTopic,
  handleSubcategoryChange,
  handleTopicChange,
  handleSearchChange,
} = useResourceFilters();
</script>