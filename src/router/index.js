import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import PostDetailsPage from '../components/PostDetailsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/post/:id', component: PostDetailsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router