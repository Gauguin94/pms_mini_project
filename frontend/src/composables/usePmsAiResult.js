/**
 * PMS AI Result Composable
 * 단일 베어링 AI 결과 데이터 관리
 */

import { ref, shallowRef } from 'vue'
import { pmsAiResultApi } from '@/services/api'
import { useAutoRefresh } from './useAutoRefresh'

export function usePmsAiResult() {
  // State (shallowRef로 렌더링 최적화)
  const aiResults = shallowRef([])

  const loading = ref(false)
  const error = ref(null)

  /**
   * 단일 베어링 AI 결과 조회
   * @param {number} limit - 조회할 데이터 개수
   */
  const fetchAiResults = async (limit = 50) => {
    loading.value = true
    error.value = null

    try {
      const data = await pmsAiResultApi.getSingleBearingResults(limit)
      aiResults.value = data
      console.log(`✅ AI 결과 ${data.length}개 로드 완료`)
    } catch (err) {
      error.value = err.message
      console.error('❌ AI 결과 로드 실패:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * 분별로 그룹화 (1분 단위)
   * @param {number} minutes - 가져올 분 수
   * @returns {Array} 분별 그룹화된 데이터
   */
  const getMinuteData = (minutes = 60) => {
    if (!aiResults.value || aiResults.value.length === 0) {
      // 더미 데이터 반환
      return Array.from({ length: minutes }, (_, i) => ({
        label: `${i}분`,
        value: 0, // 데이터 없으면 모두 정상(0)
      }))
    }

    // 현재 시간 기준으로 최근 N분 계산
    const now = new Date()
    const minuteMap = new Map()

    // 최근 N분의 시간 범위 생성
    for (let i = minutes - 1; i >= 0; i--) {
      const targetTime = new Date(now.getTime() - i * 60 * 1000)
      const minuteKey = targetTime.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
      minuteMap.set(minuteKey, [])
    }

    // 실제 데이터 매핑 (날짜 + 시간 기준)
    aiResults.value.forEach((item) => {
      const itemDate = new Date(item.createdAt)
      const itemKey = itemDate.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm

      if (minuteMap.has(itemKey)) {
        minuteMap.get(itemKey).push(item.result)
      }
    })

    // 결과 생성
    const minuteData = []
    const sortedKeys = Array.from(minuteMap.keys()).sort()

    sortedKeys.forEach((key, index) => {
      const results = minuteMap.get(key) || []
      const hasAbnormal = results.some((r) => r === 1)
      const time = new Date(key)
      const minute = time.getMinutes()

      minuteData.push({
        label: `${String(minute).padStart(2, '0')}분`,
        value: hasAbnormal ? 1 : 0,
      })
    })

    return minuteData
  }

  // 자동 갱신 설정 (1분마다)
  const { isRefreshing, lastUpdated, startAutoRefresh, stopAutoRefresh } = useAutoRefresh(
    () => fetchAiResults(500),
    60000, // 60초 = 1분
  )

  return {
    // State
    aiResults,
    loading,
    error,
    isRefreshing,
    lastUpdated,

    // Methods
    fetchAiResults,
    getMinuteData,
    startAutoRefresh,
    stopAutoRefresh,
  }
}
