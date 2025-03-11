<template>
  <div>
    <!-- filters -->
    <ResourceListFilters />

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-4">
      <USkeletonGroup v-for="i in 5" :key="i">
        <USkeleton class="h-40 w-full mb-4" />
      </USkeletonGroup>
    </div>

    <!-- Resources -->
    <div v-else-if="filteredResources.length > 0" class="space-y-4">
      <ResourceCard
        v-for="resource in filteredResources"
        :key="resource.url"
        :resource="resource"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-16">
      <UIcon name="i-heroicons-document-search" class="w-16 h-16 mx-auto text-gray-400" />
      <h3 class="text-xl font-medium text-primary dark:text-primary-dark mt-4">
        No resources found
      </h3>
      <p class="text-secondary dark:text-secondary-dark mt-2">
        Try adjusting your filters or search query
      </p>
      <UButton class="mt-4" color="primary" variant="soft" @click="clearFilters">
        Clear Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourcesStore } from "~/stores/resources";
import { useResourceFilters } from "~/composables/useResourceFilters";

const store = useResourcesStore();
const { clearFilters } = useResourceFilters();

// Computed properties
const filteredResources = computed(() => store.filteredResources);
const isLoading = computed(() => store.isLoading);

// Ensure filters are initialized
onBeforeMount(async () => {
  if (store.resources.length === 0) {
    await store.fetchResources();
  }
});
</script>
