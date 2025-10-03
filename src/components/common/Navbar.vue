<!--
 * @file: /src/components/common/Navbar.vue
 * @description: 网站的全局导航栏组件。
 *              负责显示网站 Logo/标题和主要导航链接。
 * @version: 1.0.0
 * @author: '青色漫地_wait'
 * @date: 2025-10-02
 * 
 * @logic
 *   - 暂无复杂的脚本逻辑，是一个纯展示性组件。
 * 
 * @style
 *   - 样式由 /src/assets/style/components/common/_Navbar.scss 全局引入和管理。
-->
<template>
  <header class="navbar">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">
        <!-- Logo or Site Title -->
        <span class="navbar__site-title">班级主页</span>
      </a>
    </div>
    <nav class="navbar__nav">
      <ul class="navbar__nav-list">
        <li class="navbar__nav-item">
          <a href="#home" class="navbar__nav-link">首页</a>
        </li>
        <li class="navbar__nav-item">
          <a href="#news" class="navbar__nav-link">班级动态</a>
        </li>
        <li class="navbar__nav-item">
          <a href="#gallery" class="navbar__nav-link">照片墙</a>
        </li>
        <li class="navbar__nav-item">
          <a href="#contact" class="navbar__nav-link">联系我们</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// 暂时没有脚本逻辑
</script>

<style lang="scss" scoped>
/*
  此组件的样式由 /src/assets/style/main.scss 全局引入。
  scoped 属性确保此处的任何潜在样式（目前为空）不会泄露到全局。
*/
</style>