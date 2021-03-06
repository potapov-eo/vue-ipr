import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MainView from '../views/main-view.vue'
import ErrorPage from '../views/404.vue'

const routes = [
  {
    path: '/weather:any(.*)',
    name: 'weather',
    component: MainView
  },
  {
    path: '/',
    name: 'home',
    redirect: '/weather'
  },
  {
    path: '/:any(.*)',
    name: '404',
    component: ErrorPage
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
