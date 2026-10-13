<script setup lang="ts">
defineProps<{ interactive?: boolean }>();
defineEmits<{ navigate: ["schedule"] }>();
const segments = [
  { label: "一", start: 490, end: 540, progress: 1 },
  { label: "二", start: 550, end: 600, progress: 0.62 },
  { label: "三", start: 610, end: 660, progress: 0 },
  { label: "四", start: 670, end: 720, progress: 0 },
  { label: "午", start: 720, end: 780, progress: 0 },
  { label: "五", start: 780, end: 830, progress: 0 },
  { label: "六", start: 840, end: 890, progress: 0 },
  { label: "七", start: 910, end: 960, progress: 0 },
  { label: "八", start: 970, end: 1020, progress: 0 },
];
</script>
<template>
  <component
    :is="interactive ? 'button' : 'div'"
    class="app-now-card"
    :type="interactive ? 'button' : undefined"
    :aria-label="
      interactive
        ? '第二節數學，09:10至10:00，19分鐘後下課；預覽課表'
        : undefined
    "
    @click="interactive && $emit('navigate', 'schedule')"
  >
    <div class="app-now-eyebrow">
      <strong>第二節</strong><span>09:10–10:00</span>
    </div>
    <div class="app-now-title">數學</div>
    <div class="app-now-rail" aria-hidden="true">
      <span
        class="app-now-marker"
        :style="{ left: `${((581 - 490) / 530) * 100}%` }"
        >▼</span
      >
      <span
        v-for="segment in segments"
        :key="segment.label"
        class="app-now-segment"
        :class="{ 'is-lunch': segment.label === '午' }"
        :style="{
          left: `${((segment.start - 490) / 530) * 100}%`,
          width: `${((segment.end - segment.start) / 530) * 100}%`,
        }"
        ><span class="app-now-bar"
          ><i :style="{ width: `${segment.progress * 100}%` }"></i></span
        ><span
          class="app-now-period"
          :class="{ current: segment.label === '二' }"
          >{{ segment.label }}</span
        ></span
      >
    </div>
    <div class="app-now-footer">
      <strong>19 分鐘後下課</strong><span>下一節 英語文 10:10</span>
    </div>
  </component>
</template>
<style scoped>
.app-now-card {
  display: block;
  width: 100%;
  min-width: 0;
  padding: 1rem;
  border: 0;
  border-radius: 0.75rem;
  background: var(--app-now, #03328d);
  color: #fff;
  text-align: left;
  font: inherit;
}
button.app-now-card:hover {
  filter: brightness(1.05);
}
.app-now-eyebrow,
.app-now-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
  line-height: 1.6;
}
.app-now-eyebrow strong {
  font-size: 1.0625rem;
  font-weight: 600;
}
.app-now-eyebrow span,
.app-now-footer span {
  color: #ffffffc7;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}
.app-now-title {
  font-size: 2.125rem;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-top: 0.125rem;
}
.app-now-rail {
  height: 2.75rem;
  position: relative;
  margin-top: 0.5rem;
}
.app-now-marker {
  position: absolute;
  top: 0;
  font-size: 0.6875rem;
  line-height: 1;
  transform: translateX(-50%);
}
.app-now-segment {
  position: absolute;
  top: 0.875rem;
}
.app-now-bar {
  display: block;
  height: 6px;
  border-radius: 1rem;
  background: #ffffff73;
  overflow: hidden;
}
.app-now-bar i {
  display: block;
  height: 100%;
  background: #fff;
  border-radius: inherit;
}
.is-lunch .app-now-bar {
  background: none;
  border-top: 3px dotted #ffffff73;
  height: 3px;
  margin-top: 1px;
}
.app-now-period {
  display: block;
  text-align: center;
  color: #ffffffc7;
  font-size: 0.6875rem;
  line-height: 1.5;
  margin-top: 0.25rem;
}
.app-now-period.current {
  font-weight: 700;
  color: #fff;
}
.app-now-footer strong {
  font-size: 0.9375rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
