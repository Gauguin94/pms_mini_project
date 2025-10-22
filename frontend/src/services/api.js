/**
 * API 유틸
 * 백엔드 API 호출에 사용되는 함수 모음
 */

const API_BASE_URL = 'http://localhost:8080'

/**
 * PMS AI Result API
 */
export const pmsAiResultApi = {
  /**
   * 단일 베어링 AI 결과 조회
   * @param {number} limit - 조회할 데이터 개수 (기본값 50)
   * @returns {Promise<Array>} AI 결과 배열 [{ id, result, created_at }, ...]
   */
  async getSingleBearingResults(limit = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-result/latest?n=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('⚠ 백엔드 서버에 연결할 수 없습니다. http://localhost:8080 을 확인하세요.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('PMS AI Result API 호출 에러:', error)
      throw error
    }
  },
}

/**
 * 재학습 로그 API
 */
export const retrainLogApi = {
  /**
   * 재학습 로그 요약 목록 조회
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} 로그 요약 배열
   */
  async getLogs(limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/retrain/logs?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('⚠ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Retrain Log API 호출 에러:', error)
      throw error
    }
  },

  /**
   * 특정 로그의 상세 내역 조회
   * @param {number} logId - 재학습 로그 ID
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} 상세 로그 배열
   */
  async getLogDetails(logId, limit = 200) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/retrain/logs/${logId}/details?limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('⚠ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Retrain Log Detail API 호출 에러:', error)
      throw error
    }
  },
}

/**
 * Realtime Data API
 */
export const realtimeDataApi = {
  /**
   * 최신 realtime 데이터 조회
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} realtime 데이터 배열
   */
  async getLatestData(limit = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/realtime?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('⚠ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Realtime Data API 호출 에러:', error)
      throw error
    }
  },
}

export default {
  pmsAiResult: pmsAiResultApi,
  retrainLog: retrainLogApi,
  realtimeData: realtimeDataApi,
}
