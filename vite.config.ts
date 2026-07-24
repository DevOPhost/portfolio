import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      input: {
        inicio: "index.html",
        servicos: "servicos/index.html",
        projetos: "projetos/index.html",
        sobre: "sobre/index.html",
        carreira: "carreira/index.html",
        contato: "contato/index.html"
      }
    }
  }
});
