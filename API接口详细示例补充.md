# 舟山天骏石油化工有限公司API接口详细文档补充

## 详细接口响应示例补充

本文档包含之前概要文档中未详细展示的接口响应示例和请求参数。

### API-002 详细示例: 获取企业实力数据

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "certifications": {
      "count": "3+",
      "items": [
        {
          "type": "ISO",
          "number": "9001",
          "name": "质量管理体系认证",
          "status": "有效",
          "expireDate": "2025-12-31",
          "issuer": "中国质量认证中心"
        }
      ]
    },
    "partners": {
      "count": "6+",
      "majorClients": [
        {
          "name": "中石化",
          "category": "物流集团",
          "logo": "https://cdn.tianjun-petro.com/sinopec.png",
          "cooperationYears": 10
        }
      ]
    },
    "serviceStats": {
      "experience": "34年",
      "clients": "500+",
      "deliveryRate": "99.8%",
      "serviceHours": "24/7",
      "storageCapacity": "20,000m³",
      "fleetSize": "30+车辆"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-009 详细示例: 追踪订单接口

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/orders/ORD20250831001/tracking" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "orderId": "ORD20250831001",
    "status": "delivering",
    "statusText": "配送中",
    "currentLocation": "舟山市定海区",
    "estimatedArrival": "2025-08-31T14:30:00.000Z",
    "driver": {
      "name": "李师傅",
      "phone": "139****5678",
      "vehicle": "浙C12345",
      "license": "危化品运输证"
    },
    "orderInfo": {
      "product": "0#柴油",
      "quantity": 1000,
      "unit": "升",
      "deliveryAddress": "舟山市定海区某某工业园"
    },
    "timeline": [
      {
        "time": "2025-08-31T08:00:00.000Z",
        "status": "dispatched",
        "description": "订单已派遣，车辆准备中"
      },
      {
        "time": "2025-08-31T09:30:00.000Z",
        "status": "loaded",
        "description": "货物装载完成，开始运输"
      },
      {
        "time": "2025-08-31T10:30:00.000Z",
        "status": "in_transit",
        "description": "运输中，预计14:30到达"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-015 详细示例: 获取产品列表

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products?category=fuel&page=1&pageSize=10" \
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
      "name": "0#柴油",
      "category": "燃油产品",
      "categoryId": "fuel",
      "price": 6.85,
      "unit": "升",
      "description": "高品质0#柴油，适用于各类柴油发动机",
      "detailDescription": "我们提供的0#柴油严格按照GB 19147-2016国家标准生产，适用于各种柴油车辆和工程机械。产品具有燃烧充分、动力强劲、清洁环保等特点。",
      "images": [
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "specifications": {
        "standard": "GB 19147-2016",
        "density": "0.820-0.845 kg/L",
        "sulfurContent": "≤ 10 mg/kg",
        "flashPoint": "≥ 55°C",
        "cetaneNumber": "≥ 51",
        "viscosity": "3.0-8.0 mm²/s",
        "carbonResidue": "≤ 0.30%"
      },
      "applications": [
        "商用车辆",
        "工程机械",
        "农业机械",
        "发电机组",
        "船舶动力"
      ],
      "qualityFeatures": [
        "燃烧充分，动力强劲",
        "清洁环保，符合国六标准",
        "低硫含量，保护发动机",
        "优良的低温性能"
      ],
      "minOrder": 500,
      "available": true,
      "stock": "99999+",
      "deliveryTime": "当日配送",
      "relatedProducts": [
        {
          "id": 2,
          "name": "-10#柴油",
          "category": "燃油产品"
        }
      ]
    }
  ],
  "total": 3,
  "page": 1,
  "pageSize": 10,
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-018 详细示例: 产品询价接口

**请求参数**:
```json
{
  "productType": "diesel-0",
  "customerName": "张先生",
  "company": "某物流公司",
  "phone": "138****1234",
  "email": "zhang@example.com",
  "monthlyVolume": 5000,
  "deliveryAddress": "舟山市定海区某某街道",
  "preferredTime": "morning",
  "requirements": "需要定期配送，每周二次"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/products/quote-request" \
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
    "requestId": "QR20250831001",
    "estimatedResponse": "2小时内",
    "assignedSales": "陈经理",
    "contactMethod": "phone",
    "nextSteps": [
      "销售代表将在2小时内与您联系",
      "提供详细的产品报价方案",
      "安排实地考察和技术交流",
      "制定配送计划和服务方案"
    ],
    "estimatedPricing": {
      "basePrice": 6.85,
      "volume": 5000,
      "discountRate": "3%",
      "estimatedPrice": 6.64,
      "note": "具体价格以正式报价为准"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-025 详细示例: 获取新闻列表

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/news?page=1&pageSize=10&category=industry&search=合作" \
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
      "title": "天骏石化与多家大型物流企业签署年度供油协议",
      "excerpt": "近日，舟山天骏石油化工有限公司与多家知名物流企业达成战略合作，签署年度供油协议...",
      "content": "详细的新闻内容...",
      "category": "业务拓展",
      "categoryId": "business",
      "author": "新闻部",
      "publishDate": "2024-01-20",
      "readCount": 1291,
      "featured": true,
      "imageUrl": "https://cdn.tianjun-petro.com/news/news-1.jpg",
      "tags": ["合作", "协议", "物流"]
    }
  ],
  "total": 25,
  "page": 1,
  "pageSize": 10,
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-030 详细示例: 提交简历申请

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
curl -X POST "http://localhost:3001/api/careers/applications" \
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
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-034 详细示例: 提交联系表单

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
curl -X POST "http://localhost:3001/api/contact/messages" \
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
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

## 错误处理示例

### 400 Bad Request 示例
```json
{
  "code": 400,
  "message": "请求参数不完整：缺少必需的手机号码字段",
  "data": {
    "field": "phone",
    "error": "required",
    "description": "手机号码是必填字段"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 404 Not Found 示例
```json
{
  "code": 404,
  "message": "未找到指定的产品",
  "data": {
    "requestedId": 999,
    "suggestion": "请检查产品ID是否正确，或访问产品列表接口获取有效的产品信息"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 500 Internal Server Error 示例
```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": {
    "errorId": "ERR20250831001",
    "suggestion": "请稍后重试，如问题持续存在请联系技术支持"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

## 性能和限制说明

### API 限流策略
- **频率限制**: 每个IP地址每分钟最多100次请求
- **并发限制**: 同一用户最多5个并发请求
- **文件上传**: 单个文件最大10MB，支持的格式：PDF、DOC、DOCX、JPG、PNG

### 响应时间标准
- **查询接口**: 平均响应时间 < 200ms
- **提交接口**: 平均响应时间 < 500ms
- **文件操作**: 平均响应时间 < 2s

### 数据缓存策略
- **静态数据**: 缓存24小时（如公司信息、产品规格）
- **动态数据**: 缓存5分钟（如价格信息、库存状态）
- **用户相关**: 不缓存（如订单状态、个人信息）

此文档补充提供了关键接口的详细实现示例，帮助开发人员更好地理解和使用API接口。