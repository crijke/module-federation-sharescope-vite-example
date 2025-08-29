import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5175;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app2",
      manifest: true,
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.0",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.4.7",
        },
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
