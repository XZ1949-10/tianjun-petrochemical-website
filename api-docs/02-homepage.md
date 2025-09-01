## 🏠 首页相关接口

首页相关接口提供企业官网首页所需的所有数据，包括轮播图、企业实力展示、服务介绍、客户证言等核心内容。

### 1. 获取轮播图数据
**接口地址**: `GET /home/banners`  
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
    },
    {
      "id": 2,
      "title": "专业危化品运输资质",
      "subtitle": "24小时应急响应 • 全国服务网络 • 安全可靠",
      "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "mobileImage": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "ctaText": "服务网络",
      "ctaLink": "/about",
      "order": 2,
      "status": "active"
    },
    {
      "id": 3,
      "title": "ISO认证企业",
      "subtitle": "ISO 9001 • ISO 14001 • OHSAS 18001 • 全面质量保障",
      "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "mobileImage": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "ctaText": "了解资质",
      "ctaLink": "/safety",
      "order": 3,
      "status": "active"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 2. 获取企业实力数据
**接口地址**: `GET /home/company-stats`  
**功能描述**: 获取企业实力展示数据，包括认证证书、合作伙伴、服务统计等

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/company-stats" \
  -H "Accept: application/json"
```

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
        },
        {
          "type": "ISO",
          "number": "14001",
          "name": "环境管理体系认证",
          "status": "有效",
          "expireDate": "2025-12-31",
          "issuer": "中国质量认证中心"
        },
        {
          "type": "OHSAS",
          "number": "18001",
          "name": "职业健康安全管理体系",
          "status": "有效",
          "expireDate": "2025-12-31",
          "issuer": "认证机构"
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
        },
        {
          "name": "中石油",
          "category": "能源集团",
          "logo": "https://cdn.tianjun-petro.com/cnpc.png",
          "cooperationYears": 8
        },
        {
          "name": "顺丰物流",
          "category": "物流企业",
          "logo": "https://cdn.tianjun-petro.com/sf.png",
          "cooperationYears": 5
        },
        {
          "name": "圆通速递",
          "category": "快递企业",
          "logo": "https://cdn.tianjun-petro.com/yt.png",
          "cooperationYears": 6
        },
        {
          "name": "德邦物流",
          "category": "物流企业",
          "logo": "https://cdn.tianjun-petro.com/db.png",
          "cooperationYears": 4
        },
        {
          "name": "京东物流",
          "category": "电商物流",
          "logo": "https://cdn.tianjun-petro.com/jd.png",
          "cooperationYears": 3
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

### 3. 获取服务介绍数据
**接口地址**: `GET /home/services`  
**功能描述**: 获取首页服务介绍卡片数据

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/services" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "delivery",
      "icon": "TruckOutlined",
      "title": "批量配送",
      "description": "专业的柴油批量配送服务，最小订单500升，覆盖整个区域。",
      "features": ["专业危化品运输", "24小时送达", "GPS实时跟踪"],
      "serviceHours": "24小时",
      "minOrder": 500,
      "coverage": "全区域",
      "link": "/products#delivery"
    },
    {
      "id": "onsite",
      "icon": "RocketOutlined",
      "title": "现场加油",
      "description": "24/7现场加油车服务，为工地、物流中心、车队运营提供便利。",
      "features": ["移动加油车", "现场服务", "灵活调度"],
      "serviceHours": "24小时",
      "responseTime": "1小时内",
      "link": "/products#onsite"
    },
    {
      "id": "emergency",
      "icon": "SafetyOutlined",
      "title": "应急供应",
      "description": "2小时应急响应服务，确保您的运营永不因燃料短缺而停止。",
      "features": ["2小时响应", "应急保障", "优先配送"],
      "serviceHours": "24小时",
      "responseTime": "2小时内",
      "hotline": "400-1234-9999",
      "link": "/products#emergency"
    },
    {
      "id": "storage",
      "icon": "ToolOutlined",
      "title": "储存服务",
      "description": "专业的石化产品储存服务，安全可靠的储存环境。",
      "features": ["专业储罐", "安全监控", "温控管理"],
      "capacity": "20,000m³",
      "facilities": 3,
      "link": "/about#storage"
    },
    {
      "id": "consulting",
      "icon": "ExperimentOutlined",
      "title": "技术咨询",
      "description": "专业的技术咨询服务，为客户提供燃油管理和优化方案。",
      "features": ["专家团队", "定制方案", "持续优化"],
      "responseTime": "24小时内",
      "link": "/contact#consulting"
    },
    {
      "id": "maintenance",
      "icon": "TeamOutlined",
      "title": "设备维护",
      "description": "专业的设备维护服务，确保客户设备正常运行。",
      "features": ["定期巡检", "故障维修", "预防保养"],
      "serviceLevel": "7×24小时",
      "link": "/contact#maintenance"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 4. 获取全国服务网络数据
**接口地址**: `GET /home/network-map`  
**功能描述**: 获取全国服务网络地图数据，用于ECharts地图展示

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/network-map" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "headquarters": {
      "name": "总部",
      "city": "江西南昌",
      "coordinates": [115.857963, 28.683061],
      "type": "headquarters",
      "established": "1990年",
      "employees": 200,
      "services": ["配送", "储存", "现场加油", "应急供应", "技术咨询"]
    },
    "branches": [
      {
        "id": 1,
        "name": "华东分部",
        "city": "舟山",
        "province": "浙江省",
        "coordinates": [122.207216, 29.985295],
        "established": "2010年",
        "employees": 50,
        "services": ["配送", "现场加油", "应急供应"]
      },
      {
        "id": 2,
        "name": "华南分部",
        "city": "深圳",
        "province": "广东省",
        "coordinates": [114.057868, 22.543099],
        "established": "2015年",
        "employees": 35,
        "services": ["配送", "应急供应"]
      },
      {
        "id": 3,
        "name": "华北分部",
        "city": "北京",
        "coordinates": [116.4074, 39.9042],
        "established": "2018年",
        "employees": 40,
        "services": ["配送", "技术咨询"]
      },
      {
        "id": 4,
        "name": "西南分部",
        "city": "成都",
        "coordinates": [104.0668, 30.5728],
        "established": "2020年",
        "employees": 30,
        "services": ["配送", "现场加油"]
      },
      {
        "id": 5,
        "name": "华中分部",
        "city": "武汉",
        "coordinates": [114.3056, 30.5928],
        "established": "2022年",
        "employees": 25,
        "services": ["配送", "应急供应"]
      }
    ],
    "coverage": {
      "provinces": 6,
      "cities": 25,
      "totalCapacity": "20,000m³",
      "fleetSize": "30+车辆"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 5. 获取客户证言
**接口地址**: `GET /home/testimonials`  
**功能描述**: 获取客户证言和评价数据

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/testimonials" \
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
      "content": "天骏石化的配送服务非常及时可靠，他们的专业团队确保我们的施工现场从不缺油。24小时应急服务更是解决了我们的后顾之忧。",
      "author": "张总",
      "company": "建设集团",
      "rating": 5,
      "avatar": "Z",
      "verified": true,
      "industry": "建筑工程",
      "cooperationYears": 5,
      "monthlyVolume": "8000升"
    },
    {
      "id": 2,
      "content": "作为物流公司，燃油质量和供应稳定性对我们至关重要。天骏石化的0#柴油质量稳定，价格透明，是我们长期合作的可靠伙伴。",
      "author": "李经理",
      "company": "运输有限公司",
      "rating": 5,
      "avatar": "L",
      "verified": true,
      "industry": "物流运输",
      "cooperationYears": 8,
      "monthlyVolume": "15000升"
    },
    {
      "id": 3,
      "content": "农业机械对燃油要求很高，天骏石化提供的柴油不仅质量好，而且他们的技术人员还会定期回访，提供专业的燃油管理建议。",
      "author": "王农户",
      "company": "农业合作社",
      "rating": 5,
      "avatar": "W",
      "verified": true,
      "industry": "农业机械",
      "cooperationYears": 3,
      "monthlyVolume": "5000升"
    },
    {
      "id": 4,
      "content": "与天骏石化合作已经10多年，他们的服务质量和价格都非常竞争力。特别是应急供应服务，多次在紧急情况下解决了我们的燃料问题。",
      "author": "陈董事长",
      "company": "港口物流集团",
      "rating": 5,
      "avatar": "C",
      "verified": true,
      "industry": "港口物流",
      "cooperationYears": 12,
      "monthlyVolume": "25000升"
    },
    {
      "id": 5,
      "content": "作为新客户，我们对天骏石化的专业性和服务态度印象深刻。从咨询到配送，每一个环节都体现了他们的专业水准。",
      "author": "刘总经理",
      "company": "智能制造有限公司",
      "rating": 5,
      "avatar": "L",
      "verified": true,
      "industry": "制造业",
      "cooperationYears": 1,
      "monthlyVolume": "3000升"
    },
    {
      "id": 6,
      "content": "在危化品运输方面，天骏石化的专业性无可挑剔。他们的驾驶员都经过专业培训，车辆设备也非常先进，让我们非常放心。",
      "author": "吴副总",
      "company": "城建工程公司",
      "rating": 5,
      "avatar": "W",
      "verified": true,
      "industry": "工程建设",
      "cooperationYears": 6,
      "monthlyVolume": "12000升"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 6. 获取最新动态
**接口地址**: `GET /home/latest-news`  
**功能描述**: 获取首页展示的最新新闻动态

**请求参数**:
- `limit`: number (可选，默认3) - 返回数量，最大10

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/latest-news?limit=3" \
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
      "excerpt": "近日，天骏石化成功与区域内多家知名物流企业签署2024年度燃油供应协议，进一步巩固了在商用车燃油市场的领先地位...",
      "image": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "date": "2024-01-20",
      "category": "业务拓展",
      "views": 1250,
      "slug": "annual-supply-agreement-2024"
    },
    {
      "id": 2,
      "title": "公司获得ISO 14001环境管理体系认证续期",
      "excerpt": "天骏石化顺利通过ISO 14001环境管理体系认证复审，这标志着公司在环境保护和可持续发展方面的持续努力得到了权威认可...",
      "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "date": "2024-01-15",
      "category": "企业资质",
      "views": 890,
      "slug": "iso-14001-renewal-2024"
    },
    {
      "id": 3,
      "title": "应急演练：2小时响应承诺的坚实保障",
      "excerpt": "为确保应急供油服务质量，公司定期组织应急演练。本次演练模拟了极端天气下的紧急供油需求，全程用时1小时38分钟...",
      "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "date": "2024-01-10",
      "category": "安全管理",
      "views": 567,
      "slug": "emergency-drill-2024"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 7. 获取实时柴油价格
**接口地址**: `GET /home/fuel-price`  
**功能描述**: 获取当前0#柴油价格信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/home/fuel-price" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "currentPrice": 6.85,
    "currency": "CNY",
    "unit": "升",
    "updateTime": "2025-08-31T11:30:00.000Z",
    "marketPrice": 6.95,
    "savings": 0.10,
    "trend": "stable",
    "lastWeekAvg": 6.88,
    "priceHistory": [
      { "date": "2025-08-30", "price": 6.87 },
      { "date": "2025-08-29", "price": 6.89 },
      { "date": "2025-08-28", "price": 6.86 }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
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
curl -X POST "http://localhost:3001/api/home/quick-quote" \
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
    "quoteId": "QUK20250831001",
    "estimatedResponse": "2小时内回复",
    "contactMethod": "phone",
    "nextSteps": [
      "我们的销售代表将在2小时内与您联系",
      "提供详细的价格方案和配送安排",
      "如需紧急处理，请拨打热线：400-1234-9999"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 9. 追踪订单接口
**接口地址**: `GET /orders/{orderId}/tracking`  
**功能描述**: 追踪订单状态和物流信息

**路径参数**:
- `orderId`: string - 订单编号

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
curl -X POST "http://localhost:3001/api/system/language" \
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
    "availableLanguages": [
      { "code": "zh-CN", "name": "简体中文", "flag": "🇨🇳" },
      { "code": "en-US", "name": "English", "flag": "🇺🇸" }
    ],
    "settingsSaved": true
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---