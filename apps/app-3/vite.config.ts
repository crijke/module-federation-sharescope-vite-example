import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5176;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app3",
      manifest: true,
      remotes: {
        app1: {
          type: "module",
          name: "app1",
          entry: "http://localhost:5174/app-1/mf-manifest.json",
          entryGlobalName: "app1",
          shareScope: "app1",
        },
      },
      shared: ["react", "react-dom"],
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      runtimePlugins: ["../../dynamic-share-scope-plugin.ts"],
    }),
  ],
  base: "/app-3",
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
