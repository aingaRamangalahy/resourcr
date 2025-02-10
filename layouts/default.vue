<template>
  <TheHeader />
  <div class="flex  bg-white dark:bg-slate-900">
    <TheAside />
    <div class="flex-1 p-4">
      <slot />
    </div>
  </div>
  <button
    @click="toggleAside"
    class="fixed bottom-4 right-4 lg:hidden bg-primary-500 text-white p-2 rounded-full shadow-lg"
  >
    <span v-if="asideVisible">Hide</span>
    <span v-else>Show</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const asideVisible = ref(false);

const toggleAside = () => {
  asideVisible.value = !asideVisible.value;
};
</script>

<style scoped>
@media (max-width: 1024px) {
  .aside-visible {
    display: block !important;
  }
}
</style>
