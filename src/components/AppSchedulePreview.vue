<script setup lang="ts">
import type { CSSProperties } from "vue";

// The fixture uses the native app's bell times, full subject names and
// subject-colors.ts palette algorithm. It represents 09:41 on October 13.
defineProps<{ compact?: boolean }>();

const columns = ["一", "二", "三", "四", "五"].map((weekday, index) => ({
  weekday,
  date: 12 + index,
  today: index === 1,
}));
const periods = [
  { label: "一", start: "08:10", end: "09:00" },
  { label: "二", start: "09:10", end: "10:00" },
  { label: "三", start: "10:10", end: "11:00" },
  { label: "四", start: "11:10", end: "12:00" },
  { label: "五", start: "13:00", end: "13:50" },
  { label: "六", start: "14:00", end: "14:50" },
  { label: "七", start: "15:10", end: "16:00" },
  { label: "八", start: "16:10", end: "17:00" },
];
const subjects = [
  ["國語文", "物理", "各類文學選讀", "數學", "化學"],
  ["英語文", "數學", "各類文學選讀", "國語文", "體育"],
  ["數學", "英語文", "物理", "化學", "歷史"],
  ["歷史", "體育", "英語文", "英語文", "國語文"],
  ["化學", "國語文", "地理", "物理", "數學"],
  ["物理", "化學", "地理", "體育", "英語文"],
  ["體育", "歷史", "班會", "國語文", "地理"],
  ["", "班會", "", "歷史", "班會"],
];

