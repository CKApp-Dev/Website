<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { QBtn } from "quasar";
import AppInterfacePreview from "../components/AppInterfacePreview.vue";
import AppSchedulePreview from "../components/AppSchedulePreview.vue";
import AppFoodPreview from "../components/AppFoodPreview.vue";
import { featuresHref } from "../data/features";
type View = "today" | "schedule" | "calendar" | "food" | "campus";
const baseUrl = import.meta.env.BASE_URL;
const activeView = ref<View>("today");
const preview = ref<HTMLElement | null>(null);
const features: {
  id: View;
  icon: string;
  title: string;
  tagline: string;
  description: string;
}[] = [
  {
    id: "today",
    icon: "sun",
    title: "今天",
    tagline: "打開，就是今天的重點",
    description:
      "現在上哪堂、下一聲鐘還有多久、待辦有什麼。把今天需要的事，放在一起。",
  },
  {
    id: "schedule",
    icon: "grid",
    title: "課表",
    tagline: "這一週，心裡有底",
    description:
      "選好班級，整週課程就到位。科目、顏色、備註自己定，單雙週也照顧到了。",
  },
  {
    id: "calendar",
    icon: "calendar",
    title: "行事曆",
    tagline: "大事小事，一起記",
    description: "校方活動、考試和自己的待辦，放在同一份日常計畫裡。",
  },
  {
    id: "food",
    icon: "food",
    title: "美食",
    tagline: "今天吃什麼？有解",
    description:
      "看看熱食部菜單與價格，或找找附近的口袋名單。替每天的午餐找點靈感。",
  },
  {
    id: "campus",
    icon: "school",
    title: "校園",
    tagline: "校園大小事，隨手就找到",
    description: "校網消息、YouBike、捷運與建北特約。常用資訊，不用四處找。",
  },
];
const currentFeature = computed(
  () => features.find((feature) => feature.id === activeView.value)!,
);
const feedback = computed(
  () =>
    `正在展示：${currentFeature.value.title} — ${currentFeature.value.tagline}`,
);
const dayStops = [
  { time: "08:00", label: "準備上課", icon: "grid" },
  { time: "10:00", label: "看看待辦", icon: "check" },
  { time: "12:00", label: "午餐吃什麼", icon: "food" },
  { time: "17:00", label: "順路回家", icon: "bike" },
];

function handlePreviewNavigation(screen: string): void {
  const view = screen === "timetable" ? "schedule" : screen;
  if (["today", "schedule", "calendar", "food", "campus"].includes(view))
    activeView.value = view as View;
}

async function selectView(view: View, moveToPreview = false): Promise<void> {
  activeView.value = view;
  await nextTick();
  preview.value?.querySelector(".phone-body")?.scrollTo({ top: 0 });
  if (!moveToPreview) return;
  preview.value?.focus({ preventScroll: true });
  preview.value?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}
</script>

