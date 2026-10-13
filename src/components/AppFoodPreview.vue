<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { featureHref } from "../data/features";

const props = withDefaults(defineProps<{ view?: "menu" | "nearby" }>(), {
  view: "menu",
});
const currentView = ref(props.view);
watch(
  () => props.view,
  (value) => {
    currentView.value = value;
  },
);

// Stable examples from App/src/features/menu/menu-data.test.ts (8 October 2026).
const selectedDay = ref(4);
const weekOffset = ref(0);
const weekdays = ["一", "二", "三", "四", "五"];
const menu = [
  { number: 1, name: "雞腿飯", price: "$120" },
  { number: 2, name: "宮保雞丁", price: "$85" },
  { number: 3, name: "直火烤肉", price: "$85" },
  { number: 4, name: "馬鈴薯燉肉", price: "$85" },
  { number: 5, name: "南洋炒飯", price: "$80" },
  { number: 6, name: "滷味燙套餐", price: "$80" },
  { number: 7, name: "什錦烏龍麵", price: "$80" },
  { number: 8, name: "招牌炸醬麵", price: "時價" },
];
const days = computed(() =>
  weekdays.map((label, index) => {
    const date = new Date(Date.UTC(2026, 9, 5 + weekOffset.value * 7 + index));
    return {
      label,
      number: date.getUTCDate(),
      month: date.getUTCMonth() + 1,
      key: index + 1,
    };
  }),
);
const weekLabel = computed(
  () =>
    `${days.value[0]!.month}月${days.value[0]!.number}日–${days.value[4]!.number}日`,
);
const menuGroups = computed(() => {
  if (weekOffset.value !== 0) return [];
  if (selectedDay.value === 2) return [[menu[0]!]];
  if (selectedDay.value !== 4) return [];
  return [menu.slice(0, 5), menu.slice(5)];
});
const imageUrl = computed(() => {
  const date = new Date(Date.UTC(2026, 9, 5 + weekOffset.value * 7))
    .toISOString()
    .slice(0, 10);
  return `https://raw.githubusercontent.com/CKApp-Dev/Data/main/menus/${date}_${selectedDay.value}.png`;
});
function showThisWeek() {
  weekOffset.value = 0;
  selectedDay.value = 4;
}

// Restaurant names and status wording come from the App's food-view test fixtures.
const query = ref("");
const openOnly = ref(false);
const favoritesOnly = ref(false);
const favorites = ref(["林家乾麵"]);
const picked = ref("");
const expandedMap = ref(false);
const restaurants = [
  {
    name: "Night Bistro",
    aside: "",
    status: "休息中 · 17:00 開",
    distance: "160 m",
    open: false,
    x: 74,
    y: 64,
  },
  {
    name: "林家乾麵",
    aside: "林乾",
    status: "營業中 · 至 14:00",
    distance: "220 m",
    open: true,
    x: 62,
    y: 78,
  },
  {
    name: "建中咖啡",
    aside: "",
    status: "快打烊 · 12:20",
    distance: "400 m",
    open: true,
    x: 30,
    y: 30,
  },
];
const filteredRestaurants = computed(() =>
  restaurants.filter(
    (restaurant) =>
      `${restaurant.name} ${restaurant.aside}`
        .toLocaleLowerCase()
        .includes(query.value.trim().toLocaleLowerCase()) &&
      (!openOnly.value || restaurant.open) &&
      (!favoritesOnly.value || favorites.value.includes(restaurant.name)),
  ),
);
function toggleFavorite(name: string) {
  favorites.value = favorites.value.includes(name)
    ? favorites.value.filter((item) => item !== name)
    : [...favorites.value, name];
}
function chooseRandom() {
  const open = filteredRestaurants.value.filter(
    (restaurant) => restaurant.open,
  );
  picked.value = open.length
    ? open[Math.floor(Math.random() * open.length)]!.name
    : "目前沒有營業中的餐廳";
}
</script>

