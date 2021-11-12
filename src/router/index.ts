import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/setting',
    name: 'GameSettings',
    component: () => import('../pages/GameSettings.vue')
  },
  {
    path: '/othello',
    name: 'Othello',
    component: () => import('../pages/Othello.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
