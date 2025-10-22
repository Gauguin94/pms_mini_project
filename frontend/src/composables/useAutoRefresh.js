/**
 * Auto Refresh Composable
 * 자동 갱신 기능 제공 (폴링)
 */

import { ref, onUnmounted } from 'vue'

export function useAutoRefresh(fetchFunction, intervalMs = 60000) {
  const isRefreshing = ref(false)
  const lastUpdated = ref(null)
  let intervalId = null

  /**
   * 데이터 갱신 (중복 호출 방지)
   */
  const refresh = async () => {
    if (isRefreshing.value) {
      console.log('⏳ 이미 갱신 중입니다. 건너뜁니다.')
      return
    }

    try {
      isRefreshing.value = true
      await fetchFunction()
      lastUpdated.value = new Date()
      console.log(`✅ 데이터 갱신 완료: ${lastUpdated.value.toLocaleTimeString()}`)
    } catch (error) {
      console.error('❌ 자동 갱신 실패:', error)
    } finally {
      isRefreshing.value = false
    }
  }

  /**
   * 자동 갱신 시작
   */
  const startAutoRefresh = () => {
    if (intervalId) {
      console.log('⚠️ 이미 자동 갱신이 실행 중입니다.')
      return
    }

    console.log(`🔄 자동 갱신 시작 (${intervalMs / 1000}초 간격)`)
    intervalId = setInterval(refresh, intervalMs)
  }

  /**
   * 자동 갱신 중지
   */
  const stopAutoRefresh = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
      console.log('⏹️ 자동 갱신 중지')
    }
  }

  // 컴포넌트 언마운트 시 자동 정리
  onUnmounted(() => {
    stopAutoRefresh()
  })

  return {
    isRefreshing,
    lastUpdated,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
  }
}
