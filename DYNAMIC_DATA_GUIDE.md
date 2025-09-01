# 天骏石化官网 - 动态数据使用指南

## 快速开始

### 1. 启动开发环境
```bash
# 进入项目目录
cd c:\Users\Bin\Desktop\zssy

# 同时启动前端和API服务器
npm run dev:full

# 或者分别启动
npm run server  # 启动API服务器 (端口3001)
npm run dev     # 启动前端开发服务器 (端口5173)
```

### 2. 访问地址
- **前端页面**: http://localhost:5173
- **API服务器**: http://localhost:3001
- **API文档**: http://localhost:3001/api

## 动态数据实现方式

### 1. 组件改造示例

#### 原始静态数据组件
```jsx
// 静态数据
const services = [
  { id: 1, title: "批量配送", desc: "..." },
  { id: 2, title: "现场加油", desc: "..." }
]

// 静态渲染
{services.map(service => <ServiceCard key={service.id} {...service} />)}
```

#### 动态数据组件
```jsx
// 动态数据状态
const [services, setServices] = useState([])
const [loading, setLoading] = useState(true)

// API数据获取
useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await api.home.getServices()
      setServices(data)
    } catch (error) {
      message.error('加载服务数据失败')
    } finally {
      setLoading(false)
    }
  }
  fetchServices()
}, [])

// 动态渲染
{loading ? (
  <Spin size="large" />
) : (
  services.map(service => <ServiceCard key={service.id} {...service} />)
)}
```

### 2. 自适应数量实现

#### 响应式网格布局
```jsx
// 自适应列数的网格布局
<Row gutter={[32, 32]}>
  {services.map((service, index) => (
    <Col 
      xs={24}        // 手机端：1列
      md={8}         // 平板端：3列  
      lg={6}         // 桌面端：4列
      key={service.id}
    >
      <ServiceCard {...service} />
    </Col>
  ))}
</Row>
```

#### 动态图标映射
```jsx
// 图标映射表
const iconMap = {
  'TruckOutlined': <TruckOutlined />,
  'RocketOutlined': <RocketOutlined />,
  'SafetyOutlined': <SafetyOutlined />
}

// 动态图标渲染
<div className="service-icon">
  {iconMap[service.icon] || <ToolOutlined />}
</div>
```

### 3. 数据获取钩子

#### 创建自定义Hook
```jsx
// hooks/useServices.js
export const useServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const data = await api.home.getServices()
        setServices(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return { services, loading, error }
}

// 在组件中使用
const MyComponent = () => {
  const { services, loading, error } = useServices()
  
  if (loading) return <Spin />
  if (error) return <Alert message={error} type="error" />
  
  return (
    <div>
      {services.map(service => <ServiceCard key={service.id} {...service} />)}
    </div>
  )
}
```

## API接口使用示例

### 1. 基础接口调用
```jsx
import api from '../services/api'

// 获取轮播图
const banners = await api.home.getBanners()

// 获取产品列表（支持分页和筛选）
const products = await api.products.getProducts({
  page: 1,
  pageSize: 10,
  category: 'fuel',
  search: '柴油'
})

// 获取新闻详情
const news = await api.news.getNewsDetail(1)
```

### 2. 分页数据处理
```jsx
const [products, setProducts] = useState([])
const [pagination, setPagination] = useState({
  current: 1,
  pageSize: 10,
  total: 0
})

const fetchProducts = async (page = 1) => {
  const response = await api.products.getProducts({
    page,
    pageSize: pagination.pageSize
  })
  
  setProducts(response.data)
  setPagination({
    ...pagination,
    current: page,
    total: response.total
  })
}

// Ant Design分页组件
<Pagination
  current={pagination.current}
  pageSize={pagination.pageSize}
  total={pagination.total}
  onChange={fetchProducts}
/>
```

### 3. 搜索和筛选
```jsx
const [filters, setFilters] = useState({
  category: 'all',
  search: ''
})

const handleSearch = async (values) => {
  setFilters(values)
  const response = await api.news.getNewsList({
    ...values,
    page: 1
  })
  setNews(response.data)
}

// 搜索表单
<Form onFinish={handleSearch}>
  <Form.Item name="category">
    <Select placeholder="选择分类">
      <Option value="all">全部</Option>
      <Option value="business">业务拓展</Option>
      <Option value="safety">安全管理</Option>
    </Select>
  </Form.Item>
  <Form.Item name="search">
    <Input placeholder="搜索关键词" />
  </Form.Item>
  <Button type="primary" htmlType="submit">搜索</Button>
</Form>
```

## 数据结构说明

