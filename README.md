# Class-Static-Display-Page

这是一个基于 Nuxt 框架的静态页面展示项目，旨在提供简洁高效的前端展示能力，适用于课程信息、班级数据等静态内容的可视化呈现。

## 功能特性

- 静态页面渲染与路由管理
- 内容模块化管理（通过 @nuxt/content）
- 响应式 UI 组件展示（使用 @nuxt/ui）
- 图像优化加载（@nuxt/image）
- 地图标记聚合展示（@googlemaps/markerclusterer）
- SEO 友好元信息管理（via @unhead/vue）
- 动画支持（GSAP）

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## GSAP 使用说明

项目已集成 GSAP 动画库，可以通过以下方式使用：

### 在组件中使用

```vue
<script setup>
const { $gsap } = useNuxtApp()

function animateElement() {
  $gsap.to(element.value, {
    x: 100,
    duration: 1,
    ease: "power2.out"
  })
}
</script>
```

### 创建时间轴动画

```vue
<script setup>
const { $gsap } = useNuxtApp()
const tl = $gsap.timeline()

function complexAnimation() {
  tl.to(element1.value, { opacity: 1, duration: 0.5 })
    .to(element2.value, { x: 100, duration: 0.5 })
    .to(element3.value, { rotation: 360, duration: 1 })
}
</script>
```

### 更多 GSAP 功能

项目中已包含完整的 GSAP 库，可以使用所有 GSAP 功能，包括：
- TweenMax/TweenLite
- TimelineMax/TimelineLite
- 各种插件如 Draggable, ScrollTrigger 等

参考 [GSAP 官方文档](https://greensock.com/docs/) 获取更多信息。