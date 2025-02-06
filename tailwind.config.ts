import type { Config } from "tailwindcss";

export default <Config>{
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        // padding: {
        //     DEFAULT: '1rem',
        //     sm: '2rem',
        //     lg: '4rem',
        //     xl: '4rem',
        //     '2xl': '6rem',
        // },
        // padding: '2rem',
      },
    },
  },
};
