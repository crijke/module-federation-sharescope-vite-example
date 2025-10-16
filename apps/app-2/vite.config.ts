import { lexwareApp } from "@lexware/vite-plugin-lexware-app";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5175;
export default defineConfig({
  plugins: [
    react(),
    lexwareApp({
      federation: {
        enabled: true,
        name: "app2",
        exposes: {
          "./export-app": "./src/export-app.tsx",
        },
        dev: {
          runInAppShell: false,
          appShellServiceName: "app2",
        },
        sharedDependencies: false,
      },
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
