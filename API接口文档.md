# 舟山天骏石油化工有限公司官网 API 接口文档

## 📋 文档概述

**项目名称**: 舟山天骏石油化工有限公司官网后端接口  
**API版本**: v1.0  
**基础URL**: `https://api.tianjun-petro.com/v1`  
**认证方式**: Bearer Token / API Key  
**数据格式**: JSON  
**字符编码**: UTF-8  
**文档更新时间**: 2025-08-31

## 🔧 通用规范

### 请求头规范
```http
Content-Type: application/json
Authorization: Bearer {token}
X-API-Key: {api_key}
Accept-Language: zh-CN,en-US
User-Agent: TianjunPetro-Web/1.0
```

### 统一响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2024-01-20T10:30:00Z",
  "requestId": "uuid-string"
}
```

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
  "errors": [
    {
      "field": "phone",
      "code": "INVALID_FORMAT", 
      "message": "手机号格式不正确"
    }
  ],
  "timestamp": "2024-01-20T10:30:00Z",
  "requestId": "uuid-string"
}
```

---

## 🏠 首页相关接口

### 1. 获取轮播图数据
**接口地址**: `GET /home/banners`  
**功能描述**: 获取首页Hero轮播图数据，支持多端适配

**请求参数**: 无

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/banners" \
  -H "Accept: application/json" \
  -H "Accept-Language: zh-CN,en-US"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "banners": [
      {
        "id": 1,
        "title": "可靠的0#柴油供应自1990年",
        "subtitle": "第三代家族企业 • 当日配送 • 持证危化品经营商",
        "image": "https://cdn.tianjun-petro.com/banner1.jpg",
        "mobileImage": "https://cdn.tianjun-petro.com/banner1-mobile.jpg",
        "ctaText": "立即询价",
        "ctaLink": "/contact",
        "order": 1,
        "status": "active"
      }
    ],
    "autoPlay": true,
    "interval": 5000
  }
}
```

### 2. 获取企业实力数据
**接口地址**: `GET /home/company-stats`  
**功能描述**: 获取企业实力展示数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/company-stats" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "certifications": {
      "count": "3+",
      "items": [
        {
          "type": "ISO",
          "number": "9001", 
          "name": "质量管理",
          "status": "有效",
          "expireDate": "2025-12-31"
        }
      ]
    },
    "partners": {
      "count": "6+",
      "majorClients": [
        {
          "name": "中石化",
          "category": "物流集团",
          "logo": "https://cdn.tianjun-petro.com/sinopec.png"
        }
      ]
    },
    "serviceStats": {
      "experience": "15+",
      "clients": "500+", 
      "deliveryRate": "99.8%",
      "serviceHours": "24/7"
    }
  }
}
```

### 3. 获取服务介绍数据
**接口地址**: `GET /home/services`  
**功能描述**: 获取首页服务介绍卡片数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/services" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "services": [
      {
        "id": "delivery",
        "title": "批量配送",
        "description": "专业的柴油批量配送服务，最小订单500升",
        "icon": "truck",
        "serviceHours": "24",
        "features": ["专业危化品运输", "24小时送达"],
        "link": "/products#delivery"
      }
    ]
  }
}
```

### 4. 获取全国服务网络数据
**接口地址**: `GET /home/network-map`  
**功能描述**: 获取全国服务网络地图数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/network-map" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "headquarters": {
      "city": "江西南昌",
      "coordinates": [115.857963, 28.683061],
      "type": "headquarters"
    },
    "branches": [
      {
        "id": 1,
        "city": "舟山",
        "province": "浙江省",
        "coordinates": [122.207216, 29.985295],
        "services": ["配送", "储存", "现场加油"]
      }
    ],
    "coverage": {
      "provinces": 6,
      "totalCapacity": "20,000m³"
    }
  }
}
```

### 5. 获取客户证言
**接口地址**: `GET /home/testimonials`  
**功能描述**: 获取客户证言和评价数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/testimonials" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "testimonials": [
      {
        "id": 1,
        "customerName": "张总",
        "company": "建设集团",
        "rating": 5,
        "comment": "天骏石化的配送服务非常及时可靠...",
        "featured": true
      }
    ]
  }
}
```

### 6. 获取最新动态
**接口地址**: `GET /home/latest-news`  
**功能描述**: 获取首页展示的最新新闻动态

**请求参数**:
- `limit`: number (可选，默认3) - 返回数量

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/latest-news?limit=3" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "news": [
      {
        "id": 1,
        "title": "天骏石化与多家大型物流企业签署年度供油协议",
        "excerpt": "近日，天骏石化成功与区域内多家知名物流企业...",
        "category": "业务拓展",
        "publishDate": "2024-01-20",
        "readCount": 1291,
        "slug": "annual-supply-agreement-2024"
      }
    ]
  }
}
```

