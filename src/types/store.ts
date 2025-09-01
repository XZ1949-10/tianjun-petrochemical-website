/**
 * Store状态类型定义
 */

// ===================== 认证状态 =====================
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

// ===================== 应用状态 =====================
export interface AppState {
  globalLoading: boolean
  theme: 'light' | 'dark'
  language: string
  siteConfig: SiteConfig | null
  error: Error | null
}

// ===================== 首页状态 =====================
export interface HomeState {
  banners: Banner[]
  companyStats: CompanyStats | null
  services: Service[]
  networkMap: NetworkMapData | null
  testimonials: Testimonial[]
  latestNews: NewsItem[]
  loading: {
    banners: boolean
    companyStats: boolean
    services: boolean
    networkMap: boolean
    testimonials: boolean
    latestNews: boolean
  }
}

// ===================== 产品状态 =====================
export interface ProductState {
  products: Product[]
  currentProduct: Product | null
  services: Service[]
  pricing: PricingInfo | null
  downloads: DownloadFile[]
  pagination: {
    current: number
    pageSize: number
    total: number
  }
  filters: {
    category: string
    priceRange: string
    search: string
  }
  loading: boolean
}

// ===================== 新闻状态 =====================
export interface NewsState {
  newsList: NewsItem[]
  currentNews: NewsDetail | null
  categories: NewsCategory[]
  pagination: {
    current: number
    pageSize: number
    total: number
  }
  filters: {
    category: string
    search: string
  }
  loading: boolean
}

// ===================== 招聘状态 =====================
export interface CareerState {
  positions: JobPosition[]
  currentPosition: JobPosition | null
  benefits: EmployeeBenefit[]
  cultureVideo: string | null
  pagination: {
    current: number
    pageSize: number
    total: number
  }
  loading: boolean
}

// ===================== 联系状态 =====================
export interface ContactState {
  contactInfo: ContactInfo | null
  serviceAreas: ServiceArea[]
  loading: boolean
}

// ===================== 系统状态 =====================
export interface SystemState {
  config: SiteConfig | null
  loading: boolean
}

// ===================== 根Store类型 =====================
export interface RootState {
  auth: AuthState
  app: AppState
  home: HomeState
  product: ProductState
  news: NewsState
  career: CareerState
  contact: ContactState
  system: SystemState
}