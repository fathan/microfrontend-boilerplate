import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import type { SharedConfig } from "@originjs/vite-plugin-federation";

const shared: Record<string, SharedConfig & { singleton?: boolean; requiredVersion?: string }> = {
  react: { singleton: true, requiredVersion: "^18.0.0" },
  "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  vue: { singleton: true, requiredVersion: "^3.0.0" },
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        reactApp: "http://localhost:5176/assets/remoteEntry.js",
        vueApp: "http://localhost:5177/assets/remoteEntry.js",
      },
      shared: shared
    }),
  ],
  preview: {
    port: 5175,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false, // memudahkan debugging awal
    cssCodeSplit: false,
  },
});