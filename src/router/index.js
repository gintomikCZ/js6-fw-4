import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      // beforeEnter: (to, from) => {
      //   // analýza, výpočet
      //   return false
      // }
    },
    {
      path: '/table',
      name: 'table',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/TablePage.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../pages/GamesPage.vue')
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('../pages/EmployeesPage.vue')
    },
    {
      path: '/employeeform',
      name: 'employeeFormAdd',
      component: () => import('../pages/EmployeeFormPage.vue')
    },
    {
      path: '/employeeform/:id',
      name: 'employeeFormEdit',
      component: () => import('../pages/EmployeeFormPage.vue')
    },
    {
      path: '/teamform',
      name: 'teamform',
      component: () => import('../pages/TeamFormPage.vue')
    },
    {
      path: '/teamform/:id',
      name: 'teamformedit',
      component: () => import('../pages/TeamFormPage.vue')
    },
    {
      path: '/gameform',
      name: 'gameform',
      component: () => import('../pages/GameFormPage.vue')
    },
    {
      path: '/gameform/:id',
      name: 'gameformedit',
      component: () => import('../pages/GameFormPage.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../pages/ErrorPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      beforeEnter () {
        store.commit('setErrorMsg', '404 - this page is not available on the site')
      },
      component: () => import('../pages/ErrorPage.vue')
    },
  ]
})

router.beforeEach((to, from) => {
  store.commit('switchLoading', true)
})

export default router
