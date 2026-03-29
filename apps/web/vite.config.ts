import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import webPackage from "./package.json";

export default defineConfig({
  plugins: [tsconfigPaths(), vue(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(webPackage.version),
  },
});
