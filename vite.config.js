import { defineConfig } from "vite";
import scalaJSPlugin from "@scala-js/vite-plugin-scalajs";
import path from 'path'

export default defineConfig({
  plugins: [scalaJSPlugin()],
});