import type { RouteRecordRaw } from 'vue-router'
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: LoginView, meta: { public: true } },
  { path: '/home', component: HomeView },
  // TODO: /info /companion /users
]

