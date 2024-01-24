import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../components/Calculator.vue'
import Kontakt_skjema from '../components/Kontakt_skjema.vue'

const routes = [
  {
    path: '/',
    component: Calculator
  },
  {
    path: '/kontaktskjema',
    component: Kontakt_skjema
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
