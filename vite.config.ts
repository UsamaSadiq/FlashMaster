import { defineConfig } from "vite";
import { viteSingleFile } from 'vite-plugin-singlefile';
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: '/projects/flashmaster/',
  plugins: [
    react(),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/"),
    emptyOutDir: true,
    target: 'es2015', // ensures older browser compatibility
    assetsInlineLimit: Infinity, // ensures everything is inlined
    rollupOptions: {
      output: {
        format: 'iife',             // 👈 immediately-invoked function expression (browser-safe)
        inlineDynamicImports: true,
        manualChunks: undefined,
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
