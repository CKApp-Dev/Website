<script setup lang="ts">
import { featureHref } from "../data/features";

// Structure, labels, subtitles and icon subjects match App/src/features/campus/screen.tsx.
const news = [
  {
    title: "臺大特殊選才",
    tags: ["轉知", "升學"],
    subtitle: "10月8日 · 最新消息",
    unread: true,
  },
  {
    title: "115學年度班週會",
    tags: [],
    subtitle: "10月8日 · 最新消息",
    unread: true,
  },
  {
    title: "段考公告",
    tags: [],
    subtitle: "10月7日 · 重要公告 · 已釘選",
    unread: false,
  },
];
const sections = [
  {
    title: "交通",
    items: [
      {
        title: "YouBike 與捷運",
        subtitle: "建中東側門 借 7 · 還 41",
        icon: "bike",
        slug: "transport",
      },
    ],
  },
  {
    title: "學生福利",
    items: [
      {
        title: "建北特約",
        subtitle: "合作店家優惠",
        icon: "store",
        slug: "partner-shops",
      },
      {
        title: "校慶紀念品",
        subtitle: "紀念品商店",
        icon: "bag",
        slug: "souvenirs",
      },
      {
        title: "建中舞會門票",
        subtitle: "CK PARTY NIGHT",
        icon: "ticket",
        slug: "dance-tickets",
      },
    ],
  },
  {
    title: "工具",
    items: [
      {
        title: "選擇障礙小幫手",
        subtitle: "輸入選項，幫你抽一個",
        icon: "help",
        slug: "decision-helper",
      },
    ],
  },
];
</script>

<template>
  <div class="campus-preview">
    <div class="campus-toolbar">
      <a :href="featureHref('school-news')" aria-label="搜尋校網"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" /></svg
      ></a>
    </div>
    <h3>校園</h3>
    <section class="campus-section" aria-label="校網">
      <div class="campus-section-heading">
        <h4>校網</h4>
        <span class="unread-count">2 則未讀</span
        ><a :href="featureHref('school-news')">全部</a>
      </div>
      <div class="campus-group">
        <a
          v-for="item in news"
          :key="item.title"
          :href="featureHref('school-news')"
          class="news-row"
          :class="{ unread: item.unread }"
        >
          <span class="news-dot" aria-hidden="true"></span>
          <span class="news-body"
            ><span v-if="item.tags.length" class="news-tags"
              ><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></span
            ><span class="news-title">{{ item.title }}</span
            ><span class="news-subtitle">{{ item.subtitle }}</span></span
          >
          <span v-if="item.unread" class="sr-only">未讀</span>
        </a>
      </div>
    </section>
    <section
      v-for="section in sections"
      :key="section.title"
      class="campus-section"
      :aria-label="section.title"
    >
      <div class="campus-section-heading">
        <h4>{{ section.title }}</h4>
      </div>
      <div class="campus-group">
        <a
          v-for="item in section.items"
          :key="item.title"
          :href="featureHref(item.slug)"
          class="campus-row"
        >
          <svg class="campus-row-icon" viewBox="0 0 24 24" aria-hidden="true">
            <template v-if="item.icon === 'bike'">
              <circle cx="5" cy="16.5" r="4" />
              <circle cx="19" cy="16.5" r="4" />
              <path d="m5 16.5 5-9 4 9H5l10-7 4 7m-9-9H7m7-3h3l1 5" />
            </template>
            <template v-else-if="item.icon === 'store'">
              <path
                d="m3 9 2-6h14l2 6M3 9v2a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2V9ZM5 14v7h14v-7M9 21v-6h6v6M8 9l1-6m7 6-1-6"
              />
            </template>
            <template v-else-if="item.icon === 'bag'">
              <path d="M4 8h16l1 13H3Zm4 0V6a4 4 0 0 1 8 0v2" />
            </template>
            <template v-else-if="item.icon === 'ticket'">
              <path
                d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Zm12 0v2m0 3v1m0 3v1m0 3v1"
              />
            </template>
            <template v-else>
              <circle cx="12" cy="12" r="9" />
              <path
                d="M9.4 8a2.8 2.8 0 1 1 4.6 2.6c-1.6 1-2 1.6-2 3M12 17h.01"
              />
            </template>
          </svg>
          <span class="campus-row-copy"
            ><span class="campus-row-title">{{ item.title }}</span
            ><span class="campus-row-subtitle">{{ item.subtitle }}</span></span
          >
          <svg class="campus-chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.campus-preview {
  min-width: 0;
  color: var(--app-text, #000);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  font-size: 1rem;
  background: var(--app-background, #f2f2f7);
  padding: 0 16px 18px;
}
a {
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  color: inherit;
}
a:focus-visible {
  outline: 3px solid var(--app-tint, #03328d);
  outline-offset: 3px;
}
a:hover {
  filter: brightness(0.9);
}
svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}
.campus-toolbar {
  display: flex;
  justify-content: flex-end;
  min-height: 44px;
}
.campus-toolbar a {
  min-height: 44px;
  min-width: 44px;
  display: grid;
  place-items: center;
  color: var(--app-tint, #03328d);
}
h3 {
  font-size: 2.125rem;
  line-height: 1.18;
  letter-spacing: -1px;
  font-weight: 700;
  margin: 5px 0 17px;
}
.campus-section + .campus-section {
  margin-top: 22px;
}
.campus-section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 2px 9px;
  flex-wrap: wrap;
}
.campus-section-heading h4 {
  font-size: 1.25rem;
  line-height: 1.3;
  font-weight: 700;
  margin: 0;
}
.unread-count {
  font-size: 0.6875rem;
  color: var(--app-secondary, #636366);
  background: var(--app-quiet, #e5e5ea);
  padding: 3px 6px;
  border-radius: 99px;
  white-space: nowrap;
}
.campus-section-heading > a {
  margin-left: auto;
  color: var(--app-tint, #03328d);
  font-size: 0.875rem;
  min-height: 28px;
  display: flex;
  align-items: center;
  padding: 0 3px;
}
.campus-group {
  background: var(--app-surface, #fff);
  border-radius: 12px;
  overflow: hidden;
}
.news-row {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  padding: 11px 14px;
  min-height: 66px;
}
.news-row + .news-row::before,
.campus-row + .campus-row::before {
  content: "";
  position: absolute;
  left: 50px;
  right: 0;
  top: 0;
  border-top: 0.5px solid var(--app-separator, #c6c6c8);
}
.news-dot {
  display: block;
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  margin: 0 7px;
  background: transparent;
  border-radius: 50%;
}
.news-row.unread .news-dot {
  background: var(--app-tint, #03328d);
}
.news-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 1px;
}
.news-tags > span {
  background: var(--app-quiet, #e5e5ea);
  color: var(--app-secondary, #636366);
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.3;
}
.news-title {
  font-size: 1rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.unread .news-title {
  font-weight: 600;
}
.news-subtitle {
  color: var(--app-secondary, #636366);
  font-size: 0.6875rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.campus-row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 11px 14px;
  gap: 12px;
  min-height: 66px;
}
.campus-row-icon {
  width: 28px;
  height: 24px;
  color: var(--app-tint, #03328d);
}
.campus-row-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}
.campus-row-title {
  font-size: 1rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.campus-row-subtitle {
  font-size: 0.6875rem;
  line-height: 1.5;
  color: var(--app-secondary, #636366);
  overflow-wrap: anywhere;
}
.campus-chevron {
  width: 12px;
  height: 16px;
  color: var(--app-secondary, #636366);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
