// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 正式網域，供 sitemap / canonical / OG 使用
  site: 'https://www.cj-fruitstation.com',
  vite: {
    plugins: [tailwindcss()]
  }
});