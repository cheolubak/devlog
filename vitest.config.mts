import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'apps/client/src/components'),
      constants: path.resolve(__dirname, 'apps/client/src/constants'),
      helper: path.resolve(__dirname, 'apps/client/src/helper'),
      hooks: path.resolve(__dirname, 'apps/client/src/hooks'),
      i18n: path.resolve(__dirname, 'apps/client/src/i18n'),
      providers: path.resolve(__dirname, 'apps/client/src/providers'),
      stores: path.resolve(__dirname, 'apps/client/src/stores'),
      types: path.resolve(__dirname, 'apps/client/src/types'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
