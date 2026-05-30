// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // 部署時改成正式網域，供 sitemap / canonical / OG 使用
  site: 'https://qijin-fruit-tea.example.com',
  vite: {
    plugins: [tailwindcss()]
  }
});