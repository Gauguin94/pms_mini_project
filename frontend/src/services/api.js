/**
 * API 서비스
 * 백엔드 API 호출을 위한 함수들
 */

const API_BASE_URL = 'http://localhost:8080'

/**
 * PMS AI Result API
 */
export const pmsAiResultApi = {
  /**
   * 단일 베어링 AI 결과 조회
   * @param {number} limit - 조회할 데이터 개수 (기본값: 50)
   * @returns {Promise<Array>} AI 결과 배열 [{ id, result, createdAt }, ...]
   */
  async getSingleBearingResults(limit = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/airesult/single?limit=${limit}`, {
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
      // 네트워크 에러 (백엔드 미실행)
      if (error.message.includes('Failed to fetch')) {
        console.error('❌ 백엔드 서버에 연결할 수 없습니다. http://localhost:8080 확인 필요')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('PMS AI Result API 호출 에러:', error)
      throw error
    }
  },
}

/**
 * Retrain Log Detail API
 */
export const retrainLogDetailApi = {
  /**
   * 특정 log_id의 상세 로그 조회 (seq 순서대로)
   * @param {number} logId - 재학습 로그 ID
   * @returns {Promise<Array>} 상세 로그 배열
   *
   */
  async getDetailsByLogId(logId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/retrain/detail/by-log-id?logId=${logId}`, {
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
        console.error('❌ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Retrain Log Detail API 호출 에러:', error)
      throw error
    }
  },

  /**
   * 특정 log_id의 최신 상세 로그 조회
   * @param {number} logId - 재학습 로그 ID
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} 상세 로그 배열
   */
  async getLatestDetailsByLogId(logId, limit = 50) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/retrain/detail/latest-by-log-id?logId=${logId}&limit=${limit}`,
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
        console.error('❌ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Retrain Log Detail API 호출 에러:', error)
      throw error
    }
  },

  /**
   * 최신 상세 로그 조회
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} 상세 로그 배열
   */
  async getLatestDetails(limit = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/retrain/detail?limit=${limit}`, {
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
        console.error('❌ 백엔드 서버에 연결할 수 없습니다.')
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
        console.error('❌ 백엔드 서버에 연결할 수 없습니다.')
        throw new Error('백엔드 서버에 연결할 수 없습니다.')
      }
      console.error('Realtime Data API 호출 에러:', error)
      throw error
    }
  },
}

export default {
  pmsAiResult: pmsAiResultApi,
  retrainLogDetail: retrainLogDetailApi,
  realtimeData: realtimeDataApi,
}
