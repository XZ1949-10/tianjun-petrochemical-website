import React from 'react'
import { Row, Col, Card, Button, Statistic, Tag, Progress, Timeline } from 'antd'
import { 
  SafetyOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  FileProtectOutlined,
  PhoneOutlined,
  DownloadOutlined,
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

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

  const certifications = [
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

  const policies = [
    {
      icon: <FileProtectOutlined />,
      title: 'HSE管理手册',
      desc: '包含健康、安全、环境管理的完整体系文件',
      size: '2.5 MB'
    },
    {
      icon: <SafetyOutlined />,
      title: '应急预案',
      desc: '各类事故应急处理预案及操作指南',
      size: '1.8 MB'
    },
    {
      icon: <AuditOutlined />,
      title: '安全作业规程',
      desc: '详细的安全操作标准和规范要求',
      size: '3.2 MB'
    }
  ]

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
                    <Button type="primary" className="btn-primary" block>
                      <DownloadOutlined /> 下载文件
                    </Button>
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
    </StyledSafety>
  )
}

export default Safety