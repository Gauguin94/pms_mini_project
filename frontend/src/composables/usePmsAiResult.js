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
        value: Math.random() > 0.7 ? 1 : 0,
      }))
    }

    // 현재 시간 기준으로 최근 N분 계산
    const now = new Date()
    const currentMinute = now.getMinutes()
    const currentHour = now.getHours()

    // 최근 N분의 시간 목록 생성
    const recentMinutes = []
    for (let i = minutes - 1; i >= 0; i--) {
      const totalMinutes = currentHour * 60 + currentMinute - i
      const hour = Math.floor(totalMinutes / 60) % 24
      const minute = totalMinutes % 60
      recentMinutes.push({ hour, minute })
    }

    // 분별로 그룹화
    const minuteMap = new Map()

    // 모든 분을 0으로 초기화
    recentMinutes.forEach(({ hour, minute }) => {
      const minuteKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      minuteMap.set(minuteKey, [])
    })

    // 실제 데이터 매핑
    aiResults.value.forEach((item) => {
      const date = new Date(item.createdAt)
      const hour = date.getHours()
      const minute = date.getMinutes()
      const minuteKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

      if (minuteMap.has(minuteKey)) {
        minuteMap.get(minuteKey).push(item.result)
      }
    })

    // 결과 생성
    const minuteData = []
    for (const { hour, minute } of recentMinutes) {
      const minuteKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      const results = minuteMap.get(minuteKey) || []
      const hasAbnormal = results.some((r) => r === 1)

      minuteData.push({
        label: `${String(minute).padStart(2, '0')}분`,
        value: hasAbnormal ? 1 : 0,
      })
    }

    return minuteData
  }

  /**
   * 시간별로 그룹화 (1시간 단위) - 기존 함수 유지
   */
  const getHourlyData = (hours = 12) => {
    if (!aiResults.value || aiResults.value.length === 0) {
      return Array.from({ length: hours }, (_, i) => ({
        label: `${String(i + 4).padStart(2, '0')}시`,
        value: Math.random() > 0.7 ? 1 : 0,
      }))
    }

    const now = new Date()
    const currentHour = now.getHours()
    const recentHours = []

    for (let i = hours - 1; i >= 0; i--) {
      const hour = (currentHour - i + 24) % 24
      recentHours.push(hour)
    }

    const hourlyMap = new Map()
    recentHours.forEach((hour) => {
      const hourKey = `${String(hour).padStart(2, '0')}시`
      hourlyMap.set(hourKey, [])
    })

    aiResults.value.forEach((item) => {
      const date = new Date(item.createdAt)
      const hour = date.getHours()
      const hourKey = `${String(hour).padStart(2, '0')}시`

      if (hourlyMap.has(hourKey)) {
        hourlyMap.get(hourKey).push(item.result)
      }
    })

    const hourlyData = []
    for (const hour of recentHours) {
      const hourKey = `${String(hour).padStart(2, '0')}시`
      const results = hourlyMap.get(hourKey) || []
      const hasAbnormal = results.some((r) => r === 1)

      hourlyData.push({
        label: hourKey,
        value: hasAbnormal ? 1 : 0,
      })
    }

    return hourlyData
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
    getHourlyData,
    startAutoRefresh,
    stopAutoRefresh,
  }
}
