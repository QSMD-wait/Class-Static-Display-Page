---
rule_id: "development-api-design"
version: "1.0.0"
category: "Development"
author: "青色漫地_wait、沐晓（AI）"
last_updated: "2025-10-01"
description: "定义项目后端 API 的设计与实现规范，确保 API 的一致性、可预测性和易用性，为前后端开发者提供清晰的接口约定。"
severity: "critical"
scope: ["backend", "api"]
---

# API 设计指南 {#summary}

本指南为项目后端 API 的设计与实现提供了统一规范，旨在确保 API 的一致性、可预测性和易用性。所有开发者 **MUST** 遵循这些规范来设计和实现 API。关于前端如何使用这些 API，请参考[前端架构指南中的 API 服务层](../architecture/frontend-architecture.md#logic-data-layer)。

## 1. RESTful 风格 {#restful}

所有 API **MUST** 遵循 RESTful 设计原则。

### 1.1. 资源路径 (Endpoint) {#endpoint}

- **使用名词复数**: 路径 **MUST** 表示资源集合，使用名词复数形式。
  - ✅ 正面示例: `/teachers`, `/classes`, `/classes/{classId}/students`
  - ❌ 反面示例: `/getStudent`, `/class/student`

- **路径小写**: 所有路径 **MUST** 使用小写字母，并用连字符 `-` 分隔单词（如果需要）。
  - ✅ 正面示例: `/student-profiles`, `/attendance-records`
  - ❌ 反面示例: `/studentProfiles`, `/attendanceRecord`

### 1.2. HTTP 方法 {#methods}

**MUST** 使用正确的 HTTP 方法来表达对资源的操作：

- **`GET`**: 读取资源。
  - `GET /classes`: 获取所有班级列表。
  - `GET /students/{id}`: 获取单个学生的详细信息。
- **`POST`**: 创建新资源。
  - `POST /students`: 创建一个新学生。
- **`PUT` / `PATCH`**: 更新资源。
  - **`PUT`**: 全量更新，替换整个资源。
  - **`PATCH`**: 部分更新，只修改资源的某些字段。
  - `PATCH /students/{id}`: 更新学生的部分信息。
- **`DELETE`**: 删除资源。
  - `DELETE /students/{id}`: 删除一个学生。

## 2. 请求与响应 {#request-response}

### 2.1. 数据格式 {#format}

- 所有请求体 (Request Body) 和响应体 (Response Body) **MUST** 使用 **JSON** 格式。
- 请求头 **MUST** 设置 `Content-Type: application/json`。

### 2.2. 响应结构 {#structure}

为了保持一致性，所有 API 响应 **MUST** 遵循以下结构：

```json
{
  "success": true,
  "code": 200,
  "message": "操作成功",
  "data": {
    // 业务数据
  }
}
```

- **`success` (boolean)**: **MUST** 存在，表示操作是否成功。`true` 表示成功，`false` 表示失败。
- **`code` (number)**: **MUST** 存在，表示 HTTP 状态码或更精细的业务状态码。
- **`message` (string)**: **MUST** 存在，对结果的简短描述，尤其是在出错时提供清晰的错误信息。
- **`data` (object | array | null)**: **MUST** 存在，实际返回的业务数据。对于列表数据，应包含分页信息。

### 2.3. 列表与分页 {#pagination}

对于返回资源列表的请求 (如 `GET /classes`)，**SHOULD** 支持分页。

- **请求参数**:
  - `page` (number): **SHOULD** 支持，表示请求的页码，默认为 1。
  - `pageSize` (number): **SHOULD** 支持，表示每页的项目数量，默认为 10。

- **响应结构**: `data` 对象 **SHOULD** 包含分页元数据。
  ```json
  "data": {
    "items": [
      // 列表项...
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 120,
      "totalPages": 12
    }
  }
  ```

## 3. HTTP 状态码 {#status-codes}

**MUST** 合理使用 HTTP 状态码来反映操作结果。

- **2xx (成功)**:
  - `200 OK`: 请求成功。
  - `201 Created`: 资源创建成功。
  - `204 No Content`: 操作成功，但没有数据返回 (例如 `DELETE` 操作)。

- **4xx (客户端错误)**:
  - `400 Bad Request`: 请求无效 (例如，参数错误、格式错误)。
  - `401 Unauthorized`: 未经授权，需要身份验证。
  - `403 Forbidden`: 服务器理解请求，但拒绝执行。
  - `404 Not Found`: 请求的资源不存在。

- **5xx (服务器错误)**:
  - `500 Internal Server Error`: 服务器内部发生未知错误。

## 4. 版本管理 {#versioning}

- API **SHOULD** 进行版本管理，以确保向后兼容。
- **SHOULD** 将版本号放在 URL 路径中。
  - ✅ 正面示例: `/api/v1/students`
  - ❌ 反面示例: `/students?version=1`

---

优雅的 API 设计就像猫咪的步伐一样轻盈优美，让前后端的交互变得如丝般顺滑！喵~