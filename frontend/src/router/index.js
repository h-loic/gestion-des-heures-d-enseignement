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
  },
  {
    path: '/enseignant',
    name: 'Enseignant',
    component: () => import('../views/Enseignant/enseignant.vue')
  },
  {
    path: '/enseignant/statut',
    name: 'Statut',
    component: () => import('../views/Enseignant/statut.vue')
  },
  {
    path: '/enseignant/statut/new',
    name: 'Statut-new',
    component: () => import('../views/Enseignant/statut-new.vue')
  },
  {
    path: '/enseignant/statut/edit/:idStatut',
    name: 'Statut-edit',
    component: () => import('../views/Enseignant/statut-edit.vue')
  },
  {
    path: '/enseignant/new',
    name: 'Enseignant-new',
    component: () => import('../views/Enseignant/enseignant-new.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
