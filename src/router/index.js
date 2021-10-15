import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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

router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.set(0.1)
  next()
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 500)
})

export default router
