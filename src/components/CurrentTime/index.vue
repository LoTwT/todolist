<script setup lang="ts">
import dayjs from "dayjs"

const date = ref("YYYY-MM-DD")
const time = ref("HH:mm:ss")

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
  <n-space vertical align="center">
    <n-gradient-text type="info" :size="64">
      {{ date }} {{ time }}
    </n-gradient-text>
  </n-space>
</template>

<style scoped lang="less"></style>
