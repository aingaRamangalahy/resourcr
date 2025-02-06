<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8">
        <TheAside />
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
              viewMode === 'grid' ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : '',
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
const store = useResourcesStore();

// Initialize with default values from the store
const viewMode = computed(() => store.viewMode);

const filteredResources = computed(() => store.filteredResources);

const setViewMode = (mode: "grid" | "list") => {
  store.setViewMode(mode);
};
</script>
