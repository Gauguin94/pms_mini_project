// import { http } from './http'

// export type VrmsPoint = { ts: string; vrms: number }

// export async function fetchVrmsLatest(channelId: number, limit = 100) {
//   const { data } = await http.get<VrmsPoint[]>('/vrms/latest', {
//     params: { channelId, limit },
//   })
//   return data
// }

import { http } from './http'
export type VrmsPoint = { ts: string; vrms: number }

export async function fetchVrmsLatest(channelId: number, limit = 100) {
  try {
    const { data } = await http.get<VrmsPoint[]>('/vrms/latest', { params: { channelId, limit } })
    console.log('[VRMS] rows:', data?.length, data?.[0])
    return data
  } catch (e) {
    console.error('[VRMS] request failed:', e)
    return []
  }
}