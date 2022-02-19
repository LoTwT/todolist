<script setup lang="ts">
import dayjs from "dayjs"

const date = ref("")
const time = ref("")

const getCurrent = () => {
  const current = dayjs().format("YYYY-MM-DD HH:mm:ss")
  ;[date.value, time.value] = current.split(" ")
}

const intervalNum = ref()

onBeforeMount(() => {
  intervalNum.value = setInterval(() => getCurrent(), 1000)
})

onUnmounted(() => {
  clearInterval(intervalNum.value)
})
</script>

<template>
  <div>{{ date }} - {{ time }}</div>
</template>

<style scoped></style>
