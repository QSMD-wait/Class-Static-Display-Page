---
rule_id: "development-git-workflow"
version: "1.0.0"
category: "Development"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "定义项目团队必须遵循的 Git 工作流规范，包括分支模型、工作流程、提交规范和版本发布策略，以确保代码库的整洁、协作的顺畅和版本发布的稳定。"
severity: "critical"
scope: ["git", "workflow"]
---

# Git 工作流指南 {#summary}

为了确保团队协作的顺畅和代码库的整洁，所有贡献者 **MUST** 遵循以下 Git 工作流规范。本指南详细定义了分支管理、开发流程和版本发布的标准。

## 1. 分支模型 {#branch-model}

我们采用一个简化的 Git Flow 模型。

### `main` 分支 {#branch-main}

- **MUST** 始终保持稳定，代表可随时部署的生产代码。
- **MUST** 只接受来自 `develop` 分支或 `hotfix` 分支的合并请求。

### `develop` 分支 {#branch-develop}

- **MUST** 作为所有功能开发的起点和汇总点。
- 它包含了下一个版本要发布的所有功能和修复。

### 功能分支 (`feat/<feature-name>`) {#branch-feature}

- **MUST** 用于开发新功能。
- **MUST** 从 `develop` 分支创建。
- 完成后 **MUST** 合并回 `develop` 分支。
- 命名 **SHOULD** 简明扼要地描述功能，例如：
  - ✅ `feat/user-authentication`
  - ✅ `feat/novel-list-pagination`

### 修复分支 (`fix/<issue-name>`) {#branch-fix}

- **MUST** 用于修复 `develop` 分支中的非紧急 Bug。
- **MUST** 从 `develop` 分支创建，修复后合并回 `develop`。
- 命名 **SHOULD** 清晰描述问题，例如：
  - ✅ `fix/login-validation`
  - ✅ `fix/image-loading-error`

### 热修复分支 (`hotfix/<issue-name>`) {#branch-hotfix}

- **MUST** 用于紧急修复 `main` 分支上的生产环境 Bug。
- **MUST** 从 `main` 分支创建。
- 修复完成后，**MUST** 同时合并到 `main` 和 `develop` 分支，以确保修复同步。
- 命名 **SHOULD** 包含问题的紧急程度，例如：
  - ✅ `hotfix/critical-security-patch`
  - ✅ `hotfix/server-crash-fix`

## 2. 工作流程 {#workflow}

### 2.1. 开始一个新任务（功能或修复） {#workflow-start}

1.  **切换到基准分支并更新**:
    - **MUST** 首先切换到 `develop` 分支（或 `main` 用于热修复）。
    - **MUST** 拉取最新的远程更改，确保你的本地分支是最新的。
    ```bash
    # 以开发新功能为例
    git checkout develop
    git pull origin develop
    ```

2.  **创建新的工作分支**:
    - **MUST** 根据任务类型（`feat` 或 `fix`）创建新的分支。
    ```bash
    git checkout -b feat/my-awesome-feature
    ```

### 2.2. 开发过程 {#workflow-development}

- **原子化提交**: **SHOULD** 保持提交的原子性，即一个提交只做一件有意义的事。
- **遵循提交信息规范**: **MUST** 遵循 [Git 提交信息规范](./coding-style.md#git-commit-message-spec)（Conventional Commits）。
- **保持与上游同步**:
  - **SHOULD** 定期将 `develop` 分支的最新更改通过 `rebase` 的方式同步到你的功能分支，以减少最终的合并冲突并保持提交历史的线性。
  ```bash
  # 在你的功能分支上执行
  git fetch origin
  git rebase origin/develop
  ```

### 2.3. 完成功能并提交 Pull Request (PR) {#workflow-pr}

1.  **推送到远程仓库**:
    - **MUST** 将你的本地分支推送到远程仓库。
    ```bash
    git push origin feat/my-awesome-feature
    ```

2.  **创建 Pull Request**:
    - **MUST** 在代码托管平台（如 GitHub）上，从你的功能分支向 `develop` 分支发起一个 Pull Request。
    - PR 的标题和描述 **MUST** 清晰地说明你做了什么、为什么这么做，以及如何测试。
    - PR 描述 **SHOULD** 包含以下内容：
      - ✅ 功能描述或 Bug 修复说明
      - ✅ 实现方案和主要改动
      - ✅ 测试步骤和预期结果
      - ✅ 相关的 Issue 链接（如果有）

3.  **代码审查 (Code Review)**:
    - 你的 PR **MUST** 至少由一名团队成员审查并批准。
    - 审查者 **MUST** 关注代码质量、逻辑正确性、是否符合规范以及是否存在潜在问题。
    - 提交者 **MUST** 根据审查意见进行修改和讨论，直到达成共识。

4.  **合并 PR**:
    - PR 被批准后，**SHOULD** 由项目维护者或你自己（如果权限允许）将其合并到 `develop` 分支。
    - 合并时 **SHOULD** 使用 `Squash and merge` 或 `Rebase and merge` 来保持 `develop` 分支的提交历史干净整洁。
    - 合并后，**MUST** 删除该远程和本地的功能分支。

## 3. 版本发布 {#release}

- 当 `develop` 分支达到一个稳定的、可发布的状态时，项目维护者 **MUST** 将其合并到 `main` 分支。
- **MUST** 创建一个新的版本标签 (Tag) 来标记此次发布。
- 版本号 **MUST** 遵循语义化版本规范 (Semantic Versioning)。
  - ✅ 例如：`v1.2.3`，其中：
    - `1`: 主版本号，不兼容的 API 修改
    - `2`: 次版本号，向下兼容的功能性新增
    - `3`: 修订号，向下兼容的问题修正

---

让我们像猫咪一样，优雅而有序地管理我们的代码吧！喵呜~