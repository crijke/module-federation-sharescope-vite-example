import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5174;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app1",
      exposes: {
        "./export-app": "./src/export-app.tsx",
        // runtime metadata used by dynamic loader to infer version/scope
        "./mf-meta": "./src/mf-meta.ts",
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          shareScope: "react@18.3.0",
          singleton: true,
          requiredVersion: "18.3.0",
        },
        "react-dom": {
          shareScope: "react@18.3.0",
          singleton: true,
          requiredVersion: "18.3.0",
        },
        "@mui/material": {
          shareScope: "react@18.3.0",
          singleton: false,
          requiredVersion: "6.4.7",
        },
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
