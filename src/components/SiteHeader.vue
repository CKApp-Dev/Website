<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { QBtn } from 'quasar'
import { homeHref, featuresHref } from '../data/features'
defineProps<{isFeaturePage:boolean}>()
const baseUrl=import.meta.env.BASE_URL
const mobileMenu=ref(false)
const navigation=ref<HTMLElement|null>(null)
const menuToggle=ref<InstanceType<typeof QBtn>|null>(null)
function closeMenu():void {mobileMenu.value=false}
function handleOutsideClick(event:MouseEvent):void {if(event.target instanceof Node&&!navigation.value?.contains(event.target))closeMenu()}
function handleEscape(event:KeyboardEvent):void {if(event.key==='Escape'&&mobileMenu.value){closeMenu();(menuToggle.value?.$el as HTMLElement|undefined)?.focus()}}
onMounted(()=>{document.addEventListener('click',handleOutsideClick);document.addEventListener('keydown',handleEscape)})
onBeforeUnmount(()=>{document.removeEventListener('click',handleOutsideClick);document.removeEventListener('keydown',handleEscape)})
</script>

<template>
  <header class="header">
    <nav ref="navigation" class="nav wrap" aria-label="主要導覽">
      <a :href="homeHref" class="brand" aria-label="CK APP 首頁">
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
          :href="featuresHref" :aria-current="isFeaturePage ? 'page' : undefined"
          class="nav-link"
          flat
          dense
          no-caps
          :ripple="false"
          @click="closeMenu"
        >
          完整功能
        </QBtn>
        <QBtn
          :href="`${homeHref}#about`"
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
      </div>
    </nav>
  </header>
</template>
