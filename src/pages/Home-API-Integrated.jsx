import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Carousel, Statistic, List, Tag, Avatar, Rate, Badge } from 'antd'
import { 
  TrophyOutlined, 
  SafetyOutlined, 
  PhoneOutlined,
  RocketOutlined,
  BarChartOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  CrownFilled,
  SafetyCertificateFilled,
  ToolOutlined,
  ExperimentOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import EChartsNetworkMap from '../components/Common/EChartsNetworkMap'
import { TrustBar } from '../components/Trust'
// 导入API服务和Hooks
import { useAPI } from '../hooks/useAPI'
import { useHomeStore } from '../store'
import api from '../services/api'

// StyledHome 样式组件保持不变...
const StyledHome = styled.div`
  // ... 保持原有样式 ...
`

const Home = () => {
  const [dieselPrice, setDieselPrice] = useState(6.85)
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.1 })
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.1 })
  const { ref: newsRef, inView: newsInView } = useInView({ threshold: 0.1 })

  // 使用Zustand store
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
    fetchLatestNews
  } = useHomeStore()

  // 使用useAPI hooks获取数据
  const { data: bannersData, loading: bannersLoading } = useAPI(
    api.home.getBanners,
    { immediate: true }
  )

  const { data: statsData, loading: statsLoading } = useAPI(
    api.home.getCompanyStats,
    { immediate: true }
  )

  const { data: servicesData, loading: servicesLoading } = useAPI(
    api.home.getServices,
    { immediate: true }
  )

  const { data: networkData, loading: networkLoading } = useAPI(
    api.home.getNetworkMap,
    { immediate: true }
  )

  const { data: testimonialsData, loading: testimonialsLoading } = useAPI(
    api.home.getTestimonials,
    { immediate: true }
  )

  const { data: newsData, loading: newsLoading } = useAPI(
    () => api.home.getLatestNews(3),
    { immediate: true }
  )

  useEffect(() => {
    // 模拟柴油价格波动
    const interval = setInterval(() => {
      setDieselPrice(prev => prev + (Math.random() - 0.5) * 0.1)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  // 使用API数据或回退到默认数据
  const heroSlides = bannersData || [
    {
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: '可靠的0#柴油供应自1990年',
      subtitle: '第三代家族企业 • 当日配送 • 持证危化品经营商'
    }
  ]

  const servicesDataToRender = servicesData || [
    {
      icon: 'TruckOutlined',
      title: '批量配送',
      description: '专业的柴油批量配送服务，最小订单500升，覆盖整个区域。',
      link: '/products#delivery'
    },
    {
      icon: 'RocketOutlined',
      title: '现场加油',
      description: '24/7现场加油车服务，为工地、物流中心、车队运营提供便利。',
      link: '/products#onsite'
    },
    {
      icon: 'SafetyOutlined',
      title: '应急供应',
      description: '2小时应急响应服务，确保您的运营永不因燃料短缺而停止。',
      link: '/products#emergency'
    }
  ]

  const testimonialsDataToRender = testimonialsData || [
    {
      content: '天骏石化的配送服务非常及时可靠，他们的专业团队确保我们的施工现场从不缺油。24小时应急服务更是解决了我们的后顾之忧。',
      author: '张总',
      company: '建设集团',
      rating: 5,
      avatar: 'Z'
    },
    {
      content: '作为物流公司，燃油质量和供应稳定性对我们至关重要。天骏石化的0#柴油质量稳定，价格透明，是我们长期合作的可靠伙伴。',
      author: '李经理',
      company: '运输有限公司',
      rating: 5,
      avatar: 'L'
    },
    {
      content: '农业机械对燃油要求很高，天骏石化提供的柴油不仅质量好，而且他们的技术人员还会定期回访，提供专业的燃油管理建议。',
      author: '王农户',
      company: '农业合作社',
      rating: 5,
      avatar: 'W'
    }
  ]

  const newsDataToRender = newsData || [
    {
      id: 1,
      title: '天骏石化与多家大型物流企业签署年度供油协议',
      excerpt: '近日，天骏石化成功与区域内多家知名物流企业签署2024年度燃油供应协议，进一步巩固了在商用车燃油市场的领先地位...',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-20',
      category: '业务拓展'
    },
    {
      id: 2,
      title: '公司获得ISO 14001环境管理体系认证续期',
      excerpt: '天骏石化顺利通过ISO 14001环境管理体系认证复审，这标志着公司在环境保护和可持续发展方面的持续努力得到了权威认可...',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-15',
      category: '企业资质'
    },
    {
      id: 3,
      title: '应急演练：2小时响应承诺的坚实保障',
      excerpt: '为确保应急供油服务质量，公司定期组织应急演练。本次演练模拟了极端天气下的紧急供油需求，全程用时1小时38分钟...',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-10',
      category: '安全管理'
    }
  ]

  // 图标映射函数
  const getIconComponent = (iconName) => {
    const iconMap = {
      'TruckOutlined': <TruckOutlined />,
      'RocketOutlined': <RocketOutlined />,
      'SafetyOutlined': <SafetyOutlined />
    }
    return iconMap[iconName] || <TruckOutlined />
  }

  return (
    <StyledHome>
      <Helmet>
        <title>舟山天骏石油化工有限公司 - 专业0#柴油供应商</title>
        <meta name="description" content="天骏石化是第三代家族经营的石化公司，专业从事0#柴油的销售、储存和分销。提供批量配送、现场加油、应急供应等专业服务。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        {bannersLoading ? (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>Loading...</div>
          </div>
        ) : (
          <Carousel autoplay effect="fade" dots={false} autoplaySpeed={8000}>
            {heroSlides.map((slide, index) => (
              <div key={index}>
                <div 
                  className="hero-slide"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <h1 className="hero-title">{slide.title}</h1>
                    <p className="hero-subtitle">{slide.subtitle}</p>
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
                        立即询价
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
        )}
      </section>

      {/* Trust Bar - 组件化重构 */}
      <TrustBar />

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
          
          {servicesLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>Loading services...</div>
          ) : (
            <Row gutter={[32, 32]}>
              {servicesDataToRender.map((service, index) => (
                <Col xs={24} md={8} key={index}>
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
                            <div className="service-icon">{getIconComponent(service.icon)}</div>
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
                                  value="24" 
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
          )}
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
            <EChartsNetworkMap data={networkData} />
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
              500+合作伙伴的信任之选
            </p>
          </motion.div>
          
          {testimonialsLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>Loading testimonials...</div>
          ) : (
            <Row gutter={[24, 24]} align="stretch">
              {testimonialsDataToRender.map((testimonial, index) => (
                <Col xs={24} md={8} key={index} style={{ display: 'flex' }}>
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
                             <Tag color="blue">VIP客户</Tag>
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
                                 <Rate disabled defaultValue={5} style={{ fontSize: '14px' }} />
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
          )}
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
          
          {newsLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>Loading news...</div>
          ) : (
            <Row gutter={[24, 24]} align="stretch">
              {newsDataToRender.map((news, index) => (
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
                                <Statistic value={news.views || Math.floor(Math.random() * 1000) + 500} suffix="次阅读" size="small" />
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
          )}
          
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
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{dieselPrice.toFixed(2)}/升</div>
      </div>
    </StyledHome>
  )
}

export default Home