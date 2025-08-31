import React, { useState } from 'react'
import { Row, Col, Card, Button, Table, Tag, Tabs, Modal, Form, Input, Select, message } from 'antd'
import { 
  DownloadOutlined,
  TruckOutlined,
  RocketOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

// Removed deprecated TabPane destructuring

const StyledProducts = styled.div`
  .hero-section {
    background: transparent url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
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
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .btn-primary {
        display: block;
        margin: 0 auto;
        width: fit-content;
      }
    }
  }
  
  .product-card {
    background: white;
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-base);
    transition: all var(--transition-normal);
    height: 100%;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }
    
    .product-header {
      display: flex;
      align-items: center;
      margin-bottom: var(--spacing-lg);
      
      .product-icon {
        font-size: 3rem;
        color: var(--color-primary);
        margin-right: var(--spacing-md);
        padding: var(--spacing-md);
        background: rgba(0, 76, 151, 0.1);
        border-radius: var(--border-radius-lg);
      }
      
      .product-info {
        .product-title {
          font-size: var(--font-size-xl);
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-xs);
        }
        
        .product-standard {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }
      }
    }
  }
  
  .service-section {
    background: #ffffff;
    padding: var(--spacing-5xl) 0;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(0, 76, 151, 0.03) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(0, 76, 151, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  }
  
  .service-header {
    text-align: center;
    margin-bottom: var(--spacing-4xl);
    position: relative;
    z-index: 2;
    
    .service-badge {
      display: inline-block;
      background: linear-gradient(135deg, rgba(0, 76, 151, 0.1) 0%, rgba(0, 76, 151, 0.05) 100%);
      color: var(--color-primary);
      padding: 8px 24px;
      border-radius: 50px;
      font-size: var(--font-size-sm);
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: var(--spacing-lg);
      border: 1px solid rgba(0, 76, 151, 0.1);
      text-transform: uppercase;
    }
    
    .service-main-title {
      font-size: var(--font-size-4xl);
      font-weight: 700;
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      
      @media (max-width: 768px) {
        font-size: var(--font-size-3xl);
      }
    }
    
    .service-main-subtitle {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
  
  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-2xl);
    position: relative;
    z-index: 2;
  }
  
  .modern-service-card {
    background: #ffffff;
    border-radius: 24px;
    padding: var(--spacing-2xl);
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    height: auto;
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    &:hover {
      box-shadow: 0 20px 40px rgba(0, 76, 151, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
      border-color: rgba(0, 76, 151, 0.1);
      
      .card-glow-effect {
        opacity: 1;
      }
      
      .service-icon {
        transform: scale(1.1) rotate(5deg);
      }
      
      .service-number {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  
  .card-glow-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 76, 151, 0.02) 0%, rgba(0, 76, 151, 0.01) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 24px;
  }
  
  .service-icon-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    position: relative;
    z-index: 3;
  }
  
  .service-icon-bg {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &.service-1 {
      background: linear-gradient(135deg, rgba(0, 76, 151, 0.1) 0%, rgba(0, 76, 151, 0.05) 100%);
    }
    
    &.service-2 {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
    }
    
    &.service-3 {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
    }
    
    &.service-4 {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
    }
    
    &.service-5 {
      background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%);
    }
    
    &.service-6 {
      background: linear-gradient(135deg, rgba(75, 0, 130, 0.1) 0%, rgba(75, 0, 130, 0.05) 100%);
    }
  }
  
  .service-icon {
    font-size: 2.5rem;
    color: var(--color-primary);
    transition: all 0.3s ease;
  }
  
  .service-content {
    text-align: center;
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex: 1;
  }
  
  .service-number {
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: var(--font-size-4xl);
    font-weight: 800;
    background: linear-gradient(135deg, rgba(0, 76, 151, 0.1) 0%, rgba(0, 76, 151, 0.05) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }
  
  .service-card-title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    line-height: 1.3;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .service-divider {
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, var(--color-primary) 0%, rgba(0, 76, 151, 0.6) 100%);
    margin: var(--spacing-md) auto;
    border-radius: 2px;
  }
  
  .service-description {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-base);
  }
  
  .service-features {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .feature-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: var(--spacing-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      text-align: left;
      line-height: 1.4;
      width: 100%;
      max-width: 200px;
      
      .feature-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-sm);
        flex-shrink: 0;
        
        .anticon {
          color: var(--color-success);
          font-size: 12px;
          line-height: 1;
        }
      }
      
      span {
        display: inline-block;
        line-height: 1.4;
        flex: 1;
      }
    }
  }
  
  .card-border-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0, 76, 151, 0.1) 0%, transparent 50%, rgba(0, 76, 151, 0.1) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: exclude;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .modern-service-card:hover .card-border-gradient {
    opacity: 1;
  }
  
  /* 响应式设计 */
  @media (max-width: 1024px) {
    .service-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-xl);
    }
    
    .service-header {
      .service-main-title {
        font-size: var(--font-size-3xl);
      }
      
      .service-main-subtitle {
        font-size: var(--font-size-base);
      }
    }
    
    .modern-service-card {
      min-height: 350px;
      padding: var(--spacing-xl);
    }
  }
  
  @media (max-width: 768px) {
    .service-section {
      padding: var(--spacing-4xl) 0;
    }
    
    .service-header {
      margin-bottom: var(--spacing-3xl);
      
      .service-badge {
        font-size: var(--font-size-xs);
        padding: 6px 18px;
      }
      
      .service-main-title {
        font-size: var(--font-size-2xl);
        margin-bottom: var(--spacing-sm);
      }
      
      .service-main-subtitle {
        font-size: var(--font-size-sm);
        padding: 0 var(--spacing-md);
      }
    }
    
    .service-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
    
    .modern-service-card {
      min-height: 320px;
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      .service-icon-bg {
        width: 60px;
        height: 60px;
        border-radius: 16px;
      }
      
      .service-icon {
        font-size: 2rem;
      }
      
      .service-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex: 1;
      }
      
      .service-card-title {
        font-size: var(--font-size-lg);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      
      .service-number {
        font-size: var(--font-size-3xl);
        top: -5px;
        right: 15px;
      }
    }
  }
  
  .pricing-card {
    background: white;
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-lg);
    text-align: center;
    
    .price-current {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
      
      .price-value {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        color: var(--color-primary);
      }
      
      .price-unit {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
      }
    }
    
    .price-comparison {
      background: var(--color-bg-secondary);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      
      .comparison-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
        
        .comparison-label {
          color: var(--color-text-secondary);
        }
        
        .comparison-value {
          font-weight: 600;
          
          &.benchmark { color: var(--color-text-secondary); }
          &.our-price { color: var(--color-success); }
        }
      }
    }
  }
`

const Products = () => {
  const [quoteModalVisible, setQuoteModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })
  const { ref: pricingRef, inView: pricingInView } = useInView({ threshold: 0.1 })

  const dieselSpecs = [
    { property: '密度 (20℃)', value: '820-845', unit: 'kg/m³', key: 1 },
    { property: '十六烷值', value: '≥51', unit: '-', key: 2 },
    { property: '硫含量', value: '≤10', unit: 'mg/kg', key: 3 },
    { property: '闪点（闭口）', value: '≥55', unit: '℃', key: 4 },
    { property: '冷滤点', value: '≤4', unit: '℃', key: 5 },
    { property: '运动粘度（20℃）', value: '3.0-8.0', unit: 'mm²/s', key: 6 }
  ]

  const services = [
    {
      icon: <TruckOutlined />,
      title: '批量配送',
      desc: '最小订单500升，覆盖整个舟山地区',
      features: ['专业危化品运输', '二十四小时送达', '全程GPS跟踪', '专人送货上门']
    },
    {
      icon: <RocketOutlined />,
      title: '现场加油',
      desc: '24/7现场加油车服务',
      features: ['工地现场加油', '车队集中加油', '港口船舶加油', '应急现场服务']
    },
    {
      icon: <SafetyOutlined />,
      title: '应急供应',
      desc: '2小时应急响应承诺',
      features: ['二十四小时热线', '两小时响应时间', '紧急调度系统', '优先配送保障']
    },
    {
      icon: <BarChartOutlined />,
      title: '燃油管理系统',
      desc: 'RFID + SaaS管理平台',
      features: ['RFID智能识别', '用量实时监控', '库存预警提醒', '数据报表分析']
    },
    {
      icon: <ClockCircleOutlined />,
      title: '定时配送',
      desc: '灵活的定时配送服务',
      features: ['预约配送时间', '定期配送计划', '智能路线规划', '配送状态通知']
    },
    {
      icon: <ToolOutlined />,
      title: '设备维护',
      desc: '专业的设备维护保养服务',
      features: ['储油设备检测', '管道清洗维护', '安全设备检查', '技术咨询服务']
    }
  ]

  const downloadFiles = [
    { title: '安全数据表 (SDS)', desc: '0#柴油完整安全数据表', size: '2.1 MB' },
    { title: '质量分析证书 (COA)', desc: '最新批次产品质量检验报告', size: '1.8 MB' },
    { title: '技术数据表 (TDS)', desc: '详细的技术参数和应用指导', size: '1.5 MB' }
  ]

  const handleQuoteSubmit = (values) => {
    message.success('询价请求已提交，我们将在2小时内联系您！')
    setQuoteModalVisible(false)
    form.resetFields()
  }

  return (
    <StyledProducts>
      <Helmet>
        <title>产品与服务 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="天骏石化提供优质0#柴油(GB 19147)、添加剂包装、润滑油等产品，以及批量配送、现场加油、应急供应等专业服务。" />
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
            <h1 className="hero-title">Everything You Need for 0# Diesel</h1>
            <p className="hero-subtitle">
              优质的0#柴油产品、专业的添加剂包装、完善的润滑油产品线<br />
              以及覆盖全流程的专业服务体系
            </p>
            <Button 
              type="primary" 
              size="large" 
              className="btn-primary"
              onClick={() => setQuoteModalVisible(true)}
            >
              立即询价
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section style={{ padding: 'var(--spacing-5xl) 0' }}>
        <div className="container">
          <Tabs 
            defaultActiveKey="diesel" 
            size="large" 
            centered
            items={[
              {
                label: '0# 柴油 (GB 19147)',
                key: 'diesel',
                children: (
                  <Row gutter={[32, 32]} style={{ marginTop: '2rem' }}>
                    <Col xs={24} lg={12}>
                      <Card className="product-card">
                        <div className="product-header">
                          <div className="product-icon">
                            <ThunderboltOutlined />
                          </div>
                          <div className="product-info">
                            <h3 className="product-title">0# 柴油</h3>
                            <p className="product-standard">符合 GB 19147-2016 标准</p>
                          </div>
                        </div>
                        <Table 
                          dataSource={dieselSpecs}
                          columns={[
                            { title: '技术指标', dataIndex: 'property' },
                            { title: '标准值', dataIndex: 'value' },
                            { title: '单位', dataIndex: 'unit' }
                          ]}
                          pagination={false}
                          size="small"
                          style={{ marginBottom: '1.5rem' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <Button type="primary" className="btn-primary" block>
                            立即订购
                          </Button>
                          <Button className="btn-secondary" block>
                            技术咨询
                          </Button>
                        </div>
                      </Card>
                    </Col>
                    
                    <Col xs={24} lg={12}>
                      <Card className="product-card">
                        <div className="product-header">
                          <div className="product-icon">
                            <ToolOutlined />
                          </div>
                          <div className="product-info">
                            <h3 className="product-title">添加剂包装</h3>
                            <p className="product-standard">提升燃油性能的专业添加剂</p>
                          </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{ padding: '1rem', border: '1px solid var(--color-light-gray)', borderRadius: 'var(--border-radius-md)', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <strong>冬季防凝剂</strong>
                              <Tag color="green">-20℃</Tag>
                            </div>
                            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>防止低温结蜡，确保冬季正常使用</p>
                          </div>
                          <div style={{ padding: '1rem', border: '1px solid var(--color-light-gray)', borderRadius: 'var(--border-radius-md)', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <strong>喷油嘴清洁剂</strong>
                              <Tag color="green">+5%</Tag>
                            </div>
                            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>清洁燃油系统，提高燃烧效率</p>
                          </div>
                        </div>
                        <Button type="primary" className="btn-warning" block>
                          咨询添加剂方案
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                )
              },
              {
                label: '润滑油 & DEF',
                key: 'lubricants',
                children: (
                  <Row gutter={[32, 32]} style={{ marginTop: '2rem' }}>
                    <Col xs={24} md={12}>
                      <Card className="product-card">
                        <div className="product-header">
                          <div className="product-icon">
                            <SafetyOutlined />
                          </div>
                          <div className="product-info">
                            <h3 className="product-title">发动机润滑油</h3>
                            <p className="product-standard">多种粘度等级可选</p>
                          </div>
                        </div>
                        <ul style={{ color: 'var(--color-text-secondary)' }}>
                          <li>15W-40 CI-4 柴油机油</li>
                          <li>10W-30 CJ-4 重负荷柴油机油</li>
                          <li>5W-30 合成柴油机油</li>
                          <li>液压油、齿轮油等</li>
                        </ul>
                      </Card>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Card className="product-card">
                        <div className="product-header">
                          <div className="product-icon">
                            <ClockCircleOutlined />
                          </div>
                          <div className="product-info">
                            <h3 className="product-title">柴油尾气处理液 (DEF)</h3>
                            <p className="product-standard">AdBlue 标准尿素溶液</p>
                          </div>
                        </div>
                        <ul style={{ color: 'var(--color-text-secondary)' }}>
                          <li>32.5% 高纯度尿素溶液</li>
                          <li>符合 ISO 22241 标准</li>
                          <li>降低 NOx 排放 90%</li>
                          <li>10L、20L、1000L 包装可选</li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                )
              }
            ]}
          />
        </div>
      </section>

      {/* Service Modules */}
      <section className="service-section" ref={servicesRef}>
        <div className="container">
          <motion.div
            className="service-header"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="service-badge">服务体系</div>
            <h2 className="service-main-title">专业服务模块</h2>
            <p className="service-main-subtitle">完整的燃油供应服务体系，满足不同场景需求，提供全方位专业解决方案</p>
          </motion.div>

          <div className="service-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="modern-service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-glow-effect"></div>
                <div className="service-icon-wrapper">
                  <div className={`service-icon-bg service-${index + 1}`}>
                    <div className="service-icon">{service.icon}</div>
                  </div>
                </div>
                <div className="service-content">
                  <div className="service-number">0{index + 1}</div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <div className="service-divider"></div>
                  <p className="service-description">{service.desc}</p>
                  <div className="service-features">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <div className="feature-icon">
                          <CheckCircleOutlined />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-border-gradient"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: 'var(--spacing-5xl) 0' }} ref={pricingRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">价格信息</h2>
            <p className="section-subtitle">透明的价格体系，每日更新市场价格</p>
          </motion.div>

          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={12} lg={8}>
              <Card className="pricing-card">
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>今日 0# 柴油价格</h3>
                <div className="price-current">
                  <span className="price-value">¥6.85</span>
                  <span className="price-unit">/升</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-lg)' }}>
                  价格更新时间：2024-01-20 09:00
                </p>
                
                <div className="price-comparison">
                  <div className="comparison-item">
                    <span className="comparison-label">市场基准价</span>
                    <span className="comparison-value benchmark">¥6.95/升</span>
                  </div>
                  <div className="comparison-item">
                    <span className="comparison-label">天骏价格</span>
                    <span className="comparison-value our-price">¥6.85/升</span>
                  </div>
                  <div className="comparison-item">
                    <span className="comparison-label">节省</span>
                    <span className="comparison-value our-price">¥0.10/升</span>
                  </div>
                </div>
                
                <Button 
                  type="primary" 
                  className="btn-primary" 
                  block 
                  style={{ marginTop: '1.5rem' }}
                  onClick={() => setQuoteModalVisible(true)}
                >
                  获取批量报价
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Download Center */}
      <section style={{ background: 'var(--color-bg-secondary)', padding: 'var(--spacing-5xl) 0' }}>
        <div className="container">
          <h2 className="section-title">下载中心</h2>
          <p className="section-subtitle">下载产品技术资料和安全数据表</p>

          <Row gutter={[24, 24]}>
            {downloadFiles.map((file, index) => (
              <Col xs={24} md={8} key={index}>
                <Card style={{ textAlign: 'center', transition: 'all var(--transition-normal)' }} hoverable>
                  <div style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: 'var(--spacing-md)' }}>
                    <FileTextOutlined />
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>{file.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{file.desc}</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-md)' }}>
                    PDF • {file.size}
                  </p>
                  <Button 
                    type="primary" 
                    className="btn-secondary" 
                    icon={<DownloadOutlined />}
                    block
                  >
                    下载文件
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Quote Modal */}
      <Modal
        title="燃油询价"
        open={quoteModalVisible}
        onCancel={() => setQuoteModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleQuoteSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="公司名称" name="company" rules={[{ required: true, message: '请输入公司名称' }]}>
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系人" name="name" rules={[{ required: true, message: '请输入联系人姓名' }]}>
                <Input placeholder="请输入联系人姓名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="预计用量（升）" name="liters" rules={[{ required: true, message: '请输入预计用量' }]}>
                <Input placeholder="请输入预计月用量" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="配送地址" name="address" rules={[{ required: true, message: '请输入配送地址' }]}>
            <Input.TextArea placeholder="请输入详细配送地址" rows={3} />
          </Form.Item>
          <Form.Item label="偏好时间" name="preferredTime">
            <Select placeholder="请选择偏好配送时间">
              <Select.Option value="morning">上午 (8:00-12:00)</Select.Option>
              <Select.Option value="afternoon">下午 (13:00-17:00)</Select.Option>
              <Select.Option value="evening">晚上 (18:00-22:00)</Select.Option>
              <Select.Option value="anytime">任何时间</Select.Option>
            </Select>
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