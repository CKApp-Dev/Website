<script setup lang="ts">
import {homeHref,featuresHref} from '../data/features'
</script>
<template>
  <footer class="footer wrap">
    <div class="footer-inner">
      <div class="footer-brand">
        <a class="brand-word" :href="homeHref" aria-label="回到頁首"> CK APP ↗ </a>
        <small> 你的校園助理 </small>
      </div>
      <div class="footer-links"><a :href="featuresHref">完整功能</a>
        <a href="https://cksc.tw/" target="_blank" rel="noopener noreferrer">
          班聯會官網 ↗
        </a>
        <a
          href="https://www.instagram.com/ckappofficial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CK APP Instagram ↗
        </a>
        <a href="https://www.instagram.com/cksc.81st/" target="_blank" rel="noopener noreferrer">
          CKSC Instagram ↗
        </a>
        <a href="https://souvenir.cksc.tw/" target="_blank" rel="noopener noreferrer">
          校慶紀念品 ↗
        </a>
        <a href="https://tickets.cksc.tw/" target="_blank" rel="noopener noreferrer">
          建中舞會購票 ↗
        </a>
        <a href="https://cktfgpromo.cksc.tw/" target="_blank" rel="noopener noreferrer">
          建北特約 ↗
        </a>
        <a href="mailto:ckappofficial@gmail.com"> 聯絡我們 ↗ </a>
      </div>
    </div>
    <div class="copyright">
      <span> © 2026 CK APP Official. Made by students, for students. </span>
      <span class="footer-location"> TAIPEI, TAIWAN · CKHS </span>
      <span class="footer-credits">Developers: Deigo Peng(Creator), Kimi Yang(Creator), Nathan Lee(Maintainer), Chris Sun(Maintainer), Dong Chen(Maintainer) </span>
    </div>
  </footer>
</template>
