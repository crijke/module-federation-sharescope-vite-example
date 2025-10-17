import { lexwareApp } from "@lexware/vite-plugin-lexware-app";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5174;
export default defineConfig({
  plugins: [
    react(),
    lexwareApp({
      federation: {
        enabled: true,
        name: "app1",
        exposes: {
          "./export-app": "./src/export-app.tsx",
          "./SharedButton": "./src/components/SharedButton.tsx",
        },
        dev: {
          runInAppShell: false,
          appShellServiceName: "app1",
        },
        sharedDependencies: true,
      },
    }),
  ],
  base: "/app-1",
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
