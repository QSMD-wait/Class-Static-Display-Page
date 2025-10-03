---
rule_id: "development-documentation-guide"
version: "1.0.0"
category: "Development"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "为项目的所有贡献者提供一套清晰、统一的文档编写规范，以确保项目文档的质量、可读性和可维护性。"
severity: "major"
scope: ["general"]
---

# 文档编写指南 {#summary}

本文档旨在为项目的所有贡献者提供一套清晰、统一的文档编写规范，以确保项目文档的质量、可读性和可维护性。

## 1. 核心原则 {#principles}

- **清晰性**: 文档 **MUST** 易于理解，避免使用模糊或含糊不清的语言。
- **准确性**: **MUST** 确保文档内容与当前代码实现保持一致。
- **完整性**: **SHOULD** 覆盖所有必要的信息，让读者无需猜测。
- **一致性**: **MUST** 在整个项目中保持术语、格式和风格的统一。

## 2. 文档类型 {#types}

### 2.1. 代码注释 {#types-comments}

代码是最终的真相，好的注释是理解代码的地图。

- **Vue 组件**: 
  - **SHOULD** 在组件顶部使用块注释来说明组件的用途、Props 和 Emits。
  - 对复杂的模板逻辑或样式 **SHOULD** 添加行内注释。
- **组合式函数 (Composables)**:
  - **MUST** 在函数顶部使用 JSDoc 风格的注释，描述函数的功能、参数 (`@param`) 和返回值 (`@returns`)。
- **Pinia Stores**:
  - **MUST** 在 `defineStore` 上方注释该 Store 的作用域和管理的具体状态。
- **API 服务层**:
  - **MUST** 为每个 API 调用函数添加注释，说明其功能、所需参数和预期的后端响应。

### 2.2. README.md {#types-readme}

项目的入口文件，**MUST** 包含以下关键信息：

- 项目简介
- 技术栈
- 如何开始（安装、运行）
- 核心功能介绍
- 目录结构说明
- [贡献指南](../community/contributing.md)

### 2.3. 规则文档 (`.rules/`) {#types-rules}

即我们正在编写的这些文档。它们是项目开发和协作的基石，**MUST** 保持最新。

- **文件名**: **MUST** 使用全大写和连字符，例如 `CODING-STYLE.md`。
- **内容**: **MUST** 结构清晰，使用 Markdown 标题、列表和代码块来组织内容。

## 3. 格式与风格 {#style}

- **语言**: 所有文档和注释 **MUST** 使用**中文**编写。
- **Markdown**: 
  - **MUST** 使用标准的 Markdown 语法。
  - 对于代码块，**MUST** 指定语言类型（如 ` ```typescript`）。
- **术语**: 
  - **MUST** 保持术语统一。例如，统一使用“组合式函数”而不是“Composables”或“Hooks”。
  - 在首次出现不常见的技术术语时，**MAY** 附上简短的解释。

## 4. 更新与维护 {#maintenance}

- **代码变更时**: 如果你的代码变更（如修改组件 Props、调整 API）影响了现有文档，**MUST** 同步更新相关文档。
- **定期审查**: 项目核心成员 **SHOULD** 定期审查文档，确保其准确性和时效性。

---

好的文档就像给猫咪准备的详细说明书，让每个人都能轻松上手，愉快地玩耍！喵呜~