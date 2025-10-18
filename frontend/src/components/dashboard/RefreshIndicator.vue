<template>
  <div class="flex items-center gap-2 text-sm">
    <!-- 갱신 중 표시 -->
    <div v-if="isRefreshing" class="flex items-center gap-2 text-blue-600 dark:text-blue-400">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>갱신 중...</span>
    </div>

    <!-- 마지막 업데이트 시간 -->
    <div v-else-if="lastUpdated" class="text-black/60 dark:text-white/60">
      <span>마지막 업데이트: {{ formatTime(lastUpdated) }}</span>
    </div>

    <!-- 수동 갱신 버튼 -->
    <button
      @click="$emit('refresh')"
      :disabled="isRefreshing"
      class="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <span class="material-symbols-outlined text-base">refresh</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isRefreshing: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: null,
  },
})

defineEmits(['refresh'])

const formatTime = (date) => {
  if (!date) return ''
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
</script>
