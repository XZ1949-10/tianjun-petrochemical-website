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

## 🏠 首页相关接口

首页相关接口提供企业官网首页所需的所有数据，包括轮播图、企业实力展示、服务介绍、客户证言等核心内容。

### API-001: 获取轮播图数据
**接口地址**: `GET /api/home/banners`  
**功能描述**: 获取首页Hero轮播图数据，支持桌面和移动端不同图片

**请求参数**: 无

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/banners" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "可靠的0#柴油供应自1990年",
      "subtitle": "第三代家族企业 • 当日配送 • 持证危化品经营商",
      "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "mobileImage": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "ctaText": "立即询价",
      "ctaLink": "/contact",
      "order": 1,
      "status": "active"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-002: 获取企业实力数据
**接口地址**: `GET /api/home/company-stats`  
**功能描述**: 获取企业实力展示数据，包括认证证书、合作伙伴、服务统计等

### API-003: 获取服务介绍数据
**接口地址**: `GET /api/home/services`  
**功能描述**: 获取首页服务介绍卡片数据

### API-004: 获取全国服务网络数据
**接口地址**: `GET /api/home/network-map`  
**功能描述**: 获取全国服务网络地图数据，用于ECharts地图展示

### API-005: 获取客户证言
**接口地址**: `GET /api/home/testimonials`  
**功能描述**: 获取客户证言和评价数据

### API-006: 获取最新动态
**接口地址**: `GET /api/home/latest-news`  
**功能描述**: 获取首页展示的最新新闻动态

### API-007: 获取实时柴油价格
**接口地址**: `GET /api/home/fuel-price`  
**功能描述**: 获取当前0#柴油价格信息

### API-008: 立即询价接口
**接口地址**: `POST /api/home/quick-quote`  
**功能描述**: 首页快速询价功能

**请求参数**:
```json
{
  "contactName": "张先生",
  "phone": "138****1234",
  "company": "某物流公司",
  "requirement": "每月需要500升柴油",
  "location": "舟山市定海区",
  "source": "homepage_banner"
}
```

### API-009: 追踪订单接口
**接口地址**: `GET /api/orders/{orderId}/tracking`  
**功能描述**: 追踪订单状态和物流信息

### API-010: 语言切换接口
**接口地址**: `POST /api/system/language`  
**功能描述**: 切换网站语言设置

---

## 🏢 关于我们页面接口

关于我们页面接口提供企业基本信息、核心价值观、车队储存能力、管理团队等内容。

### API-011: 获取公司信息
**接口地址**: `GET /api/about/company-info`  
**功能描述**: 获取公司基本信息和统计数据

### API-012: 获取核心价值观
**接口地址**: `GET /api/about/core-values`  
**功能描述**: 获取企业核心价值观数据

### API-013: 获取车队与储存信息
**接口地址**: `GET /api/about/fleet-storage`  
**功能描述**: 获取车队规模和储存设施信息

### API-014: 获取管理团队
**接口地址**: `GET /api/about/leadership-team`  
**功能描述**: 获取公司管理团队信息

---

## 🛢️ 产品与服务页面接口

产品与服务页面接口提供产品信息、服务模块、价格信息、技术文档下载以及各类咨询和报价功能。

### API-015: 获取产品列表
**接口地址**: `GET /api/products`  
**功能描述**: 获取产品列表和规格信息，支持分页和筛选

**请求参数**:
- `page`: number (可选，默认1) - 页码
- `pageSize`: number (可选，默认10) - 每页数量
- `category`: string (可选) - 产品分类 (fuel, additive, all)
- `search`: string (可选) - 搜索关键词

### API-016: 获取服务模块
**接口地址**: `GET /api/products/services`  
**功能描述**: 获取产品相关的服务模块信息

### API-017: 获取当前价格信息
**接口地址**: `GET /api/products/pricing`  
**功能描述**: 获取产品价格信息和批量优惠政策

### API-018: 产品询价接口
**接口地址**: `POST /api/products/quote-request`  
**功能描述**: 提交产品询价请求

### API-019: 获取下载文件列表
**接口地址**: `GET /api/products/downloads`  
**功能描述**: 获取产品相关的技术文档下载列表

### API-020: 技术咨询接口
**接口地址**: `POST /api/products/technical-inquiry`  
**功能描述**: 提交技术咨询请求

### API-021: 添加剂咨询接口
**接口地址**: `POST /api/products/additive-inquiry`  
**功能描述**: 咨询添加剂方案

