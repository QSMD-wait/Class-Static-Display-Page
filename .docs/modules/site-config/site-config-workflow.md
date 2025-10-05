# `site-config` 模块全流程深度解析

本文档旨在提供一份关于 `site-config` 模块从初始化到前端消费的端到端工作流程的完整说明，帮助开发者深入理解其内部机制。

## 核心使命

`site-config` 模块的核心使命是为整个 Nuxt 应用提供一个**集中式、类型安全、且支持热重载**的配置管理方案。

---

## 全流程解析

整个流程可以分为五个关键阶段：

### 阶段一：模块的初始化与注册

1.  **注册为本地模块**: 我们在 `nuxt.config.ts` 的 `modules` 数组中添加了 `'./src/modules/site-config.ts'`。这告诉 Nuxt，在启动时需要加载并执行这个文件。
2.  **模块定义**: `site-config.ts` 文件使用 `defineNuxtModule` 来定义模块。这是 Nuxt 模块的标准写法，它提供了一个结构化的方式来与 Nuxt 的生命周期进行交互。
3.  **Setup 入口**: 模块的 `setup` 函数是其核心逻辑的入口。Nuxt 在初始化该模块时会调用此函数，并将 `options`（来自 `nuxt.config.ts` 的配置）和 `nuxt` 实例（整个应用的上下文）作为参数传入。

### 阶段二：配置文件的加载与合并

这是模块在“后端”（Node.js 构建环境）执行的核心任务。

1.  **路径定义**: 模块首先确定两个核心配置文件的路径：
    *   `defaultsConfigPath`: `src/config/defaults.yaml` (默认配置)
    *   `userConfigPath`: `site.config.yaml` (用户自定义配置)
2.  **文件读取**: 使用 `jiti` 和 `fs` 库来安全地读取并解析这两个 YAML 文件。
3.  **智能合并**: 这是最关键的一步！模块使用 `defu` 这个工具库将 `userConfig` 合并到 `defaultsConfig` 之上。`defu` 实现了“深度合并”，意味着：
    *   用户只需在 `site.config.yaml` 中提供他们想要**覆盖**或**新增**的配置。
    *   任何用户未提供的配置项，都会自动使用 `defaults.yaml` 中的默认值。
    *   这保证了配置的完整性和灵活性。

### 阶段三：搭建数据“桥梁” (`.nuxt/site.data.json`)

Node.js 环境中的数据无法直接被前端 Vue 应用访问。因此，我们需要一座“桥梁”。

1.  **写入 JSON**: `updateConfig` 这个核心函数会将上一步合并好的最终配置对象，序列化成 JSON 字符串。
2.  **生成文件**: 然后，它将这个 JSON 字符串写入到 `.nuxt/` 目录下的一个临时文件：`site.data.json`。
3.  **桥梁作用**: 这个 JSON 文件成为了连接 Nuxt 构建环境 (后端) 和 Vue 运行时 (前端) 的关键数据桥梁。

### 阶段四：前端消费配置 (`useSiteConfig` Composable)

现在，轮到前端应用来使用这些配置了。

1.  **定义 Composable**: 我们在 `src/composables/site-config.ts` 中定义了 `useSiteConfig` 函数。
2.  **直接导入**: 这个 Composable 的实现非常巧妙和高效，它直接使用 `import config from '#build/site.data.json'` 来导入上一步生成的 JSON 文件。Nuxt (底层是 Vite) 对 JSON 文件的导入有原生支持，会将其转换为一个 JavaScript 对象。
3.  **提供数据**: Composable 将导入的 `config` 对象返回，使其可以在任何 Vue 组件或页面中被轻松调用。

    ```vue
    <script setup>
    // 在组件中获取全站配置
    const siteConfig = useSiteConfig();

    console.log(siteConfig.value.name); // 输出网站名称
    </script>
    ```

### 阶段五：开发模式下的热重载 (HMR)

这是提升开发体验的“魔法”。

1.  **文件监听**: 在 `setup` 函数中注册的 `nuxt.hook('builder:watch', ...)` 会在开发模式下持续监听文件变动。
2.  **触发更新**: 当 `site.config.yaml` 文件被修改并保存时，`builder:watch` 钩子被触发，并调用 `updateConfig` 函数。
3.  **HMR 链式反应**: 一场精确而高效的链式反应开始了：
    *   `updateConfig` 函数重新执行“加载->合并->写入”的流程，用新内容**覆盖**了 `.nuxt/site.data.json` 文件。
    *   Vite 的 HMR 服务器瞬间侦测到 `site.data.json` 文件发生了变化。
    *   HMR 系统会自动通知所有依赖于这个文件的模块进行更新。在我们的应用中，这个模块就是 `useSiteConfig`。
    *   `useSiteConfig` 重新导入新的 JSON 内容，并更新其内部的 `ref`。
    *   由于 Vue 的响应式系统，所有使用了 `useSiteConfig` 的组件都会自动用新数据重新渲染。

**流程图小结:**

```
[用户修改 site.config.yaml]
        ↓
[Nuxt builder:watch 侦测到]
        ↓
[调用 updateConfig()]
        ↓
[重写 .nuxt/site.data.json]
        ↓
[Vite HMR 侦测到 JSON 变动]
        ↓
[useSiteConfig() 重新导入数据]
        ↓
[Vue 组件响应式更新]
```

通过这一整套设计，我们实现了一个功能强大、易于维护且开发体验极佳的配置管理系统。