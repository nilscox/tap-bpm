import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  server: {
    port: 8000,
  },

  test: {
    environment: 'happy-dom',
    globals: true,
    watch: false,
  },
});