### 7. 获取实时柴油价格
**接口地址**: `GET /home/fuel-price`  
**功能描述**: 获取当前0#柴油价格信息

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/home/fuel-price" \
  -H "Accept: application/json" \
  -H "X-API-Key: {api_key}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "currentPrice": 6.85,
    "currency": "CNY",
    "unit": "升",
    "updateTime": "2024-01-20T09:00:00Z",
    "marketPrice": 6.95,
    "savings": 0.10
  }
}
```

### 8. 立即询价接口
**接口地址**: `POST /home/quick-quote`  
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

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/home/quick-quote" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "contactName": "张先生",
    "phone": "13812345678",
    "company": "某物流公司",
    "requirement": "每月需要500升柴油",
    "location": "舟山市定海区",
    "source": "homepage_banner"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "询价请求已提交成功",
  "data": {
    "quoteId": "QUK20240120001",
    "estimatedResponse": "2小时内回复"
  }
}
```

### 9. 追踪订单接口
**接口地址**: `GET /orders/{orderId}/tracking`  
**功能描述**: 追踪订单状态和物流信息

**路径参数**:
- `orderId`: string - 订单编号

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/orders/ORD20240120001/tracking" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "orderId": "ORD20240120001",
    "status": "delivering",
    "currentLocation": "舟山市定海区",
    "estimatedArrival": "2024-01-20T14:30:00Z",
    "driver": {
      "name": "李师傅",
      "phone": "139****5678",
      "vehicle": "浙C12345"
    },
    "timeline": [
      {
        "time": "2024-01-20T08:00:00Z",
        "status": "dispatched",
        "description": "订单已派遣"
      },
      {
        "time": "2024-01-20T10:30:00Z",
        "status": "in_transit",
        "description": "运输中"
      }
    ]
  }
}
```

### 10. 语言切换接口
**接口地址**: `POST /system/language`  
**功能描述**: 切换网站语言设置

**请求参数**:
```json
{
  "language": "zh-CN",
  "sessionId": "session_uuid"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/system/language" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "language": "zh-CN",
    "sessionId": "abc123-def456"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "语言切换成功",
  "data": {
    "currentLanguage": "zh-CN",
    "availableLanguages": ["zh-CN", "en-US"]
  }
}
```

---

## 🏢 关于我们页面接口

### 11. 获取公司信息
**接口地址**: `GET /about/company-info`  
**功能描述**: 获取公司基本信息和统计数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/about/company-info" \
  -H "Accept: application/json" \
  -H "Accept-Language: zh-CN,en-US"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "basicInfo": {
      "foundedYear": 1990,
      "experience": "34年",
      "clients": "500+",
      "storageCapacity": "20,000m³"
    },
    "milestones": [
      {
        "date": "2014.06",
        "title": "公司成立",
        "description": "公司正式成立，首款产品成功上市..."
      }
    ]
  }
}
```

### 12. 获取核心价值观
**接口地址**: `GET /about/core-values`  
**功能描述**: 获取企业核心价值观数据

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/about/core-values" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "values": [
      {
        "id": "safety",
        "title": "安全第一",
        "description": "严格遵守安全生产规范...",
        "icon": "safety"
      }
    ]
  }
}
```

### 13. 获取车队与储存信息
**接口地址**: `GET /about/fleet-storage`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/about/fleet-storage" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "fleet": {
      "totalVehicles": "30+",
      "loadCapacity": "5-30吨",
      "features": ["危险品运输资质", "GPS实时监控"]
    },
    "storage": {
      "totalCapacity": "20,000m³",
      "facilities": 3,
      "features": ["温控储存系统", "安全防护措施"]
    }
  }
}
```

