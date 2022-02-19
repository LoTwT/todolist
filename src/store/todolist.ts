import { getLocalStorage } from "@/utils"
import type { ITodoItem } from "@/views/Todolist"

export interface ITodolistState {
  todolist: ITodoItem[]
}

export const useTodolistStore = defineStore("todolist", {
  state: (): ITodolistState => ({
    todolist: getLocalStorage("todolist") || [],
  }),
  actions: {},
})
