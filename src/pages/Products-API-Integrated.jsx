import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Modal, Form, Input, Select, Tag, Statistic, Divider, Typography } from 'antd'
import { 
  ShoppingCartOutlined, 
  PhoneOutlined, 
  SafetyOutlined, 
  TruckOutlined, 
  SettingOutlined,
  ExperimentFilled,
  UserOutlined,
  RocketOutlined,
  DownloadOutlined,
  DollarOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { message } from 'antd'
import { useProductStore } from '../store'

const { Title, Paragraph } = Typography

const StyledProducts = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(0, 76, 151, 0.8) 0%, rgba(0, 30, 60, 0.8) 100%), 
                url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    min-height: 70vh;
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    
    .hero-content {
      z-index: 2;
      
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
      }
      
      .hero-features {
        display: flex;
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-2xl);
        flex-wrap: wrap;
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          
          .feature-icon {
            font-size: var(--font-size-lg);
            color: var(--color-secondary);
          }
        }
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

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 60px;
    color: #1e293b;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 18px;
    color: #666;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  .product-card {
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
      
      .product-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
      }
    }

    .product-content {
      padding: 24px;
      
      .product-category {
        color: #3b82f6;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      
      .product-name {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #1e293b;
      }
      
      .product-price {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 16px;
        
        .price-value {
          font-size: 28px;
          font-weight: 700;
          color: #3b82f6;
        }
        
        .price-unit {
          font-size: 16px;
          color: #64748b;
        }
      }
      
      .product-description {
        color: #64748b;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      
      .product-specs {
        margin-bottom: 20px;
        
        .spec-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
          
          .spec-label {
            color: #64748b;
          }
          
          .spec-value {
            color: #1e293b;
            font-weight: 500;
          }
        }
      }
      
      .product-actions {
        display: flex;
        gap: 12px;
        
        .btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          
          &:hover {
            background: linear-gradient(135deg, #1e40af, #1e3a8a);
          }
        }
        
        .btn-secondary {
          flex: 1;
          border-color: #3b82f6;
          color: #3b82f6;
          border-radius: 8px;
          font-weight: 600;
          
          &:hover {
            background: #3b82f6;
            color: white;
          }
        }
      }
    }
  }
