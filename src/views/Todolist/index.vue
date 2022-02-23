<script setup lang="ts">
import { useTodolistStore } from "@/store/todolist"
import { getRandomId, removeLocalStorage, setLocalStorage } from "@/utils"
import { NButton, NInput, NSpace, type DataTableColumns } from "naive-ui"
import type { ITodoItem } from "."

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

const doneCount = computed(() => todolist.value.filter((t) => t.done).length)
const totalCount = computed(() => todolist.value.length)

const addTodo = () => {
  todolist.value.push({
    id: getRandomId(),
    title: inputValue.value,
    done: false,
  })
  inputValue.value = ""
}
const removeTodo = (index: number) => todolist.value.splice(index, 1)
const clearTodo = () => (todolist.value = todolist.value.filter((t) => !t.done))

const moveTodo = (index: number, isUp: boolean) => {
  const otherIndex = isUp ? index - 1 : index + 1

  if (otherIndex < 0 || otherIndex > todolist.value.length - 1) return
  ;[todolist.value[index], todolist.value[otherIndex]] = [
    todolist.value[otherIndex],
    todolist.value[index],
  ]
}

const checkedRowKeys = computed(() =>
  todolist.value.filter((t) => t.done).map((t) => t.id),
)
const onUpdateSelections = (rowKeys: (string | number)[]) => {
  todolist.value.forEach((todo) => (todo.done = false))

  rowKeys.forEach((id) => {
    const todo = todolist.value.find((todo) => todo.id === id)
    todo && (todo.done = true)
  })
}

const dataColumns: DataTableColumns<ITodoItem> = [
  {
    type: "selection",
  },
  {
    title: "No.",
    key: "no",
    width: "80",
    render: (rowData, rowIndex) => rowIndex + 1,
  },
  {
    title: "Title",
    key: "title",
    render: (rowData, rowIndex) =>
      h(NInput, {
        value: rowData.title,
        onUpdateValue(v) {
          todolist.value[rowIndex].title = v
        },
      }),
  },
  {
    title: "Action",
    key: "action",
    width: "120",
    render: (rowData, rowIndex) =>
      h(NSpace, () => [
        h(
          NButton,
          {
            type: "default",
            circle: true,
            size: "tiny",
            disabled: rowIndex === 0,
            onClick: () => moveTodo(rowIndex, true),
          },
          { default: () => "↑" },
        ),
        h(
          NButton,
          {
            type: "default",
            circle: true,
            size: "tiny",
            disabled: rowIndex === todolist.value.length - 1,
            onClick: () => moveTodo(rowIndex, false),
          },
          { default: () => "↓" },
        ),

        h(
          NButton,
          {
            type: "default",
            circle: true,
            size: "tiny",
            onClick: () => removeTodo(rowIndex),
          },
          { default: () => "✖" },
        ),
      ]),
  },
]
</script>

<template>
  <n-space justify="center" align="center" vertical>
    <n-card hoverable size="large" class="card">
      <template #default>
        <n-data-table
          :columns="dataColumns"
          :data="todolist"
          :bordered="false"
          :max-height="430"
          :row-key="(rowData) => rowData.id"
          :checked-row-keys="checkedRowKeys"
          @update:checked-row-keys="onUpdateSelections"
        />
      </template>

      <template #action>
        <n-space justify="end">
          <n-button type="default" circle @click="clearTodo">➖</n-button>
          <n-button type="default" circle @click="addTodo">➕</n-button>
        </n-space>
      </template>
    </n-card>

    <span>{{ doneCount }} / {{ totalCount }}</span>
  </n-space>
</template>

<style scoped lang="less">
.card {
  width: 60vw;
  height: 60vh;
}

:deep(.n-card__content) {
  padding: 0 !important;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
