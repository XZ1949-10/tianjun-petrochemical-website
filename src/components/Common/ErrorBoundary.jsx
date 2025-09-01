/**
 * 全局错误边界组件 - 捕获React组件渲染错误
 */
import React from 'react'
import { Result, Button, Typography, Card, Space, Alert } from 'antd'
import { ReloadOutlined, HomeOutlined, BugOutlined } from '@ant-design/icons'
import { isDev } from '../config'

const { Paragraph, Text } = Typography

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      errorId: Math.random().toString(36).substr(2, 9)
    }
  }

  componentDidCatch(error, errorInfo) {
    // 捕获错误信息
    this.setState({
      error,
      errorInfo
    })

    // 记录错误到控制台
    console.error('React Error Boundary捕获到错误:', error, errorInfo)

    // 可以在这里上报错误到监控服务
    this.logErrorToService(error, errorInfo)
  }

  logErrorToService = (error, errorInfo) => {
    // 错误上报逻辑
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      })
    }

    // 可以集成Sentry等错误监控服务
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack
    //     }
    //   }
    // })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    })
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state
      const { fallback: Fallback, children } = this.props

      // 如果提供了自定义fallback组件
      if (Fallback) {
        return (
          <Fallback
            error={error}
            errorInfo={errorInfo}
            resetError={this.handleReset}
          />
        )
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: '#f5f5f5'
        }}>
          <Card style={{ maxWidth: 600, width: '100%' }}>
            <Result
              status="error"
              title="页面出现错误"
              subTitle={`错误ID: ${errorId}`}
              extra={
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space>
                    <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleReload}>
                      刷新页面
                    </Button>
                    <Button icon={<HomeOutlined />} onClick={this.handleGoHome}>
                      返回首页
                    </Button>
                    <Button icon={<BugOutlined />} onClick={this.handleReset}>
                      重试
                    </Button>
                  </Space>
                  
                  <Alert
                    message="错误信息"
                    description="页面运行时出现了意外错误，我们已经记录了此问题。您可以尝试刷新页面或返回首页。"
                    type="warning"
                    showIcon
                  />
                </Space>
              }
            />

            {/* 开发环境下显示详细错误信息 */}
            {isDev() && error && (
              <Card 
                title="开发调试信息" 
                size="small" 
                style={{ marginTop: 16, backgroundColor: '#fafafa' }}
              >
                <Paragraph>
                  <Text strong>错误信息:</Text>
                  <br />
                  <Text code copyable>
                    {error.toString()}
                  </Text>
                </Paragraph>
                
                {errorInfo?.componentStack && (
                  <Paragraph>
                    <Text strong>组件堆栈:</Text>
                    <br />
                    <Text code copyable style={{ fontSize: '12px' }}>
                      {errorInfo.componentStack}
                    </Text>
                  </Paragraph>
                )}
              </Card>
            )}
          </Card>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary

// 高阶组件：为组件添加错误边界
export const withErrorBoundary = (Component, errorFallback) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary fallback={errorFallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Hook：在函数组件中使用错误边界
export const useErrorHandler = () => {
  return (error, errorInfo) => {
    console.error('组件错误:', error, errorInfo)
    
    // 可以在这里触发全局错误处理
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('react-error', {
        detail: { error, errorInfo }
      }))
    }
  }
}