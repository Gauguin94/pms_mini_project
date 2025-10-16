import { http } from './http'

export async function getTimestamps(channel: number, limit = 20, format: 'local'|'utc' = 'local') {
  const { data } = await http.get<string[]>('/spectrum/timestamps', {
    params: { channel, limit, format }
  })
  return data
}

export async function getByTs(channels: number[], ts?: string) {
  const { data } = await http.get('/spectrum/by-ts', {
    params: { channels: channels.join(','), ...(ts ? { ts } : {}) }
  })
  return data
}

export async function getByRank(channels: number[], rank = 0) {
  const { data } = await http.get('/spectrum/by-rank', {
    params: { channels: channels.join(','), rank }
  })
  return data
}

export async function getByCommon(channels: number[], offset = 0) {
  const { data } = await http.get('/spectrum/by-common', {
    params: { channels: channels.join(','), offset }
  })
  return data
}


/* Fallback (http가 없을 때)
import axios from 'axios'
const http = axios.create({ baseURL: 'http://localhost:8080' })
*/
