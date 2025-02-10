// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@pinia/nuxt", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/styles/tailwind.scss",
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  app: {
    head: {
      title: "Developer Learning Resources",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Discover free software engineering learning resources",
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
