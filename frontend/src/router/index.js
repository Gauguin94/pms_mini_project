import { createRouter, createWebHistory } from 'vue-router'
import BearingDashboard from './BearingDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bearing-dashboard',
      component: BearingDashboard,
    },
  ],
})

export default router
