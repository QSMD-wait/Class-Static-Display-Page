<template>
  <div class="gsap-advanced-example">
    <h2>GSAP 高级动画示例</h2>
    
    <!-- 示例1: 序列动画 -->
    <div class="example-section">
      <h3>序列动画</h3>
      <div class="animation-container">
        <div ref="sequenceBox1" class="box red">1</div>
        <div ref="sequenceBox2" class="box blue">2</div>
        <div ref="sequenceBox3" class="box green">3</div>
      </div>
      <button @click="playSequenceAnimation">播放序列动画</button>
    </div>
    
    <!-- 示例2: 时间轴动画 -->
    <div class="example-section">
      <h3>时间轴动画</h3>
      <div class="animation-container">
        <div ref="timelineBox" class="box purple">TL</div>
      </div>
      <button @click="playTimelineAnimation">播放时间轴动画</button>
    </div>
    
    <!-- 示例3: 往复动画 -->
    <div class="example-section">
      <h3>往复动画</h3>
      <div class="animation-container">
        <div ref="yoyoBox" class="box orange">YOYO</div>
      </div>
      <button @click="playYoyoAnimation">播放往复动画</button>
    </div>
    
    <!-- 示例4: 路径动画 -->
    <div class="example-section">
      <h3>路径动画</h3>
      <div class="animation-container">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path 
            ref="motionPath" 
            d="M 20 100 Q 100 10 180 100 T 180 190" 
            fill="none" 
            stroke="#ddd" 
            stroke-width="2"
          />
          <circle ref="pathBox" cx="20" cy="100" r="10" fill="#42b883" />
        </svg>
      </div>
      <button @click="playPathAnimation">播放路径动画</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof gsap }

// 注册插件
$gsap.registerPlugin(MotionPathPlugin)

// 序列动画元素引用
const sequenceBox1 = ref<HTMLElement | null>(null)
const sequenceBox2 = ref<HTMLElement | null>(null)
const sequenceBox3 = ref<HTMLElement | null>(null)

// 时间轴动画元素引用
const timelineBox = ref<HTMLElement | null>(null)

// 往复动画元素引用
const yoyoBox = ref<HTMLElement | null>(null)

// 路径动画元素引用
const motionPath = ref<SVGPathElement | null>(null)
const pathBox = ref<SVGCircleElement | null>(null)

// 序列动画
function playSequenceAnimation() {
  if (sequenceBox1.value && sequenceBox2.value && sequenceBox3.value) {
    // 重置位置
    $gsap.set([sequenceBox1.value, sequenceBox2.value, sequenceBox3.value], { 
      x: 0, 
      y: 0, 
      rotation: 0 
    })
    
    // 创建序列动画
    $gsap.to(sequenceBox1.value, {
      x: 100,
      rotation: 360,
      duration: 1,
      ease: "power2.out"
    })
    .then(() => {
      return $gsap.to(sequenceBox2.value!, {
        x: 100,
        rotation: 360,
        duration: 1,
        ease: "power2.out"
      })
    })
    .then(() => {
      return $gsap.to(sequenceBox3.value!, {
        x: 100,
        rotation: 360,
        duration: 1,
        ease: "power2.out"
      })
    })
  }
}

// 时间轴动画
function playTimelineAnimation() {
  if (timelineBox.value) {
    // 重置位置
    $gsap.set(timelineBox.value, { 
      x: 0, 
      y: 0, 
      rotation: 0,
      scale: 1
    })
    
    // 创建时间轴
    const tl = $gsap.timeline()
    
    tl.to(timelineBox.value, {
      x: 100,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(timelineBox.value, {
      y: 50,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(timelineBox.value, {
      rotation: 360,
      scale: 1.5,
      duration: 0.5,
      ease: "back.out(1.7)"
    })
    .to(timelineBox.value, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "power2.in"
    })
  }
}

// 往复动画
function playYoyoAnimation() {
  if (yoyoBox.value) {
    // 重置位置
    $gsap.set(yoyoBox.value, { 
      x: 0 
    })
    
    // 创建往复动画
    $gsap.to(yoyoBox.value, {
      x: 150,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 3
    })
  }
}

// 路径动画
function playPathAnimation() {
  if (pathBox.value && motionPath.value) {
    // 重置位置
    $gsap.set(pathBox.value, {
      cx: 20,
      cy: 100
    })
    
    // 创建路径动画
    $gsap.to(pathBox.value, {
      duration: 3,
      ease: "power1.inOut",
      motionPath: {
        path: motionPath.value,
        align: motionPath.value,
        autoRotate: true
      }
    })
  }
}
</script>

<style scoped>
.gsap-advanced-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.animation-container {
  height: 100px;
  margin: 20px 0;
  position: relative;
  border: 1px dashed #ddd;
}

.box {
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 4px;
}

.red { background-color: #f44336; }
.blue { background-color: #2196f3; left: 60px; }
.green { background-color: #4caf50; left: 120px; }
.purple { background-color: #9c27b0; }
.orange { background-color: #ff9800; }

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #359c6d;
}
</style>