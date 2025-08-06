import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 React 相關庫分離
          vendor: ["react", "react-dom"],
          // 將 Redux 相關庫分離
          redux: ["@reduxjs/toolkit", "react-redux"],
          // 將 UI 組件庫分離
          ui: [
            "@radix-ui/react-hover-card",
            "@radix-ui/react-popover",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
          ],
          // 將動畫庫分離
          animation: [
            "gsap",
            "@gsap/react",
            "lottie-web",
            "@lottiefiles/dotlottie-react",
          ],
          // 將工具庫分離
          utils: [
            "date-fns",
            "dayjs",
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
          ],
          // 將圖表庫分離
          charts: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
        },
      },
    },
    // 調整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
  },
});
