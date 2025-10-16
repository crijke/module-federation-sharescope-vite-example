import { lexwareApp } from "@lexware/vite-plugin-lexware-app";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5173;
export default defineConfig({
  plugins: [
    react(),
    lexwareApp({
      federation: {
        enabled: true,
        name: "shell",
        sharedDependencies: false,
        remotes: {
          app1: {
            type: "module",
            name: "app1",
            entry: "http://localhost:5174/app-1/remoteEntry.js",
            entryGlobalName: "app1",
          },
          app2: {
            type: "module",
            name: "app2",
            entry: "http://localhost:5175/app-2/remoteEntry.js",
            entryGlobalName: "app2",
          },
          app3: {
            type: "module",
            name: "app3",
            entry: "http://localhost:5176/app-3/remoteEntry.js",
            entryGlobalName: "app3",
          },
        },
        dev: {
          runInAppShell: false,
          appShellServiceName: "shell",
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
