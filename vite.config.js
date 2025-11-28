import { defineConfig } from "vite";
import scalaJSPlugin from "@scala-js/vite-plugin-scalajs";
import path from 'path'

export default defineConfig({
  plugins: [scalaJSPlugin()],
  resolve: {
    alias: {
      'expense-tracker': path.resolve(__dirname, 'expensetracker/dist/expense-tracker.js')
    }
  },
});