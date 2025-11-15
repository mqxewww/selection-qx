import { defineConfig } from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths(), vue(), tailwindcss(), symfonyPlugin()],
    build: {
        rollupOptions: {
            input: {
                app: "./assets/app.ts",
            },
        },
    },
});
