import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5175;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app2",
      manifest: true,
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      shared: ["react", "react-dom"],
      runtimePlugins: ["../../dynamic-share-scope-plugin.ts"],
    }),
  ],
  base: "/app-2",
  build: {
    target: "esnext",
    minify: false,
    modulePreload: false,
  },
  server: {
    port,
  },
  preview: {
    port,
  },
});
