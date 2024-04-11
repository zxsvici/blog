import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  // rollupOptions: {
  //   output: {
  //     // chunkFileNames: 'js/[name].[hash].js',
  //     assetFileNames: assetInfo => {
  //       console.log(assetInfo);
  //       if (assetInfo.name === 'favicon.ico') {
  //         return 'favicon.ico'
  //       }
  //     }
  //   }
  // }
})
