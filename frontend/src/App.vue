<template>
  <nav style="padding:8px; border-bottom:1px solid #eee">
    <router-link to="/" style="margin-right:12px">home</router-link>
    <router-link to="/vrms/compare" style="margin-right:12px">VRMS Compare</router-link>
    <router-link to="/spectrum">Spectrum</router-link>
  </nav>

  <!-- 이 줄이 반드시 있어야 라우트가 렌더됨 -->
  <router-view />
</template>

<script setup lang="ts"></script>