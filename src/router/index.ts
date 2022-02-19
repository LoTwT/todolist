import { createRouter, createWebHistory } from "vue-router"
import Todolist from "@/views/Todolist"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Todolist,
    },
  ],
})

export default router
