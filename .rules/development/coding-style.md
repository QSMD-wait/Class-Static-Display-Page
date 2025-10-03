---
rule_id: "development-coding-style"
version: "1.1.0"
category: "Development"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-02"
description: "定义了项目中通用代码的编写规范，以确保代码的一致性、可维护性和可扩展性。"
severity: "critical"
scope: ["js", "ts", "vue"]
---

# 通用代码规范指南 {#summary}

本指南详细定义了项目中通用代码的编写规范，旨在确保代码的一致性、可维护性和可扩展性。所有贡献者都 **MUST** 严格遵守。

## 1. 命名约定 (Naming Conventions) {#naming-conventions}

- **变量与函数**: **MUST** 使用小驼峰命名法 (`camelCase`)。
  - ✅ `const studentName = '...';`
  - ✅ `function getStudentList() { ... }`
- **类与组件**: **MUST** 使用大驼峰命名法 (`PascalCase`)。
  - ✅ `class StudentManager { ... }`
  - ✅ `StudentCard.vue`
- **常量**: 对于项目级、永不改变的硬编码常量，**SHOULD** 使用全大写蛇形命名法 (`UPPER_SNAKE_CASE`)。
  - ✅ `const MAX_RETRY_COUNT = 3;`
- **描述性与上下文**: 命名 **MUST** 清晰并具有描述性，能准确反映其作用。在适当的情况下，**SHOULD** 在命名中包含其所属的组件或页面上下文，以增强可读性和可维护性。
  - ✅ **正面示例**: `const userProfileAvatar = ref(null);`, `function fetchUserCardData() { ... }`
  - ❌ **反面示例**: `const avatar = ref(null);`, `function getData() { ... }`

## 2. 注释规范 (Commenting Guidelines) {#commenting-guidelines}

代码 **MUST** 包含清晰、有意义的注释，以解释“为什么”而不是“做什么”。

- **文件头部注释**: 每个重要的 `.ts` 或 `.vue` 文件 **SHOULD** 包含一个文件头注释，说明文件的用途、作者和版本历史。
  ```typescript
  /**
   * @file StudentApiService.ts
   * @description 学生信息相关的 API 服务
   * @author 青色漫地_wait
   * @version 1.0.0
   * @date 2025-10-01
   */
  ```
- **函数/方法注释**: 所有公共函数和方法 **MUST** 使用 JSDoc 风格的注释，清晰地描述其功能、参数和返回值。
  ```typescript
  /**
   * 获取指定班级的学生列表
   * @param classId - 班级的唯一标识符
   * @returns {Promise<Student[]>} - 包含学生对象的数组
   */
  async function getStudentsByClass(classId: string): Promise<Student[]> {
    // ...
  }
  ```
- **复杂逻辑注释**: 对于复杂的算法或业务逻辑，**MUST** 在代码块上方添加注释进行解释。
- **引用与依赖注释**: 当代码块依赖于其他文件、组件或模块时，**SHOULD** 在注释中简要说明其依赖关系，方便追溯。
  ```typescript
  // 使用了 ../utils/formatters.ts 中的 formatDate 函数
  import { formatDate } from '../utils/formatters';
  ```

## 3. GSAP 使用规范 {#gsap-usage}

为了防止动画实例在组件销毁时未能正确清理而导致的内存泄漏，所有 GSAP 动画 **MUST** 在 `gsap.context()` 中创建。

- **创建与清理**: **MUST** 在 Vue 的 `onMounted` 生命周期钩子中创建 `gsap.context()`，并在 `onUnmounted` 中调用其 `revert()` 方法进行清理。

  ```vue
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import gsap from 'gsap';

  const main = ref();
  let ctx: gsap.Context;

  onMounted(() => {
    ctx = gsap.context(() => {
      // 所有的 GSAP 动画和滚动触发器都在这里创建
      gsap.to('.box', { rotation: 360 });
    }, main.value); // <-- 将上下文作用域限定在 main 元素内
  });

  onUnmounted(() => {
    ctx.revert(); // <-- 清理上下文中的所有动画和触发器
  });
  </script>
  ```

- **作用域**: **SHOULD** 将 `gsap.context()` 的作用域限定在组件的根元素上，以避免意外影响到其他组件。

## 4. 代码审查 (Code Review) {#code-review}

- **自我审查**: 在提交代码以供审查之前，开发者 **MUST** 对自己的代码进行全面的自我审查。这包括检查潜在的 bug、逻辑漏洞、性能问题，并思考是否有更简洁或高效的实现方式。
- **同行审查**: 所有提交到主分支的代码 **MUST** 经过至少一名其他团队成员的审查（Peer Review）。
- **审查标准**: 审查者 **MUST** 确保代码遵循了本文档中定义的所有规范，并符合项目的整体架构和质量标准。

## 5. 日志记录 (Logging) {#logging}

- **禁止 `console.log`**: **MUST NOT** 在生产代码中使用 `console.log`。应使用专门的日志库。
- **日志级别**: **SHOULD** 根据信息的重要性使用不同的日志级别（如 `DEBUG`, `INFO`, `WARN`, `ERROR`）。

---

让我们一起用规范和爱，构建一个稳定又可爱的项目吧！喵~