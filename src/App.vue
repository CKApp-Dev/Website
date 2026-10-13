<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { QBtn } from "quasar";

type View = "today" | "schedule" | "calendar" | "food" | "campus";

const baseUrl = import.meta.env.BASE_URL;
const activeView = ref<View>("today");
const mobileMenu = ref(false);
const navigation = ref<HTMLElement | null>(null);
const preview = ref<HTMLElement | null>(null);
const menuToggle = ref<InstanceType<typeof QBtn> | null>(null);

const descriptions: Record<View, string> = {
  today: "今天 — 一眼掌握這一天",
  schedule: "課表 — 整週課程，清楚排好",
  calendar: "行事曆 — 大事小事，一起記",
  food: "美食 — 今天吃什麼，先看看",
  campus: "校園 — 消息與交通，隨手就找到",
};

const feedback = computed(() => `正在展示：${descriptions[activeView.value]}`);

function closeMenu(): void {
  mobileMenu.value = false;
}

async function selectView(view: View, moveToPreview = false): Promise<void> {
  activeView.value = view;
  if (!moveToPreview) return;

  await nextTick();
  preview.value?.focus({ preventScroll: true });
  preview.value?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center",
  });
}

function handleOutsideClick(event: MouseEvent): void {
  if (event.target instanceof Node && !navigation.value?.contains(event.target))
    closeMenu();
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !mobileMenu.value) return;
  closeMenu();
  (menuToggle.value?.$el as HTMLElement | undefined)?.focus();
}

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <svg class="icon-defs" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </symbol>
      <symbol id="i-up-right" viewBox="0 0 24 24">
        <path d="M6 18 18 6M6 6h12v12" />
      </symbol>
      <symbol id="i-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
        />
      </symbol>
      <symbol id="i-grid" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M9 4v16m6-16v16M3 14h18" />
      </symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18m-13 4h2m4 0h2m-8 3h2" />
      </symbol>
      <symbol id="i-food" viewBox="0 0 24 24">
        <path d="M5 3v6a3 3 0 0 0 6 0V3M8 3v18m12 0V3c-4 2-5 7-3 9h3" />
      </symbol>
      <symbol id="i-school" viewBox="0 0 24 24">
        <path
          d="m3 8 9-5 9 5M4 8h16M5 8v11m5-11v11m4-11v11m5-11v11M3 21h18M2 19h20"
        />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="m5 12 4 4L19 6" />
      </symbol>
      <symbol id="i-bike" viewBox="0 0 24 24">
        <circle cx="5.5" cy="16.5" r="4" />
        <circle cx="18.5" cy="16.5" r="4" />
        <path d="m5.5 16.5 5-9 5 9h-10m5-9h6l2 9m-3-13h3M8 7.5h4" />
      </symbol>
      <symbol id="i-train" viewBox="0 0 24 24">
        <rect x="5" y="3" width="14" height="15" rx="4" />
        <path d="M5 10h14m-7-7v7M8 21l2-3m6 3-2-3M8 14h1m6 0h1" />
      </symbol>
      <symbol id="i-news" viewBox="0 0 24 24">
        <path
          d="M5 3h14v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V7h2m0-4v16M9 7h6m-6 4h6m-6 4h6"
        />
      </symbol>
      <symbol id="i-heart" viewBox="0 0 24 24">
        <path
          d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"
        />
      </symbol>
      <symbol id="i-plus" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </symbol>
      <symbol id="i-menu" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </symbol>
      <symbol id="i-apple" viewBox="0 0 24 24">
        <path
          d="M16 2c0 2-1.5 4-4 4 0-2 1.5-4 4-4Zm3 16c-1 2-2 4-4 4-1 0-2-1-3-1s-2 1-3 1c-3 0-6-6-6-10 0-3 2-5 5-5 2 0 3 1 4 1s3-1 5-1c1 0 3 1 4 2-4 2-4 6-2 9Z"
          fill="currentColor"
          stroke="none"
        />
      </symbol>
      <symbol id="i-play" viewBox="0 0 24 24">
        <path d="m4 3 16 9-16 9V3Z" />
        <path d="m4 3 10 13m-10 5L14 8" />
      </symbol>
      <symbol id="i-battery" viewBox="0 0 24 24">
        <rect x="2" y="6" width="17" height="12" rx="2" />
        <path d="M22 10v4M5 9h11v6H5Z" fill="currentColor" stroke="none" />
      </symbol>
      <symbol id="i-wifi" viewBox="0 0 24 24">
        <path
          d="M2 7a16 16 0 0 1 20 0M5 11a11 11 0 0 1 14 0m-10 4a5 5 0 0 1 6 0m-3 4h.01"
        />
      </symbol>
    </defs>
  </svg>
  <a href="#main" class="skip"> 跳至主要內容 </a>
  <header class="header">
    <nav ref="navigation" class="nav wrap" aria-label="主要導覽">
      <a href="#" class="brand" aria-label="CK APP 首頁">
        <img
          class="brand-icon"
          :src="`${baseUrl}assets/ck-app-icon.png`"
          alt=""
          width="41"
          height="41"
        />
        <div>
          <div class="brand-word">
            CK APP
            <span style="font-size: 13px; margin-left: 3px"> ↗ </span>
          </div>
          <div class="brand-sub">你的校園助理</div>
        </div>
      </a>
      <QBtn
        ref="menuToggle"
        class="menu-toggle"
        flat
        dense
        no-caps
        :ripple="false"
        :aria-label="mobileMenu ? '關閉導覽選單' : '開啟導覽選單'"
        :aria-expanded="mobileMenu"
        aria-controls="nav-links"
        @click="mobileMenu = !mobileMenu"
      >
        <svg aria-hidden="true">
          <use href="#i-menu" />
        </svg>
      </QBtn>
      <div class="nav-links" :class="{ 'is-open': mobileMenu }" id="nav-links">
        <QBtn
          href="#features"
          class="nav-link"
          flat
          dense
          no-caps
          :ripple="false"
          @click="closeMenu"
        >
          功能介紹
        </QBtn>
        <QBtn
          href="#about"
          class="nav-link"
          flat
          dense
          no-caps
          :ripple="false"
          @click="closeMenu"
        >
          關於我們
        </QBtn>
        <QBtn
          href="https://cksc.tw/"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
          flat
          dense
          no-caps
          :ripple="false"
          @click="closeMenu"
        >
          班聯會官網 ↗
        </QBtn>
        <QBtn
          href="#download"
          class="button button-blue"
          flat
          dense
          no-caps
          :ripple="false"
          @click="closeMenu"
        >
          下載 CK APP
          <svg aria-hidden="true">
            <use href="#i-up-right" />
          </svg>
        </QBtn>
      </div>
    </nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid wrap">
        <div class="hero-copy">
          <div class="hero-kicker">
            <span class="live-dot"> </span>
            為建中生活而生 · MADE FOR CK
          </div>
          <h1 id="hero-title">
            校園生活，
            <br />
            <span> 剛剛好 </span>
          </h1>
          <p class="hero-description">
            下堂課上什麼？午餐吃什麼？
            <br />
            從第一節課到放學回家，
            <br />
            把每天的小事，交給 CK APP
          </p>
          <div class="hero-actions">
            <QBtn
              class="button button-blue"
              href="#download"
              flat
              no-caps
              :ripple="false"
            >
              免費下載
              <svg aria-hidden="true">
                <use href="#i-up-right" />
              </svg>
            </QBtn>
            <QBtn
              class="text-link"
              href="#features"
              flat
              no-caps
              :ripple="false"
            >
              看看有什麼
              <svg aria-hidden="true">
                <use href="#i-arrow" />
              </svg>
            </QBtn>
          </div>
          <div class="hero-note">
            <svg aria-hidden="true">
              <use href="#i-check" />
            </svg>
            iOS & Android 都有，校園日常都顧
          </div>
          <div class="hero-signature">
            <span class="signature-line"> </span>
            <span> BY CK STUDENTS. FOR CK STUDENTS. </span>
          </div>
        </div>
        <div
          ref="preview"
          class="hero-art"
          id="app-preview"
          tabindex="-1"
          role="region"
          aria-label="CK APP 互動功能示意，可使用手機下方分頁切換"
        >
          <div class="art-board" aria-hidden="true"></div>
          <div class="art-circle" aria-hidden="true"></div>
          <div class="art-triangle" aria-hidden="true"></div>
          <div class="art-star" aria-hidden="true">✳</div>
          <span class="art-label" aria-hidden="true">
            YOUR EVERYDAY CAMPUS COMPANION
          </span>
          <div class="float-card float-class" aria-hidden="true">
            <div class="eyebrow">UP NEXT / 下一堂</div>
            <div class="float-title">
              <span class="float-class-dot"> </span>
              英文
            </div>
            <small> 第三節 · 10:10 – 11:00 </small>
          </div>
          <div class="phone">
            <div class="phone-island" aria-hidden="true"></div>
            <div class="phone-status" aria-hidden="true">
              <span> 9:41 </span>
              <div class="phone-signal">
                <svg>
                  <use href="#i-wifi" />
                </svg>
                <svg>
                  <use href="#i-battery" />
                </svg>
              </div>
            </div>
            <div class="phone-body">
              <div class="phone-panel" v-show="activeView === 'today'">
                <div class="phone-heading">
                  <h2>今天</h2>
                  <span class="class-tag"> 201 </span>
                </div>
                <p class="phone-date">10 月 13 日 星期二 · 第 7 週</p>
                <div class="now-card">
                  <div class="now-top">
                    <span>
                      <i> </i>
                      現在
                    </span>
                    <span> 第二節 </span>
                  </div>
                  <div class="now-subject">數學</div>
                  <div class="now-detail">09:10 – 10:00 · 還有 19 分鐘下課</div>
                  <div class="bell-rail" aria-hidden="true">
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                  </div>
                  <div class="rail-label">
                    <span> 08:00 </span>
                    <span> 12:00 </span>
                    <span> 17:00 </span>
                  </div>
                </div>
                <div class="phone-section-label">今天要做的事</div>
                <div class="demo-card">
                  <div class="demo-row">
                    <span class="demo-check"> </span>
                    <div>
                      數學習作 p.32–35
                      <small> 作業 · 今天 </small>
                    </div>
                    <span class="row-right"> › </span>
                  </div>
                  <div class="demo-row">
                    <span class="demo-check"> </span>
                    <div>
                      帶社團成果發表道具
                      <small> 社團 · 今天 </small>
                    </div>
                    <span class="row-right"> › </span>
                  </div>
                </div>
                <div class="phone-section-label">午餐</div>
                <div class="demo-card">
                  <div class="demo-row">
                    <span class="demo-food">
                      <svg aria-hidden="true">
                        <use href="#i-food" />
                      </svg>
                    </span>
                    <div>
                      香酥雞腿飯
                      <small> 熱食部 · 今日菜單 </small>
                    </div>
                    <span class="demo-price"> $ 80 </span>
                  </div>
                </div>
              </div>
              <div class="phone-panel" v-show="activeView === 'schedule'">
                <div class="phone-heading">
                  <h2>課表</h2>
                  <span class="class-tag"> 201 </span>
                </div>
                <p class="phone-date">第 7 週 · 單週</p>
                <p class="phone-panel-intro">這一週，每一堂都心裡有底</p>
                <div class="phone-mini-table">
                  <div class="mini-day">一</div>
                  <div class="mini-day">二</div>
                  <div class="mini-day">三</div>
                  <div class="mini-day">四</div>
                  <div class="mini-day">五</div>
                  <div>國文</div>
                  <div>物理</div>
                  <div>英文</div>
                  <div>數學</div>
                  <div>化學</div>
                  <div>英文</div>
                  <div>數學</div>
                  <div>歷史</div>
                  <div>國文</div>
                  <div>體育</div>
                  <div>數學</div>
                  <div>英文</div>
                  <div>國文</div>
                  <div>化學</div>
                  <div>物理</div>
                  <div>歷史</div>
                  <div>體育</div>
                  <div>數學</div>
                  <div>英文</div>
                  <div>國文</div>
                  <div>化學</div>
                  <div>國文</div>
                  <div>社團</div>
                  <div>物理</div>
                  <div>數學</div>
                </div>
                <div class="phone-section-label">課程備註</div>
                <div class="demo-card">
                  <div class="demo-row">
                    體育課記得帶運動服
                    <span class="row-right"> ↗ </span>
                  </div>
                </div>
              </div>
              <div class="phone-panel" v-show="activeView === 'calendar'">
                <div class="phone-heading">
                  <h2>行事曆</h2>
                  <span class="class-tag"> 10 月 </span>
                </div>
                <p class="phone-date">學校大事、自己的小事，一起記</p>
                <div class="demo-month" aria-label="十月日期示意">
                  <span> 一 </span>
                  <span> 二 </span>
                  <span> 三 </span>
                  <span> 四 </span>
                  <span> 五 </span>
                  <span> 六 </span>
                  <span> 日 </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> 1 </span>
                  <span> 2 </span>
                  <span> 3 </span>
                  <span> 4 </span>
                  <span> 5 </span>
                  <span> 6 </span>
                  <span> 7 </span>
                  <span> 8 </span>
                  <span> 9 </span>
                  <span> 10 </span>
                  <span> 11 </span>
                  <span> 12 </span>
                  <span class="selected"> 13 </span>
                  <span> 14 </span>
                  <span> 15 </span>
                  <span> 16 </span>
                  <span> 17 </span>
                  <span> 18 </span>
                  <span> 19 </span>
                  <span> 20 </span>
                  <span> 21 </span>
                  <span> 22 </span>
                  <span> 23 </span>
                  <span> 24 </span>
                  <span> 25 </span>
                  <span> 26 </span>
                  <span> 27 </span>
                  <span> 28 </span>
                  <span> 29 </span>
                  <span> 30 </span>
                  <span> 31 </span>
                </div>
                <div class="phone-section-label">10 月 13 日 · 待辦</div>
                <div class="demo-card">
                  <div class="demo-row">
                    <span class="demo-check"> </span>
                    <div>
                      數學習作 p.32–35
                      <small> 作業 · 今天 </small>
                    </div>
                  </div>
                  <div class="demo-row">
                    <span class="demo-check"> </span>
                    <div>
                      帶社團成果發表道具
                      <small> 社團 · 今天 </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="phone-panel" v-show="activeView === 'food'">
                <div class="phone-heading">
                  <h2>美食</h2>
                  <span class="class-tag"> 熱食部 </span>
                </div>
                <p class="phone-date">10 月 13 日 星期二</p>
                <p class="phone-panel-intro">今天吃什麼？先看菜單，再決定</p>
                <div class="demo-card">
                  <div class="demo-row">
                    <span class="demo-food">
                      <svg aria-hidden="true">
                        <use href="#i-food" />
                      </svg>
                    </span>
                    <div>
                      香酥雞腿飯
                      <small> 主餐 </small>
                    </div>
                    <span class="demo-price"> $ 80 </span>
                  </div>
                  <div class="demo-row">
                    <span class="demo-food">
                      <svg aria-hidden="true">
                        <use href="#i-food" />
                      </svg>
                    </span>
                    <div>
                      滷排骨飯
                      <small> 主餐 </small>
                    </div>
                    <span class="demo-price"> $ 75 </span>
                  </div>
                  <div class="demo-row">
                    <span class="demo-food">
                      <svg aria-hidden="true">
                        <use href="#i-food" />
                      </svg>
                    </span>
                    <div>
                      咖哩雞肉飯
                      <small> 主餐 </small>
                    </div>
                    <span class="demo-price"> $ 70 </span>
                  </div>
                </div>
                <div class="phone-section-label">也想吃點別的？</div>
                <div class="demo-card">
                  <div class="demo-row">
                    <svg
                      aria-hidden="true"
                      style="width: 16px; color: var(--blue)"
                    >
                      <use href="#i-heart" />
                    </svg>
                    <div>
                      探索附近美食
                      <small> 營業中篩選 · 收藏 · 隨機挑選 </small>
                    </div>
                    <span class="row-right"> › </span>
                  </div>
                </div>
              </div>
              <div class="phone-panel" v-show="activeView === 'campus'">
                <div class="phone-heading">
                  <h2>校園</h2>
                  <span class="class-tag"> CK </span>
                </div>
                <p class="phone-date">校園大小事，隨手就找到</p>
                <div class="campus-grid">
                  <div class="campus-tile">
                    <svg aria-hidden="true">
                      <use href="#i-news" />
                    </svg>
                    校網消息
                  </div>
                  <div class="campus-tile">
                    <svg aria-hidden="true">
                      <use href="#i-bike" />
                    </svg>
                    YouBike
                  </div>
                  <div class="campus-tile">
                    <svg aria-hidden="true">
                      <use href="#i-train" />
                    </svg>
                    捷運資訊
                  </div>
                  <div class="campus-tile">
                    <svg aria-hidden="true">
                      <use href="#i-heart" />
                    </svg>
                    建北特約
                  </div>
                </div>
                <div class="phone-section-label">常用交通</div>
                <div class="demo-card">
                  <div class="demo-row">
                    <div>
                      建國中學
                      <small> YouBike 2.0 </small>
                    </div>
                    <span class="demo-tag"> 可借 12 輛 </span>
                  </div>
                  <div class="demo-row">
                    <div>
                      中正紀念堂
                      <small> 淡水信義線 · 松山新店線 </small>
                    </div>
                    <span class="row-right"> › </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="phone-tabs" role="group" aria-label="切換 App 功能示意">
              <QBtn
                class="phone-tab"
                flat
                dense
                no-caps
                :ripple="false"
                :aria-pressed="activeView === 'today'"
                @click="selectView('today')"
              >
                <svg aria-hidden="true">
                  <use href="#i-sun" />
                </svg>
                今天
              </QBtn>
              <QBtn
                class="phone-tab"
                flat
                dense
                no-caps
                :ripple="false"
                :aria-pressed="activeView === 'schedule'"
                @click="selectView('schedule')"
              >
                <svg aria-hidden="true">
                  <use href="#i-grid" />
                </svg>
                課表
              </QBtn>
              <QBtn
                class="phone-tab"
                flat
                dense
                no-caps
                :ripple="false"
                :aria-pressed="activeView === 'calendar'"
                @click="selectView('calendar')"
              >
                <svg aria-hidden="true">
                  <use href="#i-calendar" />
                </svg>
                行事曆
              </QBtn>
              <QBtn
                class="phone-tab"
                flat
                dense
                no-caps
                :ripple="false"
                :aria-pressed="activeView === 'food'"
                @click="selectView('food')"
              >
                <svg aria-hidden="true">
                  <use href="#i-food" />
                </svg>
                美食
              </QBtn>
              <QBtn
                class="phone-tab"
                flat
                dense
                no-caps
                :ripple="false"
                :aria-pressed="activeView === 'campus'"
                @click="selectView('campus')"
              >
                <svg aria-hidden="true">
                  <use href="#i-school" />
                </svg>
                校園
              </QBtn>
            </div>
            <div class="phone-home" aria-hidden="true"></div>
          </div>
          <div class="float-card float-food" aria-hidden="true">
            <span class="float-icon">
              <svg>
                <use href="#i-food" />
              </svg>
            </span>
            <div>
              <strong> 午餐，有想法了 </strong>
              <small> 今日熱食部菜單，已就位 </small>
            </div>
            <span class="check">
              <svg>
                <use href="#i-check" />
              </svg>
            </span>
          </div>
          <div class="phone-caption">互動功能示意 · 資料僅供展示</div>
        </div>
      </div>
    </section>
    <div class="day-strip">
      <div class="wrap day-strip-inner">
        <div class="day-strip-title">你的一天，我們都在</div>
        <div class="day-stops">
          <div class="day-stop">
            <small> 08:00 </small>
            <span> 準備上課 </span>
          </div>
          <svg aria-hidden="true">
            <use href="#i-arrow" />
          </svg>
          <div class="day-stop">
            <small> 10:00 </small>
            <span> 看看待辦 </span>
          </div>
          <svg aria-hidden="true">
            <use href="#i-arrow" />
          </svg>
          <div class="day-stop">
            <small> 12:00 </small>
            <span> 午餐吃什麼 </span>
          </div>
          <svg aria-hidden="true">
            <use href="#i-arrow" />
          </svg>
          <div class="day-stop">
            <small> 17:00 </small>
            <span> 準備回家 </span>
          </div>
        </div>
      </div>
    </div>
    <section
      class="features wrap"
      id="features"
      aria-labelledby="features-title"
    >
      <div class="features-top">
        <div>
          <div class="section-number">01 / 把日常放在一起</div>
          <h2 class="section-title" id="features-title">
            少找一下，
            <br />
            多一點自己的時間
          </h2>
        </div>
        <p class="copy">
          不用在不同網站之間來回切換
          <br />
          五個分頁，裝下建中生的一天
        </p>
      </div>
      <div class="feature-grid">
        <article class="feature-item">
          <div class="feature-icon">
            <svg aria-hidden="true">
              <use href="#i-sun" />
            </svg>
            <span> 01 </span>
          </div>
          <h3>今天</h3>
          <p>
            現在上哪堂、待辦有什麼，
            <br />
            打開就知道今天的重點
          </p>
        </article>
        <article class="feature-item">
          <div class="feature-icon">
            <svg aria-hidden="true">
              <use href="#i-grid" />
            </svg>
            <span> 02 </span>
          </div>
          <h3>課表</h3>
          <p>
            整週課程，一眼掌握
            <br />
            科目、顏色、備註自己定
          </p>
        </article>
        <article class="feature-item">
          <div class="feature-icon">
            <svg aria-hidden="true">
              <use href="#i-calendar" />
            </svg>
            <span> 03 </span>
          </div>
          <h3>行事曆</h3>
          <p>
            校方活動與自己的待辦，
            <br />
            放在同一份日常計畫裡
          </p>
        </article>
        <article class="feature-item">
          <div class="feature-icon">
            <svg aria-hidden="true">
              <use href="#i-food" />
            </svg>
            <span> 04 </span>
          </div>
          <h3>美食</h3>
          <p>
            熱食部菜單、附近好店，
            <br />
            替每天的午餐找點靈感
          </p>
        </article>
        <article class="feature-item">
          <div class="feature-icon">
            <svg aria-hidden="true">
              <use href="#i-school" />
            </svg>
            <span> 05 </span>
          </div>
          <h3>校園</h3>
          <p>
            校網消息、交通與特約，
            <br />
            校園生活的常用入口
          </p>
        </article>
      </div>
    </section>
    <section class="focus-section" aria-labelledby="now-title">
      <div class="wrap focus-grid">
        <div class="focus-copy">
          <div class="section-number">02 / 專注在現在</div>
          <h2 class="section-title" id="now-title">
            現在，
            <br />
            知道接下來就好
          </h2>
          <p class="copy">
            不用掐指算還有多久下課<br />「現在」卡片跟著學校鐘聲，告訴你這堂課、下一堂課，以及離下一聲鐘還有多久
          </p>
          <div class="focus-points">
            <div>
              <svg aria-hidden="true">
                <use href="#i-check" />
              </svg>
              課間倒數
            </div>
            <div>
              <svg aria-hidden="true">
                <use href="#i-check" />
              </svg>
              每日鐘聲軌跡
            </div>
            <div>
              <svg aria-hidden="true">
                <use href="#i-check" />
              </svg>
              iOS 小工具
            </div>
          </div>
        </div>
        <div>
          <div class="big-now">
            <div class="now-top">
              <span>
                <i> </i>
                現在 / 第二節
              </span>
              <span> 201 班 </span>
            </div>
            <div class="now-subject">數學</div>
            <div class="now-detail">09:10 – 10:00</div>
            <div class="big-now-count">
              <b>
                19
                <span style="display: inline; font-size: 14px"> 分 </span>
              </b>
              <span> 距離下課 </span>
            </div>
            <div class="bell-rail" aria-hidden="true">
              <span> </span>
              <span> </span>
              <span> </span>
              <span> </span>
              <span> </span>
              <span> </span>
              <span> </span>
              <span> </span>
            </div>
            <div class="rail-label">
              <span> 08:00 </span>
              <span> 12:00 </span>
              <span> 17:00 </span>
            </div>
            <div class="big-now-next">
              <span>
                下一堂
                <strong> 英文 </strong>
              </span>
              <span>
                10:10
                <span aria-hidden="true"> ↗ </span>
              </span>
            </div>
          </div>
          <p class="focus-demo-label">功能示意 · 非即時課程資訊</p>
        </div>
      </div>
    </section>
    <section class="explore wrap" aria-labelledby="explore-title">
      <div class="explore-heading">
        <div>
          <div class="section-number">03 / 上課以外，也照顧到了</div>
          <h2 class="section-title" id="explore-title">不只是一張課表</h2>
        </div>
        <div class="eyebrow">LESS SEARCHING. MORE LIVING.</div>
      </div>
      <div class="showcase">
        <article class="schedule-card">
          <div class="card-eyebrow">A LITTLE MORE ORGANIZED</div>
          <h3>這一週，心裡有底</h3>
          <p>
            選好班級，整週課表就到位<br />搭配單雙週課程、備註和待辦，替忙碌的日子留點餘裕
          </p>
          <div class="timetable">
            <div class="table-head">
              <strong> 201 的一週 </strong>
              <span> 第 7 週 · 單週 </span>
            </div>
            <div class="week-grid" aria-label="週課表示意">
              <span> </span>
              <span class="week-day"> 一 </span>
              <span class="week-day today"> 二 </span>
              <span class="week-day"> 三 </span>
              <span class="week-day"> 四 </span>
              <span class="week-day"> 五 </span>
              <span class="period"> 1 </span>
              <span class="subject yellow"> 國文 </span>
              <span class="subject purple"> 物理 </span>
              <span class="subject"> 英文 </span>
              <span class="subject pink"> 數學 </span>
              <span class="subject green"> 化學 </span>
              <span class="period"> 2 </span>
              <span class="subject"> 英文 </span>
              <span class="subject pink current"> 數學 </span>
              <span class="subject green"> 歷史 </span>
              <span class="subject yellow"> 國文 </span>
              <span class="subject purple"> 體育 </span>
              <span class="period"> 3 </span>
              <span class="subject pink"> 數學 </span>
              <span class="subject"> 英文 </span>
              <span class="subject yellow"> 國文 </span>
              <span class="subject green"> 化學 </span>
              <span class="subject purple"> 物理 </span>
              <span class="period"> 4 </span>
              <span class="subject green"> 歷史 </span>
              <span class="subject purple"> 體育 </span>
              <span class="subject pink"> 數學 </span>
              <span class="subject"> 英文 </span>
              <span class="subject yellow"> 國文 </span>
            </div>
          </div>
          <div class="showcase-footnote">課表內容僅供功能展示</div>
        </article>
        <div class="life-column">
          <article class="life-card food">
            <div class="card-eyebrow">LUNCH, SORTED.</div>
            <div class="food-sticker" aria-hidden="true">
              <svg>
                <use href="#i-food" />
              </svg>
            </div>
            <h3>今天吃什麼？有解</h3>
            <p>
              看看熱食部今天的菜色與價格，
              <br />
              或找找附近正在營業的口袋名單
            </p>
            <div class="mini-meal">
              <svg aria-hidden="true">
                <use href="#i-food" />
              </svg>
              <span> 香酥雞腿飯 </span>
              <strong> NT$ 80 </strong>
            </div>
            <div class="showcase-footnote" style="margin-top: 9px">
              菜色與價格為示意
            </div>
          </article>
          <article class="life-card transport">
            <div class="card-eyebrow">LET’S HEAD HOME.</div>
            <div class="transport-sticker" aria-hidden="true">
              <svg>
                <use href="#i-bike" />
              </svg>
            </div>
            <h3>放學，順路回家</h3>
            <p>
              收藏常用 YouBike 與捷運站點，
              <br />
              出發前，先看看交通資訊
            </p>
            <div class="mini-route">
              <span class="route-label">
                <span class="route-dot"> </span>
                建國中學 · YouBike
              </span>
              <span class="route-pill"> 可借 12 輛 </span>
            </div>
            <div class="showcase-footnote" style="margin-top: 9px">
              站點資訊為示意，非即時資料
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="try-section wrap" aria-labelledby="try-title">
      <div class="try-header">
        <div>
          <h3 id="try-title">先點點看，再放進口袋</h3>
          <p>切換上方手機的分頁，看看 CK APP 能幫上什麼忙</p>
          <a
            class="try-link"
            href="#app-preview"
            @click.prevent="selectView(activeView, true)"
          >
            前往互動預覽
            <svg aria-hidden="true">
              <use href="#i-arrow" />
            </svg>
          </a>
        </div>
        <div>
          <div class="preview-buttons" role="group" aria-label="探索功能預覽">
            <QBtn
              class="preview-button"
              flat
              dense
              no-caps
              :ripple="false"
              :aria-pressed="activeView === 'today'"
              @click="selectView('today', true)"
            >
              今天
            </QBtn>
            <QBtn
              class="preview-button"
              flat
              dense
              no-caps
              :ripple="false"
              :aria-pressed="activeView === 'schedule'"
              @click="selectView('schedule', true)"
            >
              課表
            </QBtn>
            <QBtn
              class="preview-button"
              flat
              dense
              no-caps
              :ripple="false"
              :aria-pressed="activeView === 'calendar'"
              @click="selectView('calendar', true)"
            >
              行事曆
            </QBtn>
            <QBtn
              class="preview-button"
              flat
              dense
              no-caps
              :ripple="false"
              :aria-pressed="activeView === 'food'"
              @click="selectView('food', true)"
            >
              美食
            </QBtn>
            <QBtn
              class="preview-button"
              flat
              dense
              no-caps
              :ripple="false"
              :aria-pressed="activeView === 'campus'"
              @click="selectView('campus', true)"
            >
              校園
            </QBtn>
          </div>
          <div class="preview-feedback" role="status" aria-live="polite">
            {{ feedback }}
          </div>
        </div>
      </div>
    </section>
    <section class="about" id="about" aria-labelledby="about-title">
      <div class="wrap about-inner">
        <div class="school-art">
          <img
            :src="`${baseUrl}assets/ck-app-icon.png`"
            alt="手繪建中紅樓與 CK APP 標誌"
            width="290"
            height="290"
            loading="lazy"
          />
          <span class="school-art-caption"> FROM OUR CAMPUS, WITH CARE. </span>
        </div>
        <div class="about-copy">
          <div class="section-number">04 / 因為我們，也在這裡生活</div>
          <h2 class="section-title" id="about-title">
            由建中生打造，
            <br />
            為建中生活而生
          </h2>
          <p class="copy">
            CK APP 從 2024 年開始，由建中學生 Kimi 與 Diego 發起<br />我們把自己每天遇到的小麻煩，變成一個個實用功能，並和班聯會資訊股一起持續維護
            <br />
            <br />
            有想法、有建議，或也想一起讓校園生活更好？
            <br />
            我們很樂意聽聽
          </p>
          <div class="about-links">
            <a class="text-link" href="mailto:ckappofficial@gmail.com">
              和我們聊聊
              <svg aria-hidden="true">
                <use href="#i-up-right" />
              </svg>
            </a>
            <a
              class="text-link"
              href="https://cksc.tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              建中班聯會
              <svg aria-hidden="true">
                <use href="#i-up-right" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="faq wrap" aria-labelledby="faq-title">
      <div>
        <div class="section-number">05 / 你可能想知道</div>
        <h2 class="section-title" id="faq-title">幾個小問題</h2>
        <p class="copy">
          從下載到第一天使用，
          <br />
          先幫你把常見的疑問整理好
        </p>
      </div>
      <div class="faq-list">
        <details>
          <summary>
            CK APP 需要付費嗎？
            <svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            CK APP 可以免費下載與使用<br />我們希望讓更多建中學生，輕鬆找到每天需要的校園資訊
          </p>
        </details>
        <details>
          <summary>
            iPhone 和 Android 都可以用嗎？
            <svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            可以！iPhone 請從 App Store 下載，Android 請從 Google Play 下載<br />點選下方對應的商店按鈕，就能前往下載頁面
          </p>
        </details>
        <details>
          <summary>
            第一次使用，要怎麼開始？
            <svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            開啟 App，選擇你的年級與班級，就可以查看課表與今天的安排<br />也可以先逛逛，之後再到設定裡選擇班級
          </p>
        </details>
        <details>
          <summary>
            有問題或想推薦新功能，怎麼聯絡？
            <svg aria-hidden="true">
              <use href="#i-plus" />
            </svg>
          </summary>
          <p>
            歡迎寄信到
            <a
              href="mailto:ckappofficial@gmail.com"
              style="color: var(--blue); text-decoration: underline"
            >
              ckappofficial@gmail.com
            </a>
            ，或透過
            <a
              href="https://www.instagram.com/ckappofficial/"
              target="_blank"
              rel="noopener noreferrer"
              style="color: var(--blue); text-decoration: underline"
            >
              Instagram @ckappofficial
            </a>
            聯絡我們
          </p>
        </details>
      </div>
    </section>
    <section class="download" id="download" aria-labelledby="download-title">
      <div class="wrap download-inner">
        <div>
          <div class="eyebrow">YOUR NEXT SCHOOL DAY, A LITTLE EASIER.</div>
          <h2 id="download-title">明天到校，帶上 CK APP</h2>
          <p>
            選好班級，開始你的今天
            <br />
            你的校園助理，現在就放進口袋
          </p>
        </div>
        <div class="download-store-wrap">
          <div class="download-stores">
            <a
              class="store-button"
              href="https://apps.apple.com/tw/app/ck%E6%A0%A1%E5%9C%92%E8%A1%8C%E5%8B%95app/id6608961910?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 App Store 下載 CK APP（開啟新分頁）"
            >
              <svg aria-hidden="true">
                <use href="#i-apple" />
              </svg>
              <span>
                <small> Download on the </small>
                <strong> App Store </strong>
              </span>
            </a>
            <a
              class="store-button"
              href="https://play.google.com/store/apps/details?id=org.capacitor.quasar.ckapp&amp;pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 Google Play 下載 CK APP（開啟新分頁）"
            >
              <svg aria-hidden="true">
                <use href="#i-play" />
              </svg>
              <span>
                <small> GET IT ON </small>
                <strong> Google Play </strong>
              </span>
            </a>
          </div>
          <div class="store-note">免費下載 · iOS & Android</div>
        </div>
      </div>
    </section>
  </main>
  <footer class="footer wrap">
    <div class="footer-inner">
      <div class="footer-brand">
        <a class="brand-word" href="#" aria-label="回到頁首"> CK APP ↗ </a>
        <small> 你的校園助理 </small>
      </div>
      <div class="footer-links">
        <a href="https://cksc.tw/" target="_blank" rel="noopener noreferrer">
          班聯會官網 ↗
        </a>
        <a
          href="https://www.instagram.com/ckappofficial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram ↗
        </a>
        <a href="mailto:ckappofficial@gmail.com"> 聯絡我們 ↗ </a>
      </div>
    </div>
    <div class="copyright">
      <span> © 2026 CK APP. Made by students, for students. </span>
      <span> TAIPEI, TAIWAN · 建中 </span>
    </div>
  </footer>
</template>
