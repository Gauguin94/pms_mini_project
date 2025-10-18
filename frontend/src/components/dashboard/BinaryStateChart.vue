<template>
  <ChartCard>
    <template #header>
      <div class="flex flex-col gap-1">
        <p class="text-black dark:text-white text-lg font-medium">베어링 상태 분포</p>
        <p class="text-black/60 dark:text-white/60 text-sm font-normal">
          베어링 상태의 이진 시각화 (0: 정상, 1: 이상).
        </p>
      </div>
    </template>
    <template #content>
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-sm bg-green-500/20 dark:bg-green-500/30"></div>
          <p class="text-black/80 dark:text-white/80 text-sm">정상</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative h-4 w-4 flex items-center justify-center">
            <div class="h-0.5 w-full bg-blue-600"></div>
          </div>
          <p class="text-black/80 dark:text-white/80 text-sm">이상</p>
        </div>
      </div>
      <div class="flex flex-1 gap-4 pt-4 h-48">
        <div
          class="flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider h-full pb-8"
        >
          <p>1</p>
          <p>0</p>
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <svg
            class="flex-1 rounded-md bg-zinc-100 dark:bg-zinc-800"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 475 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="svgPath" stroke="#2563eb" stroke-linecap="round" stroke-width="3"></path>
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
import { computed } from 'vue'
import ChartCard from './ChartCard.vue'

const props = defineProps({
  minuteData: {
    type: Array,
    required: true,
  },
  timeLabels: {
    type: Array,
    required: true,
  },
})

// SVG Path 생성 함수 (분 단위 데이터를 SVG path로 변환)
const svgPath = computed(() => {
  const data = props.minuteData
  if (!data || data.length === 0) return ''

  const width = 475
  const height = 150
  const stepX = width / (data.length - 1)

  let path = ''
  data.forEach((point, index) => {
    const x = index * stepX
    const y = point.value === 1 ? 1 : height - 1 // 1이면 위(이상), 0이면 아래(정상)

    if (index === 0) {
      path += `M0 ${y}`
    } else {
      // 계단식 라인 생성
      const prevX = (index - 1) * stepX
      path += `L${prevX} ${y}L${x} ${y}`
    }
  })

  return path
})
</script>
