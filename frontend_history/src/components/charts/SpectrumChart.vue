<template>
  <div ref="chartRef" style="width:100%;height:520px;"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { SpectrumPoint } from '@/api/spectrum'

const props = defineProps<{ data: SpectrumPoint[] }>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const render = () => {
  if (!chart && chartRef.value) chart = echarts.init(chartRef.value)
  if (!chart) return

  const series = (props.data || []).map(p => ({
    name: `Ch${p.channelId}`,
    type: 'line',
    showSymbol: false,
    sampling: 'lttb',
    data: p.freq.map((f, i) => [f, p.amplitude[i]])
  }))

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { top: 0 },
    grid: { left: 60, right: 20, bottom: 40, top: 40 },
    xAxis: { type: 'value', name: 'Hz' },
    yAxis: { type: 'value', name: 'Amplitude', scale: true },
    series
  }, true)
}

const handleResize = () => chart?.resize()

onMounted(() => {
  render()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose(); chart = null
})

watch(() => props.data, render, { deep: true })
</script>