### 14. 获取管理团队
**接口地址**: `GET /about/leadership-team`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/about/leadership-team" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "leaders": [
      {
        "id": 1,
        "name": "张董事长", 
        "position": "董事长兼总经理",
        "bio": "公司创始人，34年石化行业经验...",
        "phone": "138****1234",
        "email": "chairman@tianjun-petro.com"
      }
    ]
  }
}
```

---

## 🛢️ 产品与服务页面接口

### 15. 获取产品列表
**接口地址**: `GET /products`  
**功能描述**: 获取产品列表和规格信息

**请求参数**:
- `category`: string (可选) - 产品分类
- `page`: number (可选，默认1) - 页码
- `limit`: number (可选，默认10) - 每页数量

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/products?category=fuel&page=1&limit=10" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "products": [
      {
        "id": "diesel-0",
        "name": "0# 柴油",
        "category": "燃油产品",
        "standard": "GB 19147-2016",
        "specifications": {
          "密度": "820-845 kg/m³",
          "十六烷值": "≥51",
          "硫含量": "≤10 mg/kg"
        },
        "features": ["高品质", "环保达标"]
      }
    ],
    "pagination": {
      "current": 1,
      "total": 10,
      "pageSize": 10
    }
  }
}
```

### 16. 获取服务模块
**接口地址**: `GET /products/services`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/products/services" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "services": [
      {
        "id": "bulk-delivery",
        "title": "批量配送",
        "description": "最小订单500升，覆盖整个舟山地区",
        "features": ["专业危化品运输", "24小时送达"],
        "icon": "truck"
      }
    ]
  }
}
```

### 17. 获取当前价格信息
**接口地址**: `GET /products/pricing`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/products/pricing" \
  -H "Accept: application/json" \
  -H "X-API-Key: {api_key}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "diesel": {
      "currentPrice": 6.85,
      "marketPrice": 6.95,
      "savings": 0.10,
      "updateTime": "2024-01-20T09:00:00Z"
    },
    "bulkPricing": {
      "available": true,
      "minOrder": 500,
      "contactRequired": true
    }
  }
}
```

### 18. 产品询价接口
**接口地址**: `POST /products/quote-request`  
**功能描述**: 提交产品询价请求

**请求参数**:
```json
{
  "productType": "diesel-0",
  "customerName": "张先生",
  "company": "某物流公司",
  "phone": "138****1234",
  "email": "zhang@example.com",
  "monthlyVolume": 5000,
  "deliveryAddress": "舟山市...",
  "preferredTime": "morning",
  "requirements": "需要定期配送"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/products/quote-request" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "productType": "diesel-0",
    "customerName": "张先生",
    "company": "某物流公司",
    "phone": "13812345678",
    "email": "zhang@example.com",
    "monthlyVolume": 5000,
    "deliveryAddress": "舟山市定海区某某街道",
    "preferredTime": "morning",
    "requirements": "需要定期配送，每周二次"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "询价请求已提交成功",
  "data": {
    "requestId": "QR20240120001",
    "estimatedResponse": "2小时内"
  }
}
```

