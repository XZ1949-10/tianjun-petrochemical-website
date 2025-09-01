/**
 * 自定义Hook索引文件 - 统一导出所有Hook
 */

// API相关Hook
export {
  useAPI,
  usePagination,
  useSearch,
  useAsyncOperation,
  useCache
} from './useAPI'

// 表单相关Hook
export {
  useForm,
  useFileUpload,
  useValidation
} from './useForm'

// UI交互Hook
export {
  useModal,
  useDrawer,
  useConfirm,
  useNotification,
  useClipboard,
  useFullscreen,
  useWindowSize,
  useMediaQuery
} from './useUI'

// 业务Hook示例（基于已有Store的封装）
import { useCallback } from 'react'
import { useHomeStore, useProductStore, useNewsStore } from '../store'
import api from '../services/api'

/**
 * 首页数据Hook
 */
export const useHome = () => {
  const {
    banners,
    companyStats,
    services,
    networkMap,
    testimonials,
    latestNews,
    loading,
    fetchBanners,
    fetchCompanyStats,
    fetchServices,
    fetchNetworkMap,
    fetchTestimonials,
    fetchLatestNews,
    reset
  } = useHomeStore()

  // 初始化首页数据
  const initializeHome = useCallback(async () => {
    try {
      await Promise.all([
        fetchBanners(),
        fetchCompanyStats(),
        fetchServices(),
        fetchNetworkMap(),
        fetchTestimonials(),
        fetchLatestNews()
      ])
    } catch (error) {
      console.error('初始化首页数据失败:', error)
    }
  }, [
    fetchBanners,
    fetchCompanyStats,
    fetchServices,
    fetchNetworkMap,
    fetchTestimonials,
    fetchLatestNews
  ])

  return {
    data: {
      banners,
      companyStats,
      services,
      networkMap,
      testimonials,
      latestNews
    },
    loading,
    actions: {
      initializeHome,
      fetchBanners,
      fetchCompanyStats,
      fetchServices,
      fetchNetworkMap,
      fetchTestimonials,
      fetchLatestNews,
      reset
    }
  }
}

/**
 * 产品数据Hook
 */
export const useProducts = () => {
  const {
    products,
    currentProduct,
    services,
    pricing,
    downloads,
    pagination,
    filters,
    loading,
    fetchProducts,
    fetchProductDetail,
    setFilters,
    setPagination,
    reset
  } = useProductStore()

  return {
    data: {
      products,
      currentProduct,
      services,
      pricing,
      downloads
    },
    pagination,
    filters,
    loading,
    actions: {
      fetchProducts,
      fetchProductDetail,
      setFilters,
      setPagination,
      reset
    }
  }
}

/**
 * 新闻数据Hook
 */
export const useNews = () => {
  const {
    newsList,
    currentNews,
    categories,
    pagination,
    filters,
    loading,
    fetchNewsList,
    fetchNewsDetail,
    setFilters,
    setPagination
  } = useNewsStore()

  return {
    data: {
      newsList,
      currentNews,
      categories
    },
    pagination,
    filters,
    loading,
    actions: {
      fetchNewsList,
      fetchNewsDetail,
      setFilters,
      setPagination
    }
  }
}

/**
 * 询价表单Hook
 */
export const useQuoteForm = () => {
  const { execute: submitQuote, loading } = useAsyncOperation(
    api.home.submitQuoteRequest,
    {
      successMessage: '询价请求提交成功，我们将在2小时内回复您！',
      errorMessage: '提交失败，请稍后重试'
    }
  )

  return {
    submitQuote,
    loading
  }
}

/**
 * 联系表单Hook
 */
export const useContactForm = () => {
  const { execute: submitMessage, loading } = useAsyncOperation(
    api.contact.submitMessage,
    {
      successMessage: '消息发送成功，我们会尽快回复您！',
      errorMessage: '发送失败，请稍后重试'
    }
  )

  return {
    submitMessage,
    loading
  }
}