/**
 * API响应类型定义
 */

// 基础响应结构
export interface BaseResponse<T = any> {
  code: number | string
  message: string
  data: T
  timestamp?: string
  requestId?: string
}

// 分页响应结构
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
  hasPrev: boolean
}

// ===================== 首页相关类型 =====================
export interface Banner {
  id: string
  title: string
  subtitle: string
  image: string
  link?: string
  priority: number
  status: 'active' | 'inactive'
}

export interface CompanyStats {
  certifications: {
    count: string
    items: Array<{
      type: string
      number: string
      name: string
      status: string
      expireDate: string
    }>
  }
  partners: {
    count: string
    majorClients: Array<{
      name: string
      category: string
      logo: string
    }>
  }
  serviceStats: {
    experience: string
    clients: string
    deliveryRate: string
    serviceHours: string
  }
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  link: string
  serviceHours: string
  features: string[]
}

export interface NetworkMapData {
  headquarters: {
    city: string
    coordinates: [number, number]
    type: 'headquarters'
  }
  branches: Array<{
    id: number
    city: string
    province: string
    coordinates: [number, number]
    services: string[]
  }>
  coverage: {
    provinces: number
    totalCapacity: string
  }
}

export interface Testimonial {
  id: number
  customerName: string
  company: string
  rating: number
  comment: string
  featured: boolean
  avatar?: string
}

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  readCount: number
}

// ===================== 关于我们类型 =====================
export interface CompanyInfo {
  name: string
  established: string
  description: string
  vision: string
  mission: string
  values: string[]
  contact: {
    phone: string
    email: string
    address: string
  }
}

export interface CompanyHistoryItem {
  year: string
  title: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  bio: string
  avatar: string
  socialLinks: Array<{
    platform: string
    url: string
  }>
}

// ===================== 产品服务类型 =====================
export interface Product {
  id: string
  name: string
  category: string
  description: string
  image: string
  price: number
  unit: string
  specifications: Record<string, string>
  features: string[]
  applications: string[]
  certifications: string[]
  tags: string[]
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  icon: string
  productCount: number
}

export interface PricingInfo {
  currentPrice: number
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
  benchmarkPrice: number
  priceRange: {
    min: number
    max: number
  }
}

export interface DownloadFile {
  id: string
  name: string
  description: string
  size: string
  type: string
  url: string
  uploadDate: string
}

// ===================== 安全与合规类型 =====================
export interface SafetyPolicy {
  id: string
  title: string
  content: string
  effectiveDate: string
  revisionDate: string
  version: string
}

export interface Certification {
  id: string
  name: string
  number: string
  issuingBody: string
  issueDate: string
  expiryDate: string
  status: 'valid' | 'expired' | 'pending'
  documentUrl: string
}

// ===================== 新闻中心类型 =====================
export interface NewsCategory {
  id: string
  name: string
  description: string
  postCount: number
}

export interface NewsDetail extends NewsItem {
  content: string
  tags: string[]
  author: string
  relatedNews: NewsItem[]
}

// ===================== 招聘信息类型 =====================
export interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'internship'
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  deadline?: string
}

export interface EmployeeBenefit {
  id: string
  title: string
  description: string
  icon: string
  category: string
}

// ===================== 联系我们类型 =====================
export interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours: string
  socialMedia: Array<{
    platform: string
    url: string
    icon: string
  }>
  mapCoordinates: [number, number]
}

export interface ServiceArea {
  id: string
  name: string
  province: string
  cities: string[]
  coverage: string
  contact: string
}

export interface ContactFormValues {
  name: string
  company: string
  phone: string
  email: string
  subject: string
  message: string
  serviceType?: string
}

// ===================== 用户认证类型 =====================
export interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  role: string
  permissions: string[]
  lastLogin: string
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

// ===================== 系统管理类型 =====================
export interface SiteConfig {
  title: string
  description: string
  keywords: string[]
  logo: string
  favicon: string
  contactInfo: ContactInfo
  socialLinks: Array<{
    platform: string
    url: string
    icon: string
  }>
  analytics: {
    enabled: boolean
    id: string
  }
}

export interface UploadResponse {
  id: string
  url: string
  filename: string
  size: number
  mimeType: string
  uploadDate: string
}