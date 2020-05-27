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
    component: () => import('../views/Formation.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router