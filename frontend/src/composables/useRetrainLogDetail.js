/**
 * Retrain Log Detail Composable
 * 재학습 로그 상세 데이터 관리
 */

import { ref } from 'vue'
import { retrainLogDetailApi } from '@/services/api'

export function useRetrainLogDetail() {
  // State
  const logs = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * 특정 log_id의 상세 로그 조회 (seq 순서대로)
   * @param {number} logId - 재학습 로그 ID
   */
  const fetchLogsByLogId = async (logId) => {
    if (!logId) return

    loading.value = true
    error.value = null

    try {
      const data = await retrainLogDetailApi.getDetailsByLogId(logId)
      logs.value = data
      console.log(`✅ 로그 ${data.length}개 로드 완료 (logId: ${logId})`)
    } catch (err) {
      error.value = err.message
      console.error('❌ 로그 로드 실패:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * 특정 log_id의 최신 상세 로그 조회
   * @param {number} logId - 재학습 로그 ID
   * @param {number} limit - 조회할 데이터 개수
   */
  const fetchLatestLogsByLogId = async (logId, limit = 50) => {
    if (!logId) return

    loading.value = true
    error.value = null

    try {
      const data = await retrainLogDetailApi.getLatestDetailsByLogId(logId, limit)
      // 최신순으로 받아오므로 seq 순서대로 정렬
      logs.value = data.sort((a, b) => a.seq - b.seq)
      console.log(`✅ 로그 ${data.length}개 로드 완료 (logId: ${logId})`)
    } catch (err) {
      error.value = err.message
      console.error('❌ 로그 로드 실패:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * 최신 상세 로그 조회 (전체)
   * @param {number} limit - 조회할 데이터 개수
   */
  const fetchLatestLogs = async (limit = 50) => {
    loading.value = true
    error.value = null

    try {
      const data = await retrainLogDetailApi.getLatestDetails(limit)
      logs.value = data
      console.log(`✅ 최신 로그 ${data.length}개 로드 완료`)
    } catch (err) {
      error.value = err.message
      console.error('❌ 로그 로드 실패:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * 시간 포맷팅
   * @param {string} timestamp - ISO 형식의 타임스탬프
   * @returns {string} 포맷된 시간 (HH:MM:SS)
   */
  const formatTime = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ko-KR', { hour12: false })
  }

  /**
   * 로그 레벨에 따른 CSS 클래스
   * @param {string} level - 로그 레벨 (INFO, WARN, ERROR)
   * @returns {string} CSS 클래스
   */
  const getLevelClass = (level) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-400 font-bold'
      case 'WARN':
        return 'text-yellow-400'
      case 'INFO':
        return 'text-blue-400'
      default:
        return 'text-gray-400'
    }
  }

  /**
   * 로그 레벨에 따른 텍스트 색상 클래스
   * @param {string} level - 로그 레벨
   * @returns {string} CSS 클래스
   */
  const getTextColorClass = (level) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-400'
      case 'WARN':
        return 'text-yellow-400'
      case 'INFO':
        return 'text-white'
      default:
        return 'text-gray-400'
    }
  }

  return {
    // State
    logs,
    loading,
    error,

    // Methods
    fetchLogsByLogId,
    fetchLatestLogsByLogId,
    fetchLatestLogs,
    formatTime,
    getLevelClass,
    getTextColorClass,
  }
}
