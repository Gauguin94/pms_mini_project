<template>
  <ChartCard title="PMS 이상 탐지 (점수) 또는 센서 신호값">
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
          <p>2000</p>
          <p>1000</p>
          <p>0</p>
          <p>-200</p>
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
            <path
              d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
              fill="url(#paint0_linear_chart)"
            ></path>
            <path
              d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
              stroke="#1193d4"
              stroke-linecap="round"
              stroke-width="3"
            ></path>
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
import ChartCard from './ChartCard.vue'

defineProps({
  timeLabels: {
    type: Array,
    required: true,
  },
})
</script>
