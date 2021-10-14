import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('@/views/Home/Login.vue')
      },
      {
        path: 'register',
        component: () => import('@/views/Home/Register.vue')
      },
      {
        path: 'forgot',
        component: () => import('@/views/Home/Forgot.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
