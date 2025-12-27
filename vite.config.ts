import react from '@vitejs/plugin-react';
import type { ManifestOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      manifest: manifest as Partial<ManifestOptions>,
      registerType: 'autoUpdate',
      pwaAssets: {
        preset: 'minimal-2023',
        image: 'public/icon.svg',
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],

  server: {
    port: 8000,
  },

  test: {
    environment: 'happy-dom',
    globals: true,
    watch: false,
  },
});
