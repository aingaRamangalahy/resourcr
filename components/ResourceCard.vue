<template>
  <UCard
    :ui="{
      body: {
        padding: 'sm:px-6 sm:py-4',
        base: 'w-full h-full',
      },
    }"
    class="flex gap-6 hover:shadow-lg w-full h-full cursor-pointer"
    @click="navigateToResource(resource.url)"
  >
    <div class="flex-1 h-full">
      <div class="flex items-start justify-between mb-4 h-[20%]">
        <div>
          <h3
            class="font-semibold text-primary dark:text-primary-dark text-lg flex items-center gap-2"
          >
            <UTooltip :text="resource.type" :popper="{ placement: 'top' }">
              <UIcon :name="typeIcon" class="w-5 h-5 text-secondary dark:text-secondary-dark" />
            </UTooltip>
            {{ resource.title }}
          </h3>
          <p class="text-sm text-secondary dark:text-secondary-dark">
            {{ resource.provider }}
          </p>
        </div>
        <UBadge :color="difficultyColor" variant="subtle" size="sm">
          {{ resource.difficulty }}
        </UBadge>
      </div>

      <div class="h-[60%]">
        <p class="text-secondary dark:text-secondary-dark mb-4">
          {{ resource.description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <UBadge v-for="tag in resource.tags" :key="tag" color="gray" variant="subtle" size="xs">
            {{ tag }}
          </UBadge>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Resource } from "~/types";

const props = defineProps<{
  resource: Resource;
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

const navigateToResource = (url: string) =>
  window.open(url, "_blank", "noopener,noreferrer");
</script>
