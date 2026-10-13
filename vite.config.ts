import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { coreFeatures } from './src/data/core-features.ts'
import { campusFeatures } from './src/data/campus-features.ts'

const allFeatures = [...coreFeatures, ...campusFeatures]
const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

function staticFeaturePages(): Plugin {
  let outputDirectory = ''
  let basePath = '/'
  return {
    name: 'ck-static-feature-pages',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
      basePath = config.base
    },
    closeBundle() {
      const slugs = new Set(allFeatures.map(feature => feature.slug))
      if (slugs.size !== allFeatures.length) throw new Error('Feature slugs must be unique')
      for (const feature of allFeatures) {
        if (!/^[a-z]+(?:-[a-z]+)*$/.test(feature.slug)) throw new Error(`Invalid feature path: ${feature.slug}`)
        if (new Set(feature.sections.map(section => section.id)).size !== feature.sections.length) throw new Error(`Duplicate section anchors: ${feature.slug}`)
        for (const related of feature.related) if (!slugs.has(related)) throw new Error(`Missing related feature: ${related}`)
      }

      const template = readFileSync(resolve(outputDirectory, 'index.html'), 'utf8')
      const origin = process.env.SITE_ORIGIN || 'https://ckapp-dev.github.io'
      const pages = [
        { path: '', title: template.match(/<title>(.*?)<\/title>/)?.[1] || 'CK APP', description: template.match(/<meta name="description" content="([^"]*)"/)?.[1] || '你的校園助理' },
        { path: 'features/', title: '完整功能介紹｜CK APP', description: '詳細認識 CK APP 的所有功能，包含今天、課表、行事曆與待辦、熱食部、附近美食、校網消息、公告通知、交通、校園福利、iOS 小工具與個人設定。' },
        ...allFeatures.map(feature => ({ path: `features/${feature.slug}/`, title: `${feature.title}｜CK APP 功能介紹`, description: feature.description })),
      ]
      for (const page of pages) {
        const url = new URL(`${basePath}${page.path}`, origin).href
        const html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*"/, `$1${escapeHtml(page.description)}"`)
          .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escapeHtml(page.title)}"`)
          .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escapeHtml(page.description)}"`)
          .replace('</head>', `<link rel="canonical" href="${escapeHtml(url)}"><meta property="og:url" content="${escapeHtml(url)}"></head>`)
        const directory = resolve(outputDirectory, page.path)
        mkdirSync(directory, { recursive: true })
        writeFileSync(resolve(directory, 'index.html'), html)
      }
      writeFileSync(resolve(outputDirectory, '404.html'), template.replace(/<title>[\s\S]*?<\/title>/, '<title>找不到這個頁面｜CK APP</title>'))
      const sitemap = pages.map(page => `<url><loc>${escapeHtml(new URL(`${basePath}${page.path}`, origin).href)}</loc></url>`).join('')
      writeFileSync(resolve(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`)
      console.log(`Generated ${pages.length} static pages and sitemap`)
    },
  }
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar(),
    staticFeaturePages(),
  ],
})
