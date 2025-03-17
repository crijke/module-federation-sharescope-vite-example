import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = 5173;
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        app1: {
          type: "module",
          name: "app1",
          entry: "http://localhost:5174/app-1/remoteEntry.js",
          shareScope: "react@18.3.0",  // ISSUE this setting is missing in build output
        },
        app2: {
          type: "module",
          name: "app2",
          entry: "http://localhost:5175/app-2/remoteEntry.js",
          shareScope: "react@18.3.0",  // ISSUE this setting is missing in build output
        },
        app3: {
          type: "module",
          name: "app3",
          entry: "http://localhost:5176/app-3/remoteEntry.js",
          shareScope: "react@18.3.0", // ISSUE this setting is missing in build output
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
