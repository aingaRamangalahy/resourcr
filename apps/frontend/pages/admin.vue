<template>
  <div class="min-h-screen bg-white dark:bg-slate-900">
    <div class="container mx-auto px-4 py-8">
      <template v-if="!isAuthenticated">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Admin Login</h1>
          <form @submit.prevent="handleLogin" class="space-y-4">
            <UFormGroup label="Email">
              <UInput v-model="email" type="email" placeholder="admin@example.com" required />
            </UFormGroup>
            <UFormGroup label="Password">
              <UInput v-model="password" type="password" placeholder="••••••••" required />
            </UFormGroup>
            <UButton type="submit" color="primary" block :loading="loading"> Login </UButton>
          </form>
        </div>
      </template>

      <template v-else>
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Add New Resource</h1>
          <UButton color="red" variant="soft" @click="handleLogout"> Logout </UButton>
        </div>

        <form @submit.prevent="handleSubmit" class="max-w-2xl space-y-6">
          <UFormGroup label="Title">
            <UInput v-model="form.title" placeholder="Resource title" required />
          </UFormGroup>

          <UFormGroup label="Description">
            <UTextarea v-model="form.description" placeholder="Resource description" required />
          </UFormGroup>

          <UFormGroup label="URL">
            <UInput v-model="form.url" type="url" placeholder="https://example.com" required />
          </UFormGroup>

          <UFormGroup label="Provider">
            <UInput v-model="form.provider" placeholder="Resource provider" required />
          </UFormGroup>

          <div class="grid grid-cols-2 gap-6">
            <UFormGroup label="Type">
              <USelect v-model="form.type" :options="resourceTypes" required />
            </UFormGroup>

            <UFormGroup label="Difficulty">
              <USelect v-model="form.difficulty" :options="difficultyLevels" required />
            </UFormGroup>
          </div>

          <UFormGroup label="Topics">
            <USelect
              v-model="form.topics"
              :options="topics.map((t) => ({ label: t.name, value: t.id }))"
              multiple
              required
            />
          </UFormGroup>

          <UFormGroup label="Tags">
            <UInput
              v-model="form.tags"
              placeholder="Comma-separated tags"
              help="Enter tags separated by commas"
              required
            />
          </UFormGroup>

          <div class="flex justify-end">
            <UButton type="submit" color="primary" :loading="submitting"> Add Resource </UButton>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourcesStore } from "~/stores/resources";
import type { Resource, Topic } from "~/types/resource";

const store = useResourcesStore();

// Auth state
const isAuthenticated = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);

// Form state
const submitting = ref(false);
const form = ref({
  title: "",
  description: "",
  url: "",
  type: "",
  difficulty: "",
  topics: [] as string[],
  tags: "",
  provider: "",
});

const topics: Topic[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "i-logos-javascript",
    description: "Learn modern JavaScript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "i-logos-typescript-icon",
    description: "Master TypeScript",
  },
  {
    id: "react",
    name: "React",
    icon: "i-logos-react",
    description: "Build with React",
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "i-logos-vue",
    description: "Create with Vue",
  },
  {
    id: "angular",
    name: "Angular",
    icon: "i-logos-angular-icon",
    description: "Develop with Angular",
  },
  {
    id: "svelte",
    name: "Svelte",
    icon: "i-logos-svelte-icon",
    description: "Build with Svelte",
  },
  {
    id: "node",
    name: "Node.js",
    icon: "i-logos-nodejs-icon",
    description: "Server-side JavaScript",
  },
];

const resourceTypes = [
  { label: "Video", value: "video" },
  { label: "Blog", value: "blog" },
  { label: "Interactive", value: "interactive" },
  { label: "Documentation", value: "documentation" },
  { label: "Course", value: "course" },
];

const difficultyLevels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

const handleLogin = async () => {
  loading.value = true;
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple validation - in production use proper authentication
  if (email.value === "admin@example.com" && password.value === "admin") {
    isAuthenticated.value = true;
  }

  loading.value = false;
};

const handleLogout = () => {
  isAuthenticated.value = false;
  email.value = "";
  password.value = "";
};

const handleSubmit = async () => {
  submitting.value = true;

  // Create new resource
  const newResource: Resource = {
    id: crypto.randomUUID(),
    title: form.value.title,
    description: form.value.description,
    url: form.value.url,
    type: form.value.type as Resource["type"],
    difficulty: form.value.difficulty as Resource["difficulty"],
    topics: form.value.topics,
    tags: form.value.tags.split(",").map((tag) => tag.trim()),
    popularity: 0,
    dateAdded: new Date().toISOString(),
    provider: form.value.provider,
  };

  // Add to store
  store.addResource(newResource);

  // Reset form
  form.value = {
    title: "",
    description: "",
    url: "",
    type: "",
    difficulty: "",
    topics: [],
    tags: "",
    provider: "",
  };

  submitting.value = false;
};
</script>