### 19. 获取下载文件列表
**接口地址**: `GET /products/downloads`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/products/downloads" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "documents": [
      {
        "id": 1,
        "title": "安全数据表 (SDS)",
        "description": "0#柴油完整安全数据表",
        "fileType": "PDF",
        "fileSize": "2.1 MB",
        "downloadUrl": "https://cdn.tianjun-petro.com/sds-diesel.pdf"
      }
    ]
  }
}
```

### 20. 技术咨询接口
**接口地址**: `POST /products/technical-inquiry`  
**功能描述**: 提交技术咨询请求

**请求参数**:
```json
{
  "customerName": "李工程师",
  "company": "某建设集团",
  "phone": "139****5678",
  "email": "li@example.com",
  "productType": "diesel-0",
  "technicalQuestion": "关于冬季使用防凝剂的问题",
  "applicationScenario": "建筑工地设备"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/products/technical-inquiry" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "customerName": "李工程师",
    "company": "某建设集团",
    "phone": "13987654321",
    "email": "li@example.com",
    "productType": "diesel-0",
    "technicalQuestion": "关于冬季使用防凝剂的问题",
    "applicationScenario": "建筑工地设备"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "技术咨询已提交成功",
  "data": {
    "inquiryId": "TEC20240120001",
    "estimatedResponse": "24小时内回复"
  }
}
```

### 21. 添加剂咨询接口
**接口地址**: `POST /products/additive-inquiry`  
**功能描述**: 咨询添加剂方案

**请求参数**:
```json
{
  "customerName": "王经理",
  "company": "某运输公司",
  "phone": "138****9999",
  "email": "wang@example.com",
  "fuelVolume": 10000,
  "season": "winter",
  "additiveType": "anti-gel",
  "requirements": "需要-20℃防凝方案"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/products/additive-inquiry" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "customerName": "王经理",
    "company": "某运输公司",
    "phone": "13888889999",
    "email": "wang@example.com",
    "fuelVolume": 10000,
    "season": "winter",
    "additiveType": "anti-gel",
    "requirements": "需要-20℃防凝方案"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "添加剂咨询已提交成功",
  "data": {
    "inquiryId": "ADD20240120001",
    "recommendedSolution": "冬季防凝剂方案",
    "estimatedResponse": "12小时内回复"
  }
}
```

### 22. 批量报价接口
**接口地址**: `POST /products/bulk-quote`  
**功能描述**: 获取批量报价

**请求参数**:
```json
{
  "customerName": "刘总",
  "company": "某物流集团",
  "phone": "137****6666",
  "email": "liu@example.com",
  "monthlyVolume": 50000,
  "contractPeriod": 12,
  "deliveryLocations": [
    "舟山市定海区",
    "舟山市普陀区"
  ],
  "requirements": "需要签署年度供油协议"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/products/bulk-quote" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "customerName": "刘总",
    "company": "某物流集团",
    "phone": "13777776666",
    "email": "liu@example.com",
    "monthlyVolume": 50000,
    "contractPeriod": 12,
    "deliveryLocations": [
      "舟山市定海区",
      "舟山市普陀区"
    ],
    "requirements": "需要签署年度供油协议"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "批量报价请求已提交成功",
  "data": {
    "quoteId": "BLK20240120001",
    "estimatedDiscount": "5-8%",
    "estimatedResponse": "1个工作日内回复"
  }
}
```

---

## 🛡️ 安全与合规页面接口

### 17. 获取安全政策
**接口地址**: `GET /safety/policies`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/safety/policies" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "policies": [
      {
        "id": 1,
        "title": "HSE管理手册",
        "description": "健康、安全、环境管理体系完整手册",
        "icon": "safety",
        "fileSize": "5.2 MB",
        "downloadUrl": "https://cdn.tianjun-petro.com/hse-manual.pdf"
      }
    ]
  }
}
```

### 18. 获取认证证书
**接口地址**: `GET /safety/certifications`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/safety/certifications" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "certifications": [
      {
        "id": 1,
        "name": "危险化学品经营许可证",
        "issuer": "应急管理部",
        "issueDate": "2023-01-01",
        "expireDate": "2026-01-01",
        "status": "有效"
      }
    ]
  }
}
```

---

## 📰 新闻中心页面接口

### 19. 获取新闻列表
**接口地址**: `GET /news`

**请求参数**:
- `category`: string (可选) - 新闻分类
- `tag`: string (可选) - 标签筛选
- `keyword`: string (可选) - 关键词搜索
- `page`: number (可选，默认1) - 页码
- `limit`: number (可选，默认6) - 每页数量

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/news?category=业务拓展&page=1&limit=6" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "news": [
      {
        "id": 1,
        "title": "天骏石化与多家大型物流企业签署年度供油协议",
        "excerpt": "近日，天骏石化成功与区域内多家知名物流企业...",
        "category": "业务拓展",
        "tags": ["合作", "协议"],
        "author": "新闻部",
        "publishDate": "2024-01-20",
        "readCount": 1291,
        "slug": "annual-supply-agreement-2024"
      }
    ],
    "categories": ["业务拓展", "企业资质", "安全管理"],
    "pagination": {
      "current": 1,
      "total": 20,
      "pageSize": 6
    }
  }
}
```

### 20. 获取新闻详情
**接口地址**: `GET /news/{id}`

