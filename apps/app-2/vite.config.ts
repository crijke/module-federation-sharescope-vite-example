import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5175;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app2",
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      filename: "remoteEntry.js",
      shared: {},
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
