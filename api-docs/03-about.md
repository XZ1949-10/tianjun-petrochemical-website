## 🏢 关于我们页面接口

关于我们页面接口提供企业基本信息、核心价值观、车队储存能力、管理团队等内容。

### 11. 获取公司信息
**接口地址**: `GET /about/company-info`  
**功能描述**: 获取公司基本信息和统计数据

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/about/company-info" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "basicInfo": {
      "name": "舟山天骏石油化工有限公司",
      "establishedYear": 1990,
      "experience": "34年",
      "legalRepresentative": "张XX",
      "registeredCapital": "5000万元",
      "businessScope": "石油化工产品销售、储存、运输",
      "headquarters": "江西省南昌市",
      "website": "https://www.tianjun-petro.com"
    },
    "statistics": {
      "experience": "34年",
      "clients": "500+",
      "storageCapacity": "20,000m³",
      "fleetSize": "30+车辆",
      "employees": 200,
      "branches": 5,
      "annualVolume": "100,000吨"
    },
    "milestones": [
      {
        "year": 1990,
        "title": "公司成立",
        "description": "在江西南昌成立，开始石化产品销售业务"
      },
      {
        "year": 1995,
        "title": "获得危化品经营许可",
        "description": "正式获得危险化学品经营许可证"
      },
      {
        "year": 2000,
        "title": "扩建储存设施",
        "description": "投资建设专业储罐，储存能力达到10,000m³"
      },
      {
        "year": 2005,
        "title": "ISO认证",
        "description": "通过ISO 9001质量管理体系认证"
      },
      {
        "year": 2010,
        "title": "设立华东分部",
        "description": "在舟山设立华东分部，扩大服务范围"
      },
      {
        "year": 2015,
        "title": "全国布局",
        "description": "在华南、华北、西南地区设立分支机构"
      },
      {
        "year": 2020,
        "title": "数字化转型",
        "description": "启动数字化转型，建设智能物流系统"
      },
      {
        "year": 2024,
        "title": "储存能力翻倍",
        "description": "储存能力扩展到20,000m³，服务能力大幅提升"
      }
    ],
    "businessLicense": {
      "number": "91360000XXXXXXXXXX",
      "issueDate": "2020-01-15",
      "validUntil": "2030-01-14",
      "issuer": "江西省市场监督管理局"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 12. 获取核心价值观
**接口地址**: `GET /about/core-values`  
**功能描述**: 获取企业核心价值观数据

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/about/core-values" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "values": [
      {
        "id": "safety",
        "title": "安全第一",
        "description": "严格遵守安全生产规范，确保员工和客户安全",
        "icon": "safety",
        "principles": [
          "严格执行安全操作规程",
          "定期进行安全培训和演练",
          "持续改进安全管理体系",
          "零事故目标"
        ]
      },
      {
        "id": "quality",
        "title": "品质至上",
        "description": "以国际标准为基准，提供高品质产品和服务",
        "icon": "quality",
        "principles": [
          "严格的质量控制体系",
          "持续的产品质量改进",
          "客户满意度至上",
          "追求卓越品质"
        ]
      },
      {
        "id": "innovation",
        "title": "持续创新",
        "description": "不断创新技术和服务模式，引领行业发展",
        "icon": "innovation",
        "principles": [
          "技术创新驱动发展",
          "服务模式持续优化",
          "数字化转型升级",
          "行业标准制定参与"
        ]
      },
      {
        "id": "integrity",
        "title": "诚信经营",
        "description": "以诚待人，以信立业，建立长期合作关系",
        "icon": "integrity",
        "principles": [
          "诚实守信的商业原则",
          "透明的价格政策",
          "按时履行合同承诺",
          "建立长期伙伴关系"
        ]
      }
    ],
    "mission": "为客户提供安全、可靠、高效的石化产品和服务",
    "vision": "成为区域领先的石化产品供应商和服务提供商",
    "coreCompetencies": [
      "专业的危化品运输能力",
      "完善的储存设施",
      "24小时应急响应服务",
      "丰富的行业经验"
    ]
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 13. 获取车队与储存信息
**接口地址**: `GET /about/fleet-storage`  
**功能描述**: 获取车队规模和储存设施信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/about/fleet-storage" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "fleet": {
      "totalVehicles": "30+",
      "vehicleTypes": [
        {
          "type": "危化品运输车",
          "count": 20,
          "capacity": "5-15吨",
          "features": ["GPS实时跟踪", "温度监控", "防爆设计"]
        },
        {
          "type": "移动加油车",
          "count": 8,
          "capacity": "3-8吨",
          "features": ["现场加油", "计量精准", "安全防护"]
        },
        {
          "type": "应急响应车",
          "count": 2,
          "capacity": "2-5吨",
          "features": ["快速响应", "小批量配送", "城市通行"]
        }
      ],
      "loadCapacity": "5-30吨",
      "features": [
        "危险品运输资质",
        "GPS实时监控",
        "专业驾驶员",
        "24小时调度"
      ],
      "driverRequirements": [
        "危化品运输从业资格证",
        "5年以上驾驶经验",
        "定期安全培训",
        "健康体检合格"
      ],
      "safetyFeatures": [
        "车载灭火系统",
        "防静电装置",
        "应急通讯设备",
        "实时视频监控"
      ]
    },
    "storage": {
      "totalCapacity": "20,000m³",
      "facilities": [
        {
          "location": "南昌总部",
          "capacity": "12,000m³",
          "tankCount": 8,
          "types": ["0#柴油", "-10#柴油", "添加剂"]
        },
        {
          "location": "舟山分部",
          "capacity": "5,000m³",
          "tankCount": 3,
          "types": ["0#柴油", "添加剂"]
        },
        {
          "location": "深圳分部",
          "capacity": "3,000m³",
          "tankCount": 2,
          "types": ["0#柴油"]
        }
      ],
      "features": [
        "温控储存系统",
        "安全防护措施",
        "自动监测系统",
        "应急处理设备"
      ],
      "safetyMeasures": [
        "24小时视频监控",
        "气体泄漏检测",
        "自动消防系统",
        "防雷接地装置"
      ],
      "qualityControl": [
        "进料质量检测",
        "储存期间监测",
        "出料质量验证",
        "第三方检测报告"
      ]
    },
    "operationalStats": {
      "monthlyThroughput": "5,000吨",
      "deliverySuccess": "99.8%",
      "responseTime": "平均1.5小时",
      "safetyRecord": "连续3年零事故"
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

### 14. 获取管理团队
**接口地址**: `GET /about/leadership-team`  
**功能描述**: 获取公司管理团队信息

**请求示例**:
```bash
curl -X GET "http://localhost:3001/api/about/leadership-team" \
  -H "Accept: application/json"
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "leaders": [
      {
        "id": 1,
        "name": "张董事长",
        "position": "董事长兼总经理",
        "department": "管理层",
        "bio": "公司创始人，34年石化行业经验，带领公司从小规模企业发展为区域领先的石化服务商。具有丰富的企业管理和市场开拓经验。",
        "education": "华东理工大学 化工专业 学士",
        "experience": "34年",
        "specialties": ["企业战略管理", "市场开拓", "行业关系"],
        "achievements": [
          "带领公司获得多项行业认证",
          "建立完善的全国服务网络",
          "推动公司数字化转型"
        ],
        "phone": "138****1234",
        "email": "chairman@tianjun-petro.com"
      },
      {
        "id": 2,
        "name": "李副总",
        "position": "副总经理",
        "department": "运营管理",
        "bio": "负责公司运营管理，15年企业管理经验，专业化工程师背景。在运营优化、流程改进方面有丰富经验。",
        "education": "大连理工大学 化学工程 硕士",
        "experience": "15年",
        "specialties": ["运营管理", "流程优化", "质量控制"],
        "achievements": [
          "建立标准化运营体系",
          "提升服务效率30%",
          "获得ISO质量认证"
        ],
        "phone": "139****5678",
        "email": "vice.president@tianjun-petro.com"
      },
      {
        "id": 3,
        "name": "王总监",
        "position": "技术总监",
        "department": "技术研发",
        "bio": "石油化工专业博士，10年技术研发经验，主导多项技术创新项目。在产品研发、技术改进方面成绩突出。",
        "education": "中国石油大学 石油化工 博士",
        "experience": "10年",
        "specialties": ["技术研发", "产品创新", "工艺改进"],
        "achievements": [
          "主导开发新型添加剂产品",
          "获得3项技术专利",
          "推动智能化储存系统建设"
        ],
        "phone": "137****9999",
        "email": "tech.director@tianjun-petro.com"
      },
      {
        "id": 4,
        "name": "陈经理",
        "position": "销售总监",
        "department": "销售市场",
        "bio": "12年销售管理经验，深耕石化行业，在客户关系管理、市场拓展方面表现优异。",
        "education": "上海交通大学 市场营销 学士",
        "experience": "12年",
        "specialties": ["销售管理", "客户关系", "市场拓展"],
        "achievements": [
          "建立500+稳定客户群",
          "年销售额增长25%",
          "获得优秀销售团队奖"
        ],
        "phone": "135****7777",
        "email": "sales.director@tianjun-petro.com"
      },
      {
        "id": 5,
        "name": "赵主任",
        "position": "安全总监",
        "department": "安全管理",
        "bio": "注册安全工程师，8年安全管理经验，负责公司安全生产和风险控制工作。",
        "education": "华中科技大学 安全工程 学士",
        "experience": "8年",
        "specialties": ["安全管理", "风险控制", "应急响应"],
        "achievements": [
          "连续3年零安全事故",
          "建立完善的安全管理体系",
          "获得安全生产先进个人"
        ],
        "phone": "133****6666",
        "email": "safety.director@tianjun-petro.com"
      }
    ],
    "organizationStructure": {
      "departments": [
        {
          "name": "管理层",
          "head": "张董事长",
          "members": 2
        },
        {
          "name": "运营管理部",
          "head": "李副总",
          "members": 15
        },
        {
          "name": "技术研发部",
          "head": "王总监",
          "members": 8
        },
        {
          "name": "销售市场部",
          "head": "陈经理",
          "members": 25
        },
        {
          "name": "安全管理部",
          "head": "赵主任",
          "members": 12
        },
        {
          "name": "财务部",
          "head": "孙会计",
          "members": 6
        },
        {
          "name": "人力资源部",
          "head": "周主管",
          "members": 4
        }
      ]
    }
  },
  "timestamp": "2025-08-31T11:30:00.000Z"
}
```

---