/**
 * Bearing Status Composable
 * 베어링 상태 데이터 관리
 */

import { computed } from 'vue'

export function useBearingStatus(aiResults) {
  /**
   * B001 베어링 상태 (실제 API 데이터 기반)
   */
  const b001Status = computed(() => {
    const latestResult = aiResults.value.length > 0 ? aiResults.value[0].result : 0

    return latestResult === 1
      ? {
          id: 'B001',
          status: '이상 감지',
          icon: 'warning',
          statusClass: 'border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20',
          iconBgClass: 'bg-yellow-500/20',
          iconColorClass: 'text-yellow-500',
          textClass: 'text-sm text-yellow-700 dark:text-yellow-300',
        }
      : {
          id: 'B001',
          status: '정상',
          icon: 'check_circle',
          statusClass: 'border-green-500/50 bg-green-500/10 dark:bg-green-500/20',
          iconBgClass: 'bg-green-500/20',
          iconColorClass: 'text-green-500',
          textClass: 'text-sm text-green-700 dark:text-green-300',
        }
  })

  /**
   * 더미 베어링 데이터 (B002-B008)
   */
  const dummyBearings = [
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
