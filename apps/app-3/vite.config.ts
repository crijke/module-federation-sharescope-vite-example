import { lexwareApp } from "@lexware/vite-plugin-lexware-app";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5176;
export default defineConfig({
  plugins: [
    react(),
    lexwareApp({
      federation: {
        enabled: true,
        name: "app3",
        remotes: {
          app1: {
            type: "module",
            name: "app1",
            entry: "http://localhost:5174/app-1/remoteEntry.js",
            entryGlobalName: "app1",
          },
        },
        exposes: {
          "./export-app": "./src/export-app.tsx",
        },
        dev: {
          runInAppShell: false,
          appShellServiceName: "app3",
        },
        sharedDependencies: false,
      },
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
