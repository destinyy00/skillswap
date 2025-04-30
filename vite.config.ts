import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shadcn/ui': path.resolve(__dirname, './src/components/ui-components'),
      '@shared': path.resolve(__dirname, '../shared/src'),
    },
  },
}); 