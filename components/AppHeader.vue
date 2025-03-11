<template>
  <header
    class="sticky top-0 z-50 border-b border-primary dark:border-primary-dark bg-primary dark:bg-primary-dark"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left section -->
        <div class="flex-1 flex items-center justify-start">
          <NuxtLink to="/" class="text-xl font-bold text-primary dark:text-primary-dark">
            <!-- Left space for balance -->
          </NuxtLink>
        </div>

        <!-- Center logo -->
        <div class="flex-1 flex items-center justify-center">
          <NuxtLink to="/" class="text-xl font-bold text-primary dark:text-primary-dark">
            Resourcr.dev
          </NuxtLink>
        </div>

        <!-- Right section -->
        <div class="flex-1 flex items-center justify-end space-x-4">
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
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
