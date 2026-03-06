import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import type { SharedConfig } from "@originjs/vite-plugin-federation";

const shared: Record<string, SharedConfig & { singleton?: boolean; requiredVersion?: string }> = {
  vue: { singleton: true, requiredVersion: "^3.0.0" },
};

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: "vueApp",
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.ts",
      },
      shared: shared
    }),
  ],
  preview: {
    port: 5177,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  appType: "spa",
});