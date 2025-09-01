## 🛢️ 产品与服务页面接口

产品与服务页面接口提供产品信息、服务模块、价格信息、技术文档下载以及各类咨询和报价功能。

### 15. 获取产品列表
**接口地址**: `GET /products`  
**功能描述**: 获取产品列表和规格信息，支持分页和筛选

**请求参数**:
- `page`: number (可选，默认1) - 页码
- `pageSize`: number (可选，默认10) - 每页数量
- `category`: string (可选) - 产品分类 (fuel, additive, all)
- `search`: string (可选) - 搜索关键词

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
    },
    {
      "id": 2,
      "name": "-10#柴油",
      "category": "燃油产品",
      "categoryId": "fuel",
      "price": 7.05,
      "unit": "升",
      "description": "低温环境专用-10#柴油，适用于冬季使用",
      "detailDescription": "-10#柴油适用于环境温度在-5°C至-14°C的地区使用，具有良好的低温流动性和冷启动性能。",
      "images": [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "specifications": {
        "standard": "GB 19147-2016",
        "density": "0.820-0.845 kg/L",
        "sulfurContent": "≤ 10 mg/kg",
        "flashPoint": "≥ 55°C",
        "coldFilterPoint": "≤ -10°C",
        "cetaneNumber": "≥ 51"
      },
      "applications": [
        "冬季车辆",
        "低温环境作业",
        "高原地区使用"
      ],
      "qualityFeatures": [
        "优异的低温流动性",
        "良好的冷启动性能",
        "适应严寒环境",
        "保证设备正常运行"
      ],
      "minOrder": 500,
      "available": true,
      "stock": "5000+",
      "seasonal": true,
      "availablePeriod": "10月-3月"
    },
    {
      "id": 3,
      "name": "添加剂包",
      "category": "添加剂产品",
      "categoryId": "additive",
      "price": 25.00,
      "unit": "瓶",
      "description": "专业柴油添加剂，提升燃料性能和清洁度",
      "detailDescription": "我们的添加剂包含清洁剂、抗氧化剂、金属钝化剂等多种成分，能够有效清洁发动机积炭、提高燃烧效率、延长发动机寿命。",
      "images": [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "specifications": {
        "volume": "500ml",
        "concentration": "高浓缩配方",
        "ratio": "1:1000",
        "shelfLife": "3年",
        "storageTemp": "0-40°C"
      },
      "applications": [
        "柴油发动机保养",
        "燃料系统清洁",
        "性能优化提升"
      ],
      "functions": [
        "清洁燃油系统",
        "提高燃烧效率",
        "减少尾气排放",
        "延长发动机寿命"
      ],
      "minOrder": 10,
      "available": true,
      "stock": "200+"
    }
  ],
  "total": 3,
  "page": 1,
  "pageSize": 10,
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 16. 获取产品分类
**接口地址**: `GET /products/categories`  
**功能描述**: 获取产品分类信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products/categories" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "fuel",
      "name": "燃油产品",
      "description": "各类高品质柴油产品",
      "count": 2,
      "icon": "fuel",
      "products": ["0#柴油", "-10#柴油"]
    },
    {
      "id": "additive",
      "name": "添加剂产品",
      "description": "燃油添加剂和性能提升产品",
      "count": 1,
      "icon": "additive",
      "products": ["添加剂包"]
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 17. 获取产品详情
**接口地址**: `GET /products/{id}`  
**功能描述**: 获取特定产品的详细信息

**路径参数**:
- `id`: number - 产品ID

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products/1" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "0#柴油",
    "category": "燃油产品",
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
    "minOrder": 500,
    "available": true,
    "stock": "99999+",
    "relatedProducts": [
      {
        "id": 2,
        "name": "-10#柴油",
        "category": "燃油产品",
        "price": 7.05
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 18. 获取服务模块
**接口地址**: `GET /products/services`  
**功能描述**: 获取产品相关的服务模块信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products/services" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "services": [
      {
        "id": "bulk-delivery",
        "title": "批量配送",
        "description": "最小订单500升，覆盖整个舟山地区",
        "features": [
          "专业危化品运输",
          "24小时送达",
          "GPS实时跟踪"
        ],
        "icon": "truck",
        "serviceHours": "24小时",
        "coverage": "全市覆盖",
        "minOrder": "500升",
        "deliveryTime": "当日送达",
        "pricing": "按距离计费"
      },
      {
        "id": "onsite-refueling",
        "title": "现场加油",
        "description": "移动加油车现场服务，适用于工地、车队",
        "features": [
          "移动加油车",
          "现场服务",
          "灵活调度"
        ],
        "icon": "fuel",
        "serviceHours": "24小时",
        "responseTime": "1小时内",
        "serviceRadius": "50公里",
        "equipment": "专业加油设备"
      },
      {
        "id": "emergency-supply",
        "title": "应急供应",
        "description": "2小时应急响应，确保业务连续性",
        "features": [
          "2小时响应",
          "应急保障",
          "优先配送"
        ],
        "icon": "emergency",
        "serviceHours": "24小时",
        "responseTime": "2小时内",
        "hotline": "400-1234-9999",
        "emergencyStock": "常备库存"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 19. 获取当前价格信息
**接口地址**: `GET /products/pricing`  
**功能描述**: 获取产品价格信息和批量优惠政策

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products/pricing" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "diesel": {
      "currentPrice": 6.85,
      "marketPrice": 6.95,
      "savings": 0.10,
      "priceType": "零售价",
      "updateTime": "2025-08-31T11:30:00.000Z",
      "priceHistory": [
        { "date": "2025-08-30", "price": 6.87 },
        { "date": "2025-08-29", "price": 6.89 },
        { "date": "2025-08-28", "price": 6.86 }
      ]
    },
    "bulkPricing": {
      "available": true,
      "minOrder": 500,
      "contactRequired": true,
      "discountRanges": [
        {
          "volume": "500-2000升",
          "discount": "2%",
          "price": 6.71
        },
        {
          "volume": "2000-5000升",
          "discount": "3%",
          "price": 6.64
        },
        {
          "volume": "5000升以上",
          "discount": "5%",
          "price": 6.51
        }
      ],
      "additionalBenefits": [
        "免费配送",
        "专属客户经理",
        "优先调度",
        "月度结算"
      ]
    },
    "paymentMethods": [
      "现金支付",
      "银行转账",
      "月度结算",
      "信用额度"
    ],
    "priceValidPeriod": "当日有效"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 20. 获取下载文件列表
**接口地址**: `GET /products/downloads`  
**功能描述**: 获取产品相关的技术文档下载列表

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/products/downloads" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "documents": [
      {
        "id": 1,
        "title": "安全数据表 (SDS)",
        "description": "0#柴油完整安全数据表",
        "category": "安全文档",
        "fileType": "PDF",
        "fileSize": "2.1 MB",
        "version": "v2.0",
        "updateDate": "2024-12-01",
        "language": "中文",
        "downloadUrl": "https://cdn.tianjun-petro.com/sds-diesel.pdf",
        "downloadCount": 1250
      },
      {
        "id": 2,
        "title": "产品质量检测报告",
        "description": "第三方权威机构检测报告",
        "category": "质量文档",
        "fileType": "PDF",
        "fileSize": "1.8 MB",
        "version": "v1.5",
        "updateDate": "2024-11-15",
        "language": "中文",
        "downloadUrl": "https://cdn.tianjun-petro.com/quality-report.pdf",
        "downloadCount": 890
      },
      {
        "id": 3,
        "title": "技术规格说明书",
        "description": "详细的技术参数和使用说明",
        "category": "技术文档",
        "fileType": "PDF",
        "fileSize": "3.2 MB",
        "version": "v3.1",
        "updateDate": "2024-10-20",
        "language": "中文",
        "downloadUrl": "https://cdn.tianjun-petro.com/tech-specs.pdf",
        "downloadCount": 2100
      },
      {
        "id": 4,
        "title": "存储和运输指南",
        "description": "安全存储和运输操作指南",
        "category": "操作指南",
        "fileType": "PDF",
        "fileSize": "1.5 MB",
        "version": "v2.2",
        "updateDate": "2024-09-10",
        "language": "中文",
        "downloadUrl": "https://cdn.tianjun-petro.com/storage-guide.pdf",
        "downloadCount": 750
      }
    ],
    "categories": [
      "安全文档",
      "质量文档",
      "技术文档",
      "操作指南"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 21. 产品询价接口
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

### 22. 技术咨询接口
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
  "applicationScenario": "建筑工地设备",
  "urgency": "normal"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/products/technical-inquiry" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "customerName": "李工程师",
    "company": "某建设集团",
    "phone": "13987654321",
    "email": "li@example.com",
    "productType": "diesel-0",
    "technicalQuestion": "关于冬季使用防凝剂的问题",
    "applicationScenario": "建筑工地设备",
    "urgency": "normal"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "技术咨询已提交成功",
  "data": {
    "inquiryId": "TEC20250831001",
    "estimatedResponse": "24小时内回复",
    "assignedTechnician": "王总监",
    "technicianBackground": "石油化工博士，10年技术经验",
    "consultationMethod": "电话+技术文档",
    "nextSteps": [
      "技术专家将在24小时内联系您",
      "提供专业的技术解答",
      "如需要将安排实地技术指导",
      "提供相关技术文档和使用建议"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 23. 添加剂咨询接口
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
  "requirements": "需要-20℃防凝方案",
  "vehicleType": "重型卡车"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/products/additive-inquiry" \
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
    "requirements": "需要-20℃防凝方案",
    "vehicleType": "重型卡车"
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "添加剂咨询已提交成功",
  "data": {
    "inquiryId": "ADD20250831001",
    "recommendedSolution": "冬季防凝剂方案",
    "estimatedResponse": "12小时内回复",
    "assignedSpecialist": "技术部专家",
    "preliminaryRecommendation": {
      "productName": "冬季防凝添加剂",
      "dosage": "1:1000 比例添加",
      "effectiveTemperature": "-25℃以上",
      "estimatedCost": "每升燃油增加0.02元"
    },
    "nextSteps": [
      "技术专家将详细分析您的需求",
      "提供定制化添加剂方案",
      "安排产品试用和效果测试",
      "制定最优性价比解决方案"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 24. 批量报价接口
**接口地址**: `POST /products/bulk-quote`  
**功能描述**: 获取批量采购报价

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
  "requirements": "需要签署年度供油协议",
  "currentSupplier": "其他供应商",
  "expectedPrice": 6.50
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/products/bulk-quote" \
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
    "requirements": "需要签署年度供油协议",
    "currentSupplier": "其他供应商",
    "expectedPrice": 6.50
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "批量报价请求已提交成功",
  "data": {
    "quoteId": "BLK20250831001",
    "estimatedDiscount": "5-8%",
    "estimatedResponse": "1个工作日内回复",
    "assignedManager": "陈销售总监",
    "preliminaryAssessment": {
      "volumeLevel": "大客户级别",
      "basePrice": 6.85,
      "estimatedDiscount": "7%",
      "estimatedPrice": 6.37,
      "annualSavings": "约24万元"
    },
    "proposedServices": [
      "专属客户经理",
      "优先配送保障",
      "24小时应急供应",
      "月度结算服务",
      "免费储罐维护"
    ],
    "nextSteps": [
      "大客户经理将在1个工作日内联系",
      "安排实地考察和需求调研",
      "制定详细的供应方案",
      "提供正式的年度合作协议"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---