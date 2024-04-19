import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  ansiColors: true,
  png: {
    // https://sharp.pixelplumbing.com/api-output#png
    quality: 80,
  },
  jpeg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 80,
  },
  jpg: {
    // https://sharp.pixelplumbing.com/api-output#jpeg
    quality: 80,
  },
  webp: {
    // https://sharp.pixelplumbing.com/api-output#webp
    quality: 80,
  },
  avif: {
    // https://sharp.pixelplumbing.com/api-output#avif
    quality: 70,
  },
  cache: false,
  cacheLocation: undefined,
};

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
  },
  plugins: [
    ViteImageOptimizer(
      DEFAULT_OPTIONS
    ),
  ],
});