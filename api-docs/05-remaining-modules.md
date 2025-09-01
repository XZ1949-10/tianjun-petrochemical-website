# API接口文档 - 剩余模块

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
      },
      {
        "id": "safety-operation",
        "title": "安全操作规程",
        "description": "危险化学品安全操作标准",
        "lastUpdated": "2024-01-10",
        "downloadUrl": "https://cdn.tianjun-petro.com/safety-operation.pdf"
      },
      {
        "id": "emergency-response",
        "title": "应急响应预案",
        "description": "突发事件应急处理方案",
        "lastUpdated": "2024-01-05",
        "downloadUrl": "https://cdn.tianjun-petro.com/emergency-response.pdf"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-024: 获取认证证书
**接口地址**: `GET /api/safety/certifications`  
**功能描述**: 获取公司各类资质认证证书

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/safety/certifications" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "certifications": [
      {
        "id": "business-license",
        "title": "营业执照",
        "issuer": "舟山市市场监督管理局",
        "validUntil": "2029-12-31",
        "status": "valid",
        "imageUrl": "https://cdn.tianjun-petro.com/cert-business.jpg"
      },
      {
        "id": "hazmat-permit",
        "title": "危险化学品经营许可证",
        "issuer": "舟山市应急管理局",
        "validUntil": "2027-06-30",
        "status": "valid",
        "imageUrl": "https://cdn.tianjun-petro.com/cert-hazmat.jpg"
      },
      {
        "id": "iso9001",
        "title": "ISO9001质量管理体系认证",
        "issuer": "中国质量认证中心",
        "validUntil": "2026-03-15",
        "status": "valid",
        "imageUrl": "https://cdn.tianjun-petro.com/cert-iso9001.jpg"
      },
      {
        "id": "transport-permit",
        "title": "道路运输经营许可证",
        "issuer": "舟山市交通运输局",
        "validUntil": "2027-12-31",
        "status": "valid",
        "imageUrl": "https://cdn.tianjun-petro.com/cert-transport.jpg"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

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

### API-026: 获取新闻详情
**接口地址**: `GET /api/news/{id}`  
**功能描述**: 根据新闻ID获取详细内容

**路径参数**:
- `id`: number - 新闻ID

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/news/1" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "天骏石化与多家大型物流企业签署年度供油协议",
    "content": "详细的新闻内容，支持富文本格式...",
    "category": "业务拓展",
    "tags": ["合作", "协议"],
    "author": "新闻部",
    "publishDate": "2024-01-20",
    "readCount": 1291,
    "views": 1292,
    "relatedNews": [
      {
        "id": 2,
        "title": "相关新闻标题",
        "slug": "related-news"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-027: 新闻分享统计
**接口地址**: `POST /api/news/{id}/share`  
**功能描述**: 记录新闻分享并返回分享链接

**路径参数**:
- `id`: number - 新闻ID

**请求参数**:
```json
{
  "platform": "wechat",
  "source": "web"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/news/1/share" \
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
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---

## 👥 招聘信息页面接口

### API-028: 获取职位列表
**接口地址**: `GET /api/careers/positions`  
**功能描述**: 获取招聘职位列表，支持按部门、地点筛选

**请求参数**:
- `status`: string (可选，默认all) - 职位状态
- `department`: string (可选) - 部门筛选
- `location`: string (可选) - 工作地点

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/careers/positions?department=销售部&location=舟山" \
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
      "title": "销售经理",
      "department": "销售部",
      "location": "舟山",
      "experience": "3-5年",
      "salary": "8000-12000",
      "type": "全职",
      "status": "recruiting",
      "requirements": [
        "市场营销或相关专业本科学历",
        "3年以上B2B销售经验",
        "具备优秀的客户沟通能力"
      ],
      "responsibilities": [
        "负责区域市场开发",
        "维护客户关系",
        "完成销售目标"
      ],
      "publishDate": "2024-01-15"
    }
  ],
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-029: 获取企业福利
**接口地址**: `GET /api/careers/benefits`  
**功能描述**: 获取企业福利待遇信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/careers/benefits" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "benefits": [
      {
        "category": "保险福利",
        "title": "完善保险",
        "description": "五险一金全覆盖，额外商业保险",
        "icon": "insurance"
      },
      {
        "category": "假期福利",
        "title": "带薪休假",
        "description": "法定假期、年假、病假全薪保障",
        "icon": "vacation"
      },
      {
        "category": "培训发展",
        "title": "职业培训",
        "description": "定期技能培训、职业发展规划",
        "icon": "training"
      },
      {
        "category": "其他福利",
        "title": "团建活动",
        "description": "定期团建、员工旅游、节日礼品",
        "icon": "team"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-030: 提交简历申请
**接口地址**: `POST /api/careers/applications`  
**功能描述**: 提交职位申请和简历

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

### API-031: 实习生申请接口
**接口地址**: `POST /api/careers/internship-application`  
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
curl -X POST "http://localhost:3001/api/careers/internship-application" \
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
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-032: 企业文化视频接口
**接口地址**: `GET /api/careers/culture-video`  
**功能描述**: 获取企业文化宣传片信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/careers/culture-video" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "title": "天骏石化企业文化宣传片",
    "description": "了解天骏石化的企业文化和工作环境",
    "duration": "3分钟",
    "videoUrl": "https://cdn.tianjun-petro.com/videos/culture.mp4",
    "posterUrl": "https://cdn.tianjun-petro.com/images/culture-poster.jpg"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---

## 📞 联系我们页面接口

### API-033: 获取联系信息
**接口地址**: `GET /api/contact/info`  
**功能描述**: 获取公司联系方式和地址信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/contact/info" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "headquarters": {
      "name": "舟山天骏石油化工有限公司",
      "address": "浙江省舟山市定海区某某路123号",
      "phone": "0580-1234567",
      "email": "info@tianjun-petro.com",
      "coordinates": [122.207216, 29.985295]
    },
    "emergencyHotline": "400-XXX-XXXX",
    "businessHours": {
      "office": "周一至周五 8:00-17:30",
      "emergency": "24小时全天候服务"
    },
    "departments": [
      {
        "name": "销售部",
        "phone": "0580-1234568",
        "email": "sales@tianjun-petro.com"
      },
      {
        "name": "技术部",
        "phone": "0580-1234569",
        "email": "tech@tianjun-petro.com"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-034: 提交联系表单
**接口地址**: `POST /api/contact/messages`  
**功能描述**: 提交客户联系表单

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

### API-035: 获取服务区域
**接口地址**: `GET /api/contact/service-areas`  
**功能描述**: 获取公司服务覆盖区域信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/contact/service-areas" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "areas": [
      {
        "province": "浙江省",
        "cities": ["舟山市", "杭州市", "宁波市"],
        "services": ["配送", "现场加油", "应急供应"],
        "responseTime": "2小时内"
      },
      {
        "province": "江苏省",
        "cities": ["南京市", "苏州市", "无锡市"],
        "services": ["配送", "应急供应"],
        "responseTime": "4小时内"
      },
      {
        "province": "上海市",
        "cities": ["全市"],
        "services": ["配送", "现场加油", "应急供应"],
        "responseTime": "3小时内"
      }
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---

## 🔧 系统管理接口

### API-036: 网站配置
**接口地址**: `GET /api/system/config`  
**功能描述**: 获取网站基本配置信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/system/config" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer {token}"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "siteInfo": {
      "name": "舟山天骏石油化工有限公司",
      "logo": "https://cdn.tianjun-petro.com/logo.png",
      "description": "专业的石油化工产品供应商",
      "keywords": ["石油化工", "柴油供应", "舟山"],
      "favicon": "https://cdn.tianjun-petro.com/favicon.ico"
    },
    "features": {
      "multiLanguage": true,
      "onlineChat": true,
      "priceDisplay": true,
      "darkMode": false
    },
    "contact": {
      "phone": "400-1234-5678",
      "email": "contact@tianjun-petro.com",
      "address": "浙江省舟山市定海区某某路123号"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-037: 文件上传
**接口地址**: `POST /api/upload`  
**功能描述**: 上传文件（简历、文档等）

**请求参数**: FormData
- `file`: File - 上传的文件
- `type`: string - 文件类型 (resume, document, image)

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/upload" \
  -H "Authorization: Bearer {token}" \
  -F "file=@/path/to/resume.pdf" \
  -F "type=resume"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "文件上传成功",
  "data": {
    "fileId": "FILE20240120001",
    "fileName": "resume.pdf",
    "fileUrl": "https://cdn.tianjun-petro.com/uploads/resume.pdf",
    "fileSize": 1024000,
    "fileType": "application/pdf"
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-038: 统计分析
**接口地址**: `POST /api/analytics/track`  
**功能描述**: 记录用户行为统计数据

**请求参数**:
```json
{
  "event": "page_view",
  "page": "/products",
  "element": "inquiry_button",
  "timestamp": "2024-01-20T10:30:00Z",
  "sessionId": "session_uuid",
  "userId": "user123"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/analytics/track" \
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
  "message": "统计数据已记录",
  "data": {
    "eventId": "EVT20240120001",
    "processed": true
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### API-039: 新闻分享统计（系统级别）
**接口地址**: `POST /api/news/{id}/share`  
**功能描述**: 记录新闻分享统计（与API-027相同）

**路径参数**:
- `id`: number - 新闻ID

**请求参数**:
```json
{
  "platform": "wechat",
  "source": "web"
}
```

**请求示例**:
```bash
curl -X POST "http://localhost:3001/api/news/1/share" \
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
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---

## 📊 接口总结

### 模块接口统计
- **安全与合规**: 2个接口 (API-023 ~ API-024)
- **新闻中心**: 3个接口 (API-025 ~ API-027)
- **招聘信息**: 5个接口 (API-028 ~ API-032)
- **联系我们**: 3个接口 (API-033 ~ API-035)
- **系统管理**: 4个接口 (API-036 ~ API-039)

**本模块总计**: 17个接口

### 全站接口汇总
- **首页相关**: 10个接口 (API-001 ~ API-010)
- **关于我们**: 4个接口 (API-011 ~ API-014)
- **产品服务**: 8个接口 (API-015 ~ API-022)
- **安全合规**: 2个接口 (API-023 ~ API-024)
- **新闻中心**: 3个接口 (API-025 ~ API-027)
- **招聘信息**: 5个接口 (API-028 ~ API-032)
- **联系我们**: 3个接口 (API-033 ~ API-035)
- **系统管理**: 4个接口 (API-036 ~ API-039)

**全站总计**: 39个核心接口

### 技术特性说明
1. **统一响应格式**: 所有接口遵循统一的JSON响应结构
2. **错误处理**: 完善的HTTP状态码和错误信息返回
3. **分页支持**: 列表接口支持分页、搜索、筛选功能
4. **文件处理**: 支持文档下载和文件上传功能
5. **统计分析**: 完整的用户行为跟踪体系
6. **安全保障**: 基于Token的权限验证机制

此文档涵盖了舟山天骏石油化工有限公司官网剩余模块的所有API接口，为前后端分离开发提供完整的接口规范支持。