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
          <h2 class="text-lg font-bold leading-tight tracking-[-0.015em]">Bearing Insights</h2>
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
            <h1 class="text-3xl font-bold">Bearing Monitoring Dashboard</h1>
            <p class="text-base font-normal text-black/60 dark:text-white/60">
              Real-time insights into bearing health and predictive analytics.
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

          <h2 class="px-4 pb-3 pt-8 text-2xl font-bold">Bearing Health Overview</h2>

          <div class="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-2">
            <div
              class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light p-6 dark:border-primary/30 dark:bg-background-dark"
            >
              <p class="text-lg font-medium">Bearing Condition Distribution</p>
              <div class="flex items-baseline gap-3">
                <p class="text-4xl font-bold">{{ bearingConditionSummary.percentage }}%</p>
                <p class="text-base font-medium text-green-500">
                  +{{ bearingConditionSummary.delta }}%
                </p>
              </div>
              <p class="text-sm font-normal text-black/60 dark:text-white/60">Last 24 Hours</p>
              <div class="grid h-48 grid-flow-col items-end justify-items-center gap-6 pt-4">
                <div
                  v-for="segment in bearingConditionSegments"
                  :key="segment.label"
                  class="flex h-full w-full flex-col items-center justify-end gap-2"
                >
                  <div
                    class="w-full rounded bg-primary/30"
                    :style="{ height: `${segment.height}%` }"
                  ></div>
                  <p
                    class="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60"
                  >
                    {{ segment.label }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-background-light p-6 dark:border-primary/30 dark:bg-background-dark"
            >
              <p class="text-lg font-medium">Bearing Temperature Trends</p>
              <div class="flex items-baseline gap-3">
                <p class="text-4xl font-bold">{{ temperatureSummary.current }}</p>
                <p
                  class="text-base font-medium"
                  :class="temperatureSummary.change < 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ temperatureSummary.changeLabel }}
                </p>
              </div>
              <p class="text-sm font-normal text-black/60 dark:text-white/60">
                Healthy vs Critical (최근 7일)
              </p>
              <div class="flex flex-col gap-6 py-4">
                <div class="relative h-48 w-full">
                  <svg
                    :viewBox="`0 0 ${chartConfig.width} ${chartConfig.height}`"
                    preserveAspectRatio="none"
                    class="size-full"
                  >
                    <defs>
                      <linearGradient id="healthyStroke" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#22c55e" />
                        <stop offset="100%" stop-color="#4ade80" />
                      </linearGradient>
                      <linearGradient id="criticalStroke" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#f97316" />
                        <stop offset="100%" stop-color="#ef4444" />
                      </linearGradient>
                    </defs>
                    <polyline
                      :points="healthySeries.points"
                      fill="none"
                      stroke="url(#healthyStroke)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                    />
                    <polyline
                      :points="criticalSeries.points"
                      fill="none"
                      stroke="url(#criticalStroke)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      class="opacity-90"
                    />
                    <g>
                      <circle
                        v-for="point in healthySeries.coordinates"
                        :key="`healthy-${point.label}`"
                        :cx="point.x"
                        :cy="point.y"
                        r="3"
                        fill="#22c55e"
                        class="drop-shadow-sm"
                      />
                      <circle
                        v-for="point in criticalSeries.coordinates"
                        :key="`critical-${point.label}`"
                        :cx="point.x"
                        :cy="point.y"
                        r="3"
                        fill="#ef4444"
                        class="drop-shadow-sm"
                      />
                    </g>
                  </svg>
                  <div
                    class="absolute inset-x-0 bottom-0 flex justify-between px-2 text-xs text-black/50 dark:text-white/50"
                  >
                    <span v-for="point in temperatureTrendData" :key="`label-${point.label}`">
                      {{ point.label }}
                    </span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20">
                    <span class="size-2.5 rounded-full bg-green-500"></span>
                    <span class="font-semibold text-black/80 dark:text-white/80">Healthy</span>
                    <span class="ml-auto text-black/60 dark:text-white/60">{{ latestHealthy }}%</span>
                  </div>
                  <div class="flex items-center gap-2 rounded-lg bg-primary/10 p-3 dark:bg-primary/20">
                    <span class="size-2.5 rounded-full bg-red-500"></span>
                    <span class="font-semibold text-black/80 dark:text-white/80">Critical</span>
                    <span class="ml-auto text-black/60 dark:text-white/60">{{ latestCritical }}%</span>
                  </div>
                </div>

                <p class="text-xs text-black/50 dark:text-white/50">
                  베어링 상태별 온도 추이는 Healthy 비중이 안정적이며 Critical 구간에 대한 선제
                  점검이 필요합니다.
                </p>
              </div>
            </div>
          </div>

          <h2 class="px-4 pb-3 pt-8 text-2xl font-bold">Predictive Maintenance</h2>
          <div class="px-4 py-3 @container">
            <div
              class="overflow-hidden rounded-xl border border-primary/20 bg-background-light dark:border-primary/30 dark:bg-background-dark"
            >
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-primary/10 dark:bg-primary/20">
                    <tr>
                      <th class="px-6 py-4 text-sm font-medium">Bearing ID</th>
                      <th class="px-6 py-4 text-sm font-medium">Status</th>
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
const navigation = [
  { label: 'Overview' },
  { label: 'Analysis' },
  { label: 'Alerts' },
  { label: 'Reports' },
]

const summaryCards = [
  { label: 'Total Bearings', value: '1,250' },
  { label: 'Active Alerts', value: '15' },
  { label: 'Predictions', value: '30' },
]

const bearingConditionSummary = { percentage: 75, delta: 5 }

const bearingConditionSegments = [
  { label: 'Healthy', height: 75 },
  { label: 'Critical', height: 25 },
]

const temperatureSummary = {
  current: '25°C',
  change: -2,
  changeLabel: '-2%',
}

const temperatureTrendData = [
  { label: '10/11', healthy: 82, critical: 18 },
  { label: '10/12', healthy: 80, critical: 20 },
  { label: '10/13', healthy: 77, critical: 23 },
  { label: '10/14', healthy: 79, critical: 21 },
  { label: '10/15', healthy: 81, critical: 19 },
  { label: '10/16', healthy: 78, critical: 22 },
  { label: '10/17', healthy: 76, critical: 24 },
]

const chartConfig = { width: 240, height: 120 }

const computeSeries = (key) => {
  if (temperatureTrendData.length <= 1) {
    const fallbackValue = temperatureTrendData[0]?.[key] ?? 0
    const y = chartConfig.height - (fallbackValue / 100) * chartConfig.height
    return {
      points: `0,${y} ${chartConfig.width},${y}`,
      coordinates: [
        { x: 0, y, value: fallbackValue, label: temperatureTrendData[0]?.label ?? 'now' },
        { x: chartConfig.width, y, value: fallbackValue, label: temperatureTrendData[0]?.label ?? 'now' },
      ],
    }
  }

  const coordinates = temperatureTrendData.map((point, index) => {
    const x = (index / (temperatureTrendData.length - 1)) * chartConfig.width
    const y = chartConfig.height - (point[key] / 100) * chartConfig.height
    return { x, y, value: point[key], label: point.label }
  })

  return {
    points: coordinates.map(({ x, y }) => `${x},${y}`).join(' '),
    coordinates,
  }
}

const healthySeries = computeSeries('healthy')
const criticalSeries = computeSeries('critical')

const latestTrend = temperatureTrendData[temperatureTrendData.length - 1] ?? {
  healthy: 0,
  critical: 0,
}

const latestHealthy = latestTrend.healthy
const latestCritical = latestTrend.critical

const predictiveRows = [
  { id: 'B001', status: 'Healthy' },
  { id: 'B002', status: 'Critical' },
  { id: 'B003', status: 'Healthy' },
  { id: 'B004', status: 'Critical' },
  { id: 'B005', status: 'Healthy' },
]

const statusChipBase = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'

const statusChipVariants = {
  Healthy: `${statusChipBase} bg-green-500/20 text-green-800 dark:bg-green-500/30 dark:text-green-300`,
  Critical: `${statusChipBase} bg-red-500/20 text-red-800 dark:bg-red-500/30 dark:text-red-300`,
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
