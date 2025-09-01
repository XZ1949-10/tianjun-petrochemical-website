/**
 * 环境配置管理 - 统一的配置访问接口
 */

// 环境变量类型定义（简化版，后续可以用TypeScript完善）
const config = {
  // 应用信息
  app: {
    title: import.meta.env.VITE_APP_TITLE || '舟山天骏石油化工有限公司',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: import.meta.env.VITE_APP_DESCRIPTION || '专业0#柴油供应商'
  },

  // API配置
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 15000
  },

  // 上传配置
  upload: {
    maxSize: parseInt(import.meta.env.VITE_UPLOAD_MAX_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedTypes: import.meta.env.VITE_UPLOAD_ALLOWED_TYPES?.split(',') || ['image/*']
  },

  // 地图配置
  map: {
    apiKey: import.meta.env.VITE_MAP_API_KEY || ''
  },

  // 分析配置
  analytics: {
    id: import.meta.env.VITE_ANALYTICS_ID || ''
  },

  // 功能开关
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    mock: import.meta.env.VITE_ENABLE_MOCK === 'true'
  },

  // 联系信息
  contact: {
    phone: import.meta.env.VITE_COMPANY_PHONE || '400-1234-5678',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'contact@tianjun-petro.com',
    address: import.meta.env.VITE_COMPANY_ADDRESS || '浙江省舟山市定海区'
  },

  // 环境信息
  env: {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    mode: import.meta.env.MODE
  }
}

// 配置验证（开发环境下）
if (import.meta.env.DEV) {
  const requiredConfigs = [
    'api.baseURL',
    'contact.phone',
    'contact.email'
  ]

  requiredConfigs.forEach(path => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], config)
    if (!value) {
      console.warn(`⚠️ 缺少必需的配置项: ${path}`)
    }
  })
}

// 调试模式下输出配置信息
if (config.features.debug) {
  console.log('📊 应用配置:', config)
}

export default config

// 便捷访问方法
export const getApiUrl = (path = '') => {
  const baseURL = config.api.baseURL.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return `${baseURL}/${cleanPath}`
}

export const isFeatureEnabled = (feature) => {
  return config.features[feature] || false
}

export const getContactInfo = () => {
  return config.contact
}

export const isDev = () => config.env.isDevelopment
export const isProd = () => config.env.isProduction