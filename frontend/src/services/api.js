/**
 * API 서비스
 */

const API_BASE_URL = 'http://localhost:8080'

/**
 * 공통 API 호출 함수
 */
async function fetchAPI(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('백엔드 서버에 연결할 수 없습니다.')
    }
    throw error
  }
}

/**
 * PMS AI Result API
 */
export const pmsAiResultApi = {
  getSingleBearingResults: (limit = 50) =>
    fetchAPI(`${API_BASE_URL}/api/airesult/single?limit=${limit}`),
}

/**
 * Retrain Log Detail API
 */
export const retrainLogDetailApi = {
  getDetailsByLogId: (logId) =>
    fetchAPI(`${API_BASE_URL}/api/retrain/detail/by-log-id?logId=${logId}`),

  getLatestDetailsByLogId: (logId, limit = 50) =>
    fetchAPI(`${API_BASE_URL}/api/retrain/detail/latest-by-log-id?logId=${logId}&limit=${limit}`),

  getLatestDetails: (limit = 50) => fetchAPI(`${API_BASE_URL}/api/retrain/detail?limit=${limit}`),
}

/**
 * Realtime Data API
 */
export const realtimeDataApi = {
  getLatestData: (limit = 50) => fetchAPI(`${API_BASE_URL}/api/realtime?limit=${limit}`),
}

export default {
  pmsAiResult: pmsAiResultApi,
  retrainLogDetail: retrainLogDetailApi,
  realtimeData: realtimeDataApi,
}
