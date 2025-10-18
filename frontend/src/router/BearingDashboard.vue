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
            <LogViewer :log-id="selectedLog" :log-lines="logDetails" />
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

console.log(bearings.value)

// 컴포넌트 마운트 시 데이터 로드 및 자동 갱신 시작
onMounted(async () => {
  await fetchAiResults(500) // 초기 데이터 로드
  startAutoRefresh() // 1분마다 자동 갱신 시작
})

// 컴포넌트 언마운트 시 자동 갱신 중지 (자동으로 처리됨)

// 분 단위 데이터 가져오기 (60분)
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
  console.log(totalCount)

  return [
    { label: '총 베어링 수', value: '1' }, // 단일 베어링
    { label: '활성 알림', value: abnormalCount.toString() },
    { label: '예측 수', value: totalCount.toString() },
  ]
})

// Retrain Logs Data
const retrainLogs = [
  {
    id: 'run-20230521-1',
    startTime: '2023-05-21 10:00:00',
    endTime: '2023-05-21 10:15:23',
    status: 'Success',
    statusClass:
      'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300',
    duration: '15m 23s',
    message: '재학습이 성공적으로 완료되었습니다.',
  },
  {
    id: 'run-20230520-1',
    startTime: '2023-05-20 14:30:00',
    endTime: '2023-05-20 14:40:10',
    status: 'Failed',
    statusClass:
      'inline-flex items-center rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-500/20 dark:text-red-300',
    duration: '10m 10s',
    message: '데이터 전처리 중 오류가 발생했습니다.',
  },
  {
    id: 'run-20230519-2',
    startTime: '2023-05-19 09:00:00',
    endTime: '2023-05-19 09:20:05',
    status: 'Success',
    statusClass:
      'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/20 dark:text-green-300',
    duration: '20m 5s',
    message: '재학습이 성공적으로 완료되었습니다.',
  },
]

// Selected Log
const selectedLog = ref('run-20230520-1')

// Log Details
const logDetails = [
  '<span class="text-gray-500">[2023-05-20 14:30:00]</span> <span class="text-blue-400">[정보]</span> run-20230520-1에 대한 재학습 프로세스를 시작합니다.',
  '<span class="text-gray-500">[2023-05-20 14:30:05]</span> <span class="text-blue-400">[정보]</span> 데이터셋을 로드하는 중...',
  '<span class="text-gray-500">[2023-05-20 14:32:15]</span> <span class="text-blue-400">[정보]</span> 데이터셋을 성공적으로 로드했습니다.',
  '<span class="text-gray-500">[2023-05-20 14:32:20]</span> <span class="text-blue-400">[정보]</span> 데이터 전처리를 시작합니다.',
  '<span class="text-gray-500">[2023-05-20 14:35:50]</span> <span class="text-yellow-400">[경고]</span> sensor_data_B002에서 누락된 값을 발견했습니다. 평균값으로 대체합니다.',
  '<span class="text-gray-500">[2023-05-20 14:40:05]</span> <span class="text-red-400">[오류]</span> 전처리 단계에서 치명적인 오류 발생: \'temperature\' 특성에 대한 데이터 유형이 호환되지 않습니다. 예상 유형: float, 실제 유형: string.',
  '<span class="text-gray-500">[2023-05-20 14:40:10]</span> <span class="text-red-400">[오류]</span> 재학습 프로세스가 실패했습니다.',
]

// Handle View Log
const handleViewLog = (logId) => {
  selectedLog.value = logId
}
</script>
