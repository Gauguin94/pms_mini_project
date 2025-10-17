// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import VrmsComparePage from '@/pages/VrmsComparePage.vue'
import SpectrumPage from '@/pages/SpectrumPage.vue'

const routes = [
  { path: '/', component: Dashboard, name: 'dashboard' },
  { path: '/vrms/compare', component: VrmsComparePage, name: 'vrms-compare' },
  { path: '/spectrum', component: SpectrumPage, name: 'spectrum' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// import { createRouter, createWebHistory } from 'vue-router'
// // import VrmsPage from '@/pages/VrmsPage.vue'
// import VrmsComparePage from '@/pages/VrmsComparePage.vue'

// const SpectrumPage = () => import('@/pages/SpectrumPage.vue') // ← SFC

// const routes = [
//   { path: '/', redirect: '/vrms/compare' },
//   { path: '/vrms/compare', component: VrmsComparePage, name: 'vrms-compare' },
//   { path: '/spectrum', component: SpectrumPage, name: 'spectrum' },
//   { path: '/:pathMatch(.*)*', redirect: '/vrms' },
// ]

// export const router = createRouter({ history: createWebHistory(), routes })
