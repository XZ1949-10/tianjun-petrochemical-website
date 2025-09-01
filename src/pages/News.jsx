import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Input, Select, Tag, Pagination, Button, App } from 'antd'
import { 
  SearchOutlined,
  CalendarOutlined,
  EyeOutlined,
  ShareAltOutlined,
  FilterOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
// API集成导入
import { useAPI } from '../hooks/useAPI'
import api from '../services/api'

const { Search } = Input
const { Option } = Select

const StyledNews = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), 
                url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    min-height: 70vh;
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    
    .hero-content {
      z-index: 2;
      text-align: center;
      
      .hero-title {
        font-size: var(--font-size-5xl);
        font-weight: 700;
        margin-bottom: var(--spacing-lg);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        
        @media (max-width: 768px) {
          font-size: var(--font-size-4xl);
        }
      }
      
      .hero-subtitle {
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-2xl);
        opacity: 0.9;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  
  .filter-section {
    background: white;
    padding: 0;
    border-bottom: 1px solid var(--color-light-gray);
    
    .container {
      padding: 0;
      margin: 0;
      max-width: none;
      width: 100%;
    }
    
    .filter-container {
      display: flex;
      gap: var(--spacing-3xl);
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      min-height: 120px;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      
      .filter-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--spacing-md);
        font-size: var(--font-size-lg);
        transform: scale(1.1);
        min-height: 44px;
        
        // 确保所有图标都在同一水平基线上
        .anticon {
          display: flex;
          align-items: center;
          height: 44px;
          line-height: 1;
          font-size: var(--font-size-lg);
        }
        
        .filter-label {
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          font-size: var(--font-size-lg);
          line-height: 44px;
          display: flex;
          align-items: center;
          height: 44px;
        }
        
        .ant-select {
          font-size: var(--font-size-base);
          margin-top: -4px;
          
          .ant-select-selector {
            height: 36px;
            padding: 0 var(--spacing-md);
            display: flex;
            align-items: center;
            
            .ant-select-selection-item {
              line-height: 1;
              font-size: var(--font-size-base);
              display: flex;
              align-items: center;
              height: 100%;
            }
          }
        }
        
        .ant-input-search {
          .ant-input {
            height: 44px;
            font-size: var(--font-size-base);
            padding: 0 var(--spacing-md);
            display: flex;
            align-items: center;
          }
          
          .ant-input-search-button {
            height: 44px;
            width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .anticon {
              height: auto;
              font-size: var(--font-size-base);
            }
          }
        }
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        
        .filter-item {
          justify-content: space-between;
        }
      }
    }
  }
  
  .news-grid {
    padding: var(--spacing-5xl) 0;
    
    .news-card {
      border-radius: var(--border-radius-xl);
      overflow: hidden;
      transition: all var(--transition-normal);
      background: white;
      box-shadow: var(--shadow-base);
      height: 520px;
      width: 100%;
      display: flex;
      flex-direction: column;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
      
      .news-image {
        height: 240px;
        background-size: cover;
        background-position: center;
        position: relative;
        
        .news-category {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
        }
        
        .news-date {
          position: absolute;
          bottom: var(--spacing-md);
          right: var(--spacing-md);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--border-radius-md);
          font-size: var(--font-size-sm);
        }
      }
      
      .news-content {
        padding: var(--spacing-lg);
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .news-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
          line-height: 1.4;
          height: 60px;
          min-height: 60px;
          max-height: 60px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          
          &:hover {
            color: var(--color-primary);
          }
        }
        
        .news-excerpt {
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 72px;
          min-height: 72px;
          max-height: 72px;
        }
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          min-height: 40px;
          
          .meta-left {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            color: var(--color-text-tertiary);
            font-size: var(--font-size-sm);
            height: 100%;
            
            .meta-item {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              height: 100%;
            }
          }
          
          .meta-right {
            display: flex;
            gap: var(--spacing-sm);
            align-items: center;
            height: 100%;
            
            .action-btn {
              background: none;
              border: 1px solid var(--color-light-gray);
              color: var(--color-text-secondary);
              border-radius: var(--border-radius-md);
              padding: var(--spacing-xs) var(--spacing-sm);
              transition: all var(--transition-normal);
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              line-height: 1;
              
              &:hover {
                background: var(--color-primary);
                border-color: var(--color-primary);
                color: white;
              }
            }
          }
        }
      }
    }
  }
  
  .featured-news {
    background: var(--color-bg-secondary);
    padding: var(--spacing-5xl) 0;
    
    .featured-card {
      background: white;
      border-radius: var(--border-radius-2xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      
      .featured-image {
        height: 300px;
        background-size: cover;
        background-position: center;
        position: relative;
        
        .featured-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: var(--spacing-2xl);
          color: white;
          
          .featured-category {
            margin-bottom: var(--spacing-sm);
          }
          
          .featured-title {
            font-size: var(--font-size-2xl);
            font-weight: 700;
            margin-bottom: var(--spacing-sm);
            line-height: 1.3;
          }
          
          .featured-excerpt {
            font-size: var(--font-size-base);
            opacity: 0.9;
            line-height: 1.6;
          }
        }
      }
    }
  }
  
  .newsletter-section {
    background: white;
    color: var(--color-text-primary);
    padding: var(--spacing-4xl) 0;
    text-align: center;
    border-top: 1px solid var(--color-light-gray);
    
    .newsletter-title {
      font-size: var(--font-size-3xl);
      font-weight: 700;
      margin-bottom: var(--spacing-lg);
      color: var(--color-text-primary);
    }
    
    .newsletter-subtitle {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-2xl);
      color: var(--color-text-secondary);
      opacity: 0.8;
    }
    
    .newsletter-form {
      max-width: 400px;
      margin: 0 auto;
      display: flex;
      gap: var(--spacing-md);
      
      @media (max-width: 768px) {
        flex-direction: column;
      }
      
      .ant-input {
        border-radius: var(--border-radius-lg);
        height: 50px;
        border: 2px solid var(--color-light-gray);
        font-size: var(--font-size-base);
        
        &:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
      
      .ant-btn {
        height: 50px;
        border-radius: var(--border-radius-lg);
        white-space: nowrap;
        background: var(--color-primary);
        border-color: var(--color-primary);
        font-weight: 600;
        font-size: var(--font-size-base);
        
        &:hover {
          background: var(--color-primary-dark, #1890ff);
          border-color: var(--color-primary-dark, #1890ff);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
        }
      }
    }
  }
`

const News = () => {
  const { message } = App.useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [newsListLoading, setNewsListLoading] = useState(false)
  const [subscriptionEmail, setSubscriptionEmail] = useState('')
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: newsRef, inView: newsInView } = useInView({ threshold: 0.1 })
  const navigate = useNavigate()

  // API数据获取 - 保持向后兼容的回退机制
  const { data: apiNewsData, loading: newsLoading } = useAPI(api.news.getNewsList, { 
    immediate: true,
    params: { page: currentPage, category: selectedCategory, search: searchTerm }
  })

  // 防抖动搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setNewsListLoading(true)
        // 重新加载数据
        api.news.getNewsList({ search: searchTerm, category: selectedCategory, page: 1 })
          .then(() => setCurrentPage(1))
          .finally(() => setNewsListLoading(false))
      }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchTerm])

  // 分类变化时重新加载
  useEffect(() => {
    setCurrentPage(1)
    setNewsListLoading(true)
    api.news.getNewsList({ category: selectedCategory, search: searchTerm, page: 1 })
      .finally(() => setNewsListLoading(false))
  }, [selectedCategory])

  const categories = [
    { value: 'all', label: '全部分类' },
    { value: 'company', label: '公司动态' },
    { value: 'industry', label: '行业资讯' },
    { value: 'safety', label: '安全管理' },
    { value: 'partnership', label: '合作伙伴' },
    { value: 'achievement', label: '企业荣誉' }
  ]

  // 智能回退机制：优先使用API数据，如果没有则使用静态数据
  const newsArticles = apiNewsData?.articles || [
    {
      id: 1,
      title: '天骏石化与多家大型物流企业签署年度供油协议',
      excerpt: '近日，天骏石化成功与区域内多家知名物流企业签署2024年度燃油供应协议，进一步巩固了在商用车燃油市场的领先地位。此次签约涉及年供油量超过50万升，合作金额预计突破300万元。',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-20',
      category: 'partnership',
      categoryLabel: '合作伙伴',
      views: 1205,
      featured: true
    },
    {
      id: 2,
      title: '公司获得ISO 14001环境管理体系认证续期',
      excerpt: '天骏石化顺利通过ISO 14001环境管理体系认证复审，这标志着公司在环境保护和可持续发展方面的持续努力得到了权威认可。公司将继续严格按照环境管理标准要求，推进绿色发展。',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-15',
      category: 'achievement',
      categoryLabel: '企业荣誉',
      views: 892
    },
    {
      id: 3,
      title: '应急演练：2小时响应承诺的坚实保障',
      excerpt: '为确保应急供油服务质量，公司定期组织应急演练。本次演练模拟了极端天气下的紧急供油需求，全程用时1小时38分钟，展现了公司快速响应能力和专业服务水平。',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-10',
      category: 'safety',
      categoryLabel: '安全管理',
      views: 756
    },
    {
      id: 4,
      title: '2024年春节期间服务安排通知',
      excerpt: '为确保春节期间客户的正常用油需求，天骏石化特制定春节服务安排。除夕至初三期间提供24小时应急服务，初四起恢复正常营业时间。',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-08',
      category: 'company',
      categoryLabel: '公司动态',
      views: 1105
    },
    {
      id: 5,
      title: '油价波动下的成本控制策略分析',
      excerpt: '面对国际油价频繁波动，天骏石化积极调整采购策略，通过精准的市场分析和灵活的库存管理，有效控制成本，为客户提供更具竞争力的价格。',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-05',
      category: 'industry',
      categoryLabel: '行业资讯',
      views: 634
    },
    {
      id: 6,
      title: '新增车载加油设备，提升现场服务能力',
      excerpt: '公司新购置3台先进的车载加油设备，进一步提升现场加油服务能力。新设备具备更高的安全性和作业效率，可同时为多台设备提供加油服务。',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-03',
      category: 'company',
      categoryLabel: '公司动态',
      views: 445
    }
  ]

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = newsArticles.find(article => article.featured)
  const regularNews = filteredNews.filter(article => !article.featured)

  // 事件处理函数
  const handleShare = async (article) => {
    try {
      // 记录分享统计
      await api.news.recordShare(article.id)
      
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.origin + `/news/${article.id}`
        })
      } else {
        // 备用分享方案
        await navigator.clipboard.writeText(window.location.origin + `/news/${article.id}`)
        message.success('链接已复制到剪切板')
      }
    } catch (error) {
      console.error('分享失败:', error)
      message.error('分享失败，请稍后重试')
    }
  }

  const handleNewsClick = async (article) => {
    try {
      // 记录阅读统计
      await api.news.recordView(article.id)
      navigate(`/news/${article.id}`)
    } catch (error) {
      // 即使统计失败，也要允许用户查看文章
      navigate(`/news/${article.id}`)
    }
  }

  const handleSubscribeNewsletter = async () => {
    if (!subscriptionEmail) {
      message.warning('请输入邮箱地址')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(subscriptionEmail)) {
      message.error('请输入正确的邮箱地址')
      return
    }
    
    try {
      await api.news.subscribeNewsletter({ email: subscriptionEmail })
      message.success('订阅成功！您将定期收到我们的行业动态。')
      setSubscriptionEmail('')
    } catch (error) {
      message.error('订阅失败，请稍后重试')
    }
  }

  return (
    <StyledNews>
      <Helmet>
        <title>新闻与见解 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="了解天骏石化最新动态、行业资讯、安全管理和合作伙伴信息。获取石化行业专业见解和市场分析。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">新闻与见解</h1>
            <p className="hero-subtitle">
              了解天骏石化最新动态，获取行业专业见解和市场分析
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-item">
              <FilterOutlined />
              <span className="filter-label">筛选：</span>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: 200 }}
              >
                {categories.map(cat => (
                  <Option key={cat.value} value={cat.value}>{cat.label}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item" style={{ flex: 1, maxWidth: 400 }}>
              <SearchOutlined />
              <Search
                placeholder="搜索新闻标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredArticle && (
        <section className="featured-news">
          <div className="container">
            <h2 className="section-title">重点关注</h2>
            <Card className="featured-card">
              <div 
                className="featured-image"
                style={{ backgroundImage: `url(${featuredArticle.image})` }}
              >
                <div className="featured-overlay">
                  <Tag color="red" className="featured-category">
                    {featuredArticle.categoryLabel}
                  </Tag>
                  <h3 className="featured-title">{featuredArticle.title}</h3>
                  <p className="featured-excerpt">{featuredArticle.excerpt}</p>
                  <Button 
                    type="primary" 
                    className="btn-warning"
                    style={{ marginTop: 'var(--spacing-md)' }}
                  >
                    <Link to={`/news/${featuredArticle.id}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                      阅读全文 <ArrowRightOutlined />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="news-grid" ref={newsRef}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-4xl)' }}>
            <h2 style={{ 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: '700', 
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>最新动态</h2>
            <div style={{
              width: '60px',
              height: '4px',
              background: 'var(--color-primary)',
              margin: '0 auto',
              borderRadius: '2px'
            }}></div>
          </div>
          <Row gutter={[24, 32]}>
            {regularNews.map((article, index) => (
              <Col xs={24} md={12} lg={8} key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={newsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="news-card">
                    <div 
                      className="news-image"
                      style={{ backgroundImage: `url(${article.image})` }}
                    >
                      <Tag color="blue" className="news-category">
                        {article.categoryLabel}
                      </Tag>
                      <div className="news-date">
                        <CalendarOutlined /> {article.date}
                      </div>
                    </div>
                    <div className="news-content">
                      <div onClick={() => handleNewsClick(article)} style={{ cursor: 'pointer' }}>
                        <h3 className="news-title">{article.title}</h3>
                      </div>
                      <p className="news-excerpt">{article.excerpt}</p>
                      <div className="news-meta">
                        <div className="meta-left">
                          <div className="meta-item">
                            <EyeOutlined />
                            <span>{article.views}</span>
                          </div>
                        </div>
                        <div className="meta-right">
                          <button 
                            className="action-btn"
                            onClick={() => handleShare(article)}
                            title="分享文章"
                          >
                            <ShareAltOutlined />
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleNewsClick(article)}
                            title="阅读全文"
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                              阅读全文 <ArrowRightOutlined />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <Pagination
              current={currentPage}
              total={filteredNews.length}
              pageSize={6}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="container">
          <h2 className="newsletter-title">订阅我们的周刊</h2>
          <p className="newsletter-subtitle">
            获取最新的柴油价格信息和行业动态
          </p>
          <div className="newsletter-form">
            <Input 
              placeholder="请输入您的邮箱地址"
              size="large"
              value={subscriptionEmail}
              onChange={(e) => setSubscriptionEmail(e.target.value)}
              onPressEnter={handleSubscribeNewsletter}
            />
            <Button 
              type="primary" 
              className="btn-warning" 
              size="large"
              onClick={handleSubscribeNewsletter}
              loading={newsLoading}
            >
              订阅
            </Button>
          </div>
        </div>
      </section>
    </StyledNews>
  )
}

export default News