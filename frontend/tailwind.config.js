/** @type {import('tailwindcss').Config} */
import path from "path";
import daisyui from "daisyui";

export default {
  content: [
    path.join(process.cwd(), "index.html"),
    path.join(process.cwd(), "src/**/*.{js,jsx,ts,tsx}"),
    path.join(process.cwd(), "**/pages/**/*.{js,jsx,ts,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "forest"],
  },
};
