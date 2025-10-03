---
rule_id: "development-css-style"
version: "1.0.0"
category: "Development"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "定义了项目中 CSS 和样式代码的编写规范，以确保代码的一致性、可维护性和可扩展性。"
severity: "critical"
scope: ["css", "scss", "vue"]
---

# CSS 编码规范指南 {#summary}

本指南详细定义了项目中 CSS 和样式代码的编写规范，旨在确保样式代码的一致性、可维护性和可扩展性。所有贡献者都 **MUST** 严格遵守。

## 1. 命名约定 (Naming Conventions) {#naming-conventions}

为了清晰地反映组件结构，所有类名 **MUST** 采用 **BEM (Block, Element, Modifier)** 命名方法。

### 1.1. 块 (Block) {#naming-block}

代表独立的、可复用的组件。命名 **MUST** 清晰、简洁，反映其用途。
- **格式**: `.block-name`
- ✅ **正面示例**: `.student-card`, `.main-header`, `.user-profile`

### 1.2. 元素 (Element) {#naming-element}

作为块的一部分，没有独立意义。**MUST** 使用双下划线 `__` 与块连接。
- **格式**: `.block-name__element-name`
- ✅ **正面示例**: `.student-card__avatar`, `.main-header__nav-link`

### 1.3. 修饰符 (Modifier) {#naming-modifier}

定义块或元素的外观、状态或行为。**MUST** 使用双连字符 `--` 连接。
- **格式**: `.block-name--modifier-name` 或 `.block-name__element--modifier-name`
- ✅ **正面示例**: `.student-card--highlighted`, `.button--disabled`

**重要提示**: 所有 BEM 命名 **MUST** 使用**小写字母**和**连字符** (`-`)。
- ❌ **反面示例**: `.studentCard_name`, `.MainHeader`, `.user-profile.active`

## 2. 文件结构 (File Structure) {#file-structure}

为了让样式管理井然有序，项目 **MUST** 遵循以下结构。更详细的完整项目结构请参见 [目录结构指南](../architecture/directory-structure.md)。

- **`assets/style/main.scss`**: 全局样式的核心。**MUST** 在此文件中定义所有全局 CSS 自定义属性（变量），如颜色、字体、间距等。
- **`assets/style/components.scss`**: **MAY** 用于存放与特定组件紧密相关，但不适合放入 `main.scss` 的变量。
- **组件内部样式**: 每个 Vue 组件 **MUST** 包含自己的样式，并使用 `<style scoped>` 以确保样式的封装性。

## 3. CSS 自定义属性 (变量) {#custom-properties}

- **定义**: 所有全局变量 **MUST** 在 `assets/style/main.scss` 的 `:root` 选择器中定义。
- **命名**: **SHOULD** 遵循 `[property]-[type]-[variant]` 的模式，以清晰地表达变量用途。
  - ✅ **正面示例**: `--color-primary-dark`, `--font-size-large`, `--spacing-md`
- **使用**: 在组件中 **MUST** 通过 `var()` 函数引用。
  - ✅ **正面示例**: `background-color: var(--color-primary-light);`
- **注释**: 每个变量或变量组 **MUST** 有清晰的注释说明其用途。
  ```scss
  /* /assets/style/main.scss */
  :root {
    /* == Primary Colors == */
    /* 用于品牌主色调，如按钮、链接和高亮元素 */
    --color-primary: #1c7ed6;
  }
  ```

## 4. 响应式设计 (Responsive Design) {#responsive-design}

- **移动端优先**: **MUST** 以移动端优先（Mobile-First）的原则编写样式。
- **媒体查询**: **MUST** 使用 `min-width` 进行断点查询，以渐进增强的方式为大屏幕添加样式。
- **断点变量**: **MUST** 在 `assets/style/main.scss` 中定义标准断点变量，方便统一管理。
  ```scss
  /* /assets/style/main.scss */
  :root {
    /* == Breakpoints == */
    --breakpoint-sm: 576px;  /* 手机 */
    --breakpoint-md: 768px;  /* 平板 */
  }
  ```

## 5. 注释规范 (Commenting Guidelines) {#commenting-guidelines}

- **区块注释**: 对于复杂的 CSS 模块，**SHOULD** 使用详细的块注释进行说明。
  ```css
  /*
   * ===============================================
   * Student Card Component
   * ===============================================
   */
  .student-card { /* ... */ }
  ```
- **行内解释**: 对需要特别说明的属性，**MAY** 使用单行注释。
  ```css
  .student-card__name {
    /* 使用两行截断，防止标题过长 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
  ```

## 6. 其他最佳实践 {#best-practices}

- **属性顺序**: **SHOULD** 将相关的属性组合在一起（例如：定位 -> 盒模型 -> 排版 -> 视觉效果）。
- **避免 `!important`**: **MUST NOT** 滥用 `!important`。应优先通过提高选择器特异性或重构来解决样式覆盖问题。
- **代码格式化**: **MUST** 保持一致的缩进（2个空格）和代码风格。

---

让我们一起努力，写出优雅、高效、可爱的代码吧！喵呜~