import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 5173;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      runtimePlugins: [
        path.resolve(__dirname, "./src/dynamicShareScopePlugin.ts"),
      ],
      remotes: {
        app1: {
          shareScope: "app1",
          type: "module",
          name: "app1",
          entry: "http://localhost:5174/app-1/mf-manifest.json",
        },
        app2: {
        shareScope: "app2",
          type: "module",
          name: "app2",
          entry: "http://localhost:5175/app-2/mf-manifest.json",
        },
        app3: {
          shareScope: "app3",
          type: "module",
          name: "app3",
          entry: "http://localhost:5176/app-3/mf-manifest.json",
        },
      },
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
