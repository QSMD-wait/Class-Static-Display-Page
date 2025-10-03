import { gsap } from 'gsap';

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
export default defineNuxtPlugin((nuxtApp) => {
  // 将 GSAP 实例注入到 Nuxt 应用中
  nuxtApp.provide('gsap', gsap);
  
  // 添加调试信息到控制台
  // @ts-ignore
  if (process.client) {
    console.log('GSAP Plugin Loaded:', {
      gsapVersion: gsap.version,
      gsapObject: typeof gsap,
      hasToMethod: typeof gsap.to === 'function'
    });
  }
  
  return {
    provide: {
      gsap
    }
  }
});