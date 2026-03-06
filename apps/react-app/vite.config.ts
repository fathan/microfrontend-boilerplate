import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import type { SharedConfig } from "@originjs/vite-plugin-federation";

const shared: Record<string, SharedConfig & { singleton?: boolean; requiredVersion?: string }> = {
  react: { singleton: true, requiredVersion: "^18.0.0" },
  "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "reactApp",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.tsx",
      },
      shared: shared
    }),
  ],
  preview: {
    port: 5176,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});