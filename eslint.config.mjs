import antfu from '@antfu/eslint-config'

export default antfu({
  gitignore: true,
  typescript: true,
  markdown: true,
  yaml: true,
  javascript: true,
  stylistic: false,
  unicorn: true,
  regexp: true,
  astro: true,
}, {
  ignores: ['**/src/content/**/*.md']
})
