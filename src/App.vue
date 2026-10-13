<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import SiteIcons from './components/SiteIcons.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import DownloadSection from './components/DownloadSection.vue'
import HomePage from './pages/HomePage.vue'
import FeatureIndex from './pages/FeatureIndex.vue'
import FeatureDetail from './pages/FeatureDetail.vue'
import { features, featuresHref, homeHref } from './data/features'

function safeDecode(value: string): string {
  try { return decodeURIComponent(value) } catch { return value }
}

const relativePath = safeDecode(window.location.pathname)
  .slice(import.meta.env.BASE_URL.length)
  .replace(/(^|\/)index\.html$/, '')
  .replace(/^\/+|\/+$/g, '')
const isHome = relativePath === ''
const isFeatureIndex = relativePath === 'features'
const feature = relativePath.startsWith('features/')
  ? features.find(item => relativePath === `features/${item.slug}`)
  : undefined

if (feature) document.title = `${feature.title}｜CK APP 功能介紹`
else if (isFeatureIndex) document.title = '完整功能介紹｜CK APP'
else if (!isHome) document.title = '找不到這個頁面｜CK APP'

onMounted(async () => {
  await nextTick()
  if (window.location.hash) {
    const id = safeDecode(window.location.hash.slice(1))
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }
})
</script>

<template>
  <SiteIcons />
  <a href="#main" class="skip">跳至主要內容</a>
  <SiteHeader :is-feature-page="isFeatureIndex || !!feature" />
  <HomePage v-if="isHome" />
  <FeatureIndex v-else-if="isFeatureIndex" />
  <FeatureDetail v-else-if="feature" :feature="feature" />
  <main v-else id="main" tabindex="-1" class="wrap missing-page">
    <p class="section-number">404 / 再找一下</p>
    <h1 class="section-title">這個頁面，暫時找不到</h1>
    <p class="copy">回到功能總覽，看看 CK APP 能幫上什麼忙</p>
    <div class="missing-actions">
      <a class="button button-blue" :href="featuresHref">瀏覽完整功能</a>
      <a class="text-link" :href="homeHref">回到首頁</a>
    </div>
  </main>
  <DownloadSection />
  <SiteFooter />
</template>