function nameHash(name: string): number {
  let hash = 0x811c9dc5;
  for (const char of name) {
    hash ^= char.codePointAt(0)!;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

function hslHex(hue: number, saturation: number, lightness: number): string {
  const a = saturation * Math.min(lightness, 1 - lightness);
  const channel = (n: number) => {
    const k = (n + hue / 30) % 12;
    return Math.round(
      (lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255,
    )
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

const taken = new Set<number>();
const swatches = new Map<string, CSSProperties>();
for (const subject of [...new Set(subjects.flat().filter(Boolean))].sort()) {
  let slot = nameHash(subject) % 22;
  while (taken.has(slot)) slot = (slot + 1) % 22;
  taken.add(slot);
  const hue = (10 + (slot * 360) / 22) % 360;
  const alternate = slot % 2 === 1;
  swatches.set(subject, {
    "--lesson-fill-light": hslHex(hue, 0.9, alternate ? 0.74 : 0.86),
    "--lesson-ink-light": hslHex(
      hue,
      alternate ? 0.8 : 0.7,
      alternate ? 0.19 : 0.24,
    ),
    "--lesson-fill-dark": hslHex(hue, 0.55, alternate ? 0.27 : 0.2),
    "--lesson-ink-dark": hslHex(hue, 0.8, alternate ? 0.9 : 0.8),
  } as CSSProperties);
}

function cellLabel(row: number, column: number): string {
  const period = periods[row]!;
  const subject = subjects[row]![column] || "空堂";
  return `星期${columns[column]!.weekday}第${period.label}節，${period.start}–${period.end}，${subject}${row === 2 && column === 2 ? "，實驗室上課" : ""}${row === 1 && column === 1 ? "，現在" : ""}`;
}
</script>

<template>
  <div class="app-schedule-preview" :class="{ 'is-compact': compact }">
    <header class="app-schedule-header">
      <div class="app-native-toolbar">
        <details class="app-schedule-menu">
          <summary aria-label="課表選項">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5" cy="12" r="1.7" />
              <circle cx="12" cy="12" r="1.7" />
              <circle cx="19" cy="12" r="1.7" />
            </svg>
          </summary>
          <div class="app-schedule-menu-content">
            <span>每日課表</span><span>選擇班級 <b>201 ✓</b></span
            ><span>重新匯入課表</span>
          </div>
        </details>
      </div>
      <h2>課表</h2>
      <p>201 · 第 7 週 · 單週</p>
    </header>
    <table class="app-week-grid">
      <caption class="app-preview-sr">
        201 班，2026 年 10 月 12 日至 16 日的課表示意
      </caption>
      <colgroup>
        <col class="app-period-column" />
        <col v-for="column in columns" :key="column.weekday" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">
            <span class="app-preview-sr">節次與開始時間</span>
          </th>
          <th
            v-for="column in columns"
            :key="column.weekday"
            scope="col"
            :class="{ 'is-today': column.today }"
          >
            <span class="app-today-marker" aria-hidden="true">{{
              column.today ? "▼" : "\u00a0"
            }}</span>
            <span class="app-weekday">{{ column.weekday }}</span>
            <span class="app-week-date">{{ column.date }}</span>
            <span v-if="column.today" class="app-preview-sr">，今天</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(period, row) in periods" :key="period.label">
          <tr v-if="row === 4" class="app-lunch-row">
            <td></td>
            <td colspan="5">午休 12:00–13:00</td>
          </tr>
          <tr>
            <th scope="row" :class="{ 'is-current': row === 1 }">
              <span class="app-period-number">{{ period.label }}</span
              ><span class="app-period-time">{{ period.start }}</span>
            </th>
            <td
              v-for="(column, columnIndex) in columns"
              :key="column.weekday"
              :aria-label="cellLabel(row, columnIndex)"
            >
              <div
                class="app-lesson"
                :class="{
                  'is-empty': !subjects[row]![columnIndex],
                  'is-current': row === 1 && columnIndex === 1,
                }"
                :style="swatches.get(subjects[row]![columnIndex]!)"
                aria-hidden="true"
              >
                <span>{{ subjects[row]![columnIndex] }}</span>
                <svg
                  v-if="row === 2 && columnIndex === 2"
                  class="app-note-mark"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                >
                  <rect x="2.5" y="2" width="11" height="12" rx="2" />
                  <path d="M5 5h6M5 8h6M5 11h3" />
                </svg>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="app-week-list">
      <section
        v-for="(column, columnIndex) in columns"
        :key="column.weekday"
        class="app-day-section"
        :aria-label="`星期${column.weekday}`"
      >
        <h3>
          星期{{ column.weekday }} · 10月{{ column.date }}日{{
            column.today ? " · 今天" : ""
          }}
        </h3>
        <div class="app-day-lessons">
          <div
            v-for="(period, row) in periods"
            :key="period.label"
            class="app-day-lesson"
            :aria-label="cellLabel(row, columnIndex)"
          >
            <span
              class="app-list-period"
              :class="{ 'is-empty': !subjects[row]![columnIndex] }"
              :style="swatches.get(subjects[row]![columnIndex]!)"
              aria-hidden="true"
              >{{ period.label }}</span
            ><span
              ><strong>{{ subjects[row]![columnIndex] || "空堂" }}</strong
              ><small
                >{{ period.start }}–{{ period.end
                }}{{
                  row === 2 && columnIndex === 2 ? " · 實驗室上課" : ""
                }}</small
              ></span
            ><b v-if="row === 1 && columnIndex === 1" class="app-list-now"
              >現在</b
            >
          </div>
        </div>
      </section>
    </div>
    <p class="app-schedule-hint">點一格可修改科目、單雙週輪替、備註與顏色</p>
  </div>
</template>

<style scoped>
.app-schedule-preview {
  container-type: inline-size;
  min-width: 0;
  color: var(--app-text, #000);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  line-height: 1.3;
}
.app-schedule-header {
  margin-bottom: 18px;
}
.app-schedule-header h2 {
  margin: 0;
  color: var(--app-text, #000);
  font:
    700 2.125rem/1.2 -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    sans-serif;
  letter-spacing: -0.025em;
}
.app-schedule-header > p {
  margin: 6px 0 0;
  color: var(--app-text, #000);
  font-size: 1.0625rem;
}
.app-native-toolbar {
  display: flex;
  justify-content: flex-end;
  min-height: 2.75rem;
  margin-bottom: 2px;
}
.app-schedule-menu {
  position: relative;
}
.app-schedule-menu summary {
  display: grid;
  place-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 50%;
  list-style: none;
  color: var(--app-tint, #03328d);
  cursor: pointer;
}
.app-schedule-menu summary::-webkit-details-marker {
  display: none;
}
.app-schedule-menu summary svg {
  width: 1.375rem;
  height: 1.375rem;
}
.app-schedule-menu summary:hover {
  background: var(--app-surface, #fff);
}
.app-schedule-menu summary:focus-visible {
  outline: 2px solid var(--app-tint, #03328d);
  outline-offset: -2px;
}
.app-schedule-menu-content {
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  width: max-content;
  max-width: 15rem;
  overflow-wrap: anywhere;
  border: 1px solid var(--app-separator, #d1d1d6);
  border-radius: 12px;
  background: var(--app-surface, #fff);
  box-shadow: 0 8px 24px #0002;
}
.app-schedule-menu-content > span {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 1rem;
}
.app-schedule-menu-content > span + span {
  border-top: 1px solid var(--app-separator, #d1d1d6);
}
.app-schedule-menu-content b {
  color: var(--app-tint, #03328d);
  font-weight: 500;
}
.app-week-grid {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 6px;
  margin: 0;
}
.app-period-column {
  width: clamp(28px, 12%, 44px);
}
.app-week-grid th,
.app-week-grid td {
  padding: 0;
  border: 0;
  text-align: center;
  vertical-align: top;
}
.app-week-grid tbody th {
  vertical-align: middle;
}
.app-week-grid thead th {
  padding-bottom: 2px;
  font-weight: 400;
}
.app-today-marker {
  display: block;
  height: 0.625rem;
  font-size: 0.625rem;
  color: var(--app-tint, #03328d);
  line-height: 1;
}
.app-weekday {
  display: block;
  margin-top: 2px;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
}
.app-week-date {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
.app-week-grid .is-today .app-weekday,
.app-week-grid .is-today .app-week-date,
.app-week-grid th.is-current {
  color: var(--app-tint, #03328d);
}
.app-period-number {
  display: block;
  font-size: 1.0625rem;
  font-weight: 700;
}
.app-period-time {
  display: block;
  margin-top: 1px;
  font-size: 0.6875rem;
  color: var(--app-secondary, #65656b);
  font-variant-numeric: tabular-nums;
}
.is-current .app-period-time {
  color: inherit;
}
.app-lesson {
  min-height: 3.375rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  padding: 4px 3px;
  border-radius: 12px;
  background: var(--lesson-fill-light, var(--app-surface, #fff));
  color: var(--lesson-ink-light, var(--app-text, #000));
  font-size: 0.8125rem;
  font-weight: 500;
  overflow-wrap: anywhere;
}
.app-lesson.is-current {
  box-shadow: inset 0 0 0 2px var(--app-tint, #03328d);
}
.app-lesson.is-empty {
  background: transparent;
}
.app-note-mark {
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
}
.app-week-grid .app-lunch-row td {
  vertical-align: middle;
  padding: 4px 0;
  color: var(--app-secondary, #65656b);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}
.app-schedule-hint {
  margin: 9px 0 0;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
  line-height: 1.5;
}
.app-week-list {
  display: none;
}
.app-day-section + .app-day-section {
  margin-top: 20px;
}
.app-day-section h3 {
  margin: 0 12px 7px;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.5;
}
.app-day-lessons {
  overflow: hidden;
  background: var(--app-surface, #fff);
  border-radius: 10px;
}
.app-day-lesson {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
}
.app-day-lesson + .app-day-lesson {
  border-top: 1px solid var(--app-separator, #d1d1d6);
}
.app-list-period {
  display: grid;
  place-items: center;
  flex: none;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 8px;
  background: var(--lesson-fill-light, var(--app-background, #f2f2f7));
  color: var(--lesson-ink-light, var(--app-text, #000));
  font-size: 1rem;
  font-weight: 600;
}
.app-list-period.is-empty {
  border: 1px dashed var(--app-secondary, #65656b);
  background: transparent;
}
.app-day-lesson > span:nth-child(2) {
  min-width: 0;
  flex: 1;
}
.app-day-lesson strong {
  display: block;
  font-size: 1.0625rem;
  font-weight: 400;
  overflow-wrap: anywhere;
}
.app-day-lesson small {
  display: block;
  margin-top: 2px;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
  overflow-wrap: anywhere;
}
.app-list-now {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--app-tint, #03328d);
}
.app-preview-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
@container (max-width: 18rem) {
  .app-week-grid {
    border-spacing: 4px 6px;
  }
  .app-period-time {
    font-size: 0.625rem;
  }
}
/* At enlarged text sizes the same native screen changes to weekday lists.
   A rem-based container threshold preserves that behavior inside any preview. */
@container (max-width: 14rem) {
  .app-week-grid {
    display: none;
  }
  .app-week-list {
    display: block;
  }
  .app-day-lesson {
    flex-wrap: wrap;
  }
  .app-day-lesson > span:nth-child(2) {
    flex: 1 1 6rem;
  }
}
.app-schedule-menu:not([open]) .app-schedule-menu-content {
  display: none;
}
@media (prefers-color-scheme: dark) {
  .app-lesson {
    background: var(--lesson-fill-dark, var(--app-surface, #1c1c1e));
    color: var(--lesson-ink-dark, var(--app-text, #fff));
  }
  .app-lesson.is-empty {
    background: transparent;
  }
  .app-list-period {
    background: var(--lesson-fill-dark, var(--app-background, #000));
    color: var(--lesson-ink-dark, var(--app-text, #fff));
  }
  .app-list-period.is-empty {
    background: transparent;
  }
}
</style>
