<template>
  <ChartCard title="RMS 이상 탐지 (점수) 또는 센서 신호값">
    <template #content>
      <div class="flex items-baseline gap-3">
        <p class="text-black dark:text-white text-4xl font-bold">1800</p>
        <p class="text-red-500 text-base font-medium">+5%</p>
      </div>
      <p class="text-black/60 dark:text-white/60 text-sm font-normal">지난 24시간</p>
      <div class="flex flex-1 gap-4 py-4 h-48">
        <div
          class="flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"
        >
          <p>3</p>
          <p>1</p>
          <p>-1</p>
          <p>-3</p>
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <svg
            fill="none"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 472 150"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="chartPathFilled" fill="url(#paint0_linear_chart)"></path>
            <path :d="chartPath" stroke="#1193d4" stroke-linecap="round" stroke-width="3"></path>
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="paint0_linear_chart"
                x1="236"
                x2="236"
                y1="1"
                y2="149"
              >
                <stop stop-color="#1193d4" stop-opacity="0.3"></stop>
                <stop offset="1" stop-color="#1193d4" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div class="flex justify-around">
            <p
              v-for="time in timeLabels"
              :key="time"
              class="text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"
            >
              {{ time }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </ChartCard>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import ChartCard from './ChartCard.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'

const { realtimeData, loading, fetchRealtimeData, getTimeRmsValues } = useRealtimeData()

defineProps({
  timeLabels: {
    type: Array,
    required: true,
  },
})

// 데이터 가져오기 및 자동 갱신
onMounted(async () => {
  await fetchRealtimeData(50)
  // 1분마다 자동 갱신
  setInterval(() => fetchRealtimeData(50), 60000)
})

// time_rms 값을 SVG path로 변환
// Y축 범위: -3 ~ 3 (총 6)
// SVG 높이: 150px
const chartPath = computed(() => {
  const values = getTimeRmsValues()
  if (values.length === 0) return 'M0 75 L472 75' // 기본 중앙선

  const yScale = (value) => {
    // value가 3일 때 y=0, -3일 때 y=150
    const normalized = (3 - value) / 6
    return Math.max(0, Math.min(150, normalized * 150))
  }

  const step = 472 / Math.max(1, values.length - 1)
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${yScale(v)}`).join(' ')
})

// 채워진 영역을 위한 path (아래쪽 닫힌 path)
const chartPathFilled = computed(() => {
  const values = getTimeRmsValues()
  if (values.length === 0) return 'M0 75 L472 75 L472 150 L0 150 Z'

  const yScale = (value) => {
    const normalized = (3 - value) / 6
    return Math.max(0, Math.min(150, normalized * 150))
  }

  const step = 472 / Math.max(1, values.length - 1)
  const linePath = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${yScale(v)}`).join(' ')
  return `${linePath}V150H0V${yScale(values[0])}Z`
})
</script>