<template>
  <div class="food-preview">
    <div class="food-toolbar">
      <div
        v-if="currentView === 'menu'"
        class="week-controls"
        aria-label="切換週次"
      >
        <button type="button" aria-label="上一週" @click="weekOffset--">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button type="button" aria-label="下一週" @click="weekOffset++">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
        <button type="button" class="this-week" @click="showThisWeek">
          本週
        </button>
      </div>
      <div class="food-segment" role="group" aria-label="美食畫面">
        <button
          type="button"
          :aria-pressed="currentView === 'menu'"
          @click="currentView = 'menu'"
        >
          熱食部
        </button>
        <button
          type="button"
          :aria-pressed="currentView === 'nearby'"
          @click="currentView = 'nearby'"
        >
          附近
        </button>
      </div>
      <div v-if="currentView === 'nearby'" class="nearby-controls">
        <button
          type="button"
          :aria-label="
            expandedMap ? '收合美食地圖示意' : '顯示完整美食地圖示意'
          "
          :aria-expanded="expandedMap"
          @click="expandedMap = !expandedMap"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Zm6-2v16m6-14v16" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="隨機選擇營業中的餐廳"
          :disabled="!filteredRestaurants.length"
          @click="chooseRandom"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8" cy="8" r="1" fill="currentColor" />
            <circle cx="16" cy="16" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
    <header class="food-heading">
      <h3>美食</h3>
      <p aria-live="polite">
        {{
          currentView === "menu"
            ? `熱食部 · ${weekLabel}`
            : "附近 · 12:00 · 2 間營業中"
        }}
      </p>
    </header>

    <template v-if="currentView === 'menu'">
      <div class="menu-days" role="group" aria-label="選擇菜單日期">
        <button
          v-for="day in days"
          :key="day.key"
          type="button"
          :class="{ today: day.key === 4 && weekOffset === 0 }"
          :aria-pressed="selectedDay === day.key"
          :aria-label="`星期${day.label}，${day.month}月${day.number}日${day.key === 4 && weekOffset === 0 ? '，範例中的今天' : ''}`"
          @click="selectedDay = day.key"
        >
          <span class="today-marker" aria-hidden="true"></span
          ><span class="weekday">{{ day.label }}</span
          ><span class="day-number">{{ day.number }}</span>
        </button>
      </div>
      <div v-if="menuGroups.length" class="dish-groups" aria-live="polite">
        <div
          v-for="(group, groupIndex) in menuGroups"
          :key="groupIndex"
          class="app-group"
        >
          <div v-for="dish in group" :key="dish.number" class="dish-row">
            <span class="dish-number">{{ dish.number }}</span
            ><span class="dish-name">{{ dish.name }}</span
            ><strong>{{ dish.price }}</strong>
          </div>
        </div>
        <a
          class="original-menu app-group"
          :href="imageUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 4H5v16h16v-8M14 3h7v7M21 3 10 14" /></svg
          ><span>查看原始菜單圖片</span>
        </a>
      </div>
      <div v-else class="menu-empty" role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 3v6m3-6v6M2 3v6a3 3 0 0 0 6 0m-3 3v9M20 3c-4 1-5 4-5 9h5m0-9v18"
          />
        </svg>
        <strong>這天沒有菜單</strong>
        <p>熱食部沒有公布這天的菜色，可以切換其他日期</p>
      </div>
    </template>

    <template v-else>
      <label class="restaurant-search"
        ><svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" /></svg
        ><input
          v-model="query"
          type="search"
          aria-label="搜尋餐廳或綽號"
          placeholder="搜尋餐廳或綽號，例如「林乾」"
      /></label>
      <div class="food-filters" aria-label="餐廳篩選">
        <button
          type="button"
          :aria-pressed="openOnly"
          @click="openOnly = !openOnly"
        >
          營業中
        </button>
        <button
          type="button"
          :aria-pressed="favoritesOnly"
          @click="favoritesOnly = !favoritesOnly"
        >
          我的最愛
        </button>
      </div>
      <div
        class="restaurant-map app-group"
        :class="{ expanded: expandedMap }"
        role="img"
        aria-label="建中附近餐廳地圖示意，非實際街道比例"
      >
        <svg
          viewBox="0 0 320 210"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            class="map-block"
            d="M0 0h92v66H0Zm107 0h90v66h-90Zm105 0h108v66H212ZM0 84h92v126H0Zm107 0h90v48h-90Zm105 0h108v126H212Zm-105 67h90v59h-90Z"
          />
          <path class="map-campus" d="M12 105h66v69H12Z" />
          <path class="map-road" d="M0 76h320M100 0v210M204 0v210m-97-68h90" />
        </svg>
        <span class="map-school">建國中學</span
        ><span class="map-street">南海路</span>
        <span
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.name"
          class="map-pin"
          :class="{
            closed: !restaurant.open,
            picked: picked === restaurant.name,
          }"
          :style="{ left: `${restaurant.x}%`, top: `${restaurant.y}%` }"
          aria-hidden="true"
        ></span>
        <span class="map-caption">地圖示意</span>
      </div>
      <div class="restaurants-heading">
        <strong>由近到遠</strong><span>距離從學校算起</span>
      </div>
      <div v-if="filteredRestaurants.length" class="app-group restaurant-list">
        <div
          v-for="restaurant in filteredRestaurants"
          :key="restaurant.name"
          class="restaurant-row"
          :class="{ chosen: picked === restaurant.name }"
        >
          <a :href="featureHref('nearby-food')"
            ><span class="restaurant-name"
              >{{ restaurant.name
              }}<small v-if="restaurant.aside">{{
                restaurant.aside
              }}</small></span
            ><span class="restaurant-status"
              ><span
                class="status-dot"
                :class="{ closed: !restaurant.open }"
                aria-hidden="true"
              ></span
              >{{ restaurant.status }} · {{ restaurant.distance }}</span
            ></a
          >
          <button
            type="button"
            class="favorite"
            :class="{ active: favorites.includes(restaurant.name) }"
            :aria-label="`${favorites.includes(restaurant.name) ? '移除最愛' : '加入最愛'}：${restaurant.name}`"
            :aria-pressed="favorites.includes(restaurant.name)"
            @click="toggleFavorite(restaurant.name)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 21S2 15 2 8.5C2 3 9 2 12 7c3-5 10-4 10 1.5C22 15 12 21 12 21Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="menu-empty" role="status">
        <strong>沒有符合條件的餐廳</strong>
        <p>試試其他關鍵字，或關閉篩選條件</p>
      </div>
      <p class="distance-note">直線距離</p>
      <p v-if="picked" class="random-result" role="status">
        {{ picked === "目前沒有營業中的餐廳" ? picked : `隨機選擇：${picked}` }}
      </p>
    </template>
  </div>
