/* eslint-disable import-x/no-extraneous-dependencies */
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vike from 'vike/plugin';
import path from 'path';

import { inspectChunkIdFromNodeModules } from './vite/nodeModulesChunking';
import { tryToMatchAnyUnknownChunkId } from './vite/appChunking';

const AUTO_OPEN_VISUALIZER: boolean = false;

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return inspectChunkIdFromNodeModules(id) ?? 'vendor';

          const namedChunk = tryToMatchAnyUnknownChunkId(id);
          if (namedChunk) return namedChunk;
        }
      }
    },

    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,
        dead_code: true,
        passes: 3
      },

      format: {
        comments: false
      },

      mangle: true
    },

    cssCodeSplit: true,
    minify: 'terser',
    cssMinify: true
  },
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({
      compressionOptions: {
        level: 11
      },

      algorithm: 'brotliCompress',
      deleteOriginFile: false,
      threshold: 1024,
      ext: '.br'
    }),

    visualizer({
      filename: 'stats-sunburst.html',
      open: AUTO_OPEN_VISUALIZER,
      template: 'treemap'
    }),
    vike()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  base: '/igoristan/'
});
