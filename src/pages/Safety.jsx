import React, { useState } from 'react'
import { Row, Col, Card, Button, Statistic, Tag, Progress, Timeline, message, Modal } from 'antd'
import { 
  SafetyOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  FileProtectOutlined,
  PhoneOutlined,
  DownloadOutlined,
  TrophyOutlined,
  TeamOutlined,
  EyeOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
// API集成导入
import { useAPI } from '../hooks/useAPI'
import api from '../services/api'

const StyledSafety = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), 
                url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        
        @media (max-width: 768px) {
          font-size: 2.5rem;
        }
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  
  .certification-card {
    text-align: center;
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-xl);
    background: white;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-2xl);
    }
    
    .cert-logo {
      width: 80px;
      height: 80px;
      margin: 0 auto var(--spacing-lg);
      background: var(--color-cloud-gray);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--color-primary);
    }
    
    .cert-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
      color: var(--color-text-primary);
    }
    
    .cert-desc {
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: var(--spacing-lg);
    }
    
    .cert-status {
      .ant-tag {
        border-radius: 20px;
        padding: 4px 12px;
        font-weight: 500;
      }
    }
  }
  
  .stats-card {
    background: white;
    border-radius: var(--border-radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-base);
    border-left: 4px solid var(--color-primary);
    
    .stats-icon {
      font-size: 2.5rem;
      color: var(--color-primary);
      margin-bottom: var(--spacing-md);
    }
    
    .ant-statistic {
      .ant-statistic-content {
        color: var(--color-primary);
        font-weight: 700;
      }
      
      .ant-statistic-title {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
    }
  }
  
  .emergency-banner {
    background: linear-gradient(135deg, var(--color-error) 0%, #dc2626 100%);
    color: white;
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-xl);
    text-align: center;
    position: fixed;
    bottom: var(--spacing-lg);
    left: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: 1000;
    box-shadow: var(--shadow-xl);
    
    .banner-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
    }
    
    .banner-phone {
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
    }
    
    @media (max-width: 768px) {
      left: var(--spacing-md);
      right: var(--spacing-md);
      bottom: var(--spacing-md);
      
      .banner-phone {
        font-size: 1.25rem;
      }
    }
  }
  
  .policy-section {
    background: var(--color-bg-secondary);
    
    .policy-card {
      background: white;
      border-radius: var(--border-radius-xl);
      padding: var(--spacing-xl);
      text-align: center;
      box-shadow: var(--shadow-base);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .policy-icon {
        font-size: 3rem;
        color: var(--color-primary);
        margin-bottom: var(--spacing-lg);
      }
      
      .policy-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: var(--spacing-md);
        color: var(--color-text-primary);
      }
      
      .policy-desc {
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: var(--spacing-lg);
      }
    }
  }
