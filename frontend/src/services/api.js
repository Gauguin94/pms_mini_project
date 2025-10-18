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

  /**
   * 기존 API: channelId 기반 조회
   * @param {number} channelId - 채널 ID
   * @param {number} limit - 조회할 데이터 개수
   * @returns {Promise<Array>} AI 결과 배열
   */
  async getLatest(channelId, limit = 50) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/airesult/latest?channelId=${channelId}&limit=${limit}`,
      )

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('PMS AI Result API 호출 에러:', error)
      throw error
    }
  },
}

export default {
  pmsAiResult: pmsAiResultApi,
}
