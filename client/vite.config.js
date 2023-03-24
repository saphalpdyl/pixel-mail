import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@contexts': '/src/contexts',
      '@providers': '/src/providers',
      '@utils': '/src/utils',
    },
  },
});
