<script setup lang="ts">
import { useThemeStore } from "@/store/theme"
import { setLocalStorage } from "@/utils"

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

themeStore.$subscribe((mutation, state) => {
  const storeId = "theme"

  if (mutation.storeId === storeId) {
    setLocalStorage("isDark", state.isDark)
  }
})

const icon = computed(() => (isDark.value === true ? "☀" : "🌙"))
</script>

<template>
  <div class="change-theme" @click="isDark = !isDark">
    {{ icon }}
  </div>
</template>

<style scoped lang="less">
.change-theme {
  font-size: 24px;
  position: fixed;
  right: 4px;
  top: 4px;
  cursor: pointer;
  user-select: none;
}
</style>
