<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import VrmsChart from '@/components/charts/VrmsChart.vue'
import { fetchVrmsLatest, type VrmsPoint } from '@/api/vrms'

const channelId = ref<number>(1)
const limit = ref<number>(200)
const loading = ref(false)
const points = ref<VrmsPoint[]>([])

async function load() {
  loading.value = true
  try {
    points.value = await fetchVrmsLatest(channelId.value, limit.value)
  } finally {
    loading.value = false
  }
}

const labels = ref<string[]>([])
const values = ref<number[]>([])
watch(points, () => {
  labels.value = points.value.map(p => p.ts)
  values.value = points.value.map(p => p.vrms)
})

onMounted(load)
</script>

<template>
  <section class="p-4 space-y-4">
    <div class="flex items-center gap-3">
      <label>Channel</label>
      <input type="number" v-model.number="channelId" min="1" class="border px-2 py-1 w-24" />
      <label>Limit</label>
      <input type="number" v-model.number="limit" min="1" max="5000" class="border px-2 py-1 w-28" />
      <button @click="load" class="border px-3 py-1">Load</button>
      <span v-if="loading">Loading...</span>
    </div>

    <VrmsChart :labels="labels" :values="values" title="VRMS (mm/s)" />
  </section>
</template>

<style scoped>
section { max-width: 1000px; margin: 0 auto; }
</style>
