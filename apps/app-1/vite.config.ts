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
      },
      filename: "remoteEntry.js",
      shareScope: "react@18.3.0",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.0",
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
