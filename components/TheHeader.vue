<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left section -->
        <div class="flex-1 flex items-center justify-start">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-slate-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            <!-- Left space for balance -->
          </NuxtLink>
        </div>

        <!-- Center logo -->
        <div class="flex-1 flex items-center justify-center">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-slate-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
          >
            Resourcr
          </NuxtLink>
        </div>

        <!-- Right section -->
        <div class="flex-1 flex items-center justify-end space-x-4">
          <UInput
            v-if="$route.path === '/resources'"
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search resources..."
            class="w-64"
            @input="handleSearch"
          />
          <UButton
            :icon="
              colorMode.value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="gray"
            variant="ghost"
            @click="toggleColorMode"
            UButton
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const store = useResourcesStore();
const colorMode = useColorMode();

const handleSearch = () => {
  store.setSearchQuery(searchQuery.value);
};

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
