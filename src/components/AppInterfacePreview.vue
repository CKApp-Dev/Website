<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { FeaturePage } from "../data/types";
import AppTodayPreview from "./AppTodayPreview.vue";
import AppSchedulePreview from "./AppSchedulePreview.vue";
import AppCalendarPreview from "./AppCalendarPreview.vue";
import AppFoodPreview from "./AppFoodPreview.vue";
import AppCampusPreview from "./AppCampusPreview.vue";
import AppFeaturePreview from "./AppFeaturePreview.vue";
const props = defineProps<{
  screen?: string;
  feature?: FeaturePage;
  showTabs?: boolean;
}>();
const emit = defineEmits<{ navigate: [string] }>();
const localScreen = ref(props.screen ?? props.feature?.slug ?? "today");
watch(
  () => props.screen ?? props.feature?.slug,
  (value) => {
    if (value) localScreen.value = value;
  },
);
const selectedTab = computed(() =>
  ["timetable", "schedule"].includes(localScreen.value)
    ? "schedule"
    : localScreen.value === "calendar"
      ? "calendar"
      : ["food", "cafeteria", "nearby-food"].includes(localScreen.value)
        ? "food"
        : localScreen.value === "today"
          ? "today"
          : "campus",
);
const tabs = [
  { id: "today", title: "今天", icon: "sun" },
  { id: "schedule", title: "課表", icon: "grid" },
  { id: "calendar", title: "行事曆", icon: "calendar" },
  { id: "food", title: "美食", icon: "food" },
  { id: "campus", title: "校園", icon: "school" },
];
function navigate(screen: string) {
  localScreen.value = screen;
  emit("navigate", screen);
}
</script>
<template>
  <div class="app-interface" :data-app-screen="localScreen">
    <AppTodayPreview v-if="localScreen === 'today'" @navigate="navigate" />
    <AppSchedulePreview
      v-else-if="['schedule', 'timetable'].includes(localScreen)"
    />
    <AppCalendarPreview v-else-if="localScreen === 'calendar'" />
    <AppFoodPreview
      v-else-if="['food', 'cafeteria', 'nearby-food'].includes(localScreen)"
      :key="localScreen"
      :view="localScreen === 'nearby-food' ? 'nearby' : 'menu'"
    />
    <AppCampusPreview v-else-if="localScreen === 'campus'" />
    <AppFeaturePreview v-else-if="feature" :feature="feature" />
    <div
      v-if="
        showTabs &&
        !['widgets', 'getting-started', 'announcements'].includes(localScreen)
      "
      class="app-native-tabs"
      role="group"
      aria-label="App 功能預覽分頁"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        :aria-pressed="selectedTab === tab.id"
        @click="navigate(tab.id)"
      >
        <svg aria-hidden="true"><use :href="`#i-${tab.icon}`" /></svg
        ><span>{{ tab.title }}</span>
      </button>
    </div>
  </div>
</template>
