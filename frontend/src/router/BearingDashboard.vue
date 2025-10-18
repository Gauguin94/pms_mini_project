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
            <h1 class="text-black dark:text-white text-3xl font-bold">베어링 모니터링 대시보드</h1>
            <p class="text-black/60 dark:text-white/60 text-base font-normal leading-normal">
              베어링 상태 및 예측 분석에 대한 실시간 정보입니다.
            </p>
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
            <ChartCard title="PMS 이상 탐지 (점수) 또는 센서 신호값">
              <template #content>
                <div class="flex items-baseline gap-3">
                  <p class="text-black dark:text-white text-4xl font-bold">1800</p>
                  <p class="text-red-500 text-base font-medium">+5%</p>
                </div>
                <p class="text-black/60 dark:text-white/60 text-sm font-normal">지난 24시간</p>
                <div class="flex flex-1 gap-4 py-4 h-48">
                  <div
                    class="flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"
                  >
                    <p>2000</p>
                    <p>1000</p>
                    <p>0</p>
                    <p>-200</p>
                  </div>
                  <div class="flex-1 flex flex-col gap-4">
                    <svg
                      fill="none"
                      height="100%"
                      preserveAspectRatio="none"
                      viewBox="0 0 472 150"
                      width="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                        fill="url(#paint0_linear_chart)"
                      ></path>
                      <path
                        d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                        stroke="#1193d4"
                        stroke-linecap="round"
                        stroke-width="3"
                      ></path>
                      <defs>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="paint0_linear_chart"
                          x1="236"
                          x2="236"
                          y1="1"
                          y2="149"
                        >
                          <stop stop-color="#1193d4" stop-opacity="0.3"></stop>
                          <stop offset="1" stop-color="#1193d4" stop-opacity="0"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div class="flex justify-around">
                      <p
                        v-for="time in timeLabels"
                        :key="time"
                        class="text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"
                      >
                        {{ time }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </ChartCard>

            <!-- Chart 2: 베어링 상태 분포 (Binary) -->
            <ChartCard>
              <template #header>
                <div class="flex flex-col gap-1">
                  <p class="text-black dark:text-white text-lg font-medium">베어링 상태 분포</p>
                  <p class="text-black/60 dark:text-white/60 text-sm font-normal">
                    베어링 상태의 이진 시각화 (0: 정상, 1: 이상).
                  </p>
                </div>
              </template>
              <template #content>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <div class="h-4 w-4 rounded-sm bg-green-500/20 dark:bg-green-500/30"></div>
                    <p class="text-black/80 dark:text-white/80 text-sm">정상</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="relative h-4 w-4 flex items-center justify-center">
                      <div class="h-0.5 w-full bg-blue-600"></div>
                    </div>
                    <p class="text-black/80 dark:text-white/80 text-sm">이상</p>
                  </div>
                </div>
                <div class="flex flex-1 gap-4 pt-4 h-48">
                  <div
                    class="flex flex-col justify-between text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider h-full pb-8"
                  >
                    <p>1</p>
                    <p>0</p>
                  </div>
                  <div class="flex-1 flex flex-col gap-4">
                    <svg
                      class="flex-1 rounded-md bg-zinc-100 dark:bg-zinc-800"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 475 150"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 149L109.615 149L109.615 1L219.231 1L219.231 149L292.308 149L292.308 1L438.462 1L438.462 149L475 149"
                        stroke="#2563eb"
                        stroke-linecap="round"
                        stroke-width="3"
                      ></path>
                    </svg>
                    <div class="flex justify-around">
                      <p
                        v-for="time in timeLabels"
                        :key="time"
                        class="text-black/60 dark:text-white/60 text-xs font-bold uppercase tracking-wider"
                      >
                        {{ time }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </ChartCard>
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
import { ref } from 'vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import SummaryCard from '@/components/dashboard/SummaryCard.vue'
import ChartCard from '@/components/dashboard/ChartCard.vue'
import BearingStatusCard from '@/components/dashboard/BearingStatusCard.vue'
import RetrainTable from '@/components/dashboard/RetrainTable.vue'
import LogViewer from '@/components/dashboard/LogViewer.vue'

// Time Labels
const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

// Summary Cards Data
const summaryCards = [
  { label: '총 베어링 수', value: '1,250' },
  { label: '활성 알림', value: '15' },
  { label: '예측', value: '30' },
]

// Bearings Data
const bearings = [
  {
    id: 'B001',
    status: '정상',
    icon: 'check_circle',
    statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
    iconBgClass: 'bg-green-500/20',
    iconColorClass: 'text-green-500',
    textClass: 'text-sm text-green-700 dark:text-green-300',
  },
  {
    id: 'B002',
    status: '이상 감지',
    icon: 'warning',
    statusClass: 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20',
    iconBgClass: 'bg-yellow-500/20',
    iconColorClass: 'text-yellow-500',
    textClass: 'text-sm text-yellow-700 dark:text-yellow-300',
  },
  {
    id: 'B003',
    status: '수리 중',
    icon: 'build',
    statusClass: 'border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/20',
    iconBgClass: 'bg-blue-500/20',
    iconColorClass: 'text-blue-500',
    textClass: 'text-sm text-blue-700 dark:text-blue-300',
  },
  {
    id: 'B004',
    status: '위험',
    icon: 'error',
    statusClass: 'border-red-500/50 bg-red-500/10 dark:bg-red-500/20',
    iconBgClass: 'bg-red-500/20',
    iconColorClass: 'text-red-500',
    textClass: 'text-sm text-red-700 dark:text-red-300',
  },
  {
    id: 'B005',
    status: '정상',
    icon: 'check_circle',
    statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
    iconBgClass: 'bg-green-500/20',
    iconColorClass: 'text-green-500',
    textClass: 'text-sm text-green-700 dark:text-green-300',
  },
  {
    id: 'B006',
    status: '정상',
    icon: 'check_circle',
    statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
    iconBgClass: 'bg-green-500/20',
    iconColorClass: 'text-green-500',
    textClass: 'text-sm text-green-700 dark:text-green-300',
  },
  {
    id: 'B007',
    status: '이상 감지',
    icon: 'warning',
    statusClass: 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20',
    iconBgClass: 'bg-yellow-500/20',
    iconColorClass: 'text-yellow-500',
    textClass: 'text-sm text-yellow-700 dark:text-yellow-300',
  },
  {
    id: 'B008',
    status: '정상',
    icon: 'check_circle',
    statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
    iconBgClass: 'bg-green-500/20',
    iconColorClass: 'text-green-500',
    textClass: 'text-sm text-green-700 dark:text-green-300',
  },
]

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
