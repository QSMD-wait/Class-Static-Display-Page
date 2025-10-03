---
rule_id: "meta-rules"
version: "1.0.0"
category: "Meta"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "定义了所有项目规范的创建、维护和演进流程，确保规则本身的清晰、一致、合理与时俱进。"
severity: "critical"
scope: ["all"]
---

# 元规则：关于规则的规则 {#summary}

本文档是本项目“规则的规则”，旨在定义所有项目规范（位于 `.rules/` 目录下）的创建、维护和演进流程。它的存在是为了确保我们的规则本身是清晰、一致、合理且与时俱进的。

## 1. 核心原则 {#core-principles}

- **服务于人，而非束缚**：所有规则 **MUST** 以提高开发效率、代码质量和协作体验为最终目的，而不是为了规则而规则，增加不必要的负担。
- **清晰易懂**：规则的描述 **MUST** 使用简洁、明确的语言，避免模棱两可。在适用的地方，**SHOULD** 提供“好的示例”和“坏的示例”进行对比说明。
- **保持开放**：规则 **MUST NOT** 是一成不变的。随着技术的发展和团队的成长，我们 **MUST** 乐于接纳对规则的合理改进建议。
- **自动化优先**：如果某项规则可以通过工具（如 Linter、格式化工具、Git Hooks）来自动强制执行，**SHOULD** 优先采用自动化方案。

## 2. 规则的生命周期 {#rule-lifecycle}

### 2.1. 提出变更 {#proposing-changes}

任何团队成员都 **MAY** 对现有规则提出修改建议，或提议增加新的规则。

1.  **创建 Issue**: 提议者 **MUST** 在项目的代码仓库中创建一个新的 Issue。
2.  **清晰阐述**: Issue **MUST** 详细描述：
    - **要解决的问题**: **MUST** 解释当前规则的不足之处，或者为什么需要一条新规则。
    - **具体的建议**: **MUST** 清晰地写出建议的规则内容。
    - **理由和好处**: **MUST** 阐述为什么这个变更会带来好处（例如：提高代码可读性、避免常见错误等）。

### 2.2. 讨论与共识 {#discussion-consensus}

- 相关的团队成员 **MUST** 在 Issue 中对该提议进行讨论。
- 讨论的目标 **MUST** 是达成共识。如果出现分歧，**SHOULD** 通过友好的辩论和投票来决定。
- 讨论期 **SHOULD** 为 3-5 个工作日，以确保多数成员有时间参与。

### 2.3. 实施与合并 {#implementation-merge}

- 一旦达成共识，提出者 **MUST** 按照 [Git 工作流指南](./development/git-workflow.md#pull-request-process) 创建一个 Pull Request (PR)，对相关的规则文档（`.md` 文件）进行修改。
- PR **MUST** 获得至少一名核心维护者 (Maintainer) 的审查和批准 (Approve)。
- PR 合并后，新的规则 **MUST** 立即生效。

## 3. 规则文档的风格指南 {#style-guide}

本文档本身就是风格指南的一个实例。更多关于文档编写的通用指南，请参考 [文档编写指南](./development/documentation-guide.md)。

- **文件名**: **MUST** 使用小写字母和连字符，例如 [`coding-style.md`](./development/coding-style.md)。
- **语言**: **MUST** 使用中文编写，**SHOULD** 保持亲切、积极的口吻。
- **格式**: **MUST** 使用标准的 Markdown 格式，**SHOULD** 合理运用标题、列表、代码块和引用来增强可读性。
- **结构**: 
    - **MUST** 在文档开头，简要说明该规则旨在解决什么问题。
    - **MUST** 分点阐述具体的规则条款。
    - **MAY** 在文档末尾，加入一个简短、可爱的总结。

## 4. 定期审查 {#periodic-review}

- 为了防止规则变得陈旧或不合时宜，项目核心维护者 **MUST** 每季度对所有规则进行一次全面的审查。
- 审查 **MUST** 评估规则的有效性，并根据项目实践进行调整。

## 5. AI 友好型规则格式 {#ai-friendly-format}

为了让 AI 助手能更好地理解和应用规则，所有规则文档 **MUST** 遵循以下格式。

### 5.1. YAML Front Matter {#yaml-front-matter}

每个规则文档的开头 **MUST** 包含一个 YAML Front Matter 块，用于提供元数据。

```yaml
---
rule_id: 'CATEGORY-001'
version: '1.0.0'
scope:
  - 'css'
  - 'vue'
severity: 'critical'
description: '描述这条规则的核心目的，一句话说明。'
---
```

- `rule_id`: **MUST** 是规则的唯一标识符。格式为 `类别-编号`，例如 `CSS-001`。
- `version`: **MUST** 遵循 [语义化版本](https://semver.org/lang/zh-CN/)。
- `scope`: **MUST** 定义规则的应用范围，例如 `css`, `vue`, `typescript`, `project-structure`。
- `severity`: **MUST** 指定规则的重要性，可选值为 `critical`, `warning`, `suggestion`。
- `description`: **MUST** 提供对规则的简短描述。

### 5.2. 规则正文结构 {#rule-content-structure}

- **关键词**: 规则描述 **MUST** 使用 **RFC 2119** 中定义的关键词（`MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `MAY`, `OPTIONAL`）来明确其强制性。
- **唯一锚点**: 每个独立的规则点 **MUST** 有一个唯一的标题或锚点，方便引用。
- **示例**: **MUST** 提供清晰的“正面示例”和“反面示例”代码块。

#### 示例：CSS-BEM-命名规范 {#example-css-bem}

- **[MUST]** 所有 CSS 类名 **必须** 遵循 [BEM 命名约定](./development/css-style.md#naming-conventions)。

  - **正面示例**:
    ```css
    /* Block */
    .student-card { }
    /* Element */
    .student-card__title { }
    /* Modifier */
    .student-card--featured { }
    ```

  - **反面示例**:
    ```css
    /* 混合使用，不清晰 */
    .novelCard-title { } 
    .featured-novel-card { }
    ```

---

有了这些“元规则”，我们的“法典”就能健康成长，永远保持活力啦！喵！