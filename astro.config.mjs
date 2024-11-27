// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import aws from 'astro-sst'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  adapter: aws({
    deploymentStrategy: 'regional',
    responseMode: 'stream',
  })
});