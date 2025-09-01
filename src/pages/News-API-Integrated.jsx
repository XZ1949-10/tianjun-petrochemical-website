import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Tag, Input, Select, Pagination, Empty } from 'antd'
import { 
  CalendarOutlined, 
  EyeOutlined, 
  LikeOutlined, 
  CommentOutlined,
  SearchOutlined,
  FilterOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useNewsStore } from '../store'

const { Search } = Input
const { Option } = Select

const StyledNews = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%), 
                url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    min-height: 50vh;
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
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }

  .section {
    padding: 80px 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
    color: #666;
  }

  .filters-section {
    background: white;
    padding: 40px 0;
    border-bottom: 1px solid #e2e8f0;
    
    .filters-container {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
      
      .filter-item {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .filter-label {
          font-weight: 500;
          color: #1e293b;
          white-space: nowrap;
        }
      }
      
      .search-box {
        flex: 1;
        max-width: 400px;
        
        .ant-input-affix-wrapper {
          border-radius: 8px;
        }
      }
    }
  }

  .news-section {
    background: #f8fafc;
    
    .featured-news {
      margin-bottom: 60px;
      
      .featured-card {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        
        .featured-image {
          height: 300px;
          background-size: cover;
          background-position: center;
          position: relative;
          
          .featured-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            background: #dc2626;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }
        }
        
        .featured-content {
          padding: 40px;
          
          .featured-meta {
            display: flex;
            gap: 20px;
            align-items: center;
            margin-bottom: 20px;
            color: #64748b;
            
            .meta-item {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 14px;
            }
          }
          
          .featured-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1e293b;
            line-height: 1.3;
          }
          
          .featured-excerpt {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 24px;
            font-size: 16px;
          }
          
          .featured-tags {
            margin-bottom: 24px;
          }
          
          .featured-action {
            .btn-primary {
              background: linear-gradient(135deg, #3b82f6, #1e40af);
              border: none;
              border-radius: 8px;
              font-weight: 600;
              
              &:hover {
                background: linear-gradient(135deg, #1e40af, #1e3a8a);
              }
            }
          }
        }
      }
    }
    
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }
    
    .news-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      }
      
      .news-image {
        height: 200px;
        background-size: cover;
        background-position: center;
        position: relative;
        
        .news-category {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
      }
      
      .news-content {
        padding: 24px;
        
        .news-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1e293b;
          line-height: 1.4;
          
          a {
            color: inherit;
            text-decoration: none;
            
            &:hover {
              color: #3b82f6;
            }
          }
        }
        
        .news-excerpt {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 16px;
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          
          .meta-left {
            display: flex;
            gap: 16px;
            color: #64748b;
            font-size: 12px;
            
            .meta-item {
              display: flex;
              align-items: center;
              gap: 4px;
            }
          }
          
          .meta-date {
            color: #64748b;
            font-size: 12px;
          }
        }
        
        .news-tags {
          margin-bottom: 16px;
          
          .ant-tag {
            margin-bottom: 4px;
          }
        }
        
        .news-action {
          .read-more {
            color: #3b82f6;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            
            &:hover {
              color: #1e40af;
            }
          }
        }
      }
    }
  }

  .pagination-section {
    text-align: center;
    padding: 40px 0;
    background: #f8fafc;
    
    .ant-pagination {
      .ant-pagination-item-active {
        border-color: #3b82f6;
        
        a {
          color: #3b82f6;
        }
      }
      
      .ant-pagination-item:hover {
        border-color: #3b82f6;
        
        a {
          color: #3b82f6;
        }
      }
    }
  }
