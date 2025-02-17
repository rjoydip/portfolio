import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import yaml from '@rollup/plugin-yaml'

import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeMath from 'rehype-katex'
import UnoCss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://rjoydip.com',
  vite: {
    plugins: [yaml()],
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      [rehypeExternalLinks, {
        rel: ['external', 'nofollow', 'noopener', 'noreferrer'],
        target: ['_blank'],
      }],
      rehypeMath,
    ],
  },
  integrations: [
    expressiveCode({
      themes: ['catppuccin-frappe', 'catppuccin-latte'],
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: true,
        wrap: true,
      },
    }),
    mdx(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
    }),
    UnoCss({ injectReset: true }),
  ],
  output: 'static',
})
