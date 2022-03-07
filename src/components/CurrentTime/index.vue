<script setup lang="ts">
import dayjs from "dayjs"

const show = ref(false)

const current = ref("")
const getCurrent = () => {
  current.value = dayjs().format("YYYY-MM-DD HH:mm:ss")
}

const intervalNum = ref()

onBeforeMount(() => {
  intervalNum.value = setInterval(() => getCurrent(), 1000)
})

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalNum.value)
})
</script>

<template>
  <n-space vertical align="center" style="height: 100px">
    <transition name="slide-fade" appear>
      <n-gradient-text v-if="show" type="info" :size="64">
        {{ current }}
      </n-gradient-text>
    </transition>
  </n-space>
</template>

<style scoped lang="less">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
