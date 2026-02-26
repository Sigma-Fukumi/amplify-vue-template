import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu.vue'
import Todos from '@/components/Todos.vue'
import AiRecipe from '@/components/AiRecipe.vue'
import File from '@/components/File.vue'
import SayHello from '@/components/SayHello.vue'

const routes = [
  {
    path: '/',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos,
  },
  {
    path:'/airecipe',
    name: 'airecipe',
    component: AiRecipe,
  },
  {
    path:'/file',
    name: 'file',
    component: File,
  },
  {
    path:'/sayhello',
    name: 'sayhello',
    component: SayHello,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
