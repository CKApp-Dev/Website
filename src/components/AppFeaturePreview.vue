<script setup lang="ts">
import { computed } from "vue";
import type { FeaturePage } from "../data/types";

const props = defineProps<{ feature: FeaturePage }>();

// These are local display fixtures. Screen structure, control labels and visual
// roles follow App/src/features and App/src/ui/ios; no live school data is read.
const titles: Record<string, string> = {
  "school-news": "校網",
  announcements: "公告",
  transport: "交通",
  "partner-shops": "建北特約",
  souvenirs: "校慶紀念品",
  "dance-tickets": "建中舞會門票",
  "decision-helper": "選擇障礙小幫手",
};
const screenTitle = computed(
  () => titles[props.feature.slug] ?? props.feature.title,
);
const isStore = computed(() =>
  ["souvenirs", "dance-tickets"].includes(props.feature.slug),
);
const hasHeader = computed(
  () => !["getting-started", "widgets"].includes(props.feature.slug),
);

const paths: Record<string, string> = {
  back: "m14.5 4-8 8 8 8",
  chevron: "m9 5 7 7-7 7",
  external:
    "M13 3h8v8m0-8L10 14M9 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4",
  location: "m21 3-7 18-3-8-8-3L21 3Z",
  store:
    "M3 10v11h18V10M2 10l2-7h16l2 7M2 10c0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0M8 21v-7h8v7M8 3l-1 7m9-7 1 7",
  mappin:
    "M12 14v8M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  pin: "m8 3 8 0-1 6 4 4v2H5v-2l4-4-1-6Zm4 12v7",
  dice: "M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3ZM7.5 7.5h.01m9 0h.01m-4.5 4.5h.01m-4.5 4.5h.01m9 0h.01",
};

const news = [
  {
    title: "【公告】校內活動報名資訊",
    date: "2026/10/13 09:00",
    pinned: false,
  },
  { title: "圖書館本週開放時間", date: "2026/10/12 16:30", pinned: false },
  { title: "校園場地使用注意事項", date: "2026/10/12 12:00", pinned: false },
];
const announcements = [
  { title: "班聯會活動資訊", date: "10/13 09:00", unread: true },
  { title: "學生福利與特約資訊", date: "10/12 12:00", unread: true },
  { title: "班聯會近期工作報告", date: "10/9 16:30", unread: false },
];
const transport = [
  {
    title: "附近交通",
    subtitle: "尋找附近三個 YouBike 站點與最近的捷運站",
    icon: "location",
  },
  {
    title: "YouBike",
    subtitle: "常用站點的可借車輛與可還車位",
    icon: "i-bike",
  },
  {
    title: "捷運",
    subtitle: "常用車站的即時到站與車廂擁擠資訊",
    icon: "i-train",
  },
];
const regions = ["官方網站", "建中地區", "北車地區", "西門地區", "其他地區"];
const classes = Array.from({ length: 25 }, (_, index) => String(101 + index));
const upcoming = [
  { title: "數學", time: "10:10" },
  { title: "國語文", time: "11:10" },
  { title: "午餐", time: "12:00" },
  { title: "物理", time: "13:00" },
];
</script>