`

const Products = () => {
  const [quoteModalVisible, setQuoteModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [form] = Form.useForm()
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: productsRef, inView: productsInView } = useInView({ threshold: 0.1 })

  // 使用产品Store
  const { products, categories, loading, fetchProducts, submitQuote } = useProductStore()

  useEffect(() => {
    const loadData = async () => {
      console.log('🚀 开始获取产品页面数据...')
      try {
        await fetchProducts()
        console.log('✅ 产品页面数据获取成功')
      } catch (error) {
        console.error('❌ 获取产品页面数据失败:', error)
      }
    }
    loadData()
  }, [fetchProducts])

  const handleQuoteSubmit = async (values) => {
    try {
      const quoteData = {
        ...values,
        product: selectedProduct ? selectedProduct.name : values.product,
        timestamp: new Date().toISOString()
      }
      
      const success = await submitQuote(quoteData)
      
      if (success) {
        message.success('询价请求提交成功！我们将在24小时内联系您。')
        setQuoteModalVisible(false)
        form.resetFields()
        setSelectedProduct(null)
      } else {
        message.error('提交失败，请稍后重试。')
      }
    } catch (error) {
      message.error('提交失败，请稍后重试。')
    }
  }

  const openQuoteModal = (product = null) => {
    setSelectedProduct(product)
    setQuoteModalVisible(true)
    if (product) {
      form.setFieldsValue({ product: product.name })
    }
  }

  return (
    <StyledProducts>
      <Helmet>
        <title>产品服务 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="提供高品质0#柴油、专业配送服务、技术咨询等全方位产品服务。专业车队配送，24小时应急响应，确保您的业务稳定运营。" />
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
            <h1 className="hero-title">专业燃油产品与服务</h1>
            <p className="hero-subtitle">
              高品质柴油产品，专业配送服务，为您的业务提供稳定可靠的燃油供应保障
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <SafetyOutlined className="feature-icon" />
                <span>国标品质</span>
              </div>
              <div className="feature-item">
                <TruckOutlined className="feature-icon" />
                <span>专业配送</span>
              </div>
              <div className="feature-item">
                <PhoneOutlined className="feature-icon" />
                <span>24h服务</span>
              </div>
            </div>
            <Button type="primary" size="large" className="btn-primary" onClick={() => openQuoteModal()}>
              <PhoneOutlined /> 立即询价
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section" ref={productsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">产品展示</h2>
          </motion.div>

          {loading ? (
            <div className="loading-container">
              加载产品数据中...
            </div>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={productsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="product-card" bodyStyle={{ padding: 0 }}>
                    <div 
                      className="product-image" 
                      style={{ 
                        backgroundImage: `url(${product.images?.[0] || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})` 
                      }}
                    >
                      {product.available && (
                        <div className="product-badge">现货充足</div>
                      )}
                    </div>
                    <div className="product-content">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">
                        <span className="price-value">¥{product.price?.toFixed(2)}</span>
                        <span className="price-unit">/{product.unit}</span>
                      </div>
                      <p className="product-description">{product.description}</p>
                      
                      {product.specifications && (
                        <div className="product-specs">
                          {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="spec-item">
                              <span className="spec-label">{key}:</span>
                              <span className="spec-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="product-actions">
                        <Button 
                          type="primary" 
                          className="btn-primary"
                          onClick={() => openQuoteModal(product)}
                        >
                          <ShoppingCartOutlined /> 立即询价
                        </Button>
                        <Button className="btn-secondary">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={productsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <Card className="product-card" bodyStyle={{ padding: 0 }}>
                  <div className="product-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)` }}>
                    <div className="product-badge">现货充足</div>
                  </div>
                  <div className="product-content">
                    <div className="product-category">燃油产品</div>
                    <h3 className="product-name">0#柴油</h3>
                    <div className="product-price">
                      <span className="price-value">¥6.85</span>
                      <span className="price-unit">/升</span>
                    </div>
                    <p className="product-description">高品质0#柴油，适用于各类柴油发动机</p>
                    <div className="product-specs">
                      <div className="spec-item">
                        <span className="spec-label">密度:</span>
                        <span className="spec-value">0.820-0.845 kg/L</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">硫含量:</span>
                        <span className="spec-value">≤ 10 mg/kg</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">十六烷值:</span>
                        <span className="spec-value">≥ 51</span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <Button type="primary" className="btn-primary" onClick={() => openQuoteModal({ name: '0#柴油', price: 6.85 })}>
                        <ShoppingCartOutlined /> 立即询价
                      </Button>
                      <Button className="btn-secondary">查看详情</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Quote Modal */}
      <Modal
        title="产品询价"
        open={quoteModalVisible}
        onCancel={() => {
          setQuoteModalVisible(false)
          form.resetFields()
          setSelectedProduct(null)
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleQuoteSubmit}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label="产品类型" name="product" rules={[{ required: true, message: '请选择产品类型' }]}>
                <Select placeholder="请选择产品类型">
                  <Select.Option value="0#柴油">0#柴油</Select.Option>
                  <Select.Option value="-10#柴油">-10#柴油</Select.Option>
                  <Select.Option value="添加剂包">添加剂包</Select.Option>
                  <Select.Option value="其他">其他</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="公司名称" name="company" rules={[{ required: true, message: '请输入公司名称' }]}>
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label="联系人" name="name" rules={[{ required: true, message: '请输入联系人姓名' }]}>
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label="预计用量（升）" name="quantity" rules={[{ required: true, message: '请输入预计用量' }]}>
                <Input placeholder="请输入预计月用量" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="偏好时间" name="preferredTime">
                <Select placeholder="请选择偏好配送时间">
                  <Select.Option value="morning">上午 (8:00-12:00)</Select.Option>
                  <Select.Option value="afternoon">下午 (13:00-17:00)</Select.Option>
                  <Select.Option value="evening">晚上 (18:00-22:00)</Select.Option>
                  <Select.Option value="anytime">任何时间</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="配送地址" name="address" rules={[{ required: true, message: '请输入配送地址' }]}>
            <Input.TextArea placeholder="请输入详细配送地址" rows={3} />
          </Form.Item>
          <Form.Item label="备注说明" name="remarks">
            <Input.TextArea placeholder="其他需求或说明" rows={2} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary" block size="large">
              <PhoneOutlined /> 提交询价请求
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledProducts>
  )
}

export default Products