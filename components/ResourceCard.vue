<template>
  <UCard
    :ui="{
      body: {
        padding: viewMode === 'grid' ? 'sm:p-4' : 'sm:px-6 sm:py-4',
        base: 'w-full h-full',
      },
    }"
    :class="[
      viewMode === 'list' ? 'flex gap-6' : '',
      'transition-all duration-200 hover:shadow-lg w-full h-full',
    ]"
  >
    <div :class="viewMode === 'list' ? 'flex-1' : ''" class="h-full">
      <div class="flex items-start justify-between mb-4 h-[20%]">
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white text-lg">
            {{ resource.title }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            {{ resource.provider }}
          </p>
        </div>
        <UBadge :color="difficultyColor" variant="subtle" size="sm">
          {{ resource.difficulty }}
        </UBadge>
      </div>

      <div class="h-[60%]">
        <p class="text-slate-600 dark:text-slate-300 mb-4">
          {{ resource.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          <UBadge v-for="tag in resource.tags" :key="tag" color="gray" variant="subtle" size="xs">
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <div
        class="flex items-center h-[20%]"
        :class="viewMode === 'grid' ? 'justify-between' : 'gap-4'"
      >
        <div class="flex items-center gap-2">
          <UIcon :name="typeIcon" class="w-5 h-5 text-slate-600 dark:text-slate-300" />
          <span class="text-sm text-slate-600 dark:text-slate-300">
            {{ resource.type }}
          </span>
        </div>

        <UButton color="primary" variant="soft" size="sm" :to="resource.url" target="_blank">
          View resource
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Resource } from "@resourcr/types/resource";

const props = defineProps<{
  resource: Resource;
  viewMode: "grid" | "list";
}>();

const typeIcon = computed(() => {
  switch (props.resource.type) {
    case "video":
      return "i-heroicons-play-circle";
    case "blog":
      return "i-heroicons-document-text";
    case "interactive":
      return "i-heroicons-computer-desktop";
    case "documentation":
      return "i-heroicons-book-open";
    case "course":
      return "i-heroicons-academic-cap";
    default:
      return "i-heroicons-link";
  }
});

const difficultyColor = computed(() => {
  switch (props.resource.difficulty) {
    case "beginner":
      return "green";
    case "intermediate":
      return "yellow";
    case "advanced":
      return "red";
    default:
      return "gray";
  }
});
</script>
