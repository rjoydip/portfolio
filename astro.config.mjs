import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import { defineConfig } from 'astro/config'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePresetMinify from 'rehype-preset-minify'
import { remarkAlert } from 'remark-github-blockquote-alert'
import { isWorkerd } from 'std-env'
import {
  presetAttributify,
  presetTypography
} from 'unocss'
import UnoCss from 'unocss/astro'
import { remarkReadingTime } from './plugins/remark-reading-time.mjs'

export default defineConfig({
  site: 'https://rjoydip.com',
  vite: {
    plugins: [
      yaml(),
    ],
  },
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      [rehypeExternalLinks, {
        rel: ['external', 'nofollow', 'noopener', 'noreferrer'],
        target: ['_blank'],
      }],
    ],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  integrations: [
    mdx({
      optimize: true,
      rehypePlugins: [rehypePresetMinify],
      remarkRehype: { footnoteLabel: 'Footnotes' },
    }),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
    }),
    UnoCss({
      injectReset: true,
      presets: [
        presetTypography(),
        presetAttributify()
      ]
    }),
  ],
  output: isWorkerd ? 'server' : 'static',
  adapter: cloudflare()
})
