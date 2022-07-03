import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ErrorPage from '../views/404.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: MainView,
    alias: '/'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/:any(.*)',
    name: '404',
    component:  ErrorPage
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
