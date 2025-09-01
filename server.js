const jsonServer = require('json-server')
const path = require('path')
const fs = require('fs')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// 读取数据文件
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'))

// 使用默认中间件 (logger, static, cors and no-cache)
server.use(middlewares)

// 添加JSON解析中间件
server.use(jsonServer.bodyParser)

// 自定义中间件：添加延迟
server.use((req, res, next) => {
  setTimeout(() => {
    next()
  }, 300)
})

// 自定义API路由
server.get('/api/home/banners', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.home.banners,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/services', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.services,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/testimonials', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.testimonials,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/latest-news', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db['latest-news'],
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/company-stats', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db['company-stats'],
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/network-map', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db['network-map'],
    timestamp: new Date().toISOString()
  })
})

server.get('/api/home/fuel-price', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db['fuel-price'],
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products', (req, res) => {
  const { page = 1, pageSize = 10, category, search } = req.query
  let products = db.products.data
  
  // Filter by category
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category)
  }
  
  // Filter by search
  if (search) {
    products = products.filter(p => 
      p.name.includes(search) || p.description.includes(search)
    )
  }
  
  // Pagination
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + parseInt(pageSize)
  const paginatedProducts = products.slice(startIndex, endIndex)
  
  res.jsonp({
    code: 200,
    message: 'success',
    data: paginatedProducts,
    total: products.length,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/categories', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.products.categories,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/services', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      services: [
        {
          id: 'bulk-delivery',
          title: '批量配送',
          description: '最小订单500升，覆盖整个舟山地区',
          features: ['专业危化品运输', '24小时送达', 'GPS实时跟踪'],
          icon: 'truck',
          serviceHours: '24小时',
          coverage: '全市覆盖'
        },
        {
          id: 'onsite-refueling',
          title: '现场加油',
          description: '移动加油车现场服务，适用于工地、车队',
          features: ['移动加油车', '现场服务', '灵活调度'],
          icon: 'fuel',
          serviceHours: '24小时',
          responseTime: '1小时内'
        },
        {
          id: 'emergency-supply',
          title: '应急供应',
          description: '2小时应急响应，确保业务连续性',
          features: ['2小时响应', '应急保障', '优先配送'],
          icon: 'emergency',
          serviceHours: '24小时',
          hotline: '400-1234-9999'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/pricing', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      diesel: {
        currentPrice: 6.85,
        marketPrice: 6.95,
        savings: 0.10,
        updateTime: new Date().toISOString()
      },
      bulkPricing: {
        available: true,
        minOrder: 500,
        contactRequired: true,
        discountRanges: [
          { volume: '500-2000升', discount: '2%' },
          { volume: '2000-5000升', discount: '3%' },
          { volume: '5000升以上', discount: '5%' }
        ]
      }
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/downloads', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      documents: [
        {
          id: 1,
          title: '安全数据表 (SDS)',
          description: '0#柴油完整安全数据表',
          fileType: 'PDF',
          fileSize: '2.1 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/sds-diesel.pdf'
        },
        {
          id: 2,
          title: '产品质量检测报告',
          description: '第三方权威机构检测报告',
          fileType: 'PDF',
          fileSize: '1.8 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/quality-report.pdf'
        },
        {
          id: 3,
          title: '技术规格说明书',
          description: '详细的技术参数和使用说明',
          fileType: 'PDF',
          fileSize: '3.2 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/tech-specs.pdf'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/:id', (req, res) => {
  const product = db.products.data.find(p => p.id === parseInt(req.params.id))
  if (product) {
    res.jsonp({
      code: 200,
      message: 'success',
      data: product,
      timestamp: new Date().toISOString()
    })
  } else {
    res.status(404).jsonp({
      code: 404,
      message: 'Product not found',
      data: null,
      timestamp: new Date().toISOString()
    })
  }
})

server.get('/api/news', (req, res) => {
  const { page = 1, pageSize = 10, category, search } = req.query
  let news = db.news.data
  
  // Filter by category
  if (category && category !== 'all') {
    news = news.filter(n => n.categoryId === category)
  }
  
  // Filter by search
  if (search) {
    news = news.filter(n => 
      n.title.includes(search) || n.excerpt.includes(search)
    )
  }
  
  // Sort by date (newest first)
  news.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  // Pagination
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + parseInt(pageSize)
  const paginatedNews = news.slice(startIndex, endIndex)
  
  res.jsonp({
    code: 200,
    message: 'success',
    data: paginatedNews,
    total: news.length,
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    timestamp: new Date().toISOString()
  })
})

server.get('/api/news/categories', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.news.categories,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/news/:id', (req, res) => {
  const news = db.news.data.find(n => n.id === parseInt(req.params.id))
  if (news) {
    // Increment view count (in real app, this would be saved to database)
    news.views = (news.views || 0) + 1
    
    res.jsonp({
      code: 200,
      message: 'success',
      data: news,
      timestamp: new Date().toISOString()
    })
  } else {
    res.status(404).jsonp({
      code: 404,
      message: 'News not found',
      data: null,
      timestamp: new Date().toISOString()
    })
  }
})

server.get('/api/about/company-info', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.about['company-info'],
    timestamp: new Date().toISOString()
  })
})

