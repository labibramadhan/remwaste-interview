import { defineConfig } from '@farmfe/core';
import postcss from '@farmfe/js-plugin-postcss';

export default defineConfig({
  server: {
    port: 5002,
  },
  compilation: {
    persistentCache: false,
  },
  plugins: ['@farmfe/plugin-react', postcss()],
});
