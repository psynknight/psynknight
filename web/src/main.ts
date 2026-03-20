import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta?.public) return true
  const res = await fetch('/api/users/me', { credentials: 'include' })
  if (res.ok) return true
  return { path: '/login', query: { redirect: to.fullPath } }
})

createApp(App).use(router).mount('#app')
