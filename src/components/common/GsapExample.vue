<template>
  <div class="gsap-example">
    <h2>GSAP 动画示例</h2>
    <div ref="boxRef" class="animated-box">动画盒子</div>
    <button @click="startAnimation">开始动画</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="debugInfo" class="debug">{{ debugInfo }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { gsap } from 'gsap'

const boxRef = ref<HTMLElement | null>(null)
const error = ref<string | null>(null)
const debugInfo = ref<string | null>(null)
const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof gsap }

onMounted(() => {
  // 检查GSAP是否正确加载
  debugInfo.value = `GSAP加载状态: ${!!$gsap ? '已加载' : '未加载'}`
  
  if (!$gsap) {
    error.value = 'GSAP 未正确加载'
  } else {
    debugInfo.value += ` | GSAP版本: ${$gsap.version || '未知'}`
  }
})

function startAnimation() {
  try {
    error.value = null
    
    if (!$gsap) {
      error.value = 'GSAP 未正确加载'
      console.error('GSAP not loaded:', $gsap)
      return
    }
    
    if (!boxRef.value) {
      error.value = '动画元素未找到'
      console.error('Animation element not found:', boxRef.value)
      return
    }
    
    debugInfo.value = `执行动画: 元素存在=${!!boxRef.value}, GSAP存在=${!!$gsap}`
    
    // 执行动画
    $gsap.to(boxRef.value, {
      x: 100,
      rotation: 360,
      duration: 2,
      ease: "power2.out"
    })
  } catch (err: any) {
    error.value = `动画执行错误: ${err.message}`
    console.error('GSAP Animation Error:', err)
  }
}
</script>

<style scoped>
.gsap-example {
  padding: 20px;
  text-align: center;
}

.animated-box {
  width: 100px;
  height: 100px;
  background-color: #42b883;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

.error {
  color: red;
  margin-top: 10px;
}

.debug {
  color: blue;
  margin-top: 10px;
  font-size: 12px;
}
</style>