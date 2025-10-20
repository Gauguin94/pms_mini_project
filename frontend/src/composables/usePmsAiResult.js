/**
 * PMS AI Result Composable
 * Handles fetching and normalising single bearing AI predictions.
 */

import { ref, shallowRef } from 'vue'
import { pmsAiResultApi } from '@/services/api'
import { useAutoRefresh } from './useAutoRefresh'

const toLocalDate = (value) => {
  if (value == null) {
    return null
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === 'number') {
    const asDate = new Date(value)
    return Number.isNaN(asDate.getTime()) ? null : asDate
  }

  if (typeof value === 'string') {
    const normalised = value.includes('T') ? value : value.replace(' ', 'T')
    const asDate = new Date(normalised)
    if (!Number.isNaN(asDate.getTime())) {
      return asDate
    }

    const withZ = `${normalised}Z`
    const fallbackDate = new Date(withZ)
    return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate
  }

  return null
}

const normaliseAiResultRow = (row) => {
  if (!row) {
    return null
  }

  const id = Number(row.id ?? row.ID ?? row.Id)
  const resultRaw = row.result ?? row.ai_result ?? row.prediction ?? 0
  const result = Number(resultRaw)
  const createdSource = row.createdAt ?? row.created_at ?? null
  const createdDate = toLocalDate(createdSource)

  return {
    id: Number.isFinite(id) ? id : null,
    result: Number.isFinite(result) ? result : 0,
    createdAt: createdDate ? createdDate.getTime() : null,
  }
}

export function usePmsAiResult() {
  const aiResults = shallowRef([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAiResults = async (limit = 50) => {
    loading.value = true
    error.value = null

    try {
      const data = await pmsAiResultApi.getSingleBearingResults(limit)
      const normalised = Array.isArray(data)
        ? data
            .map(normaliseAiResultRow)
            .filter((item) => item && item.createdAt !== null)
        : []

      aiResults.value = normalised
      console.log('AI results loaded:', normalised.length)
    } catch (err) {
      error.value = err.message
      console.error('AI results load failed:', err)
    } finally {
      loading.value = false
    }
  }

  const getMinuteData = (minutes = 60) => {
    if (!Array.isArray(aiResults.value) || aiResults.value.length === 0) {
      return Array.from({ length: minutes }, (_, index) => ({
        label: `${String(index).padStart(2, '0')}m`,
        value: 0,
      }))
    }

    const now = new Date()
    const minuteMap = new Map()

    for (let i = minutes - 1; i >= 0; i -= 1) {
      const targetTime = new Date(now.getTime() - i * 60 * 1000)
      const minuteKey = targetTime.toISOString().slice(0, 16)
      minuteMap.set(minuteKey, [])
    }

    aiResults.value.forEach((item) => {
      const createdAt = item?.createdAt
      if (createdAt == null) {
        return
      }

      const createdDate = new Date(createdAt)
      if (Number.isNaN(createdDate.getTime())) {
        return
      }

      const minuteKey = createdDate.toISOString().slice(0, 16)
      if (!minuteMap.has(minuteKey)) {
        return
      }

      const numericResult = Number(item.result)
      minuteMap.get(minuteKey).push(Number.isFinite(numericResult) ? numericResult : 0)
    })

    const sortedKeys = Array.from(minuteMap.keys()).sort()
    return sortedKeys.map((key) => {
      const values = minuteMap.get(key) || []
      const hasAbnormal = values.some((value) => Number(value) === 1)
      const minute = key.slice(-2)

      return {
        label: `${minute}m`,
        value: hasAbnormal ? 1 : 0,
      }
    })
  }

  const { isRefreshing, lastUpdated, startAutoRefresh, stopAutoRefresh } = useAutoRefresh(
    () => fetchAiResults(500),
    60000,
  )

  return {
    aiResults,
    loading,
    error,
    isRefreshing,
    lastUpdated,
    fetchAiResults,
    getMinuteData,
    startAutoRefresh,
    stopAutoRefresh,
  }
}
