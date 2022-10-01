// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // https://vitejs.dev/config/
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: [path.resolve(__dirname, './src/utils/test/setup.ts')],
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  }
});
