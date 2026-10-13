<script setup lang="ts">
import { computed } from "vue";
import AppInterfacePreview from "../components/AppInterfacePreview.vue";
import {
  features,
  featureGroups,
  featureHref,
  featuresHref,
  homeHref,
} from "../data/features";
import type { FeaturePage } from "../data/types";

const props = defineProps<{ feature: FeaturePage }>();
const group = computed(() =>
  featureGroups.find((item) => item.id === props.feature.group),
);
const relatedFeatures = computed(() =>
  props.feature.related
    .map((slug) => features.find((item) => item.slug === slug))
    .filter((item): item is FeaturePage => Boolean(item)),
);
const guideGroups = computed(() =>
  featureGroups.map((item) => ({
    ...item,
    features: features.filter((feature) => feature.group === item.id),
  })),
);
const sectionNumber = (index: number) => String(index + 1).padStart(2, "0");
</script>

<template>
  <main
    id="main"
    tabindex="-1"
    class="feature-detail"
    :class="`feature-detail-${feature.group}`"
  >
    <div class="wrap">
      <nav class="feature-breadcrumb" aria-label="麵包屑導覽">
        <a :href="homeHref">首頁</a><span aria-hidden="true">/</span
        ><a :href="featuresHref">功能指南</a><span aria-hidden="true">/</span
        ><span aria-current="page">{{ feature.title }}</span>
      </nav>
    </div>
    <section class="detail-hero wrap" aria-labelledby="feature-title">
      <div class="detail-hero-copy">
        <p class="feature-eyebrow">
          {{ group?.label }} <span aria-hidden="true">/</span>
          {{ feature.kicker }}
        </p>
        <h1 id="feature-title">{{ feature.title }}</h1>
        <p class="detail-tagline">{{ feature.tagline }}</p>
        <p class="detail-description">{{ feature.description }}</p>
        <ul class="detail-highlights">
          <li v-for="highlight in feature.highlights" :key="highlight">
            <svg aria-hidden="true"><use href="#i-check" /></svg>{{ highlight }}
          </li>
        </ul>
        <div class="detail-hero-actions">
          <a href="#getting-started" class="button button-blue"
            >開始使用 <svg aria-hidden="true"><use href="#i-arrow" /></svg></a
          ><a href="#download" class="detail-download-link"
            >下載 CK APP <svg aria-hidden="true"><use href="#i-up-right" /></svg
          ></a>
        </div>
      </div>
      <figure class="feature-preview native-feature-preview">
        <AppInterfacePreview :feature="feature" show-tabs />
        <figcaption>
          {{
            ["souvenirs", "dance-tickets"].includes(feature.slug)
              ? "App 內嵌網頁的載入畫面示意；商店內容由網站提供"
              : "依 CK APP iOS 介面製作 · 範例資料，非即時資訊"
          }}
        </figcaption>
      </figure>
    </section>

    <div class="detail-layout wrap">
      <aside class="feature-sidebar" aria-label="所有功能指南">
        <a :href="featuresHref" class="feature-sidebar-title"
          ><svg aria-hidden="true"><use href="#i-grid" /></svg>全部功能指南</a
        >
        <div
          v-for="item in guideGroups"
          :key="item.id"
          class="feature-sidebar-group"
        >
          <p>{{ item.label }}</p>
          <nav :aria-label="item.label">
            <a
              v-for="page in item.features"
              :key="page.slug"
              :href="featureHref(page.slug)"
              :aria-current="page.slug === feature.slug ? 'page' : undefined"
              ><svg aria-hidden="true"><use :href="`#${page.icon}`" /></svg
              >{{ page.title
              }}<span v-if="page.slug === feature.slug" aria-hidden="true"
                >↗</span
              ></a
            >
          </nav>
        </div>
        <a href="#download" class="feature-sidebar-download"
          >把好幫手裝進口袋
          <svg aria-hidden="true"><use href="#i-up-right" /></svg
        ></a>
      </aside>
      <article class="feature-article" aria-label="功能詳細說明">
        <details class="feature-mobile-nav">
          <summary>
            探索其他功能 <svg aria-hidden="true"><use href="#i-plus" /></svg>
          </summary>
          <div v-for="item in guideGroups" :key="item.id">
            <p>{{ item.label }}</p>
            <nav :aria-label="`${item.label}功能`">
              <a
                v-for="page in item.features"
                :key="page.slug"
                :href="featureHref(page.slug)"
                :aria-current="page.slug === feature.slug ? 'page' : undefined"
                >{{ page.title }}</a
              >
            </nav>
          </div>
        </details>
        <nav class="detail-toc" aria-label="本頁內容">
          <p>本頁內容</p>
          <div>
            <a
              v-for="section in feature.sections"
              :key="section.id"
              :href="`#detail-${section.id}`"
              >{{ section.title }}</a
            ><a href="#getting-started">開始使用</a
            ><a v-if="feature.tips.length" href="#feature-tips">使用小提醒</a
            ><a v-if="feature.faqs.length" href="#feature-faq">常見問題</a>
          </div>
        </nav>
        <section
          v-for="(section, index) in feature.sections"
          :id="`detail-${section.id}`"
          :key="section.id"
          class="detail-section"
          :aria-labelledby="`heading-${section.id}`"
        >
          <p class="feature-eyebrow">
            <span>{{ sectionNumber(index) }}</span> 功能詳解
          </p>
          <h2 :id="`heading-${section.id}`">{{ section.title }}</h2>
          <p class="detail-section-body">{{ section.body }}</p>
          <div class="detail-capabilities">
            <div
              v-for="point in section.points"
              :key="point.title"
              class="detail-capability"
            >
              <svg aria-hidden="true"><use href="#i-check" /></svg>
              <div>
                <h3>{{ point.title }}</h3>
                <p>{{ point.description }}</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="getting-started"
          class="detail-section detail-start"
          aria-labelledby="start-title"
        >
          <p class="feature-eyebrow">GET STARTED</p>
          <h2 id="start-title">跟著做，開始使用</h2>
          <p class="detail-entry">
            <svg aria-hidden="true"><use :href="`#${feature.icon}`" /></svg
            ><span><strong>在哪裡找到？</strong>{{ feature.entry }}</span>
          </p>
          <ol class="feature-steps">
            <li v-for="(step, index) in feature.steps" :key="step.title">
              <span class="feature-step-number" aria-hidden="true">{{
                sectionNumber(index)
              }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </section>
        <section
          v-if="feature.tips.length"
          id="feature-tips"
          class="detail-tips"
          aria-labelledby="tips-title"
        >
          <div class="detail-tips-heading">
            <svg aria-hidden="true"><use href="#i-sun" /></svg>
            <h2 id="tips-title">使用小提醒</h2>
          </div>
          <ul>
            <li v-for="tip in feature.tips" :key="tip">{{ tip }}</li>
          </ul>
        </section>
        <section
          v-if="feature.faqs.length"
          id="feature-faq"
          class="detail-section detail-faq"
          aria-labelledby="faq-title"
        >
          <p class="feature-eyebrow">GOOD TO KNOW</p>
          <h2 id="faq-title">你可能會想知道</h2>
          <div>
            <details v-for="faq in feature.faqs" :key="faq.question">
              <summary>
                {{ faq.question
                }}<svg aria-hidden="true"><use href="#i-plus" /></svg>
              </summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </section>
        <div v-if="feature.external?.length" class="detail-resources">
          <p>相關資源</p>
          <a
            v-for="link in feature.external"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            >{{ link.label }}
            <svg aria-hidden="true"><use href="#i-up-right" /></svg
            ><span class="feature-sr-only">（另開視窗）</span></a
          >
        </div>
        <section
          v-if="relatedFeatures.length"
          class="detail-related"
          aria-labelledby="related-title"
        >
          <p class="feature-eyebrow">BETTER TOGETHER</p>
          <h2 id="related-title">搭配使用，更加順手</h2>
          <div class="related-grid">
            <a
              v-for="page in relatedFeatures"
              :key="page.slug"
              :href="featureHref(page.slug)"
              ><svg aria-hidden="true"><use :href="`#${page.icon}`" /></svg>
              <h3>{{ page.title }}</h3>
              <p>{{ page.tagline }}</p>
              <span
                >看看這項功能
                <svg aria-hidden="true"><use href="#i-arrow" /></svg></span
            ></a>
          </div>
        </section>
        <a :href="featuresHref" class="detail-return"
          ><span aria-hidden="true">←</span> 回到全部功能指南</a
        >
      </article>
    </div>
  </main>
</template>
