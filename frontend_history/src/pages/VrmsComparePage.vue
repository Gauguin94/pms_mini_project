<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MultiLineChart from '@/components/charts/MultiLineChart.vue'
import { fetchVrmsLatest, type VrmsPoint } from '@/api/vrms'

const PALETTE: Record<number,string> = {
  1:'#4BC0C0', 2:'#FF6384', 3:'#9966FF', 4:'#FF9F40',
  5:'#36A2EB', 6:'#FFCD56', 7:'#8DD07F', 8:'#B07CCF'
}

const availableChannels = ref<number[]>([1,2,3,4,5,6,7,8])
const selected = ref<number[]>([1,2])
const limit = ref(200)
const loading = ref(false)
const series = ref<{label:string,color:string,data:{x:number,y:number}[]}[]>([])

function toggleChannel(ch:number) {
  selected.value = selected.value.includes(ch)
    ? selected.value.filter(v => v !== ch)
    : [...selected.value, ch]
}

async function load() {
  loading.value = true
  try {
    const tasks = selected.value.map(async ch => {
      let rows: VrmsPoint[] = await fetchVrmsLatest(ch, limit.value)
      rows = rows.sort((a,b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
      const data = rows.map(r => ({
        x: new Date(r.ts).getTime(),
        y: Number(r.vrms)
      })).filter(p => Number.isFinite(p.x) && Number.isFinite(p.y))
      return { label: `CH ${ch}`, color: PALETTE[ch] ?? '#999', data }
    })
    series.value = await Promise.all(tasks)
    // console.log(series.value.map(s => [s.label, s.data.length, s.data[0]]))
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="p-4 space-y-4" style="max-width:1100px;margin:0 auto">
    <div class="flex items-center gap-2 flex-wrap">
      <strong>Channels:</strong>
      <button
        v-for="ch in availableChannels"
        :key="ch"
        @click="toggleChannel(ch)"
        :style="{
          border:'1px solid #ccc',
          padding:'6px 10px',
          background: selected.includes(ch) ? (PALETTE[ch]||'#ddd') : 'transparent',
          color: selected.includes(ch) ? '#fff' : '#333',
          borderRadius:'10px',
          cursor:'pointer'
        }">
        {{ ch }}
      </button>

      <span class="mx-3"></span>
      <label>Limit</label>
      <input type="number" v-model.number="limit" min="10" max="5000" class="border px-2 py-1 w-24" />
      <button @click="load" class="border px-3 py-1">Load</button>
      <span v-if="loading" class="ml-2">Loading...</span>
    </div>

    <MultiLineChart :series="series" title="VRMS by Channel" />
  </section>
</template>


<!-- <template>
  <section style="padding:16px">
    <h1>VRMS Compare TEST</h1>
    <p>이 문구가 보이면 라우터/마운트는 정상입니다.</p>
  </section>
</template> -->