<template>
  <div class="native-feature" :class="`native-feature-${feature.slug}`">
    <div v-if="hasHeader" class="native-header">
      <span class="native-header-leading" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path :d="paths.back" /></svg>
      </span>
      <p class="native-header-title">{{ screenTitle }}</p>
      <span class="native-header-trailing" aria-hidden="true">
        <svg v-if="isStore" viewBox="0 0 24 24">
          <path :d="paths.external" />
        </svg>
        <svg v-else-if="feature.slug === 'school-news'" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <circle cx="8" cy="12" r=".65" fill="currentColor" />
          <circle cx="12" cy="12" r=".65" fill="currentColor" />
          <circle cx="16" cy="12" r=".65" fill="currentColor" />
        </svg>
      </span>
    </div>

    <div
      v-if="feature.slug === 'school-news'"
      class="native-content native-news"
    >
      <div class="native-search">
        <svg aria-hidden="true"><use href="#i-search" /></svg
        ><span>搜尋消息</span
        ><span class="search-mic" aria-hidden="true"
          ><svg viewBox="0 0 24 24">
            <rect x="9" y="2" width="6" height="13" rx="3" />
            <path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v4m-3 0h6" /></svg
        ></span>
      </div>
      <div class="native-segments" aria-label="篩選消息：未讀">
        <span
          v-for="(filter, index) in ['未讀', '已釘選', '已讀', '全部']"
          :key="filter"
          :class="{ selected: index === 0 }"
          >{{ filter }}</span
        >
      </div>
      <section class="native-section">
        <p class="native-section-title">3 則消息</p>
        <div class="native-group">
          <div v-for="item in news" :key="item.title" class="native-row">
            <div class="native-row-text">
              <p>{{ item.title }}</p>
              <small>{{ item.date }}</small>
            </div>
            <svg
              class="native-accessory native-external"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path :d="paths.external" />
            </svg>
          </div>
        </div>
        <p class="native-footer">最後更新：2026/10/13 09:41</p>
      </section>
    </div>

    <div v-else-if="feature.slug === 'announcements'" class="native-content">
      <section class="native-section">
        <p class="native-section-title">班聯公告</p>
        <div class="native-group">
          <div
            v-for="item in announcements"
            :key="item.title"
            class="native-row"
          >
            <div class="native-row-text">
              <div class="native-row-title">
                <p :class="{ strong: item.unread }">{{ item.title }}</p>
                <span v-if="item.unread" class="native-badge">未讀</span>
              </div>
              <small>{{ item.date }}</small>
            </div>
            <svg
              class="native-accessory"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path :d="paths.chevron" />
            </svg>
          </div>
        </div>
        <p class="native-footer">顯示最近 50 則已發布公告</p>
      </section>
    </div>

    <div v-else-if="feature.slug === 'transport'" class="native-content">
      <section class="native-section">
        <p class="native-section-title">交通</p>
        <div class="native-group">
          <div v-for="item in transport" :key="item.title" class="native-row">
            <svg
              class="native-leading-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path v-if="paths[item.icon]" :d="paths[item.icon]" />
              <use v-else :href="`#${item.icon}`" />
            </svg>
            <div class="native-row-text">
              <p>{{ item.title }}</p>
              <small>{{ item.subtitle }}</small>
            </div>
            <svg
              class="native-accessory"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path :d="paths.chevron" />
            </svg>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="feature.slug === 'partner-shops'" class="native-content">
      <section class="native-section">
        <p class="native-section-title">建北特約</p>
        <div class="native-group native-paragraphs">
          <p>特約店家會在店內明顯處張貼建北特約專用貼紙</p>
          <p>
            使用優惠時，請出示學生證或教師證<br />店家可以拒絕僅穿著制服的使用者
          </p>
        </div>
      </section>
      <section class="native-section">
        <p class="native-section-title">尋找特約店家</p>
        <div class="native-group">
          <div
            v-for="(region, index) in regions"
            :key="region"
            class="native-row"
          >
            <svg
              class="native-leading-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path :d="index === 0 ? paths.store : paths.mappin" />
            </svg>
            <div class="native-row-text">
              <p>{{ region }}</p>
            </div>
            <svg
              class="native-accessory native-external"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path :d="paths.external" />
            </svg>
          </div>
        </div>
      </section>
    </div>

    <!-- The shop content is a remote WebView in CK APP. Its actual native
         loading state avoids fabricating either shop's current website. -->
    <div
      v-else-if="isStore"
      class="native-store-loading"
      role="img"
      aria-label="商店網頁正在載入；頂部可在瀏覽器開啟"
    >
      <span class="native-spinner" aria-hidden="true"
        ><i v-for="index in 12" :key="index" :style="{ '--spoke': index }"></i
      ></span>
    </div>

    <div v-else-if="feature.slug === 'decision-helper'" class="native-content">
      <section class="native-section">
        <p class="native-section-title">今天選哪個？</p>
        <div class="native-group native-option-field">
          <small>選項</small>
          <p>熱食部<br />附近餐廳<br />自己帶便當</p>
        </div>
        <p class="native-footer">每行輸入一個選項，讓小幫手替你選擇</p>
      </section>
      <div class="native-primary-action" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path :d="paths.dice" /></svg
        ><span>再選一次</span>
      </div>
      <section class="native-section native-result">
        <p class="native-section-title">就選這個</p>
        <div class="native-group"><p>熱食部</p></div>
      </section>
    </div>

    <div
      v-else-if="feature.slug === 'getting-started'"
      class="native-content native-welcome"
    >
      <div class="native-welcome-intro">
        <svg
          class="native-brand-triangle"
          viewBox="0 0 64 56"
          aria-hidden="true"
        >
          <path d="M3 3h58L32 53Z" />
        </svg>
        <p class="native-welcome-title">你是哪一班？</p>
        <p class="native-welcome-description">
          選好班級，就能看到今天的課<br />之後可以在「今天」右上角更改<br />班級只存在這支手機上
        </p>
      </div>
      <div class="native-segments" aria-label="年級：高一">
        <span class="selected">高一</span><span>高二</span><span>高三</span>
      </div>
      <div class="native-class-grid" aria-label="班級：102">
        <span
          v-for="schoolClass in classes"
          :key="schoolClass"
          :class="{ selected: schoolClass === '102' }"
          >{{ schoolClass }}</span
        >
      </div>
      <div class="native-welcome-actions" aria-hidden="true">
        <span class="native-primary-action">開始使用</span
        ><span class="native-skip-action">先看看，之後再選</span>
      </div>
    </div>

    <div v-else-if="feature.slug === 'widgets'" class="native-widget-content">
      <div
        class="native-widget native-widget-medium"
        aria-label="現在小工具：第二節英語文，19 分鐘後下課；接下來數學、國語文、午餐、物理"
      >
        <div class="widget-now">
          <p class="widget-eyebrow">
            <span>第二節</span><span>09:10–10:00</span>
          </p>
          <p class="widget-subject">英語文</p>
          <div class="widget-rail" aria-hidden="true">
            <span
              v-for="index in 9"
              :key="index"
              :class="{
                current: index === 2,
                passed: index === 1,
                lunch: index === 5,
              }"
              ><i></i><b></b
            ></span>
          </div>
          <p class="widget-countdown"><span>19:00</span> 後下課</p>
        </div>
        <div class="widget-upcoming">
          <p v-for="item in upcoming" :key="item.time">
            <span>{{ item.title }}</span
            ><span>{{ item.time }}</span>
          </p>
        </div>
      </div>
      <div
        class="native-widget native-widget-small"
        aria-label="現在小型小工具：第二節英語文，19 分鐘後下課"
      >
        <div class="widget-now">
          <p class="widget-eyebrow">第二節</p>
          <p class="widget-subject">英語文</p>
          <div class="widget-rail" aria-hidden="true">
            <span
              v-for="index in 9"
              :key="index"
              :class="{
                current: index === 2,
                passed: index === 1,
                lunch: index === 5,
              }"
              ><i></i><b></b
            ></span>
          </div>
          <p class="widget-countdown"><span>19:00</span> 後下課</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.native-feature {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  min-height: 100%;
  container: native-feature / inline-size;
  background: var(--app-background);
  color: var(--app-text);
  font-family:
    -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue",
    sans-serif;
  font-size: 1.0625rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.native-feature p {
  margin: 0;
}
.native-feature svg {
  display: block;
  flex-shrink: 0;
  width: 1.375rem;
  height: 1.375rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.native-header {
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr) 2rem;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0.375rem 0.875rem;
}
.native-header-title {
  text-align: center;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.25;
}
.native-header-leading,
.native-header-trailing {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 2rem;
  color: var(--app-tint);
}
.native-header-leading svg {
  width: 1.25rem;
  height: 1.625rem;
  stroke-width: 2.4;
}
.native-header-trailing {
  justify-content: flex-end;
}
.native-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
  padding: 1.125rem 1.25rem 1.75rem;
}
.native-section {
  min-width: 0;
}
.native-section-title {
  padding: 0 1rem 0.4375rem;
  color: var(--app-secondary);
  font-size: 0.8125rem;
  line-height: 1.35;
}
.native-group {
  min-width: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  background: var(--app-surface);
}
.native-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  min-height: 2.75rem;
  padding: 0.6875rem 1rem;
}
.native-row + .native-row::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 1rem;
  height: 1px;
  background: var(--app-separator);
  content: "";
}
.native-row-text {
  flex: 1;
  min-width: 0;
}
.native-row-text p {
  font-size: 1.0625rem;
  line-height: 1.35;
}
.native-row-text small {
  display: block;
  margin-top: 0.125rem;
  color: var(--app-secondary);
  font-size: 0.9375rem;
  line-height: 1.35;
  font-variant-numeric: tabular-nums;
}
.native-row-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.375rem;
}
.native-row-title .strong {
  font-weight: 700;
}
.native-leading-icon {
  width: 1.5rem !important;
  height: 1.5rem !important;
  color: var(--app-tint);
}
.native-row .native-accessory {
  width: 0.6875rem;
  height: 0.9375rem;
  margin-left: 0.125rem;
  color: var(--app-secondary);
  stroke-width: 2.4;
}
.native-row .native-external {
  width: 0.875rem;
  height: 0.875rem;
  stroke-width: 1.7;
}
.native-footer {
  padding: 0.4375rem 1rem 0;
  color: var(--app-secondary);
  font-size: 0.8125rem;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
}
.native-search {
  display: flex;
  align-items: center;
  gap: 0.4375rem;
  min-width: 0;
  min-height: 2.25rem;
  padding: 0.4375rem 0.625rem;
  border-radius: 0.625rem;
  background: var(--app-quiet);
  color: var(--app-secondary);
}
.native-search > span:first-of-type {
  flex: 1;
  min-width: 0;
}
.native-search > svg {
  width: 1.125rem;
  height: 1.125rem;
}
.native-search .search-mic svg {
  width: 1rem;
  height: 1.25rem;
}
.native-news {
  gap: 1.125rem;
  padding-top: 0.25rem;
}
.native-segments {
  display: flex;
  align-items: stretch;
  min-width: 0;
  padding: 0.125rem;
  border-radius: 0.5625rem;
  background: var(--app-quiet);
}
.native-segments span {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 1.875rem;
  padding: 0.1875rem 0.1875rem;
  border-radius: 0.4375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}