server.get('/api/contact/info', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.contact.info,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/contact/offices', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.contact.offices,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/safety/policies', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.safety.policies,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/safety/certifications', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.safety.certifications,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/safety/equipment', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.safety.equipment,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/careers/positions', (req, res) => {
  const { status = 'all', department, location } = req.query
  let positions = db.careers.positions
  
  // Filter by status
  if (status && status !== 'all') {
    positions = positions.filter(p => p.status === status)
  }
  
  // Filter by department
  if (department) {
    positions = positions.filter(p => p.department === department)
  }
  
  // Filter by location
  if (location) {
    positions = positions.filter(p => p.location === location)
  }
  
  res.jsonp({
    code: 200,
    message: 'success',
    data: positions,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/careers/benefits', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.careers.benefits,
    timestamp: new Date().toISOString()
  })
})

server.get('/api/careers/culture', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: db.careers.culture,
    timestamp: new Date().toISOString()
  })
})

// ===================== 缺失的API接口补充 =====================

// 首页相关缺失接口
server.post('/api/home/quick-quote', (req, res) => {
  const { contactName, phone, company, requirement, location, source } = req.body
  const quoteId = `QUK${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '询价请求已提交成功',
    data: {
      quoteId: quoteId,
      estimatedResponse: '2小时内回复'
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/orders/:orderId/tracking', (req, res) => {
  const { orderId } = req.params
  
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      orderId: orderId,
      status: 'delivering',
      currentLocation: '舟山市定海区',
      estimatedArrival: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      driver: {
        name: '李师傅',
        phone: '139****5678',
        vehicle: '浙C12345'
      },
      timeline: [
        {
          time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          status: 'dispatched',
          description: '订单已派遣'
        },
        {
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'in_transit',
          description: '运输中'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/system/language', (req, res) => {
  const { language, sessionId } = req.body
  
  res.jsonp({
    code: 200,
    message: '语言切换成功',
    data: {
      currentLanguage: language || 'zh-CN',
      availableLanguages: ['zh-CN', 'en-US']
    },
    timestamp: new Date().toISOString()
  })
})

// 关于我们页面缺失接口
server.get('/api/about/core-values', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      values: [
        {
          id: 'safety',
          title: '安全第一',
          description: '严格遵守安全生产规范，确保员工和客户安全',
          icon: 'safety'
        },
        {
          id: 'quality',
          title: '品质至上',
          description: '以国际标准为基准，提供高品质产品和服务',
          icon: 'quality'
        },
        {
          id: 'innovation',
          title: '持续创新',
          description: '不断创新技术和服务模式，引领行业发展',
          icon: 'innovation'
        },
        {
          id: 'integrity',
          title: '诚信经营',
          description: '以诚待人，以信立业，建立长期合作关系',
          icon: 'integrity'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/about/fleet-storage', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      fleet: {
        totalVehicles: '30+',
        loadCapacity: '5-30吨',
        features: ['危险品运输资质', 'GPS实时监控', '专业驾驶员', '24小时调度']
      },
      storage: {
        totalCapacity: '20,000m³',
        facilities: 3,
        features: ['温控储存系统', '安全防护措施', '自动监测系统', '应急处理设备']
      }
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/about/leadership-team', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      leaders: [
        {
          id: 1,
          name: '张董事长',
          position: '董事长兼总经理',
          bio: '公司创始人，34年石化行业经验，带领公司从小规模企业发展为区域领先的石化服务商',
          phone: '138****1234',
          email: 'chairman@tianjun-petro.com'
        },
        {
          id: 2,
          name: '李副总',
          position: '副总经理',
          bio: '负责公司运营管理，15年企业管理经验，专业化工程师背景',
          phone: '139****5678',
          email: 'vice.president@tianjun-petro.com'
        },
        {
          id: 3,
          name: '王总监',
          position: '技术总监',
          bio: '石油化工专业博士，10年技术研发经验，主导多项技术创新项目',
          phone: '137****9999',
          email: 'tech.director@tianjun-petro.com'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

// 产品服务页面缺失接口
server.get('/api/products/services', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      services: [
        {
          id: 'bulk-delivery',
          title: '批量配送',
          description: '最小订单500升，覆盖整个舟山地区',
          features: ['专业危化品运输', '24小时送达', 'GPS实时跟踪'],
          icon: 'truck',
          serviceHours: '24小时',
          coverage: '全市覆盖'
        },
        {
          id: 'onsite-refueling',
          title: '现场加油',
          description: '移动加油车现场服务，适用于工地、车队',
          features: ['移动加油车', '现场服务', '灵活调度'],
          icon: 'fuel',
          serviceHours: '24小时',
          responseTime: '1小时内'
        },
        {
          id: 'emergency-supply',
          title: '应急供应',
          description: '2小时应急响应，确保业务连续性',
          features: ['2小时响应', '应急保障', '优先配送'],
          icon: 'emergency',
          serviceHours: '24小时',
          hotline: '400-1234-9999'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/pricing', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      diesel: {
        currentPrice: 6.85,
        marketPrice: 6.95,
        savings: 0.10,
        updateTime: new Date().toISOString()
      },
      bulkPricing: {
        available: true,
        minOrder: 500,
        contactRequired: true,
        discountRanges: [
          { volume: '500-2000升', discount: '2%' },
          { volume: '2000-5000升', discount: '3%' },
          { volume: '5000升以上', discount: '5%' }
        ]
      }
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/products/downloads', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      documents: [
        {
          id: 1,
          title: '安全数据表 (SDS)',
          description: '0#柴油完整安全数据表',
          fileType: 'PDF',
          fileSize: '2.1 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/sds-diesel.pdf'
        },
        {
          id: 2,
          title: '产品质量检测报告',
          description: '第三方权威机构检测报告',
          fileType: 'PDF',
          fileSize: '1.8 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/quality-report.pdf'
        },
        {
          id: 3,
          title: '技术规格说明书',
          description: '详细的技术参数和使用说明',
          fileType: 'PDF',
          fileSize: '3.2 MB',
          downloadUrl: 'https://cdn.tianjun-petro.com/tech-specs.pdf'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/products/technical-inquiry', (req, res) => {
  const inquiryId = `TEC${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '技术咨询已提交成功',
    data: {
      inquiryId: inquiryId,
      estimatedResponse: '24小时内回复'
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/products/additive-inquiry', (req, res) => {
  const inquiryId = `ADD${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '添加剂咨询已提交成功',
    data: {
      inquiryId: inquiryId,
      recommendedSolution: '冬季防凝剂方案',
      estimatedResponse: '12小时内回复'
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/products/bulk-quote', (req, res) => {
  const quoteId = `BLK${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '批量报价请求已提交成功',
    data: {
      quoteId: quoteId,
      estimatedDiscount: '5-8%',
      estimatedResponse: '1个工作日内回复'
    },
    timestamp: new Date().toISOString()
  })
})

// 新闻分享接口
server.post('/api/news/:id/share', (req, res) => {
  const { id } = req.params
  const { platform, source } = req.body
  
  res.jsonp({
    code: 200,
    message: '分享成功',
    data: {
      shareUrl: `https://www.tianjun-petro.com/news/${id}?share=${platform}`,
      shareCount: Math.floor(Math.random() * 500) + 100
    },
    timestamp: new Date().toISOString()
  })
})

// 招聘相关缺失接口
server.post('/api/careers/applications', (req, res) => {
  const applicationId = `APP${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '简历已提交成功',
    data: {
      applicationId: applicationId,
      estimatedResponse: '3个工作日内'
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/careers/internship-application', (req, res) => {
  const applicationId = `INT${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '实习申请已提交成功',
    data: {
      applicationId: applicationId,
      estimatedResponse: '1周内回复'
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/careers/culture-video', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      title: '天骏石化企业文化宣传片',
      description: '了解天骏石化的企业文化和工作环境',
      duration: '3分钟',
      videoUrl: 'https://cdn.tianjun-petro.com/videos/culture.mp4',
      posterUrl: 'https://cdn.tianjun-petro.com/images/culture-poster.jpg'
    },
    timestamp: new Date().toISOString()
  })
})