</template>

<style scoped>
.food-preview {
  min-width: 0;
  color: var(--app-text, #000);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  font-size: 1rem;
  background: var(--app-background, #f2f2f7);
  padding: 0 16px 16px;
}
button,
a,
input {
  -webkit-tap-highlight-color: transparent;
  font: inherit;
}
button {
  border: 0;
  cursor: pointer;
  color: var(--app-tint, #03328d);
  background: none;
}
a {
  text-decoration: none;
  color: inherit;
}
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 3px solid var(--app-tint, #03328d);
  outline-offset: 3px;
}
button:hover,
a:hover {
  filter: brightness(0.9);
}
button:disabled {
  opacity: 0.45;
  cursor: default;
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
.food-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding-top: 3px;
  min-height: 44px;
}
.week-controls,
.nearby-controls {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.week-controls button,
.nearby-controls button {
  display: grid;
  place-items: center;
  min-width: 32px;
  min-height: 44px;
  padding: 0 3px;
}
.week-controls .this-week {
  font-size: 0.875rem;
  min-width: 40px;
  margin-left: 4px;
}
.food-segment {
  display: flex;
  padding: 3px;
  background: var(--app-quiet, #e5e5ea);
  border-radius: 9px;
  min-width: 116px;
}
.food-segment button {
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 7px;
  min-height: 30px;
  padding: 4px 9px;
  color: var(--app-text, #000);
}
.food-segment button[aria-pressed="true"] {
  background: var(--app-surface, #fff);
  box-shadow: 0 1px 3px #0002;
}
.food-heading {
  padding: 6px 0 9px;
}
.food-heading h3 {
  font-size: 2.125rem;
  line-height: 1.18;
  letter-spacing: -1px;
  font-weight: 700;
  margin: 0 0 5px;
}
.food-heading p {
  font-size: 0.8125rem;
  color: var(--app-secondary, #636366);
  margin: 0;
  line-height: 1.4;
}
.menu-days {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 2px;
  margin: 0 -2px 12px;
}
.menu-days button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
  min-height: 74px;
  padding: 0 2px;
  color: var(--app-text, #000);
}
.today-marker {
  display: block;
  height: 10px;
  width: 8px;
}
.today .today-marker {
  background: var(--app-tint, #03328d);
  clip-path: polygon(0 0, 100% 0, 50% 75%);
}
.weekday {
  color: var(--app-secondary, #636366);
  font-size: 0.8125rem;
  line-height: 1.3;
}
.today .weekday {
  color: var(--app-tint, #03328d);
  font-weight: 600;
}
.day-number {
  display: grid;
  place-items: center;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
.today .day-number {
  color: var(--app-tint, #03328d);
}
.menu-days button[aria-pressed="true"] .day-number {
  background: var(--app-tint, #03328d);
  color: var(--app-on-tint, #fff);
}
.app-group {
  background: var(--app-surface, #fff);
  border-radius: 12px;
  overflow: hidden;
}
.dish-groups {
  display: grid;
  gap: 12px;
}
.dish-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 14px;
  min-height: 44px;
  line-height: 1.35;
  position: relative;
  font-size: 1rem;
}
.dish-row + .dish-row::before,
.restaurant-row + .restaurant-row::before {
  content: "";
  position: absolute;
  left: 50px;
  right: 0;
  top: 0;
  border-top: 0.5px solid var(--app-separator, #c6c6c8);
}
.dish-number {
  min-width: 24px;
  flex-shrink: 0;
  color: var(--app-secondary, #636366);
  font-variant-numeric: tabular-nums;
}
.dish-name {
  min-width: 0;
  flex: 1;
  overflow-wrap: anywhere;
}
.dish-row strong {
  font-size: 1rem;
  font-weight: 500;
  flex-shrink: 0;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.original-menu {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 10px 14px;
  color: var(--app-tint, #03328d);
  font-size: 0.9375rem;
  line-height: 1.4;
}
.original-menu span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.menu-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 12px;
  padding: 34px 12px;
  color: var(--app-secondary, #636366);
}
.menu-empty svg {
  width: 40px;
  height: 40px;
}
.menu-empty strong {
  color: var(--app-text, #000);
  font-size: 1.1875rem;
}
.menu-empty p {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}
.restaurant-search {
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 10px;
  background: var(--app-quiet, #e5e5ea);
  padding: 5px 10px;
  color: var(--app-secondary, #636366);
  min-height: 38px;
  margin: 1px 0 13px;
}
.restaurant-search svg {
  width: 17px;
  height: 17px;
}
.restaurant-search input {
  border: 0;
  outline: none;
  min-width: 0;
  width: 100%;
  padding: 4px 0;
  color: var(--app-text, #000);
  background: none;
  font-size: 0.8125rem;
  line-height: 1.5;
}
.restaurant-search input::placeholder {
  color: var(--app-secondary, #636366);
  opacity: 1;
}
.food-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.food-filters button {
  font-size: 0.8125rem;
  min-height: 36px;
  border-radius: 99px;
  padding: 6px 13px;
  background: var(--app-quiet, #e5e5ea);
  font-weight: 600;
}
.food-filters button[aria-pressed="true"] {
  background: var(--app-tint, #03328d);
  color: var(--app-on-tint, #fff);
}
.food-filters button[aria-pressed="true"]::before {
  content: "✓ ";
  font-weight: 700;
}
.restaurant-map {
  height: 210px;
  position: relative;
  margin-bottom: 16px;
  background: var(--app-surface, #fff);
}
.restaurant-map.expanded {
  height: 330px;
}
.restaurant-map > svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}
.map-block {
  fill: var(--app-quiet, #e5e5ea);
  stroke: none;
}
.map-campus {
  fill: var(--app-background, #f2f2f7);
  stroke: var(--app-separator, #c6c6c8);
}
.map-road {
  stroke: var(--app-surface, #fff);
  stroke-width: 5;
}
.map-school {
  position: absolute;
  left: 5%;
  top: 59%;
  width: 26%;
  font-size: 0.6875rem;
  text-align: center;
  font-weight: 600;
  color: var(--app-secondary, #636366);
  line-height: 1.4;
}
.map-street {
  position: absolute;
  top: 33%;
  left: 38%;
  font-size: 0.6875rem;
  color: var(--app-secondary, #636366);
  padding: 1px 5px;
  background: var(--app-surface, #fff);
  border-radius: 4px;
}
.map-pin {
  width: 16px;
  height: 20px;
  background: #1b873f;
  border: 2px solid var(--app-surface, #fff);
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: translate(-50%, -100%) rotate(-45deg);
  box-shadow: 0 1px 2px #0002;
}
.map-pin::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: #fff;
}
.map-pin.closed {
  background: #636366;
}
.map-pin.picked {
  outline: 3px solid var(--app-tint, #03328d);
  outline-offset: 3px;
}
.map-caption {
  position: absolute;
  bottom: 7px;
  right: 7px;
  font-size: 0.6875rem;
  color: var(--app-secondary, #636366);
  background: var(--app-surface, #fff);
  padding: 3px 6px;
  border-radius: 4px;
}
.restaurants-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 2px 9px;
}
.restaurants-heading strong {
  font-size: 1.0625rem;
}
.restaurants-heading span {
  font-size: 0.6875rem;
  color: var(--app-secondary, #636366);
}
.restaurant-row {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 14px;
  min-height: 68px;
}
.restaurant-row + .restaurant-row::before {
  left: 14px;
}
.restaurant-row.chosen {
  box-shadow: inset 3px 0 0 var(--app-tint, #03328d);
}
.restaurant-row > a {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
  padding: 11px 0;
}
.restaurant-name {
  font-size: 1rem;
  overflow-wrap: anywhere;
  line-height: 1.3;
}
.restaurant-name small {
  font-size: 0.75rem;
  color: var(--app-secondary, #636366);
  margin-left: 6px;
  white-space: nowrap;
}
.restaurant-status {
  display: block;
  color: var(--app-secondary, #636366);
  font-size: 0.6875rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #1b873f;
  border-radius: 50%;
  vertical-align: 1px;
  margin-right: 5px;
}
.status-dot.closed {
  background: #636366;
}
.favorite {
  display: grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  padding: 10px;
  color: var(--app-secondary, #636366);
  flex-shrink: 0;
}
.favorite.active {
  color: #ff2d55;
}
.favorite.active svg {
  fill: currentColor;
}
.distance-note,
.random-result {
  font-size: 0.6875rem;
  color: var(--app-secondary, #636366);
  line-height: 1.5;
  margin: 8px 12px 0;
}
.random-result {
  color: var(--app-tint, #03328d);
  font-weight: 600;
}
/* Preserve the native 40pt date circle and 44pt target when enlarged text
   leaves less room inside a phone or guide preview. */
.menu-days {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 2.75rem), 1fr));
}
.day-number {
  min-width: 2em;
  min-height: 2em;
}
.week-controls {
  flex-wrap: wrap;
  max-width: 100%;
}
.dish-row {
  flex-wrap: wrap;
}
.dish-name {
  flex: 1 1 3em;
}
.dish-row strong {
  margin-left: auto;
}
</style>
