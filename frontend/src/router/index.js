import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/formation',
    name: 'Formation',
    component: () => import('../views/Formation/Formation.vue')
  },
  {
    path: '/formation/new',
    name: 'Formation-new',
    component: () => import('../views/Formation/Formation-new.vue')
  },
  {
    path: '/formation/edit/:idFormation',
    name: 'Formation-edit',
    component: () => import('../views/Formation/Formation-edit.vue')
  },
  {
    path: '/formation/add-periode/:idFormation',
    name: 'Formation-add-periode',
    component: () => import('../views/Formation/Periode-new.vue')
  },
  {
    path: '/formation/edit-periode/:idFormation/:idPeriode',
    name: 'Formation-edit-periode',
    component: () => import('../views/Formation/Periode-edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
