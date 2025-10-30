import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5173;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        app1: {
          type: "module",
          name: "app1",
          entry: "http://localhost:5174/app-1/mf-manifest.json",
          entryGlobalName: "app1",
          shareScope: "app1",
        },
        app2: {
          type: "module",
          name: "app2",
          entry: "http://localhost:5175/app-2/mf-manifest.json",
          entryGlobalName: "app2",
          shareScope: "app2",
        },
        app3: {
          type: "module",
          name: "app3",
          entry: "http://localhost:5176/app-3/mf-manifest.json",
          entryGlobalName: "app3",
          shareScope: "app3",
        },
      },
      runtimePlugins: ["../../dynamic-share-scope-plugin.ts"],
    }),
  ],
  base: "/",
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
