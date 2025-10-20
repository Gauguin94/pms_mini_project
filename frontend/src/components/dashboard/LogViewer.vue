<template>
  <div v-if="logId" class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h2 class="text-black dark:text-white text-2xl font-bold">로그 #{{ logId }}</h2>
      <button
        @click="refreshLogs"
        :disabled="loading"
        class="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors disabled:opacity-50"
      >
        {{ loading ? '로딩 중...' : '새로고침' }}
      </button>
    </div>

    <div class="rounded-lg border border-primary/20 dark:border-primary/30 bg-zinc-900 p-4">
      <div class="h-64 overflow-y-auto font-mono text-sm text-white">
        <div v-if="loading && logs.length === 0" class="text-gray-400">로그를 불러오는 중...</div>
        <div v-else-if="error" class="text-red-400">{{ error }}</div>
        <div v-else-if="logs.length === 0" class="text-gray-400">표시할 로그가 없습니다.</div>
        <div v-else>
          <p
            v-for="log in logs"
            :key="`${log.seq}-${log.ts}`"
            :class="{
              'text-red-400': log.level === 'ERROR',
              'text-yellow-400': log.level === 'WARN',
              'text-white': log.level === 'INFO',
            }"
          >
            <span class="text-gray-500">[{{ formatTime(log.ts) }}]</span>
            <span :class="levelClass(log.level)">[{{ log.level }}]</span>
            {{ log.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { retrainLogApi } from '@/services/api'

const props = defineProps({
  logId: {
    type: [String, Number],
    default: null,
  },
  limit: {
    type: Number,
    default: 200,
  },
})

const logs = ref([])
const loading = ref(false)
const error = ref(null)

const fetchLogs = async () => {
  if (!props.logId) return

  loading.value = true
  error.value = null

  try {
    const data = await retrainLogApi.getLogDetails(props.logId, props.limit)
    logs.value = data.sort((a, b) => a.seq - b.seq)
    console.log(`로그 ${data.length}개 로드 완료 (logId: ${props.logId})`)
  } catch (err) {
    error.value = err.message
    console.error('재학습 로그 로드 실패:', err)
  } finally {
    loading.value = false
  }
}

const refreshLogs = () => {
  fetchLogs()
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp.replace(' ', 'T'))
  return date.toLocaleString('ko-KR', { hour12: false })
}

const levelClass = (level) => {
  switch (level) {
    case 'ERROR':
      return 'text-red-400 font-bold'
    case 'WARN':
      return 'text-yellow-400'
    case 'INFO':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
}

watch(
  () => props.logId,
  (newLogId) => {
    if (newLogId) {
      fetchLogs()
    } else {
      logs.value = []
    }
  },
  { immediate: true },
)
</script>