<template>
  <main id="main" tabindex="-1">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow hero-kicker">
          <span class="kicker-line" aria-hidden="true"></span
          >為建中生活而生<span class="kicker-english">MADE FOR CK LIFE</span>
        </p>
        <h1 id="hero-title">
          校園生活<br /><span>剛剛好<span class="hero-period"></span></span>
        </h1>
        <p class="hero-description">
          下堂課上什麼？午餐吃什麼？<br />從第一節課到放學回家，<br />把每天的小事，交給
          CK APP
        </p>
        <div class="hero-actions">
          <a href="#download" class="button button-primary"
            >免費下載<svg aria-hidden="true"><use href="#i-down" /></svg></a
          ><a href="#features" class="button button-quiet"
            >看看有什麼<svg aria-hidden="true"><use href="#i-arrow" /></svg
          ></a>
        </div>
        <p class="hero-note">
          <svg aria-hidden="true"><use href="#i-check" /></svg>iOS & Android
          都有
        </p>
        <div class="student-signature">
          <span class="signature-mark" aria-hidden="true">CK</span>
          <p>Made by students.<br /><strong>For students.</strong></p>          
        </div>
      </div>
      <div
        ref="preview"
        id="app-preview"
        class="preview"
        tabindex="-1"
        role="region"
        aria-label="CK APP 互動功能示意"
        aria-describedby="preview-caption"
      >
        <div class="phone">
          <div class="phone-status" aria-hidden="true">
            <span>9:41</span><span class="phone-island"></span
            ><span class="phone-signal"
              ><svg><use href="#i-wifi" /></svg><span class="battery"></span
            ></span>
          </div>
          <div
            id="preview-panel"
            class="phone-body"
            tabindex="0"
            role="region"
            :aria-label="`${currentFeature.title}功能預覽，可捲動查看完整畫面`"
          >
            <AppInterfacePreview
              :screen="activeView"
              @navigate="handlePreviewNavigation"
            />
          </div>
          <div class="phone-tabs" role="group" aria-label="切換 App 功能示意">
            <QBtn
              v-for="feature in features"
              :key="feature.id"
              class="phone-tab"
              flat
              no-caps
              :ripple="false"
              :aria-pressed="activeView === feature.id"
              aria-controls="preview-panel"
              @click="selectView(feature.id)"
              ><svg aria-hidden="true">
                <use
                  :href="`#i-${activeView === feature.id && ['sun', 'grid'].includes(feature.icon) ? `${feature.icon}-fill` : feature.icon}`"
                /></svg
              ><span>{{ feature.title }}</span></QBtn
            >
          </div>
          <div class="phone-home" aria-hidden="true"></div>
        </div>
        <p id="preview-caption" class="preview-caption">
          點選分頁，試試你的校園日常<span
            >依 CK APP iOS 介面製作 · 範例資料 · 可捲動</span
          >
        </p>
        <p class="sr-only" role="status" aria-live="polite">{{ feedback }}</p>
      </div>
    </section>
    <div class="day-strip wrap" aria-label="從早到晚的校園日常">
      <p>你的一天，<br /><strong>我們都在</strong></p>
      <ol>
        <li v-for="stop in dayStops" :key="stop.time">
          <svg aria-hidden="true"><use :href="`#i-${stop.icon}`" /></svg
          ><span
            ><time>{{ stop.time }}</time
            ><strong>{{ stop.label }}</strong></span
          >
        </li>
      </ol>
    </div>
    <section
      id="features"
      class="features section wrap"
      aria-labelledby="features-title"
    >
      <div class="section-heading">
        <div>
          <h2 id="features-title">少找一下，<br />多一點自己的時間</h2>
        </div>
        <div class="section-summary">
          <p class="section-copy">
            不用在不同網站之間來回切換<br />五個分頁，裝下建中生的一天
          </p>
          <a :href="featuresHref" class="text-link"
            >探索完整功能指南<svg aria-hidden="true">
              <use href="#i-arrow" /></svg
          ></a>
        </div>
      </div>
      <div class="feature-grid">
        <button
          v-for="feature in features"
          :key="feature.id"
          type="button"
          class="feature-card"
          :aria-label="`預覽${feature.title}：${feature.tagline}`"
          @click="selectView(feature.id, true)"
        >
          <span class="feature-icon"
            ><svg aria-hidden="true"><use :href="`#i-${feature.icon}`" /></svg
          ></span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <span class="feature-link"
            >試試看<svg aria-hidden="true"><use href="#i-arrow" /></svg
          ></span>
        </button>
      </div>
    </section>
    <section
      class="details-section section wrap"
      aria-labelledby="details-title"
    >
      <div class="section-heading">
        <div>
          <h2 id="details-title">不只是一張課表</h2>
        </div>
        <p class="section-copy">從早八到放學，<br />替忙碌的日子留點餘裕</p>
      </div>
      <div class="detail-grid">
        <article class="schedule-showcase">
          <div class="detail-copy">
            <span class="detail-icon"
              ><svg aria-hidden="true"><use href="#i-grid" /></svg
            ></span>
            <h3>這一週，心裡有底</h3>
            <p>
              選好班級，整週課表就到位<br />單雙週課程、備註和待辦，都安排好了
            </p>
          </div>
          <div class="native-schedule-showcase app-interface">
            <AppSchedulePreview />
          </div>
          <p class="demo-disclaimer">課表與課程內容為示意</p>
        </article>
        <div class="life-stack">
          <article class="life-card food-card">
            <span class="detail-icon"
              ><svg aria-hidden="true"><use href="#i-food" /></svg
            ></span>
            <h3>午餐，有想法了</h3>
            <p>熱食部今天的菜色與價格，<br />和附近的口袋名單，一起看看</p>
            <div class="life-preview-native app-interface">
              <AppFoodPreview />
            </div>
            <p class="demo-disclaimer">菜色與價格為示意</p>
          </article>
          <article class="life-card transport-card">
            <span class="detail-icon"
              ><svg aria-hidden="true"><use href="#i-bike" /></svg
            ></span>
            <h3>放學，順路回家</h3>
            <p>收藏常用 YouBike 與捷運站點，<br />出發前，先看看交通資訊</p>
            <div class="life-preview-native app-interface">
              <div class="app-native-group">
                <div class="app-native-row">
                  <svg aria-hidden="true"><use href="#i-bike" /></svg
                  ><span><strong>建國中學</strong><small>YouBike</small></span
                  ><span class="app-native-detail">借 12 · 還 8</span>
                </div>
              </div>
            </div>
            <p class="demo-disclaimer">站點資訊為示意，非即時資料</p>
          </article>
        </div>
      </div>
    </section>
    <section id="about" class="about section" aria-labelledby="about-title">
      <div class="about-inner wrap">
        <div class="school-art">
          <div class="school-art-frame">
            <img
              :src="`${baseUrl}assets/ck-app-icon.png`"
              alt="CK APP 手繪建中紅樓標誌"
              width="320"
              height="320"
              loading="lazy"
            />
          </div>
          <p>FROM OUR CAMPUS, WITH CARE.</p>
        </div>
        <div class="about-copy">
          <h2 id="about-title">由建中生打造，<br />為建中生活而生</h2>
          <p>
            CK APP 從 2024 年開始，由建中學生 Kimi 與 Diego 發起<br />我們把自己每天遇到的小麻煩，變成一個個實用功能，並和班聯會資訊股一起持續維護
          </p>
          <p>有想法、有建議，或也想一起讓校園生活更好？<br />我們很樂意聽聽</p>
          <a href="mailto:ckappofficial@gmail.com" class="text-link"
            >Contact Us<svg aria-hidden="true"><use href="#i-up-right" /></svg
          ></a>
        </div>
      </div>
    </section>
    <section class="faq section wrap" aria-labelledby="faq-title">
      <div>
        <h2 id="faq-title">FAQ</h2>
      </div>
      <div class="faq-list">
        <details>
          <summary>
            CK APP 需要付費嗎？<svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            CK APP 可以免費下載與使用<br />我們希望讓更多建中學生，輕鬆找到每天需要的校園資訊
          </p>
        </details>
        <details>
          <summary>
            iPhone 和 Android 都可以用嗎？<svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            可以！iPhone 請從 App Store 下載，Android 請從 Google Play 下載<br />點選下方對應的商店按鈕，就能前往下載頁面
          </p>
        </details>
        <details>
          <summary>
            第一次使用，要怎麼開始？<svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            開啟 App，選擇你的年級與班級，就可以查看課表與今天的安排<br />也可以先逛逛，之後再到設定裡選擇班級
          </p>
        </details>
        <details>
          <summary>
            有問題或想推薦新功能，怎麼聯絡？<svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            歡迎寄信到
            <a href="mailto:ckappofficial@gmail.com">ckappofficial@gmail.com</a
            >，或透過
            <a
              href="https://www.instagram.com/ckappofficial/"
              target="_blank"
              rel="noopener noreferrer"
              >Instagram @ckappofficial</a
            >
            聯絡我們
          </p>
        </details>
      </div>
    </section>
  </main>
</template>
