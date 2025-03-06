<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8">
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Learning Resources</h2>
          </div>
          <div class="space-y-4">
            <ResourceCard
              v-for="resource in filteredResources"
              :key="resource.addedAt"
              :resource="resource"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useResourcesStore();

onBeforeMount(async () => {
  await store.fetchResources();
});

// Initialize with default values from the store
const filteredResources = computed(() => store.filteredResources);
</script>
