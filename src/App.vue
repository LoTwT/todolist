<script setup lang="ts">
import { useThemeStore } from "./store/theme"

const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.theme">
    <!-- 当前时间 -->
    <current-time></current-time>

    <router-view></router-view>

    <!-- 切换主题按钮 -->
    <change-theme></change-theme>

    <!-- 同步 body 元素样式以配合主题切换 -->
    <n-global-style />
  </n-config-provider>
</template>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
</style>
