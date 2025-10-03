<!--
 * @file: app.vue
 * @description: Nuxt3 应用的根组件。
 * @version: 1.0.0
 * @author: '青色漫地_wait'
 * @date: 2025-10-01
 *
 * @history:
 *   - 2025-10-01: 初始创建，作为应用布局和路由的入口点。
 *   - 2025-10-02: 移除所有布局和样式，使其成为一个纯粹的路由渲染容器。
-->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// 此处为 <script setup> 区域，用于编写组合式 API。
// 在这个纯粹的路由容器中，我们目前不需要任何特定的逻辑。
</script>

<style>
/*
  全局样式建议在 assets/css/main.css 或类似文件中定义，
  并通过 nuxt.config.ts 进行引入，以保持根组件的纯净。
*/
</style>