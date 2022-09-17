/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
    ],
  },
});
