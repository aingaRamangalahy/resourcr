<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">Welcome to Resourcr</h1>
        <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Discover the best free resources to learn software development. Choose your favorite topic
          to get started.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="topic in topics"
          :key="topic.id"
          :to="`/resources?topic=${topic.id}`"
          class="group p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div class="flex flex-col items-center text-center space-y-4">
            <UIcon
              :name="topic.icon"
              class="w-16 h-16 text-primary-500 group-hover:text-primary-600 transition-colors"
            />
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ topic.name }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {{ topic.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Topic } from "~/types/resource";

const topics: Topic[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "i-logos-javascript",
    description: "Learn modern JavaScript from basics to advanced concepts",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "i-logos-typescript-icon",
    description: "Master TypeScript and static typing for JavaScript",
  },
  {
    id: "react",
    name: "React",
    icon: "i-logos-react",
    description: "Build user interfaces with React and its ecosystem",
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "i-logos-vue",
    description: "Create web applications with Vue.js framework",
  },
  {
    id: "angular",
    name: "Angular",
    icon: "i-logos-angular-icon",
    description: "Develop enterprise-grade applications with Angular",
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: "i-logos-svelte-icon",
    description: "Build fast web apps with Svelte framework",
  },
  {
    id: "node",
    name: "Node.js",
    icon: "i-logos-nodejs-icon",
    description: "Server-side JavaScript with Node.js",
  },
  {
    id: "python",
    name: "Python",
    icon: "i-logos-python",
    description: "Learn Python programming language",
  },
];
</script>
