/**
 * 全局状态管理 - 简化版本用于API测试
 */
import { create } from 'zustand'

// 用户状态Store
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false })
}))

// 应用状态Store
export const useAppStore = create((set) => ({
  theme: 'light',
  language: 'zh',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language })
}))

// 首页数据Store
export const useHomeStore = create((set) => ({
  banners: [],
  loading: false,
  fetchBanners: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/home/banners')
      const data = await response.json()
      set({ banners: data.data, loading: false })
    } catch (error) {
      console.error('获取轮播图失败:', error)
      set({ loading: false })
    }
  }
}))

// 产品数据Store
export const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/products')
      const data = await response.json()
      set({ products: data.data, categories: data.categories || [], loading: false })
    } catch (error) {
      console.error('获取产品列表失败:', error)
      set({ loading: false })
    }
  },
  submitQuote: async (quoteData) => {
    try {
      const response = await fetch('http://localhost:3001/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteData)
      })
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('提交询价失败:', error)
      return false
    }
  }
}))

// 新闻数据Store
export const useNewsStore = create((set) => ({
  newsList: [],
  categories: [],
  loading: false,
  fetchNews: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/news')
      const data = await response.json()
      set({ newsList: data.data, categories: data.categories || [], loading: false })
    } catch (error) {
      console.error('获取新闻列表失败:', error)
      set({ loading: false })
    }
  },
  fetchNewsById: async (id) => {
    set({ loading: true })
    try {
      const response = await fetch(`http://localhost:3001/api/news/${id}`)
      const data = await response.json()
      set({ loading: false })
      return data.data
    } catch (error) {
      console.error('获取新闻详情失败:', error)
      set({ loading: false })
      return null
    }
  }
}))

// 关于我们数据Store
export const useAboutStore = create((set) => ({
  companyInfo: null,
  coreValues: null,
  fleetStorage: null,
  leadershipTeam: null,
  loading: false,
  
  fetchCompanyInfo: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/about/company-info')
      const data = await response.json()
      set({ companyInfo: data.data, loading: false })
    } catch (error) {
      console.error('获取公司信息失败:', error)
      set({ loading: false })
    }
  },
  
  fetchCoreValues: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/about/core-values')
      const data = await response.json()
      set({ coreValues: data.data, loading: false })
    } catch (error) {
      console.error('获取核心价值观失败:', error)
      set({ loading: false })
    }
  },
  
  fetchFleetStorage: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/about/fleet-storage')
      const data = await response.json()
      set({ fleetStorage: data.data, loading: false })
    } catch (error) {
      console.error('获取车队储存信息失败:', error)
      set({ loading: false })
    }
  },
  
  fetchLeadershipTeam: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/about/leadership-team')
      const data = await response.json()
      set({ leadershipTeam: data.data, loading: false })
    } catch (error) {
      console.error('获取管理团队失败:', error)
      set({ loading: false })
    }
  }
}))

// 招聘信息Store
export const useCareersStore = create((set) => ({
  positions: [],
  benefits: null,
  culture: null,
  loading: false,
  fetchPositions: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/careers/positions')
      const data = await response.json()
      set({ positions: data.data, loading: false })
    } catch (error) {
      console.error('获取职位列表失败:', error)
      set({ loading: false })
    }
  },
  fetchBenefits: async () => {
    try {
      const response = await fetch('http://localhost:3001/api/careers/benefits')
      const data = await response.json()
      set({ benefits: data.data })
    } catch (error) {
      console.error('获取福利待遇失败:', error)
    }
  },
  fetchCulture: async () => {
    try {
      const response = await fetch('http://localhost:3001/api/careers/culture')
      const data = await response.json()
      set({ culture: data.data })
    } catch (error) {
      console.error('获取企业文化失败:', error)
    }
  },
  submitApplication: async (applicationData) => {
    try {
      const response = await fetch('http://localhost:3001/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      })
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('提交申请失败:', error)
      return false
    }
  }
}))

// 联系我们Store
export const useContactStore = create((set) => ({
  contactInfo: null,
  offices: [],
  loading: false,
  fetchContactInfo: async () => {
    set({ loading: true })
    try {
      const response = await fetch('http://localhost:3001/api/contact/info')
      const data = await response.json()
      set({ contactInfo: data.data, loading: false })
    } catch (error) {
      console.error('获取联系信息失败:', error)
      set({ loading: false })
    }
  },
  fetchOffices: async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contact/offices')
      const data = await response.json()
      set({ offices: data.data })
    } catch (error) {
      console.error('获取办公地点失败:', error)
    }
  },
  submitMessage: async (messageData) => {
    try {
      const response = await fetch('http://localhost:3001/api/contact/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      })
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('发送消息失败:', error)
      return false
    }
  }
}))