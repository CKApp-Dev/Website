<script setup lang="ts">
import { ref } from "vue";
import { featureHref } from "../data/features";
import AppNowPreview from "./AppNowPreview.vue";
defineEmits<{ navigate: ["schedule" | "food" | "campus"] }>();
const tasks = ref([
  { title: "數學習作 p.32–35", category: "作業", done: false },
  { title: "帶社團成果發表道具", category: "社團", done: false },
]);
</script>
<template>
  <div class="app-today-preview">
    <div class="app-native-toolbar app-today-toolbar">
      <a
        :href="featureHref('getting-started')"
        aria-label="查看班級設定功能介紹"
        >201</a
      >
    </div>
    <h2 class="app-native-title">今天</h2>
    <p class="app-native-subtitle">10月13日 星期二 · 第 7 週 · 單週</p>
    <AppNowPreview interactive @navigate="$emit('navigate', 'schedule')" />
    <section class="app-native-section">
      <div class="app-native-section-heading">
        <h3>班聯公告</h3>
        <span class="app-native-badge">1 則未讀</span
        ><a :href="featureHref('announcements')">全部</a>
      </div>
      <div class="app-native-group">
        <a class="app-native-row" :href="featureHref('announcements')"
          ><span
            ><strong
              >班聯公告範例 <span class="app-native-badge">未讀</span></strong
            ><small>2026/10/13 08:00</small
            ><small>校園活動與學生會消息，集中在這裡</small></span
          ><span class="app-native-chevron" aria-hidden="true">›</span></a
        >
      </div>
    </section>
    <section class="app-native-section">
      <div class="app-native-section-heading"><h3>今日</h3></div>
      <div class="app-native-group">
        <label
          v-for="task in tasks"
          :key="task.title"
          class="app-native-row app-native-check"
          :class="{ 'is-completed': task.done }"
          ><input v-model="task.done" type="checkbox" /><span
            ><strong>{{ task.title }}</strong
            ><small>待辦 · {{ task.category }}</small></span
          ></label
        >
      </div>
    </section>
    <section class="app-native-section">
      <div class="app-native-section-heading"><h3>午餐</h3></div>
      <div class="app-native-group">
        <button
          type="button"
          class="app-native-row"
          @click="$emit('navigate', 'food')"
        >
          <span><strong>熱食部</strong><small>今天的菜單</small></span
          ><span class="app-native-chevron" aria-hidden="true">›</span></button
        ><button
          type="button"
          class="app-native-row"
          @click="$emit('navigate', 'food')"
        >
          <span><strong>附近 4 間營業中</strong><small>林乾 · 建豆</small></span
          ><span class="app-native-chevron" aria-hidden="true">›</span>
        </button>
      </div>
    </section>
    <section class="app-native-section">
      <div class="app-native-section-heading"><h3>回家</h3></div>
      <div class="app-native-group">
        <button
          type="button"
          class="app-native-row"
          @click="$emit('navigate', 'campus')"
        >
          <svg aria-hidden="true"><use href="#i-bike" /></svg
          ><span><strong>建國中學</strong><small>YouBike</small></span
          ><span class="app-native-detail">借 12 · 還 8</span></button
        ><button
          type="button"
          class="app-native-row"
          @click="$emit('navigate', 'campus')"
        >
          <svg aria-hidden="true"><use href="#i-train" /></svg
          ><span><strong>中正紀念堂</strong><small>捷運</small></span
          ><span class="app-native-detail">往松山 3 分</span>
        </button>
      </div>
      <p class="app-native-footnote">上學前和放學後約每分鐘更新</p>
    </section>
    <section class="app-native-section">
      <div class="app-native-section-heading"><h3>釘選的校網消息</h3></div>
      <div class="app-native-group">
        <p class="app-native-row app-native-empty">還沒有釘選的消息</p>
        <a
          :href="featureHref('school-news')"
          class="app-native-row app-native-link"
          >查看校網<span class="app-native-chevron" aria-hidden="true"
            >›</span
          ></a
        >
      </div>
    </section>
  </div>
</template>
<style scoped>
.app-today-preview {
  min-width: 0;
}
.app-today-toolbar {
  justify-content: flex-end;
}
.app-today-toolbar a {
  display: grid;
  place-items: center;
  min-height: 2.75rem;
  min-width: 2.75rem;
  color: var(--app-tint);
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
