/**
 * 全局错误处理服务 - 统一的错误处理和用户反馈
 */
import { message, notification, Modal } from 'antd'
import { ExclamationCircleOutlined, CloseCircleOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

class ErrorHandler {
  constructor() {
    this.errorQueue = []
    this.maxQueueSize = 10
  }

  /**
   * 处理API错误
   */
  handleAPIError(error, options = {}) {
    const {
      showNotification = true,
      showMessage = true,
      silent = false,
      customMessage,
      onRetry
    } = options

    if (silent) return

    // 提取错误信息
    let errorMessage = '网络请求失败'
    let errorTitle = '请求错误'

    if (error.response) {
      const { status, data } = error.response
      errorTitle = `HTTP ${status} 错误`
      
      switch (status) {
        case 400:
          errorMessage = data?.message || '请求参数错误'
          break
        case 401:
          errorMessage = '登录已过期，请重新登录'
          // 可以在这里触发登出逻辑
          this.handleAuthError()
          return
        case 403:
          errorMessage = '没有权限访问此资源'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = data?.message || `服务器返回错误 (${status})`
      }
    } else if (error.request) {
      errorMessage = '网络连接失败，请检查网络设置'
    } else {
      errorMessage = error.message || '请求配置错误'
    }

    // 使用自定义消息
    if (customMessage) {
      errorMessage = customMessage
    }

    // 显示消息提示
    if (showMessage) {
      message.error(errorMessage, 4)
    }

    // 显示通知
    if (showNotification) {
      notification.error({
        message: errorTitle,
        description: errorMessage,
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
        duration: 5
      })
    }

    // 记录错误
    this.logError(error, { errorMessage, errorTitle })

    return {
      title: errorTitle,
      message: errorMessage,
      error
    }
  }

  /**
   * 处理表单验证错误
   */
  handleFormError(errors) {
    if (!errors) return

    const errorMessages = Object.values(errors)
    if (errorMessages.length > 0) {
      const firstError = errorMessages[0]
      message.error(firstError, 3)
    }
  }

  /**
   * 处理业务逻辑错误
   */
  handleBusinessError(error, options = {}) {
    const {
      title = '操作失败',
      duration = 4,
      showNotification = false
    } = options

    const errorMessage = error.message || error.toString()

    message.error(errorMessage, duration)

    if (showNotification) {
      notification.warning({
        message: title,
        description: errorMessage,
        icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
        duration
      })
    }

    this.logError(error, { type: 'business', title })
  }

  /**
   * 处理成功消息
   */
  handleSuccess(messageText, options = {}) {
    const {
      title = '操作成功',
      duration = 3,
      showNotification = false
    } = options

    message.success(messageText, duration)

    if (showNotification) {
      notification.success({
        message: title,
        description: messageText,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration
      })
    }
  }

  /**
   * 处理信息提示
   */
  handleInfo(messageText, options = {}) {
    const {
      title = '提示',
      duration = 3,
      showNotification = false
    } = options

    message.info(messageText, duration)

    if (showNotification) {
      notification.info({
        message: title,
        description: messageText,
        icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
        duration
      })
    }
  }

  /**
   * 显示确认对话框
   */
  showConfirm(options = {}) {
    const {
      title = '确认操作',
      content = '您确定要执行此操作吗？',
      okText = '确定',
      cancelText = '取消',
      onOk,
      onCancel
    } = options

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title,
        icon: <ExclamationCircleOutlined />,
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
  }

  /**
   * 处理认证错误
   */
  handleAuthError() {
    // 清除认证信息
    localStorage.removeItem('auth_token')
    
    // 显示提示
    message.warning('登录已过期，请重新登录', 3)
    
    // 跳转到登录页
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  }

  /**
   * 记录错误到控制台和队列
   */
  logError(error, context = {}) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    // 添加到错误队列
    this.errorQueue.push(errorInfo)
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift()
    }

    // 开发环境下输出到控制台
    if (import.meta.env.DEV) {
      console.group('🚨 错误日志')
      console.error('时间:', errorInfo.timestamp)
      console.error('错误:', errorInfo.error)
      console.error('上下文:', context)
      console.error('堆栈:', errorInfo.stack)
      console.groupEnd()
    }

    // 可以在这里集成错误监控服务
    // this.reportToMonitoringService(errorInfo)
  }

  /**
   * 获取错误队列
   */
  getErrorQueue() {
    return [...this.errorQueue]
  }

  /**
   * 清空错误队列
   */
  clearErrorQueue() {
    this.errorQueue = []
  }

  /**
   * 上报错误到监控服务
   */
  reportToMonitoringService(errorInfo) {
    // 这里可以集成Sentry、Bugsnag等监控服务
    // 例如:
    // if (window.Sentry) {
    //   window.Sentry.captureException(new Error(errorInfo.error), {
    //     contexts: {
    //       app: errorInfo.context
    //     }
    //   })
    // }
  }
}

// 创建全局错误处理实例
const errorHandler = new ErrorHandler()

// 导出实例和类
export default errorHandler
export { ErrorHandler }

// 便捷方法
export const handleAPIError = (error, options) => errorHandler.handleAPIError(error, options)
export const handleFormError = (errors) => errorHandler.handleFormError(errors)
export const handleBusinessError = (error, options) => errorHandler.handleBusinessError(error, options)
export const handleSuccess = (message, options) => errorHandler.handleSuccess(message, options)
export const handleInfo = (message, options) => errorHandler.handleInfo(message, options)
export const showConfirm = (options) => errorHandler.showConfirm(options)