<template>
  <div class="page">
    <h1 class="title">SKALA Factory</h1>

    <div class="grid">
      <!-- Bearing 1 -->
      <div class="card">
        <div class="bearing-label">Bearing #1</div>
        <img
          src="@/assets/bearing.png"
          :class="['bearing-img', { 'abnormal': bearingStatus[0] === 'abnormal' }]"
        />
        <div class="channel-label">Channel 1, 2</div>
      </div>

      <!-- Bearing 2 -->
      <div class="card">
        <div class="bearing-label">Bearing #2</div>
        <img
          src="@/assets/bearing.png"
          :class="['bearing-img', { 'abnormal': bearingStatus[1] === 'abnormal' }]"
        />
        <div class="channel-label">Channel 3, 4</div>
      </div>

      <!-- Bearing 3 -->
      <div class="card">
        <div class="bearing-label">Bearing #3</div>
        <img
          src="@/assets/bearing.png"
          :class="['bearing-img', { 'abnormal': bearingStatus[2] === 'abnormal' }]"
        />
        <div class="channel-label">Channel 5, 6</div>
      </div>

      <!-- Bearing 4 -->
      <div class="card">
        <div class="bearing-label">Bearing #4</div>
        <img
          src="@/assets/bearing.png"
          :class="['bearing-img', { 'abnormal': bearingStatus[3] === 'abnormal' }]"
        />
        <div class="channel-label">Channel 7, 8</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 나중에 AI 결과로 업데이트할 상태 (지금은 전부 normal)
const bearingStatus = ref<( 'normal' | 'abnormal')[]>([
  'normal', 'normal', 'normal', 'normal'
])
</script>

<style scoped>
.page { padding: 24px; }
.title { font-size: 20px; font-weight: 700; margin-bottom: 16px; }

/* 2x2 그리드 */
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

/* Bearing 그림 */
.bearing-img {
  width: 64px !important;
  height: 64px !important;
  object-fit: contain;
  display: block;
  margin: 4px 0;
}

/* Bearing 번호 라벨 (위) */
.bearing-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

/* 채널 라벨 (아래) */
.channel-label {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

/* 이상 상태일 때 빨강 느낌 */
.bearing-img.abnormal {
  filter: hue-rotate(-45deg) saturate(200%);
}
</style>
