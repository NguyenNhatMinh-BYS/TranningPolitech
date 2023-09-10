import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: path.resolve(__dirname, "./src/assets/data"),
      component: path.resolve(__dirname, "./src/component"),
      services: path.resolve(__dirname, "./src/services"),
      model: path.resolve(__dirname, "./src/model"),
      features: path.resolve(__dirname, "./src/features"),
      app: path.resolve(__dirname, "./src/app/"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
