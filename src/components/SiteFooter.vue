<script setup lang="ts">
import { featuresHref, homeHref } from "../data/features";

const campusLinks = [
  { title: "班聯會官網", url: "https://cksc.tw/" },
  { title: "校慶紀念品", url: "https://souvenir.cksc.tw/" },
  { title: "建中舞會購票", url: "https://tickets.cksc.tw/" },
  { title: "建北特約", url: "https://cktfgpromo.cksc.tw/" },
];
const developers = [
  { name: "Deigo Peng", role: "Creator" },
  { name: "Kimi Yang", role: "Creator" },
  { name: "Nathan Lee", role: "Maintainer" },
  { name: "Chris Sun", role: "Maintainer" },
  { name: "Jim Tang", role: "Maintainer" },
  { name: "Dong Chen", role: "Maintainer" },
];
</script>

<template>
  <footer class="footer wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a :href="homeHref" class="brand-word" aria-label="CK APP 首頁"
          >CK APP</a
        >
        <p>Made by students, for students.</p>
      </div>
      <div class="footer-group">
        <h2>功能與校園</h2>
        <a :href="featuresHref"
          >功能指南<svg aria-hidden="true"><use href="#i-arrow" /></svg
        ></a>
        <a
          v-for="link in campusLinks"
          :key="link.title"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.title
          }}<svg aria-hidden="true"><use href="#i-up-right" /></svg>
        </a>
      </div>
      <div class="footer-group">
        <h2>保持聯絡</h2>
        <a
          href="https://www.instagram.com/ckappofficial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CK APP Instagram<svg aria-hidden="true">
            <use href="#i-up-right" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/cksc.81st/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CKSC Instagram<svg aria-hidden="true"><use href="#i-up-right" /></svg>
        </a>
        <a href="mailto:ckappofficial@gmail.com"
          >聯絡我們<svg aria-hidden="true"><use href="#i-up-right" /></svg
        ></a>
      </div>
    </div>
    <div class="footer-team">
      <span>Developers</span>
      <ul>
        <li v-for="developer in developers" :key="developer.name">
          {{ developer.name }}<span>{{ developer.role }}</span>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <span>© 2026 CK APP Official. All rights reserved.</span
      ><span>Taipei Municipal Chien Kuo High School</span>
    </div>
  </footer>
</template>
