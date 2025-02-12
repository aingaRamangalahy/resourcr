import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

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
      },
      textColor: {
        primary: {
          DEFAULT: colors.slate[900],
          dark: colors.slate[100],
        },
        secondary: {
          DEFAULT: colors.slate[600],
          dark: colors.slate[300],
        },
      },
      backgroundColor: {
        primary: {
          DEFAULT: colors.white,
          dark: colors.slate[900],
        },
        secondary: {
          DEFAULT: colors.white,
          dark: colors.gray[900],
        },
      },
      borderColor: {
        primary: {
          DEFAULT: colors.gray[200],
          dark: colors.gray[800],
        }
      }
    },
  },
};