### 1. 统一响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10,
  "timestamp": "2024-01-20T10:00:00Z"
}
```

### 2. 主要数据模型

#### 轮播图 (Banner)
```json
{
  "id": 1,
  "title": "可靠的0#柴油供应自1990年",
  "subtitle": "第三代家族企业 • 当日配送 • 持证危化品经营商",
  "image": "https://...",
  "mobileImage": "https://...",
  "ctaText": "立即询价",
  "ctaLink": "/contact",
  "order": 1,
  "status": "active"
}
```

#### 服务项 (Service)
```json
{
  "id": 1,
  "icon": "TruckOutlined",
  "title": "批量配送",
  "description": "专业的柴油批量配送服务...",
  "features": ["24小时服务", "当日配送", "专业车队"],
  "serviceHours": "24",
  "minOrder": 500,
  "coverage": "全区域",
  "link": "/products#delivery"
}
```

#### 新闻 (News)
```json
{
  "id": 1,
  "title": "天骏石化与多家大型物流企业签署年度供油协议",
  "excerpt": "近日，天骏石化成功与区域内多家知名物流企业...",
  "content": "<p>详细内容...</p>",
  "image": "https://...",
  "date": "2024-01-20",
  "category": "业务拓展",
  "categoryId": "business",
  "author": "企业发展部",
  "views": 1250,
  "likes": 45,
  "tags": ["合作协议", "物流企业"],
  "featured": true,
  "status": "published"
}
```

## 样式自适应

### 1. 响应式网格
```jsx
// 根据屏幕尺寸自动调整列数
<Row gutter={[24, 24]}>
  {items.map(item => (
    <Col 
      xs={24}     // <576px: 1列
      sm={12}     // ≥576px: 2列
      md={8}      // ≥768px: 3列
      lg={6}      // ≥992px: 4列
      xl={4}      // ≥1200px: 6列
      key={item.id}
    >
      <ItemCard {...item} />
    </Col>
  ))}
</Row>
```

### 2. 动态类名
```jsx
// 根据数据动态添加类名
<div className={`service-card ${service.featured ? 'featured' : ''}`}>
  <div className={`service-status status-${service.status}`}>
    {service.title}
  </div>
</div>
```

### 3. 条件渲染
```jsx
// 根据数据条件渲染不同内容
{testimonial.verified && <Tag color="blue">VIP客户</Tag>}
{news.featured && <Badge count="推荐" />}
{service.hotline && <div>热线: {service.hotline}</div>}
```

## 性能优化建议

### 1. 数据缓存
```jsx
// 使用React Query或SWR缓存API数据
import { useQuery } from 'react-query'

const { data: services, isLoading } = useQuery(
  'services',
  api.home.getServices,
  {
    staleTime: 5 * 60 * 1000, // 5分钟缓存
    cacheTime: 10 * 60 * 1000  // 10分钟过期
  }
)
```

### 2. 懒加载
```jsx
// 使用React.lazy延迟加载组件
const NewsDetail = React.lazy(() => import('./NewsDetail'))

<Suspense fallback={<Spin />}>
  <NewsDetail id={newsId} />
</Suspense>
```

### 3. 虚拟化长列表
```jsx
// 使用 react-window 处理大量数据
import { FixedSizeList as List } from 'react-window'

<List
  height={600}
  itemCount={news.length}
  itemSize={120}
  itemData={news}
>
  {({ index, style, data }) => (
    <div style={style}>
      <NewsCard news={data[index]} />
    </div>
  )}
</List>
```

## 错误处理

### 1. 全局错误边界
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="页面加载失败"
          subTitle="请刷新页面重试"
          extra={<Button onClick={() => window.location.reload()}>刷新页面</Button>}
        />
      )
    }
    return this.props.children
  }
}
```

### 2. API错误处理
```jsx
const fetchData = async () => {
  try {
    setLoading(true)
    const data = await api.home.getServices()
    setServices(data)
  } catch (error) {
    // 根据错误类型显示不同消息
    if (error.code === 'NETWORK_ERROR') {
      message.error('网络连接失败，请检查网络设置')
    } else if (error.code === 404) {
      message.error('请求的资源不存在')
    } else {
      message.error('加载数据失败，请稍后重试')
    }
  } finally {
    setLoading(false)
  }
}
```

## 开发调试

### 1. API调试
```bash
# 查看所有API端点
curl http://localhost:3001/api

# 测试具体接口
curl http://localhost:3001/api/home/services
curl http://localhost:3001/api/news?page=1&category=business
```

### 2. 前端调试
```jsx
// 开启调试模式
if (process.env.NODE_ENV === 'development') {
  console.log('API Response:', data)
  console.log('Component State:', { services, loading })
}
```

## 部署准备

### 1. 环境变量配置
```env
# .env.production
VITE_API_BASE_URL=https://api.tianjun-petro.com/api
VITE_ENABLE_MOCK=false
VITE_ENABLE_DEBUG=false
```

### 2. 构建优化
```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

这个指南涵盖了从静态数据到动态数据的完整改造过程，以及如何实现自适应的数量渲染。您可以根据这个指南来改造其他页面组件。