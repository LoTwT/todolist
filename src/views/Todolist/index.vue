<script setup lang="ts">
import { useTodolistStore } from "@/store/todolist"
import { removeLocalStorage, setLocalStorage } from "@/utils"

const todolistStore = useTodolistStore()
const { todolist } = storeToRefs(todolistStore)
todolistStore.$subscribe((mutation, state) => {
  const key = "todolist"
  if (mutation.storeId === key) {
    if (state.todolist.length === 0) {
      removeLocalStorage(key)
    } else {
      setLocalStorage(key, state.todolist)
    }
  }
})

const inputValue = ref("")

const addTodo = () => {
  if (inputValue.value === "") return

  todolist.value.push({ title: inputValue.value, done: false })
  inputValue.value = ""
}

const doneCount = computed(() => todolist.value.filter((t) => t.done).length)
const totalCount = computed(() => todolist.value.length)
const isAllDone = computed({
  get() {
    return doneCount.value === totalCount.value
  },
  set(value: boolean) {
    todolist.value.forEach((t) => (t.done = value))
  },
})

const removeTodo = (index: number) => todolist.value.splice(index, 1)
const clearTodo = () => (todolist.value = todolist.value.filter((t) => !t.done))
</script>

<template>
  <div class="todolist">
    <a-input v-model:value="inputValue" />

    <a-button type="primary" @click="addTodo">添加</a-button>
    <a-button type="default" @click="clearTodo">清理</a-button>

    <div class="todolist-content" v-if="todolist.length">
      <a-list :data-source="todolist">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <a-checkbox v-model:checked="item.done">
              <span :class="{ done: item.done }">{{ item.title }}</span>
            </a-checkbox>

            <span @click="() => removeTodo(index)">❌</span>
          </a-list-item>
        </template>
      </a-list>

      <a-checkbox v-model:checked="isAllDone">全选</a-checkbox>
      <span>{{ doneCount }} / {{ totalCount }}</span>
    </div>

    <div v-else>暂无数据</div>
  </div>
</template>

<style scoped lang="less">
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
