<script setup lang="ts">
import { computed, ref } from "vue";

defineProps<{ compact?: boolean }>();

const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
const month = ref({ year: 2026, month: 9 });
const selected = ref("2026-10-13");
const completedTodos = ref<Record<string, boolean>>({});
const cells = computed(() =>
  Array.from({ length: 42 }, (_, index) => {
    const first = new Date(month.value.year, month.value.month, 1);
    const date = new Date(
      month.value.year,
      month.value.month,
      1 - first.getDay() + index,
    );
    const day = date.getDate();
    const monthNumber = date.getMonth() + 1;
    const key = `${date.getFullYear()}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const inMonth = date.getMonth() === month.value.month;
    const sampleMonth = date.getFullYear() === 2026 && monthNumber === 10;
    return {
      key,
      day,
      month: monthNumber,
      inMonth,
      weekday: weekdays[date.getDay()],
      today: key === "2026-10-13",
      mark:
        sampleMonth && (day === 9 || day === 10)
          ? "假"
          : sampleMonth && (day === 20 || day === 21)
            ? "考"
            : "",
      event: sampleMonth && [13, 14, 23].includes(day),
      todo: sampleMonth && [13, 16].includes(day),
    };
  }),
);
const selectedCell = computed(
  () => cells.value.find((cell) => cell.key === selected.value)!,
);
const selectedTitle = computed(
  () =>
    `${selectedCell.value.month}月${selectedCell.value.day}日 星期${selectedCell.value.weekday}${selectedCell.value.today ? " · 今天" : ""}`,
);
const hasEvent = computed(() => selectedCell.value.event);
const eventTitle = computed(() =>
  selectedCell.value.day === 14
    ? "社團成果發表"
    : selectedCell.value.day === 23
      ? "校園講座"
      : "班級活動",
);
const hasTodo = computed(
  () => selected.value === "2026-10-13" || selected.value === "2026-10-16",
);
const selectedTodoDone = computed({
  get: () => completedTodos.value[selected.value] ?? false,
  set: (value) => {
    completedTodos.value[selected.value] = value;
  },
});
const openTodoCount = computed(
  () =>
    ["2026-10-13", "2026-10-16"].filter((key) => !completedTodos.value[key])
      .length,
);
const hasUpcomingSample = computed(
  () => selected.value >= "2026-09-30" && selected.value < "2026-10-14",
);

function showMonth(offset: number): void {
  const first = new Date(month.value.year, month.value.month + offset, 1);
  month.value = { year: first.getFullYear(), month: first.getMonth() };
  selected.value = `${first.getFullYear()}-${String(first.getMonth() + 1).padStart(2, "0")}-01`;
}

function showToday(): void {
  month.value = { year: 2026, month: 9 };
  selected.value = "2026-10-13";
}

function showUpcomingDay(): void {
  month.value = { year: 2026, month: 9 };
  selected.value = "2026-10-14";
}

function dayLabel(cell: (typeof cells.value)[number]): string {
  return `${cell.month}月${cell.day}日 星期${cell.weekday}${cell.today ? "，今天" : ""}${cell.mark === "假" ? "，放假" : cell.mark === "考" ? "，考試" : ""}${cell.event ? "，有活動" : ""}${cell.todo ? "，有待辦" : ""}`;
}
</script>

<template>
  <div class="app-calendar-preview" :class="{ 'is-compact': compact }">
    <header class="app-calendar-header">
      <div class="app-calendar-toolbar">
        <div class="app-month-navigation">
          <button type="button" aria-label="上個月" @click="showMonth(-1)">
            <svg
              viewBox="0 0 16 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              aria-hidden="true"
            >
              <path d="m11 5-7 7 7 7" />
            </svg></button
          ><button type="button" aria-label="下個月" @click="showMonth(1)">
            <svg
              viewBox="0 0 16 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              aria-hidden="true"
            >
              <path d="m5 5 7 7-7 7" />
            </svg></button
          ><button type="button" class="app-today-button" @click="showToday">
            今天
          </button>
        </div>
        <details class="app-calendar-add">
          <summary aria-label="新增待辦或活動">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M12 4v16M4 12h16" />
            </svg>
          </summary>
          <div><span>新增待辦</span><span>新增活動</span></div>
        </details>
      </div>
      <h2>行事曆</h2>
      <p>{{ month.year }}年{{ month.month + 1 }}月 · 115 學年度第 1 學期</p>
    </header>
    <div
      class="app-month-card"
      role="group"
      :aria-label="`${month.year} 年 ${month.month + 1} 月行事曆示意`"
    >
      <div class="app-month-grid">
        <span
          v-for="weekday in weekdays"
          :key="weekday"
          class="app-calendar-weekday"
          aria-hidden="true"
          >{{ weekday }}</span
        >
        <button
          v-for="cell in cells"
          :key="cell.key"
          type="button"
          class="app-calendar-cell"
          :class="{
            'is-selected': selected === cell.key,
            'is-today': cell.today,
            'is-outside': !cell.inMonth,
            'is-holiday': cell.mark === '假',
          }"
          :aria-label="dayLabel(cell)"
          :aria-pressed="selected === cell.key"
          @click="selected = cell.key"
        >
          <span class="app-calendar-number" aria-hidden="true">{{
            cell.day
          }}</span>
          <span class="app-calendar-marks" aria-hidden="true">
            <span v-if="cell.mark" class="app-calendar-mark">{{
              cell.mark
            }}</span>
            <template v-else
              ><span v-if="cell.event" class="app-calendar-dot"></span
              ><span
                v-if="cell.todo && !completedTodos[cell.key]"
                class="app-calendar-square"
              ></span
            ></template>
          </span>
        </button>
      </div>
    </div>
    <section class="app-calendar-section" :aria-label="selectedTitle">
      <h3>{{ selectedTitle }}</h3>
      <div class="app-calendar-rows">
        <div v-if="hasEvent" class="app-calendar-row">
          <span class="app-event-swatch" aria-hidden="true"></span
          ><span
            ><strong>{{ eventTitle }}</strong
            ><small>學校 · 學務處 · 全天</small></span
          >
        </div>
        <label
          v-if="hasTodo"
          class="app-calendar-row app-calendar-todo"
          :class="{ 'is-completed': selectedTodoDone }"
          ><input v-model="selectedTodoDone" type="checkbox" /><span
            ><strong>{{
              selected === "2026-10-13" ? "數學習作 p.32–35" : "帶體育服"
            }}</strong
            ><small
              >{{ selectedTodoDone ? "已完成" : "待辦" }} · 作業</small
            ></span
          ></label
        >
        <p v-if="!hasEvent && !hasTodo" class="app-calendar-empty">
          這一天沒有活動或待辦。
        </p>
      </div>
      <p v-if="hasEvent" class="app-calendar-footer">
        學校活動僅供查看，無法修改。
      </p>
    </section>
    <section
      v-if="hasUpcomingSample"
      class="app-calendar-section"
      aria-label="接下來"
    >
      <h3>接下來</h3>
      <div class="app-calendar-rows">
        <button
          class="app-calendar-row app-upcoming-row"
          type="button"
          @click="showUpcomingDay"
        >
          <span class="app-date-mark" aria-hidden="true"
            ><small>三</small><b>14</b></span
          ><span><strong>社團成果發表</strong><small>學校 · 學務處</small></span
          ><svg
            aria-hidden="true"
            viewBox="0 0 12 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="m3 4 6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
    <div class="app-calendar-rows app-all-todos">
      <span>所有待辦</span
      ><span
        >{{ openTodoCount }} 項
        <svg
          aria-hidden="true"
          viewBox="0 0 12 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m3 4 6 6-6 6" /></svg
      ></span>
    </div>
  </div>
</template>

<style scoped>
.app-calendar-preview {
  min-width: 0;
  color: var(--app-text, #000);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  line-height: 1.3;
}
.app-calendar-header {
  margin-bottom: 18px;
}
.app-calendar-header h2 {
  margin: 0;
  color: var(--app-text, #000);
  font:
    700 2.125rem/1.2 -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    sans-serif;
  letter-spacing: -0.025em;
}
.app-calendar-header > p {
  margin: 6px 0 0;
  color: var(--app-text, #000);
  font-size: 1.0625rem;
}
.app-calendar-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  min-height: 2.75rem;
  margin-bottom: 2px;
}
.app-month-navigation {
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}
.app-month-navigation button,
.app-calendar-add summary {
  appearance: none;
  display: grid;
  place-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  border: 0;
  border-radius: 50%;
  padding: 4px 8px;
  background: transparent;
  color: var(--app-tint, #03328d);
  font: inherit;
  font-size: 1.0625rem;
  cursor: pointer;
}
.app-month-navigation button svg {
  width: 1rem;
  height: 1.5rem;
}
.app-month-navigation .app-today-button {
  border-radius: 12px;
  margin-left: 12px;
}
.app-calendar-add {
  position: relative;
  flex: none;
}
.app-calendar-add summary {
  list-style: none;
}
.app-calendar-add summary::-webkit-details-marker {
  display: none;
}
.app-calendar-add summary svg {
  width: 1.375rem;
  height: 1.375rem;
}
.app-calendar-add > div {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 2;
  width: max-content;
  max-width: 14rem;
  border: 1px solid var(--app-separator, #d1d1d6);
  border-radius: 12px;
  background: var(--app-surface, #fff);
  box-shadow: 0 8px 24px #0002;
}
.app-calendar-add > div span {
  display: block;
  padding: 12px 16px;
  font-size: 1rem;
}
.app-calendar-add > div span + span {
  border-top: 1px solid var(--app-separator, #d1d1d6);
}
.app-month-navigation button:hover,
.app-calendar-add summary:hover {
  background: var(--app-surface, #fff);
}
.app-month-navigation button:focus-visible,
.app-calendar-add summary:focus-visible {
  outline: 2px solid var(--app-tint, #03328d);
  outline-offset: -2px;
}
.app-month-card,
.app-calendar-rows {
  background: var(--app-surface, #fff);
  border-radius: 10px;
  overflow: hidden;
}
.app-month-card {
  padding: 10px 6px 8px;
}
.app-month-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 2px 0;
}
.app-calendar-weekday {
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--app-secondary, #65656b);
  padding-bottom: 4px;
}
.app-calendar-cell {
  appearance: none;
  min-width: 0;
  min-height: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border: 0;
  border-radius: 8px;
  padding: 2px 0;
  background: transparent;
  color: var(--app-text, #000);
  font: inherit;
  cursor: pointer;
}
.app-calendar-number {
  display: grid;
  place-items: center;
  width: min(2.25rem, 100%);
  min-height: 2.25rem;
  border-radius: 50%;
  font-size: 1.0625rem;
  font-variant-numeric: tabular-nums;
}
.app-calendar-cell.is-today .app-calendar-number {
  color: var(--app-tint, #03328d);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.app-calendar-cell.is-outside .app-calendar-number {
  color: var(--app-secondary, #65656b);
  opacity: 1;
}
.app-calendar-cell.is-holiday .app-calendar-number,
.app-calendar-cell.is-holiday .app-calendar-mark {
  color: var(--app-danger, #ff3b30);
}
.app-calendar-cell.is-selected .app-calendar-number {
  color: var(--app-on-tint, #fff);
  background: var(--app-tint, #03328d);
  font-weight: 600;
  text-decoration: none;
  opacity: 1;
}
.app-calendar-marks {
  min-height: 0.8125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
.app-calendar-dot,
.app-calendar-square {
  display: block;
  width: 5px;
  height: 5px;
}
.app-calendar-dot {
  border-radius: 50%;
  background: #00897b;
}
.app-calendar-square {
  border-radius: 1px;
  background: var(--app-tint, #03328d);
}
.app-calendar-mark {
  font-size: 0.6875rem;
  font-weight: 700;
}
.app-calendar-section {
  margin-top: 20px;
}
.app-calendar-section h3 {
  margin: 0 16px 7px;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.5;
}
.app-calendar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 3.5rem;
  margin: 0;
  padding: 10px 16px;
  text-align: left;
  color: var(--app-text, #000);
  font: inherit;
}
.app-calendar-row + .app-calendar-row {
  border-top: 1px solid var(--app-separator, #d1d1d6);
}
.app-calendar-row > span:not(.app-event-swatch):not(.app-date-mark) {
  min-width: 0;
  flex: 1;
}
.app-calendar-row strong {
  display: block;
  font-size: 1.0625rem;
  font-weight: 400;
  overflow-wrap: anywhere;
}
.app-calendar-row small {
  display: block;
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--app-secondary, #65656b);
  overflow-wrap: anywhere;
}
.app-event-swatch {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: #00897b;
}
.app-calendar-todo {
  cursor: pointer;
}
.app-calendar-todo input {
  appearance: none;
  flex: none;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
  border: 1.5px solid var(--app-secondary, #65656b);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.app-calendar-todo input:checked {
  border-color: var(--app-tint, #03328d);
  background: var(--app-tint, #03328d);
}
.app-calendar-todo input:checked::after {
  content: "";
  display: block;
  width: 0.375rem;
  height: 0.6875rem;
  margin: 0.25rem auto;
  border: solid var(--app-on-tint, #fff);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.app-calendar-todo.is-completed strong {
  color: var(--app-secondary, #65656b);
  text-decoration: line-through;
}
.app-calendar-footer {
  margin: 7px 16px 0;
  color: var(--app-secondary, #65656b);
  font-size: 0.8125rem;
  line-height: 1.5;
}
.app-calendar-empty {
  margin: 0;
  padding: 14px 16px;
  color: var(--app-secondary, #65656b);
  font-size: 1rem;
}
.app-upcoming-row {
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
}
.app-date-mark {
  flex: none;
  min-width: 1.5rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.app-date-mark small {
  margin: 0;
  font-size: 0.6875rem;
}
.app-date-mark b {
  font-size: 1.25rem;
  font-weight: 600;
}
.app-calendar-row svg,
.app-all-todos svg {
  flex: none;
  width: 0.5rem;
  height: 0.8125rem;
  color: var(--app-secondary, #65656b);
}
.app-all-todos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 13px 16px;
  font-size: 1.0625rem;
}
.app-all-todos > span:last-child {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--app-secondary, #65656b);
}
.app-calendar-cell:hover,
.app-upcoming-row:hover {
  background: var(--app-background, #f2f2f7);
}
.app-calendar-cell:focus-visible,
.app-upcoming-row:focus-visible,
.app-calendar-todo input:focus-visible {
  outline: 2px solid var(--app-tint, #03328d);
  outline-offset: -2px;
}
/* Native dates use minimumScaleFactor(0.6); keep the seven-day grid legible. */
@container (max-width: 14rem) {
  .app-calendar-toolbar { flex-wrap: wrap; }
  .app-month-navigation { flex: 1 1 100%; }
  .app-month-card { padding-inline: 2px; }
  .app-calendar-number { font-size: .6875rem; }
}
</style>
