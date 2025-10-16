import axios from 'axios'
export const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// import axios from 'axios'

// const http = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
//   // 필요하면 timeout, headers 등 추가
// })

// export default http

// import axios from 'axios'

// // 프록시(/api) 대신 백엔드 절대주소로 직결 테스트
// export const http = axios.create({
//   baseURL: 'http://localhost:8080/api',
//   timeout: 15000,
// })