`

const Safety = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: certRef, inView: certInView } = useInView({ threshold: 0.1 })
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1 })
  const { ref: policyRef, inView: policyInView } = useInView({ threshold: 0.1 })
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewDocument, setPreviewDocument] = useState(null)
  const [downloadingFile, setDownloadingFile] = useState(null)

  // API数据获取 - 保持向后兼容的回退机制
  const { data: apiSafetyPolicies } = useAPI(api.safety.getPolicies, { immediate: true })
  const { data: apiCertifications } = useAPI(api.safety.getCertifications, { immediate: true })

  // 智能回退机制：优先使用API数据，如果没有则使用静态数据
  const certifications = apiCertifications || [
    {
      icon: <AuditOutlined />,
      title: 'ISO 9001:2015',
      desc: '质量管理体系认证',
      status: '有效期至2025年12月',
      type: 'success'
    },
    {
      icon: <SafetyOutlined />,
      title: 'ISO 14001:2015',
      desc: '环境管理体系认证',
      status: '有效期至2025年10月',
      type: 'success'
    },
    {
      icon: <TrophyOutlined />,
      title: 'OHSAS 18001',
      desc: '职业健康安全管理体系',
      status: '有效期至2025年8月',
      type: 'success'
    },
    {
      icon: <FileProtectOutlined />,
      title: '危险化学品经营许可证',
      desc: '0#柴油经营资质',
      status: '有效期至2026年3月',
      type: 'processing'
    },
    {
      icon: <CheckCircleOutlined />,
      title: '港口经营许可证',
      desc: '危险货物港口作业许可',
      status: '有效期至2025年6月',
      type: 'success'
    },
    {
      icon: <TeamOutlined />,
      title: '安全生产标准化',
      desc: '三级企业认证',
      status: '有效期至2025年9月',
      type: 'success'
    }
  ]

  const safetyStats = [
    {
      icon: <SafetyOutlined />,
      title: '安全运营天数',
      value: 1256,
      suffix: '天'
    },
    {
      icon: <TeamOutlined />,
      title: '安全培训小时',
      value: 8640,
      suffix: '小时'
    },
    {
      icon: <CheckCircleOutlined />,
      title: '安全检查次数',
      value: 324,
      suffix: '次'
    },
    {
      icon: <TrophyOutlined />,
      title: '安全奖项',
      value: 12,
      suffix: '项'
    }
  ]

  const policies = apiSafetyPolicies || [
    {
      id: 'hse-manual',
      icon: <FileProtectOutlined />,
      title: 'HSE管理手册',
      desc: '包含健康、安全、环境管理的完整体系文件',
      size: '2.5 MB',
      downloadUrl: '/documents/hse-manual.pdf'
    },
    {
      id: 'emergency-plan',
      icon: <SafetyOutlined />,
      title: '应急预案',
      desc: '各类事故应急处理预案及操作指南',
      size: '1.8 MB',
      downloadUrl: '/documents/emergency-plan.pdf'
    },
    {
      id: 'safety-procedures',
      icon: <AuditOutlined />,
      title: '安全作业规程',
      desc: '详细的安全操作标准和规范要求',
      size: '3.2 MB',
      downloadUrl: '/documents/safety-procedures.pdf'
    }
  ]

  // 事件处理函数
  const handleDownloadDocument = async (policy) => {
    try {
      setDownloadingFile(policy.id)
      
      // 调用下载API
      const response = await api.safety.downloadDocument(policy.id)
      
      // 创建下载链接
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${policy.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      message.success(`${policy.title} 下载成功！`)
    } catch (error) {
      console.error('下载失败:', error)
      message.error(`下载失败，请稍后重试`)
    } finally {
      setDownloadingFile(null)
    }
  }

  const handlePreviewDocument = async (policy) => {
    try {
      setPreviewDocument(policy)
      setPreviewVisible(true)
    } catch (error) {
      message.error('预览失败，请稍后重试')
    }
  }

  return (
    <StyledSafety>
      <Helmet>
        <title>安全与合规 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="舟山天骏石化严格遵守安全生产法规，持有完备的资质认证，建立了完善的HSE管理体系，确保每一滴燃油的安全品质。" />
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
            <h1 className="hero-title">安全与合规</h1>
            <p className="hero-subtitle">
              严格遵守法规标准，建立完善的HSE管理体系<br />
              确保每一滴燃油的安全品质
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Button type="primary" size="large" className="btn-warning" style={{ marginRight: '1rem' }}>
                <PhoneOutlined /> 24小时应急热线：400-XXX-XXXX
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 认证展示 */}
      <section className="section" ref={certRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={certInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">资质认证</h2>
            <p className="section-subtitle">
              严格按照国际标准建立管理体系，获得权威机构认证
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {certifications.map((cert, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={certInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="certification-card">
                    <div className="cert-logo">{cert.icon}</div>
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-desc">{cert.desc}</p>
                    <div className="cert-status">
                      <Tag color={cert.type === 'success' ? 'green' : 'blue'}>
                        {cert.status}
                      </Tag>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 安全统计 */}
      <section className="section bg-light" ref={statsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">安全统计</h2>
            <p className="section-subtitle">
              用数字说话，展现我们在安全管理方面的卓越表现
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {safetyStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="stats-card">
                    <div className="stats-icon">{stat.icon}</div>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 安全培训进度 */}
      <section className="section">
        <div className="container">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2>安全培训体系</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                  建立全员全覆盖的安全培训体系，确保每位员工都具备必要的安全意识和操作技能。
                </p>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>新员工安全培训</span>
                    <span>100%</span>
                  </div>
                  <Progress percent={100} strokeColor="var(--color-success)" />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>危险作业人员培训</span>
                    <span>98%</span>
                  </div>
                  <Progress percent={98} strokeColor="var(--color-primary)" />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>应急演练参与率</span>
                    <span>95%</span>
                  </div>
                  <Progress percent={95} strokeColor="var(--color-warning)" />
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>安全考核通过率</span>
                    <span>97%</span>
                  </div>
                  <Progress percent={97} strokeColor="var(--color-info)" />
                </div>
              </motion.div>
            </Col>
            
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Timeline
                  items={[
                    {
                      color: 'green',
                      children: (
                        <>
                          <h4>入职安全教育</h4>
                          <p>新员工必须完成40小时安全培训</p>
                        </>
                      )
                    },
                    {
                      color: 'blue',
                      children: (
                        <>
                          <h4>岗位安全培训</h4>
                          <p>针对具体岗位进行专项安全技能培训</p>
                        </>
                      )
                    },
                    {
                      color: 'orange',
                      children: (
                        <>
                          <h4>定期考核评估</h4>
                          <p>每季度进行安全知识和技能考核</p>
                        </>
                      )
                    },
                    {
                      color: 'red',
                      children: (
                        <>
                          <h4>应急演练</h4>
                          <p>每月组织应急预案演练和实操训练</p>
                        </>
                      )
                    }
                  ]}
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 政策文件下载 */}
      <section className="section policy-section" ref={policyRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={policyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">政策文件下载</h2>
            <p className="section-subtitle">
              下载我们的安全管理政策和操作规范文件
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {policies.map((policy, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={policyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="policy-card">
                    <div className="policy-icon">{policy.icon}</div>
                    <h3 className="policy-title">{policy.title}</h3>
                    <p className="policy-desc">{policy.desc}</p>
                    <p style={{ color: 'var(--color-text-tertiary)', marginBottom: '1rem' }}>
                      文件大小：{policy.size}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button 
                        type="primary" 
                        className="btn-primary" 
                        onClick={() => handleDownloadDocument(policy)}
                        loading={downloadingFile === policy.id}
                        style={{ flex: 1 }}
                      >
                        <DownloadOutlined /> 下载文件
                      </Button>
                      <Button 
                        type="default" 
                        onClick={() => handlePreviewDocument(policy)}
                        title="预览文档"
                      >
                        <EyeOutlined />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 紧急联系横幅 */}
      <div className="emergency-banner">
        <div className="banner-title">24小时应急热线</div>
        <div className="banner-phone">
          <PhoneOutlined />
          400-XXX-XXXX
        </div>
      </div>

      {/* 文档预览模态框 */}
      <Modal
        title={`文档预览 - ${previewDocument?.title}`}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            onClick={() => {
              if (previewDocument) {
                handleDownloadDocument(previewDocument)
              }
            }}
            loading={downloadingFile === previewDocument?.id}
          >
            <DownloadOutlined /> 下载文档
          </Button>
        ]}
        width={800}
      >
        {previewDocument && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ fontSize: '24px' }}>{previewDocument.icon}</div>
              <div>
                <h4 style={{ margin: 0, marginBottom: '4px' }}>{previewDocument.title}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  {previewDocument.desc} • 文件大小: {previewDocument.size}
                </p>
              </div>
            </div>
            
            <div style={{ 
              background: '#fff', 
              border: '1px solid #e8e8e8', 
              borderRadius: '8px', 
              padding: '20px',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FileProtectOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '8px' }}>文档预览</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                该文档包含重要的安全管理信息，请下载查看完整内容。
              </p>
              <div style={{
                background: '#f6f8fa',
                padding: '12px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#666'
              }}>
                📝 文档内容预览功能将在后续版本中提供
              </div>
            </div>
          </div>
        )}
      </Modal>
    </StyledSafety>
  )
}

export default Safety