`

const News = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(6)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: newsRef, inView: newsInView } = useInView({ threshold: 0.1 })

  // 使用新闻Store
  const { newsList, categories, loading, fetchNews } = useNewsStore()

  useEffect(() => {
    const loadData = async () => {
      console.log('🚀 开始获取新闻页面数据...')
      try {
        await fetchNews()
        console.log('✅ 新闻页面数据获取成功')
      } catch (error) {
        console.error('❌ 获取新闻页面数据失败:', error)
      }
    }
    loadData()
  }, [fetchNews])

  // 过滤新闻
  const filteredNews = newsList.filter(news => {
    const matchesSearch = !searchTerm || 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || news.categoryId === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // 分页
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedNews = filteredNews.slice(startIndex, endIndex)
  
  // 获取特色新闻（第一条featured新闻）
  const featuredNews = newsList.find(news => news.featured)

  // 默认分类数据
  const defaultCategories = [
    { id: 'all', name: '全部' },
    { id: 'business', name: '业务拓展' },
    { id: 'certification', name: '企业资质' },
    { id: 'safety', name: '安全管理' },
    { id: 'honor', name: '企业荣誉' },
    { id: 'technology', name: '技术创新' }
  ]

  const categoriesToRender = categories.length > 0 ? categories : defaultCategories

  return (
    <StyledNews>
      <Helmet>
        <title>新闻中心 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="了解天骏石化最新动态、行业资讯、企业新闻和技术创新。关注我们的发展历程，见证企业成长。" />
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
            <h1 className="hero-title">新闻中心</h1>
            <p className="hero-subtitle">
              了解天骏石化最新动态，关注行业发展趋势，见证企业成长历程
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            <div className="filter-item">
              <FilterOutlined />
              <span className="filter-label">分类:</span>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                style={{ width: 150 }}
              >
                {categoriesToRender.map(category => (
                  <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </div>
            
            <div className="filter-item search-box">
              <Search
                placeholder="搜索新闻标题或内容..."
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={setSearchTerm}
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section news-section" ref={newsRef}>
        <div className="container">
          {loading ? (
            <div className="loading-container">
              加载新闻数据中...
            </div>
          ) : (
            <>
              {/* Featured News */}
              {featuredNews && (
                <motion.div
                  className="featured-news"
                  initial={{ opacity: 0, y: 30 }}
                  animate={newsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="featured-card" bodyStyle={{ padding: 0 }}>
                    <Row>
                      <Col xs={24} lg={12}>
                        <div 
                          className="featured-image"
                          style={{ backgroundImage: `url(${featuredNews.image})` }}
                        >
                          <div className="featured-badge">精选</div>
                        </div>
                      </Col>
                      <Col xs={24} lg={12}>
                        <div className="featured-content">
                          <div className="featured-meta">
                            <div className="meta-item">
                              <CalendarOutlined />
                              <span>{featuredNews.date}</span>
                            </div>
                            <div className="meta-item">
                              <EyeOutlined />
                              <span>{featuredNews.views}</span>
                            </div>
                            <div className="meta-item">
                              <LikeOutlined />
                              <span>{featuredNews.likes}</span>
                            </div>
                          </div>
                          <h2 className="featured-title">{featuredNews.title}</h2>
                          <p className="featured-excerpt">{featuredNews.excerpt}</p>
                          <div className="featured-tags">
                            <Tag color="blue">{featuredNews.category}</Tag>
                            {featuredNews.tags?.map(tag => (
                              <Tag key={tag}>{tag}</Tag>
                            ))}
                          </div>
                          <div className="featured-action">
                            <Button type="primary" size="large" className="btn-primary">
                              <Link to={`/news/${featuredNews.id}`}>
                                阅读全文 <ArrowRightOutlined />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>
              )}

              {/* News Grid */}
              {paginatedNews.length > 0 ? (
                <div className="news-grid">
                  {paginatedNews.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={newsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="news-card" bodyStyle={{ padding: 0 }}>
                        <div 
                          className="news-image"
                          style={{ backgroundImage: `url(${news.image})` }}
                        >
                          <div className="news-category">{news.category}</div>
                        </div>
                        <div className="news-content">
                          <h3 className="news-title">
                            <Link to={`/news/${news.id}`}>{news.title}</Link>
                          </h3>
                          <p className="news-excerpt">{news.excerpt}</p>
                          <div className="news-meta">
                            <div className="meta-left">
                              <div className="meta-item">
                                <EyeOutlined />
                                <span>{news.views}</span>
                              </div>
                              <div className="meta-item">
                                <LikeOutlined />
                                <span>{news.likes}</span>
                              </div>
                              <div className="meta-item">
                                <CommentOutlined />
                                <span>{news.comments}</span>
                              </div>
                            </div>
                            <div className="meta-date">{news.date}</div>
                          </div>
                          <div className="news-tags">
                            {news.tags?.slice(0, 3).map(tag => (
                              <Tag key={tag} size="small">{tag}</Tag>
                            ))}
                          </div>
                          <div className="news-action">
                            <Link to={`/news/${news.id}`} className="read-more">
                              阅读更多 <ArrowRightOutlined />
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Empty 
                  description="暂无相关新闻"
                  style={{ margin: '60px 0' }}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Pagination */}
      {!loading && filteredNews.length > pageSize && (
        <section className="pagination-section">
          <Pagination
            current={currentPage}
            total={filteredNews.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
            showSizeChanger={false}
          />
        </section>
      )}
    </StyledNews>
  )
}

export default News