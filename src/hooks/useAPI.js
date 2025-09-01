/**
 * API数据获取Hook - 统一的数据获取逻辑
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { message } from 'antd'

/**
 * 通用API调用Hook
 * @param {Function} apiFunction - API调用函数
 * @param {Object} options - 配置选项
 */
export const useAPI = (apiFunction, options = {}) => {
  const {
    immediate = true,
    defaultData = null,
    onSuccess,
    onError,
    deps = []
  } = options

  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const cancelRef = useRef(false)

  const execute = useCallback(async (...args) => {
    if (!apiFunction) return

    setLoading(true)
    setError(null)
    cancelRef.current = false

    try {
      const result = await apiFunction(...args)
      
      if (cancelRef.current) return

      setData(result)
      onSuccess?.(result)
      return result
    } catch (err) {
      if (cancelRef.current) return

      console.error('API调用失败:', err)
      setError(err)
      onError?.(err)
      // 不再抛出错误，而是返回null，让组件使用静态数据回退
      return null
    } finally {
      if (!cancelRef.current) {
        setLoading(false)
      }
    }
  }, [apiFunction, onSuccess, onError])

  // 重新获取数据
  const refetch = useCallback((...args) => {
    return execute(...args)
  }, [execute])

  // 重置状态
  const reset = useCallback(() => {
    setData(defaultData)
    setError(null)
    setLoading(false)
  }, [defaultData])

  // 自动执行
  useEffect(() => {
    if (immediate && apiFunction) {
      execute()
    }

    return () => {
      cancelRef.current = true
    }
  }, [immediate, execute, ...deps])

  // 组件卸载时取消请求
  useEffect(() => {
    return () => {
      cancelRef.current = true
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    reset
  }
}

/**
 * 分页数据Hook
 * @param {Function} apiFunction - API调用函数
 * @param {Object} options - 配置选项
 */
export const usePagination = (apiFunction, options = {}) => {
  const {
    defaultPageSize = 10,
    defaultCurrent = 1,
    immediate = true
  } = options

  const [pagination, setPagination] = useState({
    current: defaultCurrent,
    pageSize: defaultPageSize,
    total: 0
  })

  const [filters, setFilters] = useState({})

  const { data, loading, error, execute } = useAPI(
    apiFunction,
    {
      immediate: false,
      onSuccess: (result) => {
        if (result && typeof result === 'object') {
          if (result.data && result.total !== undefined) {
            setPagination(prev => ({
              ...prev,
              total: result.total
            }))
          }
        }
      }
    }
  )

  // 获取数据
  const fetchData = useCallback(async (params = {}) => {
    const requestParams = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
      ...params
    }
    
    return execute(requestParams)
  }, [execute, pagination, filters])

  // 改变页码
  const changePage = useCallback((page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize
    }))
  }, [])

  // 设置筛选条件
  const changeFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPagination(prev => ({ ...prev, current: 1 })) // 重置到第一页
  }, [])

  // 重置筛选条件
  const resetFilters = useCallback(() => {
    setFilters({})
    setPagination({
      current: defaultCurrent,
      pageSize: defaultPageSize,
      total: 0
    })
  }, [defaultCurrent, defaultPageSize])

  // 自动获取数据
  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [fetchData, immediate])

  // 分页或筛选条件变化时重新获取数据
  useEffect(() => {
    if (!immediate) return
    
    fetchData()
  }, [pagination.current, pagination.pageSize, filters])

  return {
    data: data?.data || data || [],
    loading,
    error,
    pagination,
    filters,
    fetchData,
    changePage,
    changeFilters,
    resetFilters,
    refetch: fetchData
  }
}

/**
 * 搜索Hook
 * @param {Function} searchFunction - 搜索函数
 * @param {Object} options - 配置选项
 */
export const useSearch = (searchFunction, options = {}) => {
  const {
    debounceDelay = 300,
    minLength = 1,
    immediate = false
  } = options

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const debounceRef = useRef(null)

  // 防抖处理
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, debounceDelay)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchTerm, debounceDelay])

  // API调用
  const { data, loading, error, execute } = useAPI(
    searchFunction,
    {
      immediate: false,
      onError: (err) => {
        console.error('搜索失败:', err)
      }
    }
  )

  // 执行搜索
  useEffect(() => {
    if (debouncedSearchTerm.length >= minLength) {
      execute(debouncedSearchTerm)
    } else if (immediate && debouncedSearchTerm.length === 0) {
      execute('')
    }
  }, [debouncedSearchTerm, execute, minLength, immediate])

  // 清空搜索
  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    data,
    loading,
    error,
    clearSearch,
    search: execute
  }
}

/**
 * 异步操作Hook（提交表单、删除等）
 * @param {Function} asyncFunction - 异步函数
 * @param {Object} options - 配置选项
 */
export const useAsyncOperation = (asyncFunction, options = {}) => {
  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage = '操作失败'
  } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)

    try {
      const result = await asyncFunction(...args)
      
      if (successMessage) {
        message.success(successMessage)
      }
      
      onSuccess?.(result)
      return result
    } catch (err) {
      console.error('异步操作失败:', err)
      setError(err)
      
      if (errorMessage) {
        message.error(typeof errorMessage === 'function' ? errorMessage(err) : errorMessage)
      }
      
      onError?.(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [asyncFunction, onSuccess, onError, successMessage, errorMessage])

  const reset = useCallback(() => {
    setError(null)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    execute,
    reset
  }
}

/**
 * 数据缓存Hook
 * @param {string} key - 缓存键
 * @param {Function} fetcher - 数据获取函数
 * @param {Object} options - 配置选项
 */
export const useCache = (key, fetcher, options = {}) => {
  const {
    ttl = 5 * 60 * 1000, // 5分钟缓存
    immediate = true
  } = options

  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(`cache_${key}`)
    if (cached) {
      const { data: cachedData, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < ttl) {
        return cachedData
      }
    }
    return null
  })

  const { loading, error, execute } = useAPI(fetcher, {
    immediate: false,
    onSuccess: (result) => {
      setData(result)
      localStorage.setItem(`cache_${key}`, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }))
    }
  })

  const refresh = useCallback(() => {
    localStorage.removeItem(`cache_${key}`)
    return execute()
  }, [key, execute])

  useEffect(() => {
    if (immediate && !data) {
      execute()
    }
  }, [immediate, data, execute])

  return {
    data,
    loading,
    error,
    refresh
  }
}