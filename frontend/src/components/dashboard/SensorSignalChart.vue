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
          <p v-for="tick in yTickLabels" :key="tick">{{ tick }}</p>
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
import { onMounted, onBeforeUnmount, computed } from 'vue'
import ChartCard from './ChartCard.vue'
import { useRealtimeData } from '@/composables/useRealtimeData'

const { fetchRealtimeData, getTimeRmsValues } = useRealtimeData()

defineProps({
  timeLabels: {
    type: Array,
    required: true,
  },
})

let refreshTimer = null

onMounted(async () => {
  await fetchRealtimeData(50)
  refreshTimer = setInterval(() => fetchRealtimeData(50), 60000)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
})

const CHART_WIDTH = 472
const CHART_HEIGHT = 150
const Y_TICK_COUNT = 4

const chartValues = computed(() =>
  getTimeRmsValues().filter((value) => Number.isFinite(value))
)

const chartScale = computed(() => {
  const values = chartValues.value
  if (!values.length) {
    const scale = () => CHART_HEIGHT / 2
    return { min: -1, max: 1, scale }
  }

  let min = Math.min(...values)
  let max = Math.max(...values)

  if (min === max) {
    min -= 1
    max += 1
  }

  const padding = (max - min) * 0.1 || 1
  min -= padding
  max += padding

  const range = max - min

  const scale = (value) => {
    const clamped = Math.max(min, Math.min(max, value))
    const normalized = (max - clamped) / range
    return normalized * CHART_HEIGHT
  }

  return { min, max, scale }
})

const yTickLabels = computed(() => {
  const { min, max } = chartScale.value
  const step = Y_TICK_COUNT > 1 ? (max - min) / (Y_TICK_COUNT - 1) : 0

  return Array.from({ length: Y_TICK_COUNT }, (_, index) => {
    const value = max - step * index
    if (!Number.isFinite(value)) return value
    return Math.round(value).toLocaleString()
  })
})

const chartPath = computed(() => {
  const values = chartValues.value
  if (values.length === 0) {
    const mid = CHART_HEIGHT / 2
    return `M0 ${mid} L${CHART_WIDTH} ${mid}`
  }

  const { scale } = chartScale.value
  const step = CHART_WIDTH / Math.max(1, values.length - 1)

  return values.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${scale(v)}`).join(' ')
})

const chartPathFilled = computed(() => {
  const values = chartValues.value
  if (values.length === 0) {
    const mid = CHART_HEIGHT / 2
    return `M0 ${mid} L${CHART_WIDTH} ${mid} L${CHART_WIDTH} ${CHART_HEIGHT} L0 ${CHART_HEIGHT} Z`
  }

  const { scale } = chartScale.value
  const step = CHART_WIDTH / Math.max(1, values.length - 1)
  const linePath = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${scale(v)}`)
    .join(' ')

  return `${linePath}V${CHART_HEIGHT}H0V${scale(values[0])}Z`
})
</script>