### API-022: 批量报价接口
**接口地址**: `POST /api/products/bulk-quote`  
**功能描述**: 获取批量采购报价

---

## 🛡️ 安全与合规页面接口

### API-023: 获取安全政策
**接口地址**: `GET /api/safety/policies`  
**功能描述**: 获取安全政策和HSE管理手册

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/safety/policies" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "policies": [
      {
        "id": "hse-manual",
        "title": "HSE管理手册",
        "description": "健康、安全、环境管理体系",
        "lastUpdated": "2024-01-15",
        "downloadUrl": "https://cdn.tianjun-petro.com/hse-manual.pdf"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-024: 获取认证证书
**接口地址**: `GET /api/safety/certifications`  
**功能描述**: 获取公司各类资质认证证书

---

## 📰 新闻中心页面接口

### API-025: 获取新闻列表
**接口地址**: `GET /api/news`  
**功能描述**: 获取新闻列表，支持分页、分类筛选和搜索

**请求参数**:
- `page`: number (可选，默认1) - 页码
- `pageSize`: number (可选，默认10) - 每页数量
- `category`: string (可选) - 新闻分类
- `search`: string (可选) - 搜索关键词

### API-026: 获取新闻详情
**接口地址**: `GET /api/news/{id}`  
**功能描述**: 根据新闻ID获取详细内容

### API-027: 新闻分享统计
**接口地址**: `POST /api/news/{id}/share`  
**功能描述**: 记录新闻分享并返回分享链接

---

## 👥 招聘信息页面接口

### API-028: 获取职位列表
**接口地址**: `GET /api/careers/positions`  
**功能描述**: 获取招聘职位列表，支持按部门、地点筛选

### API-029: 获取企业福利
**接口地址**: `GET /api/careers/benefits`  
**功能描述**: 获取企业福利待遇信息

### API-030: 提交简历申请
**接口地址**: `POST /api/careers/applications`  
**功能描述**: 提交职位申请和简历

### API-031: 实习生申请接口
**接口地址**: `POST /api/careers/internship-application`  
**功能描述**: 提交实习申请

### API-032: 企业文化视频接口
**接口地址**: `GET /api/careers/culture-video`  
**功能描述**: 获取企业文化宣传片信息

---

## 📞 联系我们页面接口

### API-033: 获取联系信息
**接口地址**: `GET /api/contact/info`  
**功能描述**: 获取公司联系方式和地址信息

### API-034: 提交联系表单
**接口地址**: `POST /api/contact/messages`  
**功能描述**: 提交客户联系表单

### API-035: 获取服务区域
**接口地址**: `GET /api/contact/service-areas`  
**功能描述**: 获取公司服务覆盖区域信息

---

## 🔧 系统管理接口

### API-036: 网站配置
**接口地址**: `GET /api/system/config`  
**功能描述**: 获取网站基本配置信息

### API-037: 文件上传
**接口地址**: `POST /api/upload`  
**功能描述**: 上传文件（简历、文档等）

### API-038: 统计分析
**接口地址**: `POST /api/analytics/track`  
**功能描述**: 记录用户行为统计数据

### API-039: 新闻分享统计（系统级别）
**接口地址**: `POST /api/news/{id}/share`  
**功能描述**: 记录新闻分享统计（与API-027相同）

---

## 📊 接口总结

### 接口分类统计
- **首页相关**: 10个接口 (API-001 ~ API-010)
- **关于我们**: 4个接口 (API-011 ~ API-014)
- **产品服务**: 8个接口 (API-015 ~ API-022)
- **安全合规**: 2个接口 (API-023 ~ API-024)
- **新闻中心**: 3个接口 (API-025 ~ API-027)
- **招聘信息**: 5个接口 (API-028 ~ API-032)
- **联系我们**: 3个接口 (API-033 ~ API-035)
- **系统管理**: 4个接口 (API-036 ~ API-039)

**总计**: 39个核心接口

### 新增功能接口
基于实际业务需求发现的额外功能：
- **立即询价**: 首页banner快速询价功能
- **追踪订单**: 支持订单状态查询和物流跟踪
- **语言切换**: 支持中英文切换
- **技术咨询**: 产品技术问题咨询
- **添加剂咨询**: 燃油添加剂方案咨询
- **批量报价**: 大客户批量采购报价
- **实习生申请**: 学生实习机会申请
- **企业文化视频**: 企业宣传片播放
- **新闻分享**: 社交媒体分享功能

### 技术要求
- **缓存策略**: 静态数据使用Redis缓存
- **文件存储**: 使用OSS/CDN存储静态资源
- **安全防护**: API限流、输入验证、SQL注入防护
- **监控日志**: 接口调用监控和错误日志记录
- **性能优化**: 数据库索引优化、接口响应时间控制

### 数据依赖关系
1. **轮播图管理**: 支持多图片、多端适配
2. **新闻系统**: 分类、标签、搜索、分页
3. **产品管理**: 规格、价格、文档下载
4. **用户交互**: 询价、简历、留言表单
5. **统计分析**: 访问量、用户行为跟踪

---

## 📑 接口索引与页面映射表

### 接口编号索引

#### 🏠 首页相关接口 (API-001 ~ API-010)
- **API-001**: `GET /api/home/banners` - 获取轮播图数据
- **API-002**: `GET /api/home/company-stats` - 获取企业实力数据
- **API-003**: `GET /api/home/services` - 获取服务介绍数据
- **API-004**: `GET /api/home/network-map` - 获取全国服务网络数据
- **API-005**: `GET /api/home/testimonials` - 获取客户证言
- **API-006**: `GET /api/home/latest-news` - 获取最新动态
- **API-007**: `GET /api/home/fuel-price` - 获取实时柴油价格
- **API-008**: `POST /api/home/quick-quote` - 立即询价接口
- **API-009**: `GET /api/orders/{orderId}/tracking` - 追踪订单接口
- **API-010**: `POST /api/system/language` - 语言切换接口

#### 🏢 关于我们页面接口 (API-011 ~ API-014)
- **API-011**: `GET /api/about/company-info` - 获取公司信息
- **API-012**: `GET /api/about/core-values` - 获取核心价值观
- **API-013**: `GET /api/about/fleet-storage` - 获取车队与储存信息
- **API-014**: `GET /api/about/leadership-team` - 获取管理团队

#### 🛢️ 产品与服务页面接口 (API-015 ~ API-022)
- **API-015**: `GET /api/products` - 获取产品列表
- **API-016**: `GET /api/products/services` - 获取服务模块
- **API-017**: `GET /api/products/pricing` - 获取当前价格信息
- **API-018**: `POST /api/products/quote-request` - 产品询价接口
- **API-019**: `GET /api/products/downloads` - 获取下载文件列表
- **API-020**: `POST /api/products/technical-inquiry` - 技术咨询接口
- **API-021**: `POST /api/products/additive-inquiry` - 添加剂咨询接口
- **API-022**: `POST /api/products/bulk-quote` - 批量报价接口

#### 🛡️ 安全与合规页面接口 (API-023 ~ API-024)
- **API-023**: `GET /api/safety/policies` - 获取安全政策
- **API-024**: `GET /api/safety/certifications` - 获取认证证书

#### 📰 新闻中心页面接口 (API-025 ~ API-027)
- **API-025**: `GET /api/news` - 获取新闻列表
- **API-026**: `GET /api/news/{id}` - 获取新闻详情
- **API-027**: `POST /api/news/{id}/share` - 新闻分享统计

#### 👥 招聘信息页面接口 (API-028 ~ API-032)
- **API-028**: `GET /api/careers/positions` - 获取职位列表
- **API-029**: `GET /api/careers/benefits` - 获取企业福利
- **API-030**: `POST /api/careers/applications` - 提交简历申请
- **API-031**: `POST /api/careers/internship-application` - 实习生申请接口
- **API-032**: `GET /api/careers/culture-video` - 企业文化视频接口

#### 📞 联系我们页面接口 (API-033 ~ API-035)
- **API-033**: `GET /api/contact/info` - 获取联系信息
- **API-034**: `POST /api/contact/messages` - 提交联系表单
- **API-035**: `GET /api/contact/service-areas` - 获取服务区域

#### 🔧 系统管理接口 (API-036 ~ API-039)
- **API-036**: `GET /api/system/config` - 网站配置
- **API-037**: `POST /api/upload` - 文件上传
- **API-038**: `POST /api/analytics/track` - 统计分析
- **API-039**: `POST /api/news/{id}/share` - 新闻分享统计（与API-027相同）

此接口文档涵盖了舟山天骏石油化工有限公司官网的所有核心功能，严格遵循RESTful设计规范，为前后端分离开发提供完整的API支持。