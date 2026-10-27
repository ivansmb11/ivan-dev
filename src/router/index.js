import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { scrollBehavior } from '@/motion'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agents',
      name: 'agents',
      component: () => import('@/views/AgentsView.vue')
    },
    {
      path: '/concierge',
      name: 'concierge',
      component: () => import('@/views/ConciergeView.vue')
    },
    {
      path: '/vibebify',
      name: 'vibebify',
      component: () => import('@/views/VibebifyView.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: scrollBehavior() }
    }
    return { top: 0, behavior: scrollBehavior() }
  }
})

export default router
