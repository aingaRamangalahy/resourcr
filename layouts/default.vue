<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- Header component -->
    <AppHeader />

    <!-- Main content -->
    <div class="flex-grow flex">
      <!-- Sidebar for larger screens -->
      <CategoriesFilter class="hidden lg:block" />

      <!-- Main content area -->
      <main class="flex-grow p-4">
        <slot />
      </main>
    </div>

    <CategoriesFilterMobile />
  </div>
</template>

