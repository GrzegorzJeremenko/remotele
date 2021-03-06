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
      },
      {
        path: '/confirm-email/:token',
        name: 'confirmEmail',
        component: () => import('@/views/ConfirmEmail.vue')
      },
    ]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Start',
        component: () => import('@/views/Dashboard/Home.vue')
      },
      {
        path: 'classes',
        name: 'Klasy',
        component: () => import('@/views/Dashboard/GroupList.vue')
      },
      {
        path: 'subjects',
        name: 'Przedmioty',
        component: () => import('@/views/Dashboard/SubjectsList.vue')
      },
      {
        path: 'classes/:_id',
        name: 'Klasa',
        component: () => import('@/views/Dashboard/Group.vue')
      },
      {
        path: 'topics',
        name: 'Tematy',
        component: () => import('@/views/Dashboard/Topics.vue')
      },
      {
        path: 'exams',
        name: 'Testy',
        component: () => import('@/views/Dashboard/Exams.vue')
      },
      {
        path: 'settings',
        name: 'Ustawienia',
        component: () => import('@/views/Dashboard/Settings.vue')
      },
      {
        path: 'creator/:mode/:_id',
        name: 'Kreator',
        component: () => import('@/views/Dashboard/Creator.vue')
      },
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
    if(to.name !== "login" && to.name !== "register" && to.name !== "forgot" && to.name !== "reset" && to.name !== "confirmEmail") 
      next({ path: '/' })
    else
      next()
  } else {
    if(to.name === "login" || to.name === "register" || to.name === "forgot" || to.name === "reset" || to.name === "confirmEmail") 
      next({ path: '/dashboard' })
    else
      next()
  } 
  
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 500)
})

export default router
