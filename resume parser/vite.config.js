import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite builds and serves the app. The React plugin handles JSX,
// and the Tailwind plugin turns the utility classes into CSS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
