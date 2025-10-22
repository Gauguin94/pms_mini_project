/**
 * Bearing Status Composable
 * 베어링 상태 데이터 관리
 */

import { computed } from 'vue'

export function useBearingStatus(aiResults) {
  const latestResult = computed(() => Number(aiResults.value?.[0]?.result ?? 1))

  /**
   * B001 베어링 상태 (위험)
   */
  const b001Status = computed(() => ({
    id: 'B001',
    status: '위험',
    icon: 'error',
    statusClass: 'border-red-500/60 bg-red-500/10 dark:bg-red-500/20',
    iconBgClass: 'bg-red-500/20',
    iconColorClass: 'text-red-500',
    textClass: 'text-sm text-red-600 dark:text-red-300',
    anomalyScore: Math.max(0.85, Math.min(0.99, 0.82 + latestResult.value * 0.12)),
    temperature: {
      current: 78,
      unit: '°C',
      trend: '최근 10분 +4°C',
      note: '고온 상태 · 냉각 라인 점검 필요',
    },
    vibration: {
      current: 4.3,
      unit: 'mm/s',
      trend: '최근 5분간 급상승',
      note: '허용치 초과 · 즉시 점검 권장',
    },
  }))

  /**
   * 더미 베어링 데이터 (B002-B008)
   */
  const dummyBearings = [
    {
      id: 'B002',
      status: '정상',
      icon: 'check_circle',
      statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
      iconBgClass: 'bg-green-500/20',
      iconColorClass: 'text-green-500',
      textClass: 'text-sm text-green-700 dark:text-green-300',
      anomalyScore: 0.18,
      temperature: {
        current: 62,
        unit: '°C',
        trend: '안정 · ±1°C',
        note: '권장 범위 유지',
      },
      vibration: {
        current: 1.7,
        unit: 'mm/s',
        trend: '변동 없음',
        note: '정상 범위',
      },
    },
    {
      id: 'B003',
      status: '수리 중',
      icon: 'build',
      statusClass: 'border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/20',
      iconBgClass: 'bg-blue-500/20',
      iconColorClass: 'text-blue-500',
      textClass: 'text-sm text-blue-700 dark:text-blue-300',
      anomalyScore: null,
      temperature: {
        current: null,
        unit: '°C',
        trend: '수리 중 데이터 없음',
        note: '부품 교체 진행 중',
      },
      vibration: {
        current: null,
        unit: 'mm/s',
        trend: '수리 중 데이터 없음',
        note: '측정 불가',
      },
    },
    {
      id: 'B004',
      status: '위험',
      icon: 'error',
      statusClass: 'border-red-500/50 bg-red-500/10 dark:bg-red-500/20',
      iconBgClass: 'bg-red-500/20',
      iconColorClass: 'text-red-500',
      textClass: 'text-sm text-red-700 dark:text-red-300',
      anomalyScore: 0.84,
      temperature: {
        current: 74,
        unit: '°C',
        trend: '최근 15분 +3°C',
        note: '냉각 팬 점검 필요',
      },
      vibration: {
        current: 3.8,
        unit: 'mm/s',
        trend: '임계치 접근',
        note: '베어링 편심 의심',
      },
    },
    {
      id: 'B005',
      status: '정상',
      icon: 'check_circle',
      statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
      iconBgClass: 'bg-green-500/20',
      iconColorClass: 'text-green-500',
      textClass: 'text-sm text-green-700 dark:text-green-300',
      anomalyScore: 0.12,
      temperature: {
        current: 57,
        unit: '°C',
        trend: '안정',
        note: '권장 범위 하단',
      },
      vibration: {
        current: 1.2,
        unit: 'mm/s',
        trend: '변동 없음',
        note: '정상 범위',
      },
    },
    {
      id: 'B006',
      status: '정상',
      icon: 'check_circle',
      statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
      iconBgClass: 'bg-green-500/20',
      iconColorClass: 'text-green-500',
      textClass: 'text-sm text-green-700 dark:text-green-300',
      anomalyScore: 0.15,
      temperature: {
        current: 59,
        unit: '°C',
        trend: '±0.5°C',
        note: '안정적',
      },
      vibration: {
        current: 1.5,
        unit: 'mm/s',
        trend: '안정',
        note: '정상 범위',
      },
    },
    {
      id: 'B007',
      status: '이상 감지',
      icon: 'warning',
      statusClass: 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20',
      iconBgClass: 'bg-yellow-500/20',
      iconColorClass: 'text-yellow-500',
      textClass: 'text-sm text-yellow-700 dark:text-yellow-300',
      anomalyScore: 0.52,
      temperature: {
        current: 68,
        unit: '°C',
        trend: '완만한 상승',
        note: '추가 모니터링 필요',
      },
      vibration: {
        current: 2.6,
        unit: 'mm/s',
        trend: '간헐적 피크',
        note: '정밀 분석 권장',
      },
    },
    {
      id: 'B008',
      status: '정상',
      icon: 'check_circle',
      statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
      iconBgClass: 'bg-green-500/20',
      iconColorClass: 'text-green-500',
      textClass: 'text-sm text-green-700 dark:text-green-300',
      anomalyScore: 0.09,
      temperature: {
        current: 55,
        unit: '°C',
        trend: '안정',
        note: '권장 범위 유지',
      },
      vibration: {
        current: 1.1,
        unit: 'mm/s',
        trend: '안정',
        note: '정상 범위',
      },
    },
  ]

  /**
   * 전체 베어링 목록 (B001 + 더미 데이터)
   */
  const bearings = computed(() => {
    return [b001Status.value, ...dummyBearings]
  })

  return {
    bearings,
    b001Status,
  }
}
