<script setup lang="ts">
import { computed, ref } from 'vue'
import { features, featureGroups, featureHref, homeHref } from '../data/features'
import type { FeatureGroup } from '../data/types'

const query = ref('')
const activeGroup = ref<FeatureGroup | 'all'>('all')
const filteredFeatures = computed(() => {
  const search = query.value.trim().toLocaleLowerCase()
  return features.filter(feature => {
    if (activeGroup.value !== 'all' && feature.group !== activeGroup.value) return false
    if (!search) return true
    return [feature.title, feature.tagline, feature.description, ...feature.highlights,
      ...feature.sections.map(section => `${section.title} ${section.body}`)]
      .join(' ').toLocaleLowerCase().includes(search)
  })
})
const currentGroup = computed(() => featureGroups.find(group => group.id === activeGroup.value))
const groupLabel = (id: FeatureGroup) => featureGroups.find(group => group.id === id)?.label ?? ''

function clearFilters() {
  query.value = ''
  activeGroup.value = 'all'
}
</script>

<template>
  <main id="main" tabindex="-1" class="feature-hub">
    <section class="hub-hero wrap" aria-labelledby="hub-title">
      <div class="hub-hero-copy">
        <a :href="homeHref" class="feature-back"><span aria-hidden="true">←</span> 回到首頁</a>
        <p class="feature-eyebrow">THE CK APP GUIDE · 功能指南</p>
        <h1 id="hub-title">校園生活的每一面，<br><span>都有一個好幫手</span></h1>
        <p class="hub-lead">從上課前的第一眼，到放學後的回家路<br />認識 CK APP 的每一項功能，找到適合你的使用方式</p>
        <a href="#feature-library" class="hub-explore">探索全部 {{ features.length }} 項功能 <svg aria-hidden="true"><use href="#i-arrow" /></svg></a>
      </div>
      <div class="hub-guide" aria-label="依生活情境探索三大類功能">
        <div class="hub-guide-heading"><span>YOUR CAMPUS, SIMPLIFIED.</span><svg aria-hidden="true"><use href="#i-sun" /></svg></div>
        <div v-for="(group, index) in featureGroups" :key="group.id" class="hub-guide-row">
          <span class="hub-guide-number">0{{ index + 1 }}</span>
          <div><strong>{{ group.label }}</strong><p>{{ group.description }}</p></div>
          <svg aria-hidden="true"><use :href="`#i-${index === 0 ? 'grid' : index === 1 ? 'school' : 'heart'}`" /></svg>
        </div>
        <div class="hub-guide-foot"><span class="hub-guide-dot" aria-hidden="true"></span> 一個 App，陪你過好每一天</div>
      </div>
    </section>

    <section id="feature-library" class="feature-library wrap" aria-labelledby="library-title">
      <div class="library-top">
        <div><p class="feature-eyebrow">FIND YOUR EVERYDAY ESSENTIALS</p><h2 id="library-title">找到你需要的功能</h2></div>
        <div class="feature-search">
          <label for="feature-search">搜尋功能</label>
          <div class="feature-search-control"><svg aria-hidden="true"><use href="#i-search" /></svg><input id="feature-search" v-model="query" type="search" placeholder="試試「課表」、「午餐」或「通知」" autocomplete="off"></div>
        </div>
      </div>
      <div class="feature-filters" role="group" aria-label="依功能類別篩選">
        <button type="button" :aria-pressed="activeGroup === 'all'" @click="activeGroup = 'all'">全部功能 <span>{{ features.length }}</span></button>
        <button v-for="group in featureGroups" :key="group.id" type="button" :aria-pressed="activeGroup === group.id" @click="activeGroup = group.id">{{ group.label }} <span>{{ features.filter(feature => feature.group === group.id).length }}</span></button>
      </div>
      <div class="library-context"><p>{{ currentGroup?.description ?? '想把校園日常安排得更順手？從這裡開始' }}</p><p role="status" aria-live="polite">顯示 {{ filteredFeatures.length }} 項功能</p></div>
      <div v-if="filteredFeatures.length" class="feature-card-grid">
        <a v-for="feature in filteredFeatures" :key="feature.slug" :href="featureHref(feature.slug)" class="feature-guide-card" :class="`feature-group-${feature.group}`">
          <div class="feature-card-top"><span class="feature-card-icon"><svg aria-hidden="true"><use :href="`#${feature.icon}`" /></svg></span><span class="feature-card-category">{{ groupLabel(feature.group) }}</span></div>
          <div class="feature-card-copy"><p class="feature-card-kicker">{{ feature.kicker }}</p><h3>{{ feature.title }}</h3><p>{{ feature.tagline }}</p></div>
          <p class="feature-card-description">{{ feature.description }}</p>
          <div class="feature-card-foot"><span>了解完整功能</span><svg aria-hidden="true"><use href="#i-arrow" /></svg></div>
        </a>
      </div>
      <div v-else class="feature-empty">
        <svg aria-hidden="true"><use href="#i-search" /></svg><h3>還沒找到符合的功能</h3><p>試試更短的關鍵字，或清除篩選看看所有功能</p><button type="button" @click="clearFilters">清除搜尋與篩選 <span aria-hidden="true">↗</span></button>
      </div>
      <div class="feature-library-note"><svg aria-hidden="true"><use href="#i-check" /></svg><p>各頁附有功能說明、使用步驟與常見問題<br />介面示意僅供介紹，實際內容以 App 顯示為準</p></div>
    </section>
  </main>
</template>
