<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, TimeScale)

type XY = { x: number, y: number }
type Series = { label: string, color?: string, data: XY[] }

const props = defineProps<{ series: Series[]; title?: string }>()

const ys = computed(() =>
  props.series.flatMap(s => s.data.map(p => Number(p.y))).filter(v => Number.isFinite(v))
)
const minY = computed(() => (ys.value.length ? Math.min(...ys.value) : 0))
const maxY = computed(() => (ys.value.length ? Math.max(...ys.value) : 1))
const margin = computed(() => ((maxY.value - minY.value) || 1) * 0.1)

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  parsing: false,
  elements: { point: { radius: 0 } },
  scales: {
    x: { type: 'time', time: { tooltipFormat: 'yyyy-MM-dd HH:mm:ss' } },
    y: { min: minY.value - margin.value, max: maxY.value + margin.value }
  },
  plugins: {
    legend: { display: true, position: 'bottom' },
    tooltip: { mode: 'nearest', intersect: false }
  },
  spanGaps: true
}))
</script>

<template>
  <div style="height:360px">
    <Line
      :data="{
        datasets: series.map(s => ({
          label: s.label,
          data: s.data,            // [{x: ms, y: number}]
          borderColor: s.color,
          backgroundColor: s.color,
          borderWidth: 2,
          tension: 0.25
        }))
      }"
      :options="options"
    />
  </div>
</template>

