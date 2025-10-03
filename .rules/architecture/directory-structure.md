---
rule_id: "architecture-directory"
version: "1.0.0"
category: "Architecture"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "定义项目仓库的标准目录结构，确保所有开发者遵循统一的文件组织方式，以便快速定位文件、理解代码组织并保持代码库的整洁性。"
severity: "critical"
scope: ["project-structure"]
---

# 目录结构指南 {#summary}

本文档旨在详细解释项目仓库的目录结构。所有开发者 **MUST** 遵循此结构来组织文件和代码。

## 1. 完整目录树 {#directory-tree}

```
Class-Static-Display-Page/
├── .nuxt/              # Nuxt 自动生成的目录，用于开发环境。**MUST NOT** 手动修改。
├── .output/            # `npm run build` 后存放构建结果的目录。
├── .rules/             # 项目的规则和文档中心。
│   ├── architecture/   # 架构设计相关文档。
│   │   ├── [frontend-architecture.md](./frontend-architecture.md)
│   │   └── [directory-structure.md](./directory-structure.md)
│   ├── community/      # 社区行为和贡献准则。
│   │   ├── [code-of-conduct.md](../community/code-of-conduct.md)
│   │   └── [contributing.md](../community/contributing.md)
│   └── development/    # 开发流程和编码规范。
│       ├── [api-design.md](../development/api-design.md)
│       ├── [coding-style.md](../development/coding-style.md)
│       ├── [css-style.md](../development/css-style.md)
│       ├── [documentation-guide.md](../development/documentation-guide.md)
│       └── [git-workflow.md](../development/git-workflow.md)
├── assets/             # 存放需要经过构建处理的静态资源。
│   └── style/          # 全局 SCSS/CSS 样式和变量。
│       └── main.scss
├── components/         # 全局可复用的 Vue 组件 (e.g., `StudentCard.vue`)。
├── composables/        # 全局可复用的 Vue 组合式函数 (e.g., `useClassData.ts`)。
├── layouts/            # 页面布局组件。
├── middleware/         # Nuxt 路由中间件。
├── pages/              # 页面组件 (e.g., `index.vue`, `students/[id].vue`)。
├── plugins/            # Nuxt 插件。
├── public/             # 无需构建处理，直接对外服务的静态资源。
├── server/             # 服务端代码 (Nitro 引擎)。
│   └── api/            # 服务端 API 路由 (e.g., `students.get.ts`)。
├── stores/             # Pinia 状态管理模块 (e.g., `class.ts`)。
├── utils/              # 通用工具函数。
├── .gitignore          # Git 忽略文件配置。
├── app.vue             # 应用的根 Vue 组件。
├── nuxt.config.ts      # Nuxt 配置文件。
├── package.json        # 项目依赖和脚本配置。
├── README.md           # 项目总览介绍。
└── tsconfig.json       # TypeScript 配置文件。
```

## 2. 核心目录详解 {#core-details}

- **`.rules`**: 项目的“法典”。 {#rules-dir}
  - **MUST** 存放所有开发、协作、社区相关的规范文档。

- **`assets`**: 构建资源目录。 {#assets-dir}
  - **MUST** 用于存放需要被 Vite 等构建工具处理的资源，例如全局 CSS、SASS 文件、需要优化的图片等。

- **`components`**: 全局组件目录。 {#components-dir}
  - **MUST** 用于存放原子化、可复用的 Vue 组件。
  - 这些组件 **SHOULD** 是全局性的，不与特定页面强耦合。

- **`composables`**: 组合式函数目录。 {#composables-dir}
  - **MUST** 用于存放 Vue 组合式函数 (`use` 开头的函数)，用于封装和复用响应式的、有状态的逻辑。

- **`layouts`**: 布局目录。 {#layouts-dir}
  - **MUST** 用于定义应用的布局结构。例如，`default.vue` 可以包含网站的页头和页脚，`auth.vue` 可以用于登录/注册页面布局。

- **`pages`**: 页面目录。 {#pages-dir}
  - **MUST** 用于存放应用的页面组件。
  - Nuxt **MUST** 根据这个目录下的 `.vue` 文件结构自动生成路由。

- **`public`**: 公共静态资源目录。 {#public-dir}
  - **MUST** 用于存放不会被构建工具处理的静态文件，它们会被直接复制到输出目录的根路径。
  - **SHOULD** 用于存放 `favicon.ico`、`robots.txt` 等文件。

- **`server`**: 服务端代码目录。 {#server-dir}
  - **MUST** 用于存放 Nuxt 3 的服务端引擎 (Nitro) 的相关代码。
  - `server/api/` 子目录 **MUST** 用于创建服务端的 API 接口。

- **`stores`**: 状态管理目录。 {#stores-dir}
  - **MUST** 用于存放 Pinia 的状态管理模块（Stores）。
  - 每个文件 **MUST** 代表一个独立的 Store。

- **`utils`**: 工具函数目录。 {#utils-dir}
  - **MUST** 用于存放通用的、无副作用的、与具体业务逻辑无关的辅助函数。

---

清晰的目录结构就像猫咪整齐的窝，找东西都方便多啦！喵~