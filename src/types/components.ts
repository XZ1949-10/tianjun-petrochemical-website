/**
 * 组件Props类型定义
 */

import React from 'react'
import { 
  Banner, 
  CompanyStats, 
  Service, 
  NetworkMapData, 
  Testimonial, 
  NewsItem,
  Product,
  JobPosition,
  ContactFormValues
} from './api'

// ===================== 通用类型 =====================
export interface BaseProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

// ===================== 首页组件Props =====================
export interface HeroSectionProps extends BaseProps {
  slides: Array<{
    image: string
    title: string
    subtitle: string
  }>
  onQuoteSubmit?: (values: any) => Promise<void>
}

export interface TrustBarProps extends BaseProps {
  stats?: CompanyStats
  loading?: boolean
}

export interface ServicesSectionProps extends BaseProps {
  services: Service[]
  loading?: boolean
}

export interface NetworkMapSectionProps extends BaseProps {
  data: NetworkMapData
  loading?: boolean
}

export interface TestimonialsSectionProps extends BaseProps {
  testimonials: Testimonial[]
  loading?: boolean
}

export interface NewsSectionProps extends BaseProps {
  news: NewsItem[]
  loading?: boolean
}

// ===================== 产品组件Props =====================
export interface ProductCardProps extends BaseProps {
  product: Product
  onDetailClick?: (id: string) => void
}

export interface ProductListProps extends BaseProps {
  products: Product[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize?: number) => void
  }
}

export interface ProductDetailProps extends BaseProps {
  product: Product | null
  loading?: boolean
  onBack?: () => void
}

// ===================== 新闻组件Props =====================
export interface NewsCardProps extends BaseProps {
  news: NewsItem
  onReadMore?: (id: number) => void
}

export interface NewsListProps extends BaseProps {
  news: NewsItem[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize?: number) => void
  }
}

// ===================== 招聘组件Props =====================
export interface JobCardProps extends BaseProps {
  position: JobPosition
  onApply?: (id: string) => void
}

export interface JobListProps extends BaseProps {
  positions: JobPosition[]
  loading?: boolean
}

// ===================== 联系组件Props =====================
export interface ContactFormProps extends BaseProps {
  onSubmit: (values: ContactFormValues) => Promise<void>
  loading?: boolean
}

export interface MapSectionProps extends BaseProps {
  coordinates: [number, number]
  address: string
}

// ===================== 布局组件Props =====================
export interface HeaderProps extends BaseProps {
  onLanguageChange?: (lang: string) => void
  onMobileMenuToggle?: () => void
}

export interface FooterProps extends BaseProps {
  // Footer特定的props
}

// ===================== 通用UI组件Props =====================
export interface LoadingSpinnerProps extends BaseProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
}

export interface ErrorBoundaryProps extends BaseProps {
  fallback?: React.ComponentType<{
    error: Error
    errorInfo: React.ErrorInfo
    resetError: () => void
  }>
}

export interface ModalProps extends BaseProps {
  visible: boolean
  title: string
  onOk?: () => void
  onCancel?: () => void
  confirmLoading?: boolean
}

// ===================== 自定义Hook返回类型 =====================
export interface UseAPIReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: any[]) => Promise<T>
  refetch: (...args: any[]) => Promise<T>
  reset: () => void
}

export interface UseFormReturn {
  form: any // Ant Design Form实例
  loading: boolean
  errors: Record<string, string>
  handleSubmit: (values: any) => Promise<void>
  validateForm: () => Promise<{ success: boolean; errors?: any }>
  resetForm: () => void
}

export interface UseModalReturn {
  visible: boolean
  loading: boolean
  data: any
  open: (initialData?: any) => void
  close: () => void
  handleOk: () => Promise<void>
  handleCancel: () => void
}