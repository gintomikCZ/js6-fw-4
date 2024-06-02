import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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
    }
  ]
})

export default router
