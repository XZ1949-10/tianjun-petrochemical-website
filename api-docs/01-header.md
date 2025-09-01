# 舟山天骏石油化工有限公司官网 API 接口文档

## 📋 文档概述

**项目名称**: 舟山天骏石油化工有限公司官网后端接口  
**API版本**: v2.0  
**基础URL**: `http://localhost:3001/api` (开发环境) / `https://api.tianjun-petro.com/api` (生产环境)  
**认证方式**: Bearer Token / API Key (可选)  
**数据格式**: JSON  
**字符编码**: UTF-8  
**文档更新时间**: 2025-08-31  
**接口总数**: 47个 (36个GET + 11个POST)

## 🚀 项目特性

- ✅ **前后端完全分离** - React + json-server架构
- ✅ **动态数据驱动** - 支持自适应数量的数据渲染
- ✅ **统一响应格式** - 标准化的JSON响应结构
- ✅ **跨域支持** - CORS配置完善
- ✅ **实时交互** - 支持询价、咨询、申请等功能
- ✅ **数据完整性** - 涵盖企业官网所有业务场景

## 🔧 通用规范

### 请求头规范
```http
Content-Type: application/json
Accept: application/json
Accept-Language: zh-CN,en-US
User-Agent: TianjunPetro-Web/2.0
Origin: http://localhost:5173 (开发环境)
```

### 统一响应格式
所有API接口都遵循以下统一的响应格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

**字段说明**:
- `code`: HTTP状态码 (200=成功, 400=参数错误, 404=不存在, 500=服务器错误)
- `message`: 响应消息描述
- `data`: 实际返回的数据 (可以是对象、数组或基本类型)
- `timestamp`: 服务器响应时间戳 (ISO 8601格式)

### HTTP状态码规范
- `200 OK`: 请求成功
- `201 Created`: 资源创建成功  
- `400 Bad Request`: 请求参数错误
- `401 Unauthorized`: 未授权，需要认证
- `403 Forbidden`: 禁止访问，权限不足
- `404 Not Found`: 资源不存在
- `422 Unprocessable Entity`: 请求格式正确，但语义错误
- `429 Too Many Requests`: 请求过于频繁
- `500 Internal Server Error`: 服务器内部错误

### 错误响应格式
```json
{
  "code": 400,
  "message": "参数验证失败",
  "data": null,
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 分页参数规范
对于支持分页的接口，使用以下统一参数：
- `page`: 页码，从1开始 (默认值: 1)
- `pageSize`: 每页数量 (默认值: 10，最大值: 100)
- `search`: 搜索关键词 (可选)
- `category`: 分类筛选 (可选)

### 分页响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---