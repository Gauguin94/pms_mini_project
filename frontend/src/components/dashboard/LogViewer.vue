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
          <p
            v-for="log in logs"
            :key="log.id"
            :class="{
              'text-red-400': log.level === 'ERROR',
              'text-yellow-400': log.level === 'WARN',
              'text-white': log.level === 'INFO',
            }"
          >
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
import { ref, watch, onMounted } from 'vue'
import { retrainLogDetailApi } from '@/services/api'

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

const logs = ref([])
const loading = ref(false)
const error = ref(null)

/**
 * 로그 데이터 가져오기
 */
const fetchLogs = async () => {
  if (!props.logId) return

  loading.value = true
  error.value = null

  try {
    const data = await retrainLogDetailApi.getLatestDetailsByLogId(props.logId, props.limit)
    // 최신순으로 받아오므로 seq 순서대로 정렬
    logs.value = data.sort((a, b) => a.seq - b.seq)
    console.log(`✅ 로그 ${data.length}개 로드 완료 (logId: ${props.logId})`)
  } catch (err) {
    error.value = err.message
    console.error('❌ 로그 로드 실패:', err)
  } finally {
    loading.value = false
  }
}

/**
 * 로그 새로고침
 */
const refreshLogs = () => {
  fetchLogs()
}

/**
 * 시간 포맷팅
 */
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString('ko-KR', { hour12: false })
}

/**

// logId 변경 시 로그 다시 가져오기
watch(() => props.logId, fetchLogs, { immediate: true })

// 컴포넌트 마운트 시 로그 가져오기
onMounted(() => {
  if (props.logId) {
    fetchLogs()
  }
})

 * 로그 레벨에 따른 CSS 클래스
 */
const getLevelClass = (level) => {
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
</script>
