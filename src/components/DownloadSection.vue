<script setup lang="ts">
const stores = [
  {
    name: "App Store",
    icon: "apple",
    subtitle: "Download on the",
    url: "https://apps.apple.com/tw/app/ck%E6%A0%A1%E5%9C%92%E8%A1%8C%E5%8B%95app/id6608961910?l=en-GB",
  },
  {
    name: "Google Play",
    icon: "play",
    subtitle: "GET IT ON",
    url: "https://play.google.com/store/apps/details?id=org.capacitor.quasar.ckapp&pcampaignid=web_share",
  },
];
</script>

<template>
  <section id="download" class="download wrap" aria-labelledby="download-title">
    <div class="download-inner">
      <div>
        <p class="eyebrow">你的校園助理，現在就放進口袋</p>
        <h2 id="download-title">明天到校，<br />帶上 CK APP</h2>
        <p>選好班級，開始你的今天</p>
      </div>
      <div class="download-store-wrap">
        <div class="download-stores">
          <a
            v-for="store in stores"
            :key="store.name"
            class="store-button"
            :href="store.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`在 ${store.name} 下載 CK APP（開啟新分頁）`"
          >
            <svg aria-hidden="true"><use :href="`#i-${store.icon}`" /></svg>
            <span
              ><small>{{ store.subtitle }}</small
              ><strong>{{ store.name }}</strong></span
            >
            <svg class="store-arrow" aria-hidden="true">
              <use href="#i-up-right" />
            </svg>
          </a>
        </div>
        <p class="store-note">免費下載 · iOS & Android</p>
      </div>
    </div>
  </section>
</template>
