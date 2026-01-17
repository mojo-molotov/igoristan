/* eslint-disable import-x/no-extraneous-dependencies */
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import sitemap from '@qalisa/vike-plugin-sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { minimatch } from 'minimatch';
import { defineConfig } from 'vite';
import vike from 'vike/plugin';
import path from 'path';

const ORIGIN = 'https://mojo-molotov.github.io';
const BASE = '/igoristan';
const SITEMAP_EXCLUSIONS = ['**/igoristan/dashboard/**'] as const;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    visualizer({
      filename: 'stats-sunburst.html',
      template: 'treemap'
    }),
    vike(),
    sitemap({
      sitemapGenerator: (entries) => entries.filter((e) => !minimatch(new URL(e.loc).pathname, SITEMAP_EXCLUSIONS[0])),
      baseUrl: ORIGIN + BASE,
      pagesDir: 'src/pages'
    })
  ],
  build: {
    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    },
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: BASE
});