**路径参数**:
- `id`: string - 新闻ID或slug

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/news/1" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "news": {
      "id": 1,
      "title": "天骏石化与多家大型物流企业签署年度供油协议",
      "content": "详细的新闻内容，支持富文本格式...",
      "category": "业务拓展",
      "tags": ["合作", "协议"],
      "author": "新闻部",
      "publishDate": "2024-01-20",
      "readCount": 1291,
      "relatedNews": [
        {
          "id": 2,
          "title": "相关新闻标题",
          "slug": "related-news"
        }
      ]
    }
  }
}
```

### 21. 新闻分享统计
**接口地址**: `POST /news/{id}/share`

**请求参数**:
```json
{
  "platform": "wechat",
  "source": "web"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/news/1/share" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "platform": "wechat",
    "source": "web"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "分享成功",
  "data": {
    "shareUrl": "https://www.tianjun-petro.com/news/1?share=wechat",
    "shareCount": 156
  }
}
```

---

## 👥 招聘信息页面接口

### 23. 获取职位列表
**接口地址**: `GET /careers/positions`

**请求参数**:
- `department`: string (可选) - 部门筛选
- `location`: string (可选) - 工作地点
- `experience`: string (可选) - 经验要求
- `page`: number (可选，默认1) - 页码

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/careers/positions?department=销售部&location=舟山&page=1" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "positions": [
      {
        "id": 1,
        "title": "销售经理",
        "department": "销售部",
        "location": "舟山",
        "experience": "3-5年",
        "salary": "8000-12000",
        "type": "全职",
        "requirements": [
          "市场营销或相关专业本科学历",
          "3年以上B2B销售经验"
        ],
        "publishDate": "2024-01-15"
      }
    ],
    "departments": ["销售部", "运营部"],
    "locations": ["舟山", "杭州"],
    "pagination": {
      "current": 1,
      "total": 8,
      "pageSize": 10
    }
  }
}
```

### 24. 获取企业福利
**接口地址**: `GET /careers/benefits`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/careers/benefits" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "benefits": [
      {
        "category": "保险福利",
        "title": "完善保险",
        "description": "五险一金全覆盖，额外商业保险",
        "icon": "insurance"
      }
    ]
  }
}
```

### 25. 提交简历申请
**接口地址**: `POST /careers/applications`

**请求参数**:
```json
{
  "positionId": 1,
  "personalInfo": {
    "name": "张三",
    "phone": "138****1234",
    "email": "zhang@example.com",
    "education": "本科",
    "experience": "3-5年"
  },
  "workExperience": "工作经历描述...",
  "selfIntroduction": "自我介绍...",
  "resumeFile": "base64编码的简历文件"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/careers/applications" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "positionId": 1,
    "personalInfo": {
      "name": "张三",
      "phone": "13812345678",
      "email": "zhang@example.com",
      "education": "本科",
      "experience": "3-5年"
    },
    "workExperience": "曾在某大型物流公司担任销售经理，负责区域市场开发...",
    "selfIntroduction": "本人具有丰富的B2B销售经验，熟悉石化行业...",
    "resumeFile": "base64encodedfile..."
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "简历已提交成功",
  "data": {
    "applicationId": "APP20240120001",
    "estimatedResponse": "3个工作日内"
  }
}
```

### 26. 实习生申请接口
**接口地址**: `POST /careers/internship-application`  
**功能描述**: 提交实习申请

**请求参数**:
```json
{
  "personalInfo": {
    "name": "李小明",
    "phone": "139****8888",
    "email": "li@student.edu.cn",
    "school": "某大学",
    "major": "石油化工",
    "grade": "大三"
  },
  "internshipPeriod": {
    "startDate": "2024-07-01",
    "endDate": "2024-08-31"
  },
  "preferredDepartment": "技术部",
  "motivation": "希望在实习中学习石化企业实际运营...",
  "skills": ["计算机操作", "CAD绘图", "英语四级"]
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/careers/internship-application" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "personalInfo": {
      "name": "李小明",
      "phone": "13988888888",
      "email": "li@student.edu.cn",
      "school": "某大学",
      "major": "石油化工",
      "grade": "大三"
    },
    "internshipPeriod": {
      "startDate": "2024-07-01",
      "endDate": "2024-08-31"
    },
    "preferredDepartment": "技术部",
    "motivation": "希望在实习中学习石化企业实际运营经验",
    "skills": ["计算机操作", "CAD绘图", "英语四级"]
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "实习申请已提交成功",
  "data": {
    "applicationId": "INT20240120001",
    "estimatedResponse": "1周内回复"
  }
}
```

### 27. 企业文化视频接口
**接口地址**: `GET /careers/culture-video`  
**功能描述**: 获取企业文化宣传片信息

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/careers/culture-video" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "title": "天骏石化企业文化宣传片",
    "description": "了解天骏石化的企业文化和工作环境",
    "duration": "3分钟",
    "videoUrl": "https://cdn.tianjun-petro.com/videos/culture.mp4",
    "posterUrl": "https://cdn.tianjun-petro.com/images/culture-poster.jpg"
  }
}
```

---

