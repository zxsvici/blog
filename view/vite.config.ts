import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  // optimizeDeps: {
  //   include: ['antd'], // 确保 Ant Design 被优化
  // },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules/antd/')) {
  //           return 'antd'; // 将 Ant Design 单独打包成一个块
  //         }
  //       },
  //     },
  //   },
  // },
})
