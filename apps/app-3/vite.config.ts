import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5176;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app3",
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      filename: "remoteEntry.js",
      shareScope: "react@18.3.1",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.1",
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