## 📞 联系我们页面接口

### 28. 获取联系信息
**接口地址**: `GET /contact/info`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/contact/info" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "headquarters": {
      "name": "舟山天骏石油化工有限公司",
      "address": "浙江省舟山市...",
      "phone": "0580-1234567",
      "email": "info@tianjun-petro.com",
      "coordinates": [122.207216, 29.985295]
    },
    "emergencyHotline": "400-XXX-XXXX",
    "businessHours": {
      "office": "周一至周五 8:00-17:30",
      "emergency": "24小时全天候服务"
    }
  }
}
```

### 29. 提交联系表单
**接口地址**: `POST /contact/messages`

**请求参数**:
```json
{
  "contactType": "inquiry",
  "urgency": "normal",
  "customerInfo": {
    "name": "张先生",
    "company": "某物流公司",
    "phone": "138****1234",
    "email": "zhang@example.com"
  },
  "subject": "柴油供应咨询",
  "message": "详细的咨询内容...",
  "preferredContact": "phone",
  "preferredTime": "morning"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/contact/messages" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "contactType": "inquiry",
    "urgency": "normal",
    "customerInfo": {
      "name": "张先生",
      "company": "某物流公司",
      "phone": "13812345678",
      "email": "zhang@example.com"
    },
    "subject": "柴油供应咨询",
    "message": "我们公司需要每月大约500升柴油，希望能提供定期配送服务",
    "preferredContact": "phone",
    "preferredTime": "morning"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "留言已提交成功",
  "data": {
    "messageId": "MSG20240120001",
    "estimatedResponse": "2小时内回复"
  }
}
```

### 30. 获取服务区域
**接口地址**: `GET /contact/service-areas`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/contact/service-areas" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "areas": [
      {
        "province": "浙江省",
        "cities": ["舟山市", "杭州市", "宁波市"],
        "services": ["配送", "现场加油", "应急供应"],
        "responseTime": "2小时内"
      }
    ]
  }
}
```

---

## 🔧 系统管理接口

### 31. 网站配置
**接口地址**: `GET /system/config`

**请求示例**:
```bash
curl -X GET "https://api.tianjun-petro.com/v1/system/config" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "siteInfo": {
      "name": "舟山天骏石油化工有限公司",
      "logo": "https://cdn.tianjun-petro.com/logo.png",
      "description": "专业的石油化工产品供应商"
    },
    "features": {
      "multiLanguage": true,
      "onlineChat": true,
      "priceDisplay": true
    }
  }
}
```

### 32. 文件上传
**接口地址**: `POST /upload`

**请求参数**: FormData
- `file`: File - 上传的文件
- `type`: string - 文件类型 (resume, document, image)

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/upload" \
  -H "Authorization: Bearer {token}" \
  -F "file=@/path/to/resume.pdf" \
  -F "type=resume"
```

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "fileId": "FILE20240120001",
    "fileName": "resume.pdf",
    "fileUrl": "https://cdn.tianjun-petro.com/uploads/resume.pdf",
    "fileSize": 1024000
  }
}
```

### 33. 统计分析
**接口地址**: `POST /analytics/track`

**请求参数**:
```json
{
  "event": "page_view",
  "page": "/products",
  "element": "inquiry_button",
  "timestamp": "2024-01-20T10:30:00Z",
  "sessionId": "session_uuid"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/analytics/track" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "event": "button_click",
    "page": "/products",
    "element": "bulk_quote_button",
    "timestamp": "2024-01-20T10:30:00Z",
    "sessionId": "abc123-def456",
    "userId": "user789"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "统计数据已记录"
}
```

### 34. 新闻分享统计
**接口地址**: `POST /news/{id}/share`

**请求参数**:
```json
{
  "platform": "wechat",
  "source": "web"
}
```

**请求示例**:
```bash
curl -X POST "https://api.tianjun-petro.com/v1/news/1/share" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "platform": "wechat",
    "source": "web"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "分享成功",
  "data": {
    "shareUrl": "https://www.tianjun-petro.com/news/1?share=wechat",
    "shareCount": 156
  }
}
```

---

## 📊 接口总结

### 接口分类统计
- **首页相关**: 10个接口
- **关于我们**: 4个接口  
- **产品服务**: 8个接口
- **安全合规**: 2个接口
- **新闻中心**: 3个接口
- **招聘信息**: 5个接口
- **联系我们**: 3个接口
- **系统管理**: 4个接口

