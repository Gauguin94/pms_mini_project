<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden"
  >
    <div class="layout-container flex h-full grow flex-col">
      <!-- Header Component -->
      <DashboardHeader />

      <!-- Main Content -->
      <main class="px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
        <div class="layout-content-container flex flex-col w-full max-w-6xl">
          <!-- Title -->
          <div class="flex flex-col gap-2 p-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-black dark:text-white text-3xl font-bold">
                  베어링 모니터링 대시보드
                </h1>
                <p class="text-black/60 dark:text-white/60 text-base font-normal leading-normal">
                  베어링 상태 및 예측 분석에 대한 실시간 정보입니다.
                </p>
              </div>
              <RefreshIndicator
                :is-refreshing="isRefreshing"
                :last-updated="lastUpdated"
                @refresh="fetchAiResults(500)"
              />
            </div>

            <!-- 에러 메시지 -->
            <div
              v-if="error"
              class="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3"
            >
              <span class="material-symbols-outlined text-red-500">error</span>
              <div class="flex-1">
                <p class="text-red-700 dark:text-red-300 font-medium">연결 오류</p>
                <p class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
                <p class="text-red-600 dark:text-red-400 text-xs mt-1">
                  백엔드 서버가 실행 중인지 확인하세요: http://localhost:8080
                </p>
              </div>
              <button
                @click="fetchAiResults(500)"
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                재시도
              </button>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <SummaryCard
              v-for="card in summaryCards"
              :key="card.label"
              :label="card.label"
              :value="card.value"
            />
          </div>

          <!-- Charts Section -->
          <h2 class="text-black dark:text-white text-2xl font-bold px-4 pb-3 pt-8">
            베어링 상태 개요
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-6">
            <!-- Chart 1: PMS 이상 탐지 -->
            <SensorSignalChart :time-labels="timeLabels" />

            <!-- Chart 2: 베어링 상태 분포 (Binary) -->
            <BinaryStateChart :minute-data="minuteData" :time-labels="timeLabels" />
          </div>

          <!-- Predictive Maintenance Section -->
          <h2 class="text-black dark:text-white text-2xl font-bold px-4 pb-3 pt-8">예지보전</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            <BearingStatusCard
              v-for="bearing in bearings"
              :key="bearing.id"
              :bearing-id="bearing.id"
              :status="bearing.status"
              :icon="bearing.icon"
              :status-class="bearing.statusClass"
              :icon-bg-class="bearing.iconBgClass"
              :icon-color-class="bearing.iconColorClass"
              :text-class="bearing.textClass"
            />
          </div>

          <!-- Retrain History Table -->
          <div class="flex flex-col gap-8 p-4">
            <RetrainTable :logs="retrainLogs" @view-log="handleViewLog" />

            <!-- Log Details -->
            <LogViewer :log-id="selectedLog" :limit="20" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import SummaryCard from '@/components/dashboard/SummaryCard.vue'
import SensorSignalChart from '@/components/dashboard/SensorSignalChart.vue'
import BinaryStateChart from '@/components/dashboard/BinaryStateChart.vue'
import BearingStatusCard from '@/components/dashboard/BearingStatusCard.vue'
import RetrainTable from '@/components/dashboard/RetrainTable.vue'
import LogViewer from '@/components/dashboard/LogViewer.vue'
import RefreshIndicator from '@/components/dashboard/RefreshIndicator.vue'
import { usePmsAiResult } from '@/composables/usePmsAiResult'
import { useBearingStatus } from '@/composables/useBearingStatus'

// PMS AI Result API 연결
const {
  aiResults,
  loading,
  error,
  fetchAiResults,
  getMinuteData,
  isRefreshing,
  lastUpdated,
  startAutoRefresh,
  stopAutoRefresh,
} = usePmsAiResult()

// 베어링 상태 관리
const { bearings } = useBearingStatus(aiResults)

// 컴포넌트 마운트 시 데이터 로드 및 자동 갱신 시작
onMounted(async () => {
  await fetchAiResults(500) // 초기 데이터 로드
  startAutoRefresh() // 1분마다 자동 갱신 시작
})

const minuteData = computed(() => getMinuteData(60))

// Time Labels (분 단위 - 5분 간격으로 표시)
const timeLabels = computed(() => {
  const labels = []
  for (let i = 0; i < 60; i += 5) {
    labels.push(`${i}분`)
  }
  return labels
})

// Summary Cards Data (실제 데이터 기반)
const summaryCards = computed(() => {
  const abnormalCount = aiResults.value.filter((r) => r.result === 1).length
  const totalCount = aiResults.value.length

  return [
    { label: '총 베어링 수', value: '1' }, // 단일 베어링
    { label: '활성 알림', value: abnormalCount.toString() },
    { label: '예측 수', value: totalCount.toString() },
  ]
})

// Retrain Logs Data
const retrainLogs = [
  {
    id: 1,
    startTime: '2025-10-15 04:40:33',
    endTime: '2025-10-15 04:40:34',
    status: 'Success',
    statusClass:
      'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300',
    duration: '1s',
    message: '재학습이 성공적으로 완료되었습니다.',
  },
  {
    id: 2,
    startTime: '2025-10-15 06:55:48',
    endTime: '2025-10-15 06:55:50',
    status: 'Success',
    statusClass:
      'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300',
    duration: '2s',
    message: '재학습이 성공적으로 완료되었습니다.',
  },
]

// Selected Log (초기값 null, 사용자가 "로그 보기" 버튼 클릭 시 설정됨)
const selectedLog = ref(null)

// Handle View Log
const handleViewLog = (logId) => {
  selectedLog.value = logId
}
</script>
