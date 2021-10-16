import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/Home/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/Home/Register.vue')
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: () => import('@/views/Home/Forgot.vue')
      },
      {
        path: 'reset/:token',
        name: 'reset',
        component: () => import('@/views/Home/Reset.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: () => import('@/views/Dashboard/Home.vue')
      },
      {
        path: 'classes',
        component: () => import('@/views/Dashboard/Classes.vue')
      },
      {
        path: 'topics',
        component: () => import('@/views/Dashboard/Topics.vue')
      },
      {
        path: 'exams',
        component: () => import('@/views/Dashboard/Exams.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Dashboard/Settings.vue')
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

  if(localStorage.getItem('token') === null) {
    if(to.name !== "login" && to.name !== "register" && to.name !== "forgot" && to.name !== "reset") 
      next({ path: '/' })
    else
      next()
  } else {
    if(to.name === "login" || to.name === "register" || to.name === "forgot" || to.name === "reset") 
      next({ path: '/dashboard' })
    else
      next()
  } 
  
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 500)
})

export default router