**总计**: 39个核心接口

### 新增功能接口
基于MCP浏览器实际查看网站发现的额外功能：
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

此接口文档涵盖了舟山天骏石油化工有限公司官网的所有核心功能，严格遵循RESTful设计规范，为前后端分离开发提供完整的API支持。

---

## 📑 接口索引与页面映射表

### 接口编号索引

#### 🏠 首页相关接口 (API-001 ~ API-010)
- **API-001**: `GET /home/banners` - 获取轮播图数据
- **API-002**: `GET /home/company-stats` - 获取企业实力数据
- **API-003**: `GET /home/services` - 获取服务介绍数据
- **API-004**: `GET /home/network-map` - 获取全国服务网络数据
- **API-005**: `GET /home/testimonials` - 获取客户证言
- **API-006**: `GET /home/latest-news` - 获取最新动态
- **API-007**: `GET /home/fuel-price` - 获取实时柴油价格
- **API-008**: `POST /home/quick-quote` - 立即询价接口
- **API-009**: `GET /orders/{orderId}/tracking` - 追踪订单接口
- **API-010**: `POST /system/language` - 语言切换接口

#### 🏢 关于我们页面接口 (API-011 ~ API-014)
- **API-011**: `GET /about/company-info` - 获取公司信息
- **API-012**: `GET /about/core-values` - 获取核心价值观
- **API-013**: `GET /about/fleet-storage` - 获取车队与储存信息
- **API-014**: `GET /about/leadership-team` - 获取管理团队

#### 🛢️ 产品与服务页面接口 (API-015 ~ API-022)
- **API-015**: `GET /products` - 获取产品列表
- **API-016**: `GET /products/services` - 获取服务模块
- **API-017**: `GET /products/pricing` - 获取当前价格信息
- **API-018**: `POST /products/quote-request` - 产品询价接口
- **API-019**: `GET /products/downloads` - 获取下载文件列表
- **API-020**: `POST /products/technical-inquiry` - 技术咨询接口
- **API-021**: `POST /products/additive-inquiry` - 添加剂咨询接口
- **API-022**: `POST /products/bulk-quote` - 批量报价接口

#### 🛡️ 安全与合规页面接口 (API-023 ~ API-024)
- **API-023**: `GET /safety/policies` - 获取安全政策
- **API-024**: `GET /safety/certifications` - 获取认证证书

#### 📰 新闻中心页面接口 (API-025 ~ API-027)
- **API-025**: `GET /news` - 获取新闻列表
- **API-026**: `GET /news/{id}` - 获取新闻详情
- **API-027**: `POST /news/{id}/share` - 新闻分享统计

#### 👥 招聘信息页面接口 (API-028 ~ API-032)
- **API-028**: `GET /careers/positions` - 获取职位列表
- **API-029**: `GET /careers/benefits` - 获取企业福利
- **API-030**: `POST /careers/applications` - 提交简历申请
- **API-031**: `POST /careers/internship-application` - 实习生申请接口
- **API-032**: `GET /careers/culture-video` - 企业文化视频接口

#### 📞 联系我们页面接口 (API-033 ~ API-035)
- **API-033**: `GET /contact/info` - 获取联系信息
- **API-034**: `POST /contact/messages` - 提交联系表单
- **API-035**: `GET /contact/service-areas` - 获取服务区域

#### 🔧 系统管理接口 (API-036 ~ API-039)
- **API-036**: `GET /system/config` - 网站配置
- **API-037**: `POST /upload` - 文件上传
- **API-038**: `POST /analytics/track` - 统计分析
- **API-039**: `POST /news/{id}/share` - 新闻分享统计（与API-027相同）

### 页面接口映射表

#### 📱 各页面使用的接口列表

**🏠 首页 (`/`)**
```
主要接口:
- API-001: 轮播图数据 (banner展示)
- API-002: 企业实力数据 (认证、合作伙伴、服务数据)
- API-003: 服务介绍数据 (专业服务卡片)
- API-004: 全国服务网络数据 (地图展示)
- API-005: 客户证言 (客户评价)
- API-006: 最新动态 (新闻预览)
- API-007: 实时柴油价格 (价格显示)

交互接口:
- API-008: 立即询价 (banner按钮、导航按钮)
- API-009: 追踪订单 (追踪订单按钮)
- API-010: 语言切换 (导航栏语言切换)
- API-038: 统计分析 (页面访问统计)
```

