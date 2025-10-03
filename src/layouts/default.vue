<!--
 * @file: /src/layouts/default.vue
 * @description: 网站的默认布局文件。定义了包含导航栏和主内容区的基本页面结构，并集成了 GSAP 上下文管理。
 * @version: 1.2.0
 * @author: '青色漫地_wait'
 * @date: 2025-10-02
 *
 * @history
 * - 2024-07-18: 1.2.0 - 移除 GSAP 动画示例代码，并修复 TypeScript 类型问题。
 * - 2024-07-17: 1.1.0 - 将 GSAP 动画逻辑迁移至此，并使用 context 管理。
 * - 2024-10-02: 1.0.0 - 初始化布局文件。
 *
 * @components
 *   - @/components/common/Navbar.vue: 全局导航栏
-->
<template>
  <div class="default-layout">
    <Navbar />
    <main class="default-layout__main">
      <slot />
    </main>
    <!-- 页脚可以稍后添加到这里 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import type { gsap } from 'gsap';
import Navbar from '@/components/common/Navbar.vue';

// -- Refs --
// GSAP 上下文，用于管理动画生命周期
let ctx: gsap.Context;

// -- Hooks --
onMounted(() => {
  const { $gsap } = useNuxtApp();

  // 使用 gsap.context() 来包裹所有的 GSAP 调用
  // 这将确保在组件卸载时，所有相关的动画和事件监听器都会被自动清理
  ctx = $gsap.context(() => {
    // 在这里可以安全地创建动画...
  });
});

onUnmounted(() => {
  // 显式调用 revert() 来清理上下文中的所有动画
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/style/base/global' as global;

.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 确保布局至少占满整个视口高度
  background-color: global.$color-background; // 使用全局定义的背景色
}

.default-layout__main {
  flex-grow: 1; // 让主内容区域占据剩余的所有空间
  padding: global.$spacing-xl; // 为主内容区提供一些内边距
}
</style>