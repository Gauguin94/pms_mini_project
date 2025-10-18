/**
 * Realtime Data Composable
 * realtime_table 데이터 관리 (35개 feature)
 */

import { ref } from 'vue'
import { realtimeDataApi } from '@/services/api'

export function useRealtimeData() {
  // State
  const realtimeData = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * 최신 realtime 데이터 조회
   * @param {number} limit - 조회할 데이터 개수
   */
  const fetchRealtimeData = async (limit = 50) => {
    loading.value = true
    error.value = null

    try {
      const data = await realtimeDataApi.getLatestData(limit)
      realtimeData.value = data
      console.log(`✅ Realtime 데이터 ${data.length}개 로드 완료`)
    } catch (err) {
      error.value = err.message
      console.error('❌ Realtime 데이터 로드 실패:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * time_rms 값만 추출
   * @returns {Array<number>} time_rms 값 배열
   */
  const getTimeRmsValues = () => {
    return realtimeData.value.map((item) => item.timeRms)
  }

  /**
   * 특정 feature 값 추출
   * @param {string} featureName - feature 이름 (camelCase)
   * @returns {Array<number>} feature 값 배열
   */
  const getFeatureValues = (featureName) => {
    return realtimeData.value.map((item) => item[featureName])
  }

  /**
   * 모든 time domain features 추출
   * @returns {Object} time domain features
   */
  const getTimeDomainFeatures = () => {
    return {
      rms: getFeatureValues('timeRms'),
      skewness: getFeatureValues('timeSkewness'),
      kurtosis: getFeatureValues('timeKurtosis'),
      crestFactor: getFeatureValues('timeCrestFactor'),
      shapeFactor: getFeatureValues('timeShapeFactor'),
      mean: getFeatureValues('timeMean'),
      std: getFeatureValues('timeStd'),
      peak: getFeatureValues('timePeak'),
      meanDiff: getFeatureValues('timeMeanDiff'),
      stdDiff: getFeatureValues('timeStdDiff'),
      minDiff: getFeatureValues('timeMinDiff'),
      maxDiff: getFeatureValues('timeMaxDiff'),
    }
  }

  /**
   * 모든 FFT features 추출
   * @returns {Object} FFT features
   */
  const getFftFeatures = () => {
    return {
      centroid: getFeatureValues('fftCentroid'),
      bandwidth: getFeatureValues('fftBandwidth'),
      peakFreq: getFeatureValues('fftPeakFreq'),
      overEnv: getFeatureValues('fftOverEnv'),
      amp1x: getFeatureValues('fftAmp1x'),
      amp2x: getFeatureValues('fftAmp2x'),
      amp3x: getFeatureValues('fftAmp3x'),
      amp4x: getFeatureValues('fftAmp4x'),
      amp5x: getFeatureValues('fftAmp5x'),
    }
  }

  /**
   * 모든 Wavelet features 추출
   * @returns {Object} Wavelet features
   */
  const getWaveletFeatures = () => {
    return {
      cD1: { rms: getFeatureValues('cD1Rms'), kurtosis: getFeatureValues('cD1Kurtosis') },
      cD2: { rms: getFeatureValues('cD2Rms'), kurtosis: getFeatureValues('cD2Kurtosis') },
      cD3: { rms: getFeatureValues('cD3Rms'), kurtosis: getFeatureValues('cD3Kurtosis') },
      cD4: { rms: getFeatureValues('cD4Rms'), kurtosis: getFeatureValues('cD4Kurtosis') },
      cD5: { rms: getFeatureValues('cD5Rms'), kurtosis: getFeatureValues('cD5Kurtosis') },
      cD6: { rms: getFeatureValues('cD6Rms'), kurtosis: getFeatureValues('cD6Kurtosis') },
      cD7: { rms: getFeatureValues('cD7Rms'), kurtosis: getFeatureValues('cD7Kurtosis') },
    }
  }

  return {
    // State
    realtimeData,
    loading,
    error,

    // Methods
    fetchRealtimeData,
    getTimeRmsValues,
    getFeatureValues,
    getTimeDomainFeatures,
    getFftFeatures,
    getWaveletFeatures,
  }
}
