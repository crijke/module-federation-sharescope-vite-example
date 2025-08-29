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
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.1",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
        },
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
