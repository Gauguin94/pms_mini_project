<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale)

const props = defineProps<{
  labels: string[]
  values: number[]
  title?: string
}>()

// 동적 min/max 계산
const minY = props.values.length ? Math.min(...props.values) : 0
const maxY = props.values.length ? Math.max(...props.values) : 1
const margin = (maxY - minY) * 0.2  // 여유 30%

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { type: 'time', time: { unit: 'minute' } },
    y: {
      min: minY - margin,
      max: maxY + margin
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false }
  }
}
</script>

<template>
  <div style="height:320px">
  <Line
    :data="{
      labels: props.labels,
      datasets: [{
        label: props.title ?? 'VRMS',
        data: props.values,
        borderColor: 'rgba(75, 192, 192, 1)',       // 선 색상 (민트)
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 포인트/영역 색상 (투명도 적용)
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // 점 색상 (빨강)
        tension: 0.3  // 곡선 정도 (0=직선, 1=부드럽게)
      }]
    }"
    :options="options"
  />
  </div>
</template>