**🏢 关于我们页面 (`/about`)**
```
主要接口:
- API-011: 公司信息 (基本信息、里程碑)
- API-012: 核心价值观 (企业价值观展示)
- API-013: 车队与储存信息 (车队规模、储存能力)
- API-014: 管理团队 (领导团队信息)

共用接口:
- API-010: 语言切换
- API-038: 统计分析
```

**🛢️ 产品与服务页面 (`/products`)**
```
主要接口:
- API-015: 产品列表 (产品展示、规格信息)
- API-016: 服务模块 (专业服务体系)
- API-017: 价格信息 (当前价格、批量优惠)
- API-019: 下载文件列表 (技术文档下载)

交互接口:
- API-018: 产品询价 (立即订购按钮)
- API-020: 技术咨询 (技术咨询按钮)
- API-021: 添加剂咨询 (咨询添加剂方案按钮)
- API-022: 批量报价 (获取批量报价按钮)
- API-037: 文件上传 (文档下载功能)

共用接口:
- API-007: 实时柴油价格 (价格显示复用)
- API-010: 语言切换
- API-038: 统计分析
```

**🛡️ 安全与合规页面 (`/safety`)**
```
主要接口:
- API-023: 安全政策 (HSE管理手册等)
- API-024: 认证证书 (各类资质证书)

共用接口:
- API-010: 语言切换
- API-037: 文件上传 (证书文档下载)
- API-038: 统计分析
```

**📰 新闻中心页面 (`/news`)**
```
主要接口:
- API-025: 新闻列表 (新闻展示、分类、搜索)
- API-026: 新闻详情 (详细内容、相关新闻)
- API-027: 新闻分享统计 (分享功能)

共用接口:
- API-010: 语言切换
- API-038: 统计分析

页面间复用:
- API-006: 最新动态 (首页也使用此类数据)
```

**👥 招聘信息页面 (`/careers`)**
```
主要接口:
- API-028: 职位列表 (招聘职位展示、筛选)
- API-029: 企业福利 (福利待遇信息)
- API-032: 企业文化视频 (宣传片播放)

交互接口:
- API-030: 简历申请 (立即申请按钮)
- API-031: 实习生申请 (实习机会申请)
- API-037: 文件上传 (简历文件上传)

共用接口:
- API-010: 语言切换
- API-038: 统计分析
```

**📞 联系我们页面 (`/contact`)**
```
主要接口:
- API-033: 联系信息 (公司地址、电话、邮箱)
- API-035: 服务区域 (服务覆盖范围)

交互接口:
- API-034: 联系表单 (发送消息功能)

共用接口:
- API-004: 服务网络数据 (地图信息复用)
- API-010: 语言切换
- API-038: 统计分析
```

### 🔄 接口复用情况分析

#### 高频复用接口
- **API-010 (语言切换)**: 所有页面都使用
- **API-038 (统计分析)**: 所有页面都使用
- **API-037 (文件上传)**: 产品页面、安全页面、招聘页面使用

#### 跨页面数据复用
- **API-007 (实时价格)**: 首页 + 产品页面
- **API-006 (最新动态)**: 首页 + 新闻中心页面数据关联
- **API-004 (服务网络)**: 首页 + 联系我们页面
- **API-027/039 (分享统计)**: 新闻页面 + 系统统计

#### 独立功能接口
- **询价类**: API-008, API-018, API-022 (不同场景的询价功能)
- **咨询类**: API-020, API-021 (技术和添加剂咨询)
- **申请类**: API-030, API-031 (正式职位和实习申请)
- **信息展示类**: API-001~006, API-011~016, API-023~026, API-028~029, API-032~033, API-035

### 📊 接口使用统计

| 页面 | 主要接口数 | 交互接口数 | 共用接口数 | 总计 |
|------|------------|------------|------------|---------|
| 首页 | 7 | 3 | 2 | 12 |
| 关于我们 | 4 | 0 | 2 | 6 |
| 产品与服务 | 4 | 5 | 3 | 12 |
| 安全与合规 | 2 | 0 | 3 | 5 |
| 新闻中心 | 3 | 0 | 2 | 5 |
| 招聘信息 | 3 | 3 | 3 | 9 |
| 联系我们 | 2 | 1 | 3 | 6 |
| **合计** | **25** | **12** | **18** | **55** |

*注：共用接口在多个页面使用，实际接口总数为39个*