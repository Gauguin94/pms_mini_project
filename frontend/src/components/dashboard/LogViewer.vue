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
        <div v-else-if="logs.length === 0" class="text-gray-400">로그가 없습니다.</div>
        <div v-else>
          <p v-for="log in logs" :key="log.id" :class="getTextColorClass(log.level)">
            <span class="text-gray-500">[{{ formatTime(log.ts) }}]</span>
            <span :class="getLevelClass(log.level)">[{{ log.level }}]</span>
            {{ log.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRetrainLogDetail } from '@/composables/useRetrainLogDetail'

const props = defineProps({
  logId: {
    type: [String, Number],
    default: null,
  },
  limit: {
    type: Number,
    default: 20,
  },
})

// Composable 사용
const {
  logs,
  loading,
  error,
  fetchLatestLogsByLogId,
  formatTime,
  getLevelClass,
  getTextColorClass,
} = useRetrainLogDetail()

console.log('logs', logs.value)
/**
 * 로그 데이터 가져오기
 */
const fetchLogs = () => {
  console.log('fetchLogs 호출됨, logId:', props.logId, 'limit:', props.limit)
  if (!props.logId) {
    console.log('❌ logId가 없어서 로그를 가져오지 않음')
    return
  }
  fetchLatestLogsByLogId(props.logId, props.limit)
}

/**
 * 로그 새로고침
 */
const refreshLogs = () => {
  fetchLogs()
}

// logId 변경 시 로그 다시 가져오기
watch(
  () => props.logId,
  (newLogId, oldLogId) => {
    console.log('logId 변경 감지:', oldLogId, '->', newLogId)
    if (newLogId) {
      fetchLogs()
    }
  },
  { immediate: true },
)
</script>
