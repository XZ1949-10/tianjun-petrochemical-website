/**
 * HTTP客户端配置
 * 前后端分离项目的核心网络层
 */
import axios from 'axios'
import { message } from 'antd'

// 创建axios实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加请求ID用于追踪
    config.metadata = { 
      startTime: new Date(),
      requestId: Math.random().toString(36).substring(7) 
    }
    
    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log(`🚀 [${config.metadata.requestId}] ${config.method?.toUpperCase()} ${config.url}`, config)
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const { config } = response
    const endTime = new Date()
    const duration = endTime - config.metadata.startTime
    
    // 开发环境日志
    if (import.meta.env.DEV) {
      console.log(`✅ [${config.metadata.requestId}] Response (${duration}ms):`, response.data)
    }
    
    // 统一响应数据结构处理
    const { code, message: msg, data } = response.data
    
    if (code === 200 || code === '200') {
      return data
    } else if (code === 401) {
      // 未授权，清除token并跳转登录
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
      return Promise.reject(new Error('未授权访问'))
    } else {
      // 业务错误
      message.error(msg || '请求失败')
      return Promise.reject(new Error(msg || '请求失败'))
    }
  },
  (error) => {
    const { config } = error
    
    if (config?.metadata) {
      const endTime = new Date()
      const duration = endTime - config.metadata.startTime
      console.error(`❌ [${config.metadata.requestId}] Error (${duration}ms):`, error)
    }
    
    // 网络错误处理
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          message.error(data?.message || '请求参数错误')
          break
        case 401:
          message.error('登录已过期，请重新登录')
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          message.error('没有权限访问此资源')
          break
        case 404:
          message.error('请求的资源不存在')
          break
        case 500:
          message.error('服务器内部错误')
          break
        default:
          message.error(data?.message || '网络请求失败')
      }
    } else if (error.request) {
      // 网络连接错误
      message.error('网络连接失败，请检查网络设置')
    } else {
      // 其他错误
      message.error(error.message || '请求配置错误')
    }
    
    return Promise.reject(error)
  }
)

// HTTP方法封装
export const httpMethods = {
  get: (url, params = {}, config = {}) => {
    return http.get(url, { params, ...config })
  },
  
  post: (url, data = {}, config = {}) => {
    return http.post(url, data, config)
  },
  
  put: (url, data = {}, config = {}) => {
    return http.put(url, data, config)
  },
  
  patch: (url, data = {}, config = {}) => {
    return http.patch(url, data, config)
  },
  
  delete: (url, config = {}) => {
    return http.delete(url, config)
  },
  
  upload: (url, formData, config = {}) => {
    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  }
}

export default http