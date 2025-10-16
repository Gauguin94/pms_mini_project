<template>
  <div class="p-4 space-y-4">
    <!-- 컨트롤 -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        <strong>채널</strong>
        <label v-for="ch in channels" :key="ch" class="flex items-center gap-1">
          <input type="checkbox" :value="ch" v-model="selected" />
          <span>Ch{{ ch }}</span>
        </label>
      </div>

      <div class="flex items-center gap-2">
        <strong>모드</strong>
        <select v-model="mode" @change="onModeChange" class="border rounded px-2 py-1">
          <option value="latest">최신(채널별)</option>
          <option value="common">공통시점 offset</option>
          <option value="ts">시점 선택(최근 20)</option>
        </select>
      </div>

      <div v-if="mode === 'common'" class="flex items-center gap-2">
        <span>offset</span>
        <select v-model.number="offset" @change="load" class="border rounded px-2 py-1">
          <option v-for="n in 20" :key="n" :value="n-1">{{ n-1 }}</option>
        </select>
      </div>

      <div v-if="mode === 'ts'" class="flex items-center gap-2">
        <span>시점</span>
        <select v-model="selectedTs" @change="load" class="border rounded px-2 py-1 min-w-[260px]">
          <option v-for="t in tsOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <small class="text-gray-500" v-if="hint">{{ hint }}</small>
      </div>

      <button class="border rounded px-3 py-1 bg-blue-600 text-white" @click="load">불러오기</button>
    </div>

    <!-- 차트 -->
    <SpectrumChart :data="chartData" />

    <div class="text-xs text-gray-500">
      {{ statusMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import SpectrumChart from '@/components/charts/SpectrumChart.vue'
import { getTimestamps, getByTs, getByRank, getByCommon, type SpectrumPoint } from '@/api/spectrum'

const channels = [1,2,3,4,5,6,7,8]   // 필요시 조정
const selected = ref<number[]>([1])  // 초기 선택

type Mode = 'latest' | 'common' | 'ts'
const mode = ref<Mode>('latest')

const offset = ref(0)
const tsOptions = ref<string[]>([])
const selectedTs = ref<string>('')
const hint = ref<string>('')

const chartData = ref<SpectrumPoint[]>([])
const statusMsg = ref('')

const fetchTsOptions = async () => {
  hint.value = ''
  statusMsg.value = '시점 목록 로딩 중...'
  if (selected.value.length === 0) { tsOptions.value = []; statusMsg.value='채널 미선택'; return }

  // 선택 채널들의 최근 20개(로컬 시간 문자열) 가져와 교집합(없으면 유니온)
  const lists = await Promise.all(selected.value.map(ch => getTimestamps(ch, 20, 'local')))
  let inter = lists[0]
  for (let i=1;i<lists.length;i++) inter = inter.filter(t => lists[i].includes(t))

  if (inter.length === 0) {
    const union = Array.from(new Set(lists.flat()))
      .sort((a,b) => a < b ? 1 : -1)
      .slice(0, 20)
    tsOptions.value = union
    hint.value = '공통 시점이 없어 유니온(최근 20개)으로 표시합니다.'
  } else {
    tsOptions.value = inter.slice(0, 20)
  }
  selectedTs.value = tsOptions.value[0] || ''
  statusMsg.value = `시점 ${tsOptions.value.length}개`
}

const load = async () => {
  statusMsg.value = '데이터 로딩 중...'
  if (selected.value.length === 0) { chartData.value = []; statusMsg.value='채널 미선택'; return }

  try {
    if (mode.value === 'latest') {
      chartData.value = await getByRank(selected.value, 0)   // 각 채널 최신
      statusMsg.value = chartData.value.length ? '각 채널 최신' : '데이터 없음'
      return
    }
    if (mode.value === 'common') {
      chartData.value = await getByCommon(selected.value, offset.value) // 공통시점 offset
      statusMsg.value = chartData.value.length ? `공통시점 offset=${offset.value}` : '공통 시점 없음'
      return
    }
    // mode === 'ts'
    if (!selectedTs.value) await fetchTsOptions()
    if (!selectedTs.value) { chartData.value = []; statusMsg.value='시점 없음'; return }
    chartData.value = await getByTs(selected.value, selectedTs.value) // 로컬 문자열 그대로 전달
    statusMsg.value = chartData.value.length ? `선택 시점: ${selectedTs.value}` : '선택 시점 데이터 없음'
  } catch (e: any) {
    statusMsg.value = `에러: ${e?.message ?? e}`
    chartData.value = []
  }
}

const onModeChange = async () => {
  if (mode.value === 'ts') await fetchTsOptions()
  await load()
}

onMounted(async () => {
  await fetchTsOptions()
  await load()
})

watch(selected, async () => {
  if (mode.value === 'ts') await fetchTsOptions()
  await load()
})
</script>

<style scoped>
.min-w-\[260px\]{min-width:260px}
</style>
