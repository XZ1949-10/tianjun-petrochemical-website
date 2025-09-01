/**
 * API服务层 - 所有API接口的统一管理
 * 基于已有的API接口文档实现前后端分离的数据层
 */
import { httpMethods } from '../utils/http'

// ===================== 首页相关API =====================
export const homeAPI = {
  // 获取轮播图数据
  getBanners: () => httpMethods.get('/home/banners'),
  
  // 获取企业实力展示数据
  getCompanyStats: () => httpMethods.get('/home/company-stats'),
  
  // 获取服务介绍数据
  getServices: () => httpMethods.get('/home/services'),
  
  // 获取全国服务网络数据
  getNetworkMap: () => httpMethods.get('/home/network-map'),
  
  // 获取客户证言
  getTestimonials: () => httpMethods.get('/home/testimonials'),
  
  // 获取最新动态
  getLatestNews: (limit = 3) => httpMethods.get('/home/latest-news', { limit }),
  
  // 获取首页最新动态（默认3条）
  getHomeLatestNews: () => httpMethods.get('/home/latest-news', { limit: 3 }),
  
  // 获取燃油价格
  getFuelPrice: () => httpMethods.get('/home/fuel-price'),
  
  // 立即询价
  submitQuoteRequest: (data) => httpMethods.post('/home/quote-request', data),
  
  // 快速询价
  quickQuote: (data) => httpMethods.post('/home/quick-quote', data),
}

// ===================== 关于我们API =====================
export const aboutAPI = {
  // 获取企业基本信息
  getCompanyInfo: () => httpMethods.get('/about/company-info'),
  
  // 获取企业历程
  getCompanyHistory: () => httpMethods.get('/about/company-history'),
  
  // 获取企业文化
  getCompanyCulture: () => httpMethods.get('/about/company-culture'),
  
  // 获取团队介绍
  getTeamInfo: () => httpMethods.get('/about/team'),
  
  // 获取核心价值观
  getCoreValues: () => httpMethods.get('/about/core-values'),
  
  // 获取车队储存信息
  getFleetStorage: () => httpMethods.get('/about/fleet-storage'),
  
  // 获取管理团队
  getLeadershipTeam: () => httpMethods.get('/about/leadership-team'),
}

// ===================== 产品服务API =====================
export const productsAPI = {
  // 获取产品列表
  getProducts: (params = {}) => httpMethods.get('/products', params),
  
  // 获取产品详情
  getProductDetail: (id) => httpMethods.get(`/products/${id}`),
  
  // 获取服务模块
  getServices: () => httpMethods.get('/products/services'),
  
  // 获取当前价格信息
  getPricing: () => httpMethods.get('/products/pricing'),
  
  // 产品询价
  submitQuoteRequest: (data) => httpMethods.post('/products/quote-request', data),
  
  // 获取下载文件列表
  getDownloads: () => httpMethods.get('/products/downloads'),
  
  // 技术咨询
  submitTechnicalInquiry: (data) => httpMethods.post('/products/technical-inquiry', data),
  
  // 添加剂咨询
  submitAdditiveInquiry: (data) => httpMethods.post('/products/additive-inquiry', data),
  
  // 批量报价
  submitBulkQuote: (data) => httpMethods.post('/products/bulk-quote', data),
}

// ===================== 安全与合规API =====================
export const safetyAPI = {
  // 获取安全政策
  getPolicies: () => httpMethods.get('/safety/policies'),
  
  // 获取认证证书
  getCertifications: () => httpMethods.get('/safety/certifications'),
  
  // 获取安全政策文档
  getSafetyPolicies: () => httpMethods.get('/safety/safety-policies'),
  
  // 下载文档
  downloadDocument: (docId) => httpMethods.get(`/safety/documents/${docId}/download`, {}, { responseType: 'blob' }),
}

// ===================== 新闻中心API =====================
export const newsAPI = {
  // 获取新闻列表
  getNewsList: (params = {}) => httpMethods.get('/news', params),
  
  // 获取新闻详情
  getNewsDetail: (id) => httpMethods.get(`/news/${id}`),
  
  // 新闻分享统计
  shareNews: (id, platform) => httpMethods.post(`/news/${id}/share`, { platform }),
  
  // 记录分享统计
  recordShare: (id) => httpMethods.post(`/news/${id}/share-count`),
  
  // 记录阅读统计
  recordView: (id) => httpMethods.post(`/news/${id}/view-count`),
  
  // 订阅Newsletter
  subscribeNewsletter: (data) => httpMethods.post('/news/newsletter-subscribe', data),
}

// ===================== 招聘信息API =====================
export const careersAPI = {
  // 获取职位列表
  getPositions: (params = {}) => httpMethods.get('/careers/positions', params),
  
  // 获取企业福利
  getBenefits: () => httpMethods.get('/careers/benefits'),
  
  // 提交简历申请
  submitApplication: (data) => httpMethods.post('/careers/applications', data),
  
  // 实习生申请
  submitInternshipApplication: (data) => httpMethods.post('/careers/internship-application', data),
  
  // 获取企业文化视频
  getCultureVideo: () => httpMethods.get('/careers/culture-video'),
}

// ===================== 联系我们API =====================
export const contactAPI = {
  // 获取联系信息
  getContactInfo: () => httpMethods.get('/contact/info'),
  
  // 提交联系表单
  submitMessage: (data) => httpMethods.post('/contact/messages', data),
  
  // 获取服务区域
  getServiceAreas: () => httpMethods.get('/contact/service-areas'),
}

// ===================== 系统管理API =====================
export const systemAPI = {
  // 网站配置
  getConfig: () => httpMethods.get('/system/config'),
  
  // 文件上传
  uploadFile: (file, folder = 'common') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    return httpMethods.upload('/upload', formData)
  },
  
  // 统计分析
  trackEvent: (data) => httpMethods.post('/analytics/track', data),
}

// ===================== 订单管理API =====================
export const ordersAPI = {
  // 获取订单追踪信息
  getTracking: (orderId) => httpMethods.get(`/orders/${orderId}/tracking`),
  
  // 创建订单
  createOrder: (data) => httpMethods.post('/orders', data),
  
  // 获取订单列表
  getOrders: (params = {}) => httpMethods.get('/orders', params),
}

// ===================== 用户认证API =====================
export const authAPI = {
  // 登录
  login: (credentials) => httpMethods.post('/auth/login', credentials),
  
  // 登出
  logout: () => httpMethods.post('/auth/logout'),
  
  // 刷新token
  refreshToken: () => httpMethods.post('/auth/refresh'),
  
  // 获取用户信息
  getUserInfo: () => httpMethods.get('/auth/user'),
}

// 导出所有API
export default {
  home: homeAPI,
  about: aboutAPI,
  products: productsAPI,
  safety: safetyAPI,
  news: newsAPI,
  careers: careersAPI,
  contact: contactAPI,
  system: systemAPI,
  orders: ordersAPI,
  auth: authAPI,
}