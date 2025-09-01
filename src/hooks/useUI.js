/**
 * UI交互Hook - 通用的UI状态管理
 */
import { useState, useCallback, useEffect, useRef } from 'react'
import { message, Modal } from 'antd'

/**
 * 模态框Hook
 * @param {Object} options - 配置选项
 */
export const useModal = (options = {}) => {
  const {
    destroyOnClose = true,
    maskClosable = true,
    onOk,
    onCancel
  } = options

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const open = useCallback((initialData = null) => {
    setData(initialData)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    if (destroyOnClose) {
      setTimeout(() => setData(null), 300) // 等待动画结束
    }
  }, [destroyOnClose])

  const handleOk = useCallback(async (...args) => {
    if (onOk) {
      setLoading(true)
      try {
        await onOk(data, ...args)
        close()
      } catch (error) {
        console.error('Modal确认操作失败:', error)
      } finally {
        setLoading(false)
      }
    } else {
      close()
    }
  }, [onOk, data, close])

  const handleCancel = useCallback((...args) => {
    if (onCancel) {
      onCancel(data, ...args)
    }
    close()
  }, [onCancel, data, close])

  return {
    visible,
    loading,
    data,
    open,
    close,
    handleOk,
    handleCancel,
    modalProps: {
      open: visible,
      confirmLoading: loading,
      onOk: handleOk,
      onCancel: handleCancel,
      destroyOnClose,
      maskClosable
    }
  }
}

/**
 * 抽屉Hook
 */
export const useDrawer = (options = {}) => {
  const {
    placement = 'right',
    destroyOnClose = true,
    maskClosable = true,
    onClose
  } = options

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)

  const open = useCallback((initialData = null) => {
    setData(initialData)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    if (onClose) {
      onClose(data)
    }
    if (destroyOnClose) {
      setTimeout(() => setData(null), 300)
    }
  }, [onClose, data, destroyOnClose])

  return {
    visible,
    data,
    open,
    close,
    drawerProps: {
      open: visible,
      onClose: close,
      placement,
      destroyOnClose,
      maskClosable
    }
  }
}

/**
 * 确认对话框Hook
 */
export const useConfirm = () => {
  const confirm = useCallback((options = {}) => {
    const {
      title = '确认操作',
      content = '您确定要执行此操作吗？',
      onOk,
      onCancel,
      okText = '确定',
      cancelText = '取消',
      type = 'confirm'
    } = options

    return new Promise((resolve, reject) => {
      Modal[type]({
        title,
        content,
        okText,
        cancelText,
        onOk: async () => {
          try {
            const result = await onOk?.()
            resolve(result)
          } catch (error) {
            reject(error)
          }
        },
        onCancel: () => {
          onCancel?.()
          reject(new Error('用户取消操作'))
        }
      })
    })
  }, [])

  return { confirm }
}

/**
 * 通知Hook
 */
export const useNotification = () => {
  const success = useCallback((content, options = {}) => {
    message.success({
      content,
      duration: 3,
      ...options
    })
  }, [])

  const error = useCallback((content, options = {}) => {
    message.error({
      content,
      duration: 4,
      ...options
    })
  }, [])

  const warning = useCallback((content, options = {}) => {
    message.warning({
      content,
      duration: 3,
      ...options
    })
  }, [])

  const info = useCallback((content, options = {}) => {
    message.info({
      content,
      duration: 3,
      ...options
    })
  }, [])

  const loading = useCallback((content, options = {}) => {
    return message.loading({
      content,
      duration: 0,
      ...options
    })
  }, [])

  return {
    success,
    error,
    warning,
    info,
    loading
  }
}

/**
 * 复制到剪贴板Hook
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      message.success('已复制到剪贴板')
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
      
      return true
    } catch (error) {
      message.error('复制失败')
      return false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { copy, copied }
}

/**
 * 全屏Hook
 */
export const useFullscreen = (elementRef) => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const enterFullscreen = useCallback(async () => {
    const element = elementRef?.current || document.documentElement

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen()
      }
    } catch (error) {
      message.error('进入全屏失败')
    }
  }, [elementRef])

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen()
      }
    } catch (error) {
      message.error('退出全屏失败')
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen
  }
}

/**
 * 窗口尺寸Hook
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * 媒体查询Hook
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handleChange = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}