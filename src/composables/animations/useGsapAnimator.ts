
/**
 * @file: /src/composables/animations/useGsapAnimator.ts
 * @description: 一个可复用的 Vue Composable，用于优雅地管理 GSAP 动画的生命周期。
 *              它利用 gsap.context() 来确保所有在回调中创建的动画和事件监听器
 *              都能在组件卸载时被自动、安全地清理，有效防止内存泄漏。
 * @version: 1.0.0
 * @author: '青色漫地_wait'
 * @date: 2025-10-04
 *
 * @example
 * import { useGsapAnimator } from '@/composables/animations/useGsapAnimator';
 *
 * useGsapAnimator((gsap, context) => {
 *   // 这里的 context 是一个响应式的 ref，包含了 gsap 实例和 context 实例
 *   // 可以在这里安全地创建你的 GSAP 动画
 *   gsap.to('.my-element', { x: 100, duration: 1 });
 * });
*/
import { onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import type { gsap } from 'gsap';

/**
 * @description GSAP 动画上下文回调函数类型。
 * @param {typeof gsap} gsapInstance - 全局 GSAP 实例。
 * @param {gsap.Context} context - GSAP 上下文实例。
 */
type GsapAnimation = (gsapInstance: typeof gsap, context: gsap.Context) => void;

/**
 * @description 一个优雅管理 GSAP 动画生命周期的 Vue Composable。
 *              自动处理 GSAP 上下文的创建和清理。
 * @param {GsapAnimation} animationFunction - 一个包含所有 GSAP 动画逻辑的函数。
 *                                            该函数将在组件挂载后执行。
 */
export const useGsapAnimator = (animationFunction: GsapAnimation) => {
  // GSAP 上下文实例，用于追踪和清理动画
  let ctx: gsap.Context;

  onMounted(() => {
    const { $gsap } = useNuxtApp();

    // 创建一个 GSAP 上下文，并将动画逻辑包裹在其中
    // 这确保了所有相关的动画、滚动触发器和事件监听器都会被记录下来
    ctx = $gsap.context((self) => {
      animationFunction($gsap, self);
    });
  });

  onUnmounted(() => {
    // 在组件卸载时，调用 revert() 方法
    // 这会安全地将所有在上下文中创建的动画和事件恢复到它们的初始状态，并进行清理
    if (ctx) {
      ctx.revert();
    }
  });
};