// 联系我们缺失接口
server.post('/api/contact/messages', (req, res) => {
  const messageId = `MSG${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '留言已提交成功',
    data: {
      messageId: messageId,
      estimatedResponse: '2小时内回复'
    },
    timestamp: new Date().toISOString()
  })
})

server.get('/api/contact/service-areas', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      areas: [
        {
          province: '浙江省',
          cities: ['舟山市', '杭州市', '宁波市'],
          services: ['配送', '现场加油', '应急供应'],
          responseTime: '2小时内'
        },
        {
          province: '江苏省',
          cities: ['南京市', '苏州市', '无锡市'],
          services: ['配送', '应急供应'],
          responseTime: '4小时内'
        },
        {
          province: '上海市',
          cities: ['全市'],
          services: ['配送', '现场加油', '应急供应'],
          responseTime: '3小时内'
        }
      ]
    },
    timestamp: new Date().toISOString()
  })
})

// 系统管理缺失接口
server.get('/api/system/config', (req, res) => {
  res.jsonp({
    code: 200,
    message: 'success',
    data: {
      siteInfo: {
        name: '舟山天骏石油化工有限公司',
        logo: 'https://cdn.tianjun-petro.com/logo.png',
        description: '专业的石油化工产品供应商'
      },
      features: {
        multiLanguage: true,
        onlineChat: true,
        priceDisplay: true
      }
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/upload', (req, res) => {
  const fileId = `FILE${new Date().toISOString().slice(0,10).replace(/-/g, '')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
  
  res.jsonp({
    code: 200,
    message: '文件上传成功',
    data: {
      fileId: fileId,
      fileName: 'uploaded-file.pdf',
      fileUrl: `https://cdn.tianjun-petro.com/uploads/${fileId}.pdf`,
      fileSize: 1024000
    },
    timestamp: new Date().toISOString()
  })
})

server.post('/api/analytics/track', (req, res) => {
  res.jsonp({
    code: 200,
    message: '统计数据已记录',
    timestamp: new Date().toISOString()
  })
})

// 使用默认路由作为回退
server.use(router)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`🚀 JSON Server is running on http://localhost:${port}`)
  console.log(`📡 API endpoints available at http://localhost:${port}/api`)
})