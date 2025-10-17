<template>
  <div
    class="font-display bg-background-light dark:bg-background-dark text-black dark:text-white min-h-screen"
  >
    <div class="layout-container flex flex-col min-h-screen">
      <header
        class="flex items-center justify-between border-b border-primary/20 dark:border-primary/30 px-10 py-3"
      >
        <div class="flex items-center gap-4">
          <div class="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">베어링 인사이트</h2>
        </div>
        <div class="flex flex-1 justify-end gap-2">
          <nav class="flex items-center gap-2">
            <a
              v-for="link in navigation"
              :key="link.label"
              class="text-sm font-medium leading-normal px-4 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
              href="#"
            >
              {{ link.label }}
            </a>
          </nav>
          <div class="flex items-center gap-4 pl-6">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-primary/10 dark:hover:bg-primary/20"
              aria-label="알림"
              title="알림"
            >
              <div data-icon="Bell" data-size="20px" data-weight="regular">
                <svg
                  fill="currentColor"
                  height="20"
                  viewBox="0 0 256 256"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                  />
                </svg>
              </div>
            </button>
            <div
              class="bg-center bg-no-repeat bg-cover rounded-full size-10"
              aria-label="프로필 이미지"
              title="프로필"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-1glDTGDlDnipO_QpEBQpBvrnKv9pxqMKc_4oK5p-XbPJ9OpSupYuezF9I7HikDcluR8U2FFx_o1vjr4Emd8ySjtqRAAKg-PP9lh9nV5xEHwQMZ_Ct9R8HXwxE9DCE6Uz61qGnm2hfSwZV-f70_vDHvvKysIBd1dtwYZTvQdIPHiPmxjJbpgogYjKMs3bnegoZGF6wItP-EmtDAm1ib8CYY47rz16rmcslR0Wv8GurmJDV93XTiEMVoXPWGyI4NZ04pUty0tnc2I');
              "
            />
          </div>
        </div>
      </header>

      <main class="flex flex-1 justify-center px-10 py-8 md:px-20 lg:px-40">
        <div class="layout-content-container flex w-full max-w-6xl flex-col">
          <div class="flex flex-col gap-2 p-4">
            <h1 class="text-3xl font-bold">베어링 모니터링 대시보드</h1>
            <p class="text-base font-normal text-black/60 dark:text-white/60">
              베어링 상태와 예지 보전 지표를 실시간으로 확인합니다.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="card in summaryCards"
              :key="card.label"
              class="flex flex-col gap-2 rounded-xl bg-primary/10 p-6 dark:bg-primary/20"
            >
              <p class="text-base font-medium text-black/80 dark:text-white/80">{{ card.label }}</p>
              <p class="text-3xl font-bold">{{ card.value }}</p>
            </div>
          </div>

          <h2 class="px-4 pb-3 pt-8 text-2xl font-bold">베어링 상태 개요</h2>

          <div class="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-2">
            <!-- (3) PMS 결과: 1시간 단위 선그래프 -->
            <div
              class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light p-6 dark:border-primary/30 dark:bg-background-dark"
            >
              <p class="text-lg font-medium">PMS 결과 (1시간 단위)</p>
              <p class="text-sm font-normal text-black/60 dark:text-white/60">최근 12시간 기준</p>

              <div class="relative h-48 w-full">
                <svg
                  :viewBox="`0 0 ${chartConfig.width} ${chartConfig.height}`"
                  preserveAspectRatio="none"
                  class="size-full"
                >
                  <defs>
                    <linearGradient id="pmsStroke" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#3b82f6" />
                      <stop offset="100%" stop-color="#60a5fa" />
                    </linearGradient>
                  </defs>
                  <polyline
                    :points="pmsSeries.points"
                    fill="none"
                    stroke="url(#pmsStroke)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                  />
                  <g>
                    <circle
                      v-for="pt in pmsSeries.coordinates"
                      :key="`pms-${pt.label}`"
                      :cx="pt.x"
                      :cy="pt.y"
                      r="3"
                      class="drop-shadow-sm"
                      fill="#3b82f6"
                    />
                  </g>
                </svg>
                <div
                  class="absolute inset-x-0 bottom-0 flex justify-between px-2 text-xs text-black/50 dark:text-white/50"
                >
                  <span v-for="pt in pmsHourlyData" :key="`pms-label-${pt.label}`">
                    {{ pt.label }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div
                  class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20"
                >
                  <span class="size-2.5 rounded-full" style="background: #3b82f6"></span>
                  <span class="font-semibold text-black/80 dark:text-white/80">PMS 점수(%)</span>
                  <span class="ml-auto text-black/60 dark:text-white/60">{{ latestPms }}%</span>
                </div>
                <div
                  class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20"
                >
                  <span class="font-semibold text-black/80 dark:text-white/80">최신 시각</span>
                  <span class="ml-auto text-black/60 dark:text-white/60">{{ latestPmsLabel }}</span>
                </div>
              </div>
            </div>

            <!-- (4) 이상 신호 탐지: 0/1, 1시간 단위 스퀘어(계단) 선그래프 -->
            <div
              class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light p-6 dark:border-primary/30 dark:bg-background-dark"
            >
              <p class="text-lg font-medium">이상 신호 탐지 (0/1, 1시간 단위)</p>
              <p class="text-sm font-normal text-black/60 dark:text-white/60">최근 12시간 기준</p>

              <div class="relative h-48 w-full">
                <svg
                  :viewBox="`0 0 ${chartConfig.width} ${chartConfig.height}`"
                  preserveAspectRatio="none"
                  class="size-full"
                >
                  <defs>
                    <linearGradient id="anomalyStroke" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#ef4444" />
                      <stop offset="100%" stop-color="#f97316" />
                    </linearGradient>
                  </defs>

                  <!-- 스퀘어(계단) 파형: 선만 표시 -->
                  <polyline
                    :points="anomalySeries.points"
                    fill="none"
                    stroke="url(#anomalyStroke)"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-width="3"
                    shape-rendering="crispEdges"
                  />

                  <!-- 좌측 0/1 가이드 라인(옵션) -->
                  <line
                    x1="0"
                    :y1="chartConfig.height"
                    x2="8"
                    :y2="chartConfig.height"
                    stroke="currentColor"
                    class="opacity-20"
                  />
                  <line x1="0" y1="0" x2="8" y2="0" stroke="currentColor" class="opacity-20" />
                </svg>

                <div
                  class="absolute inset-x-0 bottom-0 flex justify-between px-2 text-xs text-black/50 dark:text-white/50"
                >
                  <span v-for="pt in anomalyHourlyData" :key="`ano-label-${pt.label}`">
                    {{ pt.label }}
                  </span>
                </div>

                <div
                  class="absolute right-2 top-2 rounded bg-primary/10 px-2 py-1 text-[10px] text-black/60 dark:bg-primary/20 dark:text-white/60"
                >
                  0 = 정상 · 1 = 이상
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div
                  class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20"
                >
                  <span class="size-2.5 rounded-full bg-red-500"></span>
                  <span class="font-semibold text-black/80 dark:text-white/80">최근 값</span>
                  <span class="ml-auto text-black/60 dark:text-white/60">{{ latestAnomaly }}</span>
                </div>
                <div
                  class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20"
                >
                  <span class="font-semibold text-black/80 dark:text-white/80">최신 시각</span>
                  <span class="ml-auto text-black/60 dark:text-white/60">{{
                    latestAnomalyLabel
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <h2 class="px-4 pb-3 pt-8 text-2xl font-bold">예지 보전</h2>
          <div class="px-4 py-3 @container">
            <div
              class="overflow-hidden rounded-xl border border-primary/20 bg-background-light dark:border-primary/30 dark:bg-background-dark"
            >
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-primary/10 dark:bg-primary/20">
                    <tr>
                      <th class="px-6 py-4 text-sm font-medium">베어링 ID</th>
                      <th class="px-6 py-4 text-sm font-medium">상태</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-primary/20 dark:divide-primary/30">
                    <tr v-for="row in predictiveRows" :key="row.id">
                      <td class="px-6 py-4 text-sm font-normal">{{ row.id }}</td>
                      <td class="px-6 py-4">
                        <span :class="getStatusChipClass(row.status)">
                          {{ row.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
/** 상단 네비게이션(한국어만 노출) */
const navigation = [
  { label: '개요' }, // Overview
  { label: '리포트' }, // Reports
]

/** 요약 카드(한국어) */
const summaryCards = [
  { label: '총 베어링 수', value: '1,250' },
  { label: '활성 알림', value: '15' },
  { label: '예측 수', value: '30' },
]

/** 공통 차트 크기 */
const chartConfig = { width: 260, height: 120 }

/** (3) PMS 결과: 1시간 단위 선그래프용 더미 데이터 (최근 12시간) */
const pmsHourlyData = [
  { label: '04시', value: 72 },
  { label: '05시', value: 75 },
  { label: '06시', value: 78 },
  { label: '07시', value: 74 },
  { label: '08시', value: 80 },
  { label: '09시', value: 83 },
  { label: '10시', value: 79 },
  { label: '11시', value: 81 },
  { label: '12시', value: 77 },
  { label: '13시', value: 82 },
  { label: '14시', value: 85 },
  { label: '15시', value: 84 },
]

/** (4) 이상 신호 탐지: 0/1, 1시간 단위 스퀘어 파형용 더미 데이터 (최근 12시간) */
const anomalyHourlyData = [
  { label: '04시', value: 0 },
  { label: '05시', value: 0 },
  { label: '06시', value: 1 },
  { label: '07시', value: 0 },
  { label: '08시', value: 0 },
  { label: '09시', value: 0 },
  { label: '10시', value: 1 },
  { label: '11시', value: 0 },
  { label: '12시', value: 0 },
  { label: '13시', value: 0 },
  { label: '14시', value: 1 },
  { label: '15시', value: 0 },
]

/** 일반 값(%) 선그래프 좌표 생성 */
const buildSeries = (items, key = 'value', maxY = 100) => {
  if (!items?.length) return { points: '', coordinates: [] }
  if (items.length === 1) {
    const v = items[0][key] ?? 0
    const y = chartConfig.height - (v / maxY) * chartConfig.height
    return {
      points: `0,${y} ${chartConfig.width},${y}`,
      coordinates: [
        { x: 0, y, value: v, label: items[0].label },
        { x: chartConfig.width, y, value: v, label: items[0].label },
      ],
    }
  }
  const coordinates = items.map((p, i) => {
    const x = (i / (items.length - 1)) * chartConfig.width
    const y = chartConfig.height - ((p[key] ?? 0) / maxY) * chartConfig.height
    return { x, y, value: p[key] ?? 0, label: p.label }
  })
  return {
    points: coordinates.map(({ x, y }) => `${x},${y}`).join(' '),
    coordinates,
  }
}

/** (핵심) 0/1 데이터를 스퀘어(계단) 파형으로 변환 */
const buildBinaryStepSeries = (items) => {
  if (!items?.length) return { points: '', coordinates: [] }
  const padTop = 2 // 위 여백
  const padBottom = 2 // 아래 여백
  const yFor = (v) => (v === 1 ? padTop : chartConfig.height - padBottom)

  const coords = []
  // 시작점
  coords.push({
    x: 0,
    y: yFor(items[0].value ?? 0),
    value: items[0].value ?? 0,
    label: items[0].label,
  })

  for (let i = 1; i < items.length; i++) {
    const x = (i / (items.length - 1)) * chartConfig.width
    const prev = items[i - 1]
    const curr = items[i]
    const prevY = yFor(prev.value ?? 0)
    const currY = yFor(curr.value ?? 0)

    // 수평 구간: 이전 값으로 현재 x까지
    coords.push({ x, y: prevY, value: prev.value ?? 0, label: curr.label + '-h' })
    // 값이 달라지면 같은 x에서 수직 점프
    if (currY !== prevY) coords.push({ x, y: currY, value: curr.value ?? 0, label: curr.label })
    else coords.push({ x, y: currY, value: curr.value ?? 0, label: curr.label })
  }

  return {
    points: coords.map(({ x, y }) => `${x},${y}`).join(' '),
    coordinates: coords,
  }
}

/** 시리즈 계산 */
const pmsSeries = buildSeries(pmsHourlyData, 'value', 100)
const anomalySeries = buildBinaryStepSeries(anomalyHourlyData)

/** 최신값 표시 */
const latestPms = pmsHourlyData.at(-1)?.value ?? 0
const latestPmsLabel = pmsHourlyData.at(-1)?.label ?? '-'
const latestAnomaly = anomalyHourlyData.at(-1)?.value ?? 0
const latestAnomalyLabel = anomalyHourlyData.at(-1)?.label ?? '-'

/** 예지 보전 테이블(한국어 상태) */
const predictiveRows = [
  { id: 'B001', status: '양호' },
  { id: 'B002', status: '위험' },
  { id: 'B003', status: '양호' },
  { id: 'B004', status: '위험' },
  { id: 'B005', status: '양호' },
]

/** 상태 칩 스타일 */
const statusChipBase = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'
const statusChipVariants = {
  양호: `${statusChipBase} bg-green-500/20 text-green-800 dark:bg-green-500/30 dark:text-green-300`,
  위험: `${statusChipBase} bg-red-500/20 text-red-800 dark:bg-red-500/30 dark:text-red-300`,
}
const getStatusChipClass = (status) => statusChipVariants[status] ?? statusChipBase
</script>

<style scoped>
.font-display {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
</style>
