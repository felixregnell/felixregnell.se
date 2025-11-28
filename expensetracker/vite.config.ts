import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
  lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "ExpenseTracker",          // Name for UMD (optional)
      fileName: "expense-tracker"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true     // Single JS file
      }
    }
  },
});