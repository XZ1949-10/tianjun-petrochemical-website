/**
 * 首页组件 - 动态数据版本
 * 使用 API 获取所有数据，支持自适应数量渲染
 */
import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  Carousel,
  Card,
  Button,
  Tag,
  Badge,
  Avatar,
  Rate,
  Row,
  Col,
  Statistic,
  Spin,
  message
} from 'antd'
import {
  TruckOutlined,
  RocketOutlined,
  SafetyOutlined,
  ToolOutlined,
  ExperimentOutlined,
  TeamOutlined,
  StarFilled,
  TrophyOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import styled from 'styled-components'

// 导入 API 服务
import api from '../services/api'
// 导入组件
import TrustBar from '../components/TrustBar'
import EChartsNetworkMap from '../components/EChartsNetworkMap'

// 样式保持不变
const StyledHome = styled.div`
  /* 样式代码保持与原来的 Home.jsx 相同 */
  // ... 这里省略样式代码，实际使用时保持与原 Home.jsx 相同
`

const Home = () => {
  // 状态管理
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState([])
  const [companyStats, setCompanyStats] = useState(null)
  const [services, setServices] = useState([])
  const [networkMap, setNetworkMap] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const [fuelPrice, setFuelPrice] = useState(null)

  // 视口检测
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.1 })
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.1 })
  const { ref: newsRef, inView: newsInView } = useInView({ threshold: 0.1 })

  // 获取首页数据
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)
        
        // 并行获取所有首页数据
        const [
          bannersRes,
          statsRes,
          servicesRes,
          mapRes,
          testimonialsRes,
          newsRes,
          priceRes
        ] = await Promise.all([
          api.home.getBanners(),
          api.home.getCompanyStats(),
          api.home.getServices(),
          api.home.getNetworkMap(),
          api.home.getTestimonials(),
          api.home.getLatestNews(3), // 首页只显示3条新闻
          api.home.getFuelPrice()
        ])

        setBanners(bannersRes)
        setCompanyStats(statsRes)
        setServices(servicesRes)
        setNetworkMap(mapRes)
        setTestimonials(testimonialsRes)
        setLatestNews(newsRes)
        setFuelPrice(priceRes)
        
      } catch (error) {
        console.error('获取首页数据失败:', error)
        message.error('加载数据失败，请刷新页面重试')
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  // 动态轮播图渲染
  const renderBanners = () => {
    if (!banners.length) return null

    return (
      <Carousel autoplay effect="fade" dots={false} autoplaySpeed={8000}>
        {banners.map((banner, index) => (
          <div key={banner.id}>
            <div 
              className="hero-slide"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <motion.div 
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="hero-title">{banner.title}</h1>
                <p className="hero-subtitle">{banner.subtitle}</p>
                <div className="hero-features">
                  <div className="feature-item">
                    <SafetyOutlined />
                    <span>家族企业</span>
                  </div>
                  <div className="feature-item">
                    <TruckOutlined />
                    <span>当日配送</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircleOutlined />
                    <span>持证经营</span>
                  </div>
                </div>
                <div className="hero-cta">
                  <Button type="primary" size="large" className="btn-primary">
                    <Link to={banner.ctaLink || "/contact"}>{banner.ctaText || "立即询价"}</Link>
                  </Button>
                  <Button size="large" className="btn-secondary" ghost>
                    <PhoneOutlined /> 追踪订单
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    )
  }

  // 动态服务渲染
  const renderServices = () => {
    if (!services.length) return null

    // 图标映射
    const iconMap = {
      'TruckOutlined': <TruckOutlined />,
      'RocketOutlined': <RocketOutlined />,
      'SafetyOutlined': <SafetyOutlined />,
      'ToolOutlined': <ToolOutlined />,
      'ExperimentOutlined': <ExperimentOutlined />,
      'TeamOutlined': <TeamOutlined />
    }

    return (
      <Row gutter={[32, 32]}>
        {services.map((service, index) => (
          <Col xs={24} md={8} lg={6} key={service.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={service.link}>
                <Card 
                  className="service-card" 
                  hoverable
                  cover={
                    <div className="service-cover">
                      <div className="service-icon">
                        {iconMap[service.icon] || <ToolOutlined />}
                      </div>
                      <div className="service-overlay">
                        <Badge 
                          count="专业"  
                          style={{ 
                            backgroundColor: 'rgba(0, 76, 151, 0.9)',
                            color: 'white',
                            fontWeight: 600
                          }} 
                        />
                      </div>
                    </div>
                  }
                  actions={[
                    <Button type="link" className="text-gradient" key="more">
                      了解更多
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={<span className="service-title">{service.title}</span>}
                    description={
                      <div className="service-content">
                        <p className="service-desc">{service.description}</p>
                        <div className="service-stats">
                          <Statistic 
                            title="服务时长" 
                            value={service.serviceHours || "24"} 
                            suffix="小时" 
                            valueStyle={{ color: 'var(--color-primary)', fontSize: '16px' }}
                          />
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </motion.div>
          </Col>
        ))}
      </Row>
    )
  }

  // 动态客户证言渲染
  const renderTestimonials = () => {
    if (!testimonials.length) return null

    return (
      <Row gutter={[24, 24]} align="stretch">
        {testimonials.map((testimonial, index) => (
          <Col xs={24} md={8} lg={6} key={testimonial.id} style={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Card className="testimonial-card" hoverable>
                <Card.Meta
                  avatar={
                    <Badge count={<StarFilled style={{ color: '#faad14' }} />} offset={[-5, 5]}>
                      <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
                        {testimonial.avatar}
                      </Avatar>
                    </Badge>
                  }
                  title={
                    <div className="testimonial-header">
                      <span className="author-name">{testimonial.author}</span>
                      <Tag color="blue">{testimonial.verified ? 'VIP客户' : '客户'}</Tag>
                    </div>
                  }
                  description={
                    <div className="testimonial-content">
                      <div className="testimonial-text">
                        "{testimonial.content}"
                      </div>
                      <div className="testimonial-footer">
                        <span className="company">{testimonial.company}</span>
                        <div className="rating">
                          <Rate disabled defaultValue={testimonial.rating || 5} style={{ fontSize: '14px' }} />
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    )
  }

  // 动态新闻渲染
  const renderNews = () => {
    if (!latestNews.length) return null

    return (
      <Row gutter={[24, 24]} align="stretch">
        {latestNews.map((news, index) => (
          <Col xs={24} md={8} key={news.id} style={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={newsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Card 
                className="news-card" 
                hoverable
                cover={
                  <div className="news-cover">
                    <div 
                      className="news-image"
                      style={{ backgroundImage: `url(${news.image})` }}
                    >
                      <Tag color="blue" className="news-tag">{news.category}</Tag>
                    </div>
                    <div className="news-overlay">
                      <Badge count={<TrophyOutlined style={{ color: '#faad14' }} />} offset={[10, 10]} />
                    </div>
                  </div>
                }
                actions={[
                  <Link to={`/news/${news.id}`} key="read">阅读更多</Link>,
                  <span key="share">分享</span>
                ]}
              >
                <Card.Meta
                  title={
                    <div className="news-header">
                      <Link to={`/news/${news.id}`}>
                        <span className="news-title">{news.title}</span>
                      </Link>
                    </div>
                  }
                  description={
                    <div className="news-content">
                      <div className="news-meta">
                        <span><CalendarOutlined /> {news.date}</span>
                        <div className="news-stats">
                          <Statistic value={news.views || 0} suffix="次阅读" size="small" />
                        </div>
                      </div>
                      <p className="news-excerpt">{news.excerpt}</p>
                    </div>
                  }
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    )
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Spin size="large" tip="加载中..." />
      </div>
    )
  }

  return (
    <StyledHome>
      <Helmet>
        <title>舟山天骏石油化工有限公司 - 专业0#柴油供应商</title>
        <meta name="description" content="天骏石化是第三代家族经营的石化公司，专业从事0#柴油的销售、储存和分销。提供批量配送、现场加油、应急供应等专业服务。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        {renderBanners()}
      </section>

      {/* Trust Bar */}
      <TrustBar data={companyStats} />

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">专业服务</h2>
            <p className="section-subtitle">
              专业的0#柴油供应服务，满足不同行业的燃油需求
            </p>
          </motion.div>
          
          {renderServices()}
        </div>
      </section>

      {/* Interactive Map */}
      <section className="map-section" ref={mapRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">全国服务网络</h2>
            <p className="section-subtitle">
              总部位于江西，分部遍布全国6省市，构建完整的燃油供应网络
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EChartsNetworkMap data={networkMap} />
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">客户证言</h2>
            <p className="section-subtitle">
              {companyStats?.partners?.count || '500+'}合作伙伴的信任之选
            </p>
          </motion.div>
          
          {renderTestimonials()}
        </div>
      </section>

      {/* News Teaser */}
      <section className="news-section" ref={newsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">最新动态</h2>
            <p className="section-subtitle">
              了解公司最新动态和行业资讯
            </p>
          </motion.div>
          
          {renderNews()}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            marginTop: '40px' 
          }}>
            <Button size="large" className="btn-secondary">
              <Link to="/news">查看更多新闻</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 实时价格显示 */}
      {fuelPrice && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 76, 151, 0.85)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: 1000
        }}>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>今日0#柴油价格</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            ¥{fuelPrice.currentPrice}/升
          </div>
          {fuelPrice.savings > 0 && (
            <div style={{ fontSize: '10px', color: '#52c41a' }}>
              比市场价优惠¥{fuelPrice.savings}
            </div>
          )}
        </div>
      )}
    </StyledHome>
  )
}

export default Home