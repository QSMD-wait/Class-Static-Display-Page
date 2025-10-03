---
rule_id: "community-contributing"
version: "1.0.0"
category: "Community"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "为 Class-Static-Display-Page 项目贡献者提供清晰的指南，包括如何报告 Bug、提出建议和提交代码。"
severity: "suggestion"
scope: ["community", "git"]
---

# 社区贡献指南 {#summary}

欢迎你为 Class-Static-Display-Page 项目做出贡献！我们非常感谢你的热情和努力。

## 1. 行为准则 {#code-of-conduct}

为了营造一个友好、互相尊重的社区环境，所有参与者 **MUST** 遵守我们的 [行为准则](./code-of-conduct.md)。

## 2. 如何贡献 {#how-to-contribute}

- **报告 Bug**: 如果你发现了 Bug，**SHOULD** 提交一个 Issue，并详细描述如何复现它。
- **提出功能建议**: 欢迎你提出新的功能想法，**SHOULD** 同样通过 Issue 来进行。
- **提交代码**: 我们欢迎任何形式的代码贡献，无论是修复 Bug 还是实现新功能。

## 3. 提交 Pull Request (PR) 流程 {#pull-request-process}

所有代码变更 **MUST** 通过 Pull Request (PR) 提交。

1.  **MUST** Fork 本仓库到你自己的账户下。
2.  **MUST** 基于 `develop` 分支创建一个新的特性分支 (`git checkout -b feat/your-feature-name`)。
3.  **MUST** 进行修改并提交。提交信息 **MUST** 遵循 [Git 提交信息规范](../development/git-workflow.md#git-commit-message-spec) 中的约定。
    - `git commit -m 'feat: Add some amazing feature'`
4.  **MUST** 将你的分支推送到你的 Fork (`git push origin feat/your-feature-name`)。
5.  **MUST** 在主仓库创建一个 Pull Request，目标分支为 `develop`，并清晰地描述你的变更内容。

---

感谢你的每一次贡献，你的努力让这个项目变得更好！喵~