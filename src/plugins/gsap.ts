import { gsap } from 'gsap'

/*
 * @file: /plugins/gsap.ts
 * @description: GSAP Nuxt 插件。
 *              用于在 Nuxt 应用中集成和提供 GSAP 实例。
 *              通过这个插件，我们可以在任何组件或页面中通过 `useNuxtApp().$gsap` 来访问 GSAP。
 * @version: 1.0.0
 * @author: '青色漫地_wait'
 * @date: 2025-10-03
*/
// @ts-ignore
export default defineNuxtPlugin((nuxtApp: any) => {
  // 只使用返回对象的方式提供 GSAP 实例，避免重复定义
  return {
    provide: {
      gsap: gsap
    }
  }
})