.native-segments .selected {
  background: var(--app-surface);
  box-shadow: 0 1px 3px #0000001a;
}
.native-badge {
  max-width: 100%;
  padding: 0.0625rem 0.375rem;
  border-radius: 0.3125rem;
  background: var(--app-quiet);
  color: var(--app-tint);
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.35;
}
.native-paragraphs p {
  padding: 0.6875rem 1rem;
  font-size: 1.0625rem;
  line-height: 1.4;
}
.native-paragraphs p + p {
  border-top: 1px solid var(--app-separator);
}
.native-store-loading {
  display: grid;
  flex: 1;
  place-items: center;
  min-height: 24rem;
  background: var(--app-surface);
}
.native-spinner {
  position: relative;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--app-secondary);
}
.native-spinner i {
  position: absolute;
  top: 0;
  left: calc(50% - 1px);
  width: 2px;
  height: 0.4375rem;
  border-radius: 1px;
  background: currentColor;
  opacity: calc(var(--spoke) / 12);
  transform: rotate(calc(var(--spoke) * 30deg));
  transform-origin: 1px 0.75rem;
}
.native-option-field {
  padding: 0.625rem 1rem;
}
.native-option-field small {
  display: block;
  margin-bottom: 0.375rem;
  color: var(--app-secondary);
  font-size: 0.75rem;
}
.native-option-field p {
  line-height: 1.55;
}
.native-primary-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 0;
  min-height: 2.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  background: var(--app-tint);
  color: var(--app-on-tint);
  font-size: 1.0625rem;
  font-weight: 600;
  text-align: center;
}
.native-primary-action svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 1.8;
}
.native-primary-action svg path {
  stroke-linecap: round;
}
.native-result .native-group {
  padding: 0.75rem 1rem;
}
.native-result .native-group p {
  font-size: 1.375rem;
  font-weight: 700;
}
.native-welcome {
  gap: 1.5rem;
  padding-top: 2rem;
}
.native-welcome-intro {
  padding: 0 0.25rem;
}
.native-welcome .native-brand-triangle {
  width: 4rem;
  height: 3.5rem;
  margin-bottom: 1.25rem;
  fill: var(--app-tint);
  stroke: none;
}
.native-welcome .native-welcome-title {
  margin-bottom: 0.6875rem;
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
}
.native-welcome .native-welcome-description {
  color: var(--app-secondary);
  font-size: 1.0625rem;
  line-height: 1.45;
}
.native-class-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.625rem;
  min-width: 0;
}
.native-class-grid span {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 2.75rem;
  padding: 0.375rem 0.125rem;
  border-radius: 0.75rem;
  background: var(--app-quiet);
  font-size: 1.0625rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.native-class-grid .selected {
  background: var(--app-tint);
  color: var(--app-on-tint);
}
.native-welcome-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}
.native-skip-action {
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  color: var(--app-tint);
  text-align: center;
}
.native-widget-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.5rem;
  min-width: 0;
  min-height: 27rem;
  padding: 1.5rem 0.875rem;
}
.native-widget {
  min-width: 0;
  max-width: 100%;
  padding: 1rem;
  border-radius: 1.5rem;
  background: var(--app-now);
  color: #fff;
}
.native-widget-medium {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.75rem;
  width: 100%;
  min-height: 10rem;
}
.widget-now {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.widget-eyebrow {
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem 0.375rem;
  color: var(--app-now-soft);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.35;
  font-variant-numeric: tabular-nums;
}
.widget-eyebrow > span + span {
  font-weight: 400;
}
.native-widget .widget-subject {
  margin-top: 0.125rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.15;
}
.widget-rail {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  min-width: 0;
  margin-top: auto;
  padding-top: 0.875rem;
}
.widget-rail > span {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
}
.widget-rail i {
  display: block;
  width: 0;
  height: 0;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  border-top: 4px solid #fff;
  visibility: hidden;
}
.widget-rail b {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #ffffff73;
}
.widget-rail .current i {
  visibility: visible;
}
.widget-rail .current b,
.widget-rail .passed b {
  background: #fff;
}
.widget-rail .lunch {
  flex: 0 0 6px;
}
.widget-rail .lunch b {
  height: 2px;
}
.native-widget .widget-countdown {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1875rem;
  margin-top: 0.4375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.3;
  font-variant-numeric: tabular-nums;
}
.widget-upcoming {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
  padding-left: 0.75rem;
  border-left: 1px solid #ffffff38;
}
.widget-upcoming p {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 0.375rem;
  min-width: 0;
  font-size: 0.9375rem;
  line-height: 1.35;
}
.widget-upcoming p span + span {
  color: var(--app-now-soft);
  font-variant-numeric: tabular-nums;
}
.native-widget-small {
  display: flex;
  width: 10.25rem;
  min-height: 10.25rem;
}
.native-widget-small .widget-now {
  flex: 1;
}
/* Keep the native arrangement at its normal size, then give enlarged text
   the whole row when the available width is small relative to that text. */
@container native-feature (max-width: 12rem) {
  .native-header {
    grid-template-columns: 1.5rem minmax(0, 1fr) 1.5rem;
    gap: 0.125rem;
    padding-inline: 8px;
  }
  .native-content {
    padding-inline: 8px;
  }
  .native-section-title,
  .native-footer {
    padding-inline: 8px;
  }
  .native-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.375rem;
    padding-inline: 8px;
  }
  .native-row-text {
    flex: auto;
    width: 100%;
  }
  .native-row .native-accessory {
    align-self: flex-end;
  }
  .native-row + .native-row::before {
    left: 8px;
  }
  .native-row-title {
    align-items: flex-start;
  }
  .native-row-title > p {
    min-width: 0;
    max-width: 100%;
  }
  .native-badge {
    box-sizing: border-box;
  }
  .native-paragraphs p,
  .native-option-field,
  .native-result .native-group {
    padding-inline: 8px;
  }
  .native-search {
    padding-inline: 8px;
  }
  .native-search .search-mic {
    display: none;
  }
  .native-news .native-segments {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .native-welcome-intro {
    min-width: 0;
    padding-inline: 0;
  }
  .native-welcome .native-brand-triangle {
    max-width: 100%;
  }
  .native-welcome .native-segments {
    flex-wrap: wrap;
  }
  .native-welcome .native-segments span {
    flex-basis: 3.5rem;
  }
  .native-class-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 2.75rem), 1fr));
    gap: 0.375rem;
  }
  .native-class-grid span {
    padding-inline: 0;
  }
  .native-widget-content {
    padding-inline: 8px;
  }
  .native-widget {
    box-sizing: border-box;
    padding: 0.625rem;
  }
  .native-widget-medium {
    grid-template-columns: minmax(0, 1fr);
  }
  .widget-upcoming {
    border-top: 1px solid #ffffff38;
    border-left: 0;
    padding-top: 0.75rem;
    padding-left: 0;
  }
  .widget-upcoming p > span,
  .widget-countdown > span {
    min-width: 0;
    max-width: 100%;
  }
}
@media (prefers-contrast: more) {
  .native-group {
    outline: 1px solid var(--app-secondary);
  }
  .native-search,
  .native-segments,
  .native-class-grid span {
    outline: 1px solid var(--app-secondary);
  }
  .native-badge {
    outline: 1px solid currentColor;
  }
}
</style>
