<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { QBtn } from "quasar";
import { featuresHref, homeHref } from "../data/features";

defineProps<{ isFeaturePage: boolean }>();

const baseUrl = import.meta.env.BASE_URL;
const mobileMenu = ref(false);
const navigation = ref<HTMLElement | null>(null);
const menuToggle = ref<InstanceType<typeof QBtn> | null>(null);

function closeMenu(): void {
  mobileMenu.value = false;
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

function handleMenuFocus(event: FocusEvent): void {
  if (
    event.relatedTarget instanceof Node &&
    !navigation.value?.contains(event.relatedTarget)
  )
    closeMenu();
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
  <header class="header">
    <nav
      ref="navigation"
      class="nav wrap"
      aria-label="主要導覽"
      @focusout="handleMenuFocus"
    >
      <a :href="homeHref" class="brand" aria-label="CK APP 首頁">
        <img
          :src="`${baseUrl}assets/ck-app-icon.png`"
          alt=""
          width="42"
          height="42"
        />
        <span style="margin-left: 7px; font-weight: bold; font-size: 1.25rem;">CK APP</span>
      </a>
      <div class="nav-actions">
        <a href="#download" class="mobile-download">
          免費下載<svg aria-hidden="true"><use href="#i-down" /></svg>
        </a>
        <QBtn
          ref="menuToggle"
          class="menu-toggle"
          flat
          no-caps
          :ripple="false"
          :aria-label="mobileMenu ? '關閉導覽選單' : '開啟導覽選單'"
          :aria-expanded="mobileMenu"
          aria-controls="nav-links"
          @click="mobileMenu = !mobileMenu"
        >
          <svg aria-hidden="true">
            <use :href="mobileMenu ? '#i-close' : '#i-menu'" />
          </svg>
        </QBtn>
      </div>
      <div id="nav-links" class="nav-links" :class="{ 'is-open': mobileMenu }">
        <a
          :href="featuresHref"
          class="nav-link"
          :aria-current="isFeaturePage ? 'page' : undefined"
          @click="closeMenu"
          >功能指南</a
        >
        <a :href="`${homeHref}#about`" @click="closeMenu">關於我們</a>
        <a
          href="#download"
          class="button button-primary nav-download"
          @click="closeMenu"
        >
          下載 CK APP<svg aria-hidden="true"><use href="#i-down" /></svg>
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link[aria-current="page"] {
  color: var(--blue);
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 0.35em;
}
</style>
