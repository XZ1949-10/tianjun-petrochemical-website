import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Statistic, Avatar } from 'antd'
import { 
  SafetyOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  EnvironmentOutlined,
  RocketOutlined,
  HeartOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useAboutStore } from '../store'

const StyledAbout = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), 
                url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
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
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }
  
  .stat-card {
    text-align: center;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 60px;
  }
  
  .value-card {
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    
    .value-icon {
      font-size: 48px;
      color: #3b82f6;
      margin-bottom: 20px;
    }
    
    .value-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1e293b;
    }
    
    .value-description {
      color: #64748b;
      line-height: 1.6;
    }
  }
  
  .fleet-storage-section {
    background: #f8fafc;
  }
  
  .fleet-storage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
  
  .fleet-card, .storage-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    
    .card-icon {
      font-size: 60px;
      margin-bottom: 20px;
    }
    
    .card-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1e293b;
    }
    
    .card-subtitle {
      font-size: 48px;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 20px;
    }
    
    .features-list {
      list-style: none;
      padding: 0;
      
      li {
        padding: 8px 0;
        color: #64748b;
        
        &:before {
          content: "✓";
          color: #10b981;
          font-weight: bold;
          margin-right: 12px;
        }
      }
    }
  }
  
  .leadership-section {
    background: white;
  }
  
  .leadership-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
    margin-top: 60px;
  }
  
  .leader-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    
    .leader-avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: #3b82f6;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      border-radius: 50%;
    }
    
    .leader-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1e293b;
    }
    
    .leader-position {
      color: #3b82f6;
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .leader-bio {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .leader-contact {
      display: flex;
      justify-content: center;
      gap: 20px;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #64748b;
        font-size: 14px;
      }
    }
  }
  
  .cta-section {
    background: #1e293b;
    color: white;
    text-align: center;
    
    .cta-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
    }
    
    .cta-subtitle {
      font-size: 1.2rem;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
`

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1 })
  const { ref: fleetRef, inView: fleetInView } = useInView({ threshold: 0.1 })
  const { ref: leadershipRef, inView: leadershipInView } = useInView({ threshold: 0.1 })

  // 使用About Store
  const {
    companyInfo,
    coreValues,
    fleetStorage,
    leadershipTeam,
    loading,
    fetchCompanyInfo,
    fetchCoreValues,
    fetchFleetStorage,
    fetchLeadershipTeam
  } = useAboutStore()

  // 获取所有关于我们的数据
  useEffect(() => {
    const fetchAllData = async () => {
      console.log('🚀 开始获取关于我们页面数据...')
      try {
        await Promise.all([
          fetchCompanyInfo(),
          fetchCoreValues(),
          fetchFleetStorage(),
          fetchLeadershipTeam()
        ])
        console.log('✅ 关于我们页面数据获取成功')
      } catch (error) {
        console.error('❌ 获取关于我们页面数据失败:', error)
      }
    }

    fetchAllData()
  }, [fetchCompanyInfo, fetchCoreValues, fetchFleetStorage, fetchLeadershipTeam])

  return (
    <StyledAbout>
      <Helmet>
        <title>关于我们 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="了解天骏石化的企业历史、核心价值观、专业团队和服务能力。第三代家族企业，34年专业经验，为客户提供可靠的燃油供应服务。" />
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
            <h1 className="hero-title">3rd Generation, 1 Promise</h1>
            <p className="hero-subtitle">
              三代传承的家族企业，始终坚持为客户提供安全、可靠、高效的燃油供应服务
            </p>
            
            {/* 企业统计数据 */}
            {loading ? (
              <div className="loading-container">
                加载企业数据中...
              </div>
            ) : companyInfo ? (
              <div className="stats-grid">
                <div className="stat-card">
                  <Statistic
                    title="年行业经验"
                    value={companyInfo.statistics?.experience || "34年"}
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
                <div className="stat-card">
                  <Statistic
                    title="企业客户"
                    value={companyInfo.statistics?.clients || "500+"}
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
                <div className="stat-card">
                  <Statistic
                    title="储存能力"
                    value={companyInfo.statistics?.storageCapacity || "20,000"}
                    suffix="m³"
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
              </div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <Statistic
                    title="年行业经验"
                    value="34年"
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
                <div className="stat-card">
                  <Statistic
                    title="企业客户"
                    value="500+"
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
                <div className="stat-card">
                  <Statistic
                    title="储存能力"
                    value="20,000"
                    suffix="m³"
                    valueStyle={{ color: '#3b82f6', fontSize: '2.5rem', fontWeight: 'bold' }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section" ref={valuesRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">核心价值观</h2>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b', marginBottom: '60px' }}>
              指导我们行为的核心原则和价值理念，塑造企业文化的基石
            </p>
          </motion.div>
          
          {loading ? (
            <div className="loading-container">
              加载核心价值观数据中...
            </div>
          ) : coreValues ? (
            <div className="values-grid">
              {coreValues.values?.map((value, index) => (
                <motion.div
                  key={value.id}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="value-icon">
                    {value.id === 'safety' && <SafetyOutlined />}
                    {value.id === 'quality' && <TrophyOutlined />}
                    {value.id === 'innovation' && <RocketOutlined />}
                    {value.id === 'integrity' && <HeartOutlined />}
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="values-grid">
              {/* 默认静态数据 */}
              <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <div className="value-icon"><SafetyOutlined /></div>
                <h3 className="value-title">安全第一</h3>
                <p className="value-description">严格遵守安全生产规范，建立完善的HSE管理体系，确保每一次作业的安全性。</p>
              </motion.div>
              <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="value-icon"><TrophyOutlined /></div>
                <h3 className="value-title">品质至上</h3>
                <p className="value-description">以国际标准为基准，提供高品质产品和服务。</p>
              </motion.div>
              <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="value-icon"><RocketOutlined /></div>
                <h3 className="value-title">持续创新</h3>
                <p className="value-description">不断创新技术和服务模式，引领行业发展。</p>
              </motion.div>
              <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
                <div className="value-icon"><HeartOutlined /></div>
                <h3 className="value-title">诚信经营</h3>
                <p className="value-description">以诚待人，以信立业，建立长期合作关系。</p>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Fleet & Storage Section */}
      <section className="section fleet-storage-section" ref={fleetRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={fleetInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">车队与储存</h2>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b', marginBottom: '60px' }}>
              专业的运输车队和现代化储存设施，为您提供全方位的物流保障
            </p>
          </motion.div>

          {loading ? (
            <div className="loading-container">
              加载车队储存数据中...
            </div>
          ) : fleetStorage ? (
            <div className="fleet-storage-grid">
              {/* 车队信息 */}
              <motion.div
                className="fleet-card"
                initial={{ opacity: 0, x: -50 }}
                animate={fleetInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="card-icon">🚛</div>
                <div className="card-subtitle">{fleetStorage.fleet?.totalVehicles || "30+"}</div>
                <h3 className="card-title">专业运输车队</h3>
                <ul className="features-list">
                  <li>{fleetStorage.fleet?.loadCapacity || "5-30"}吨载重范围</li>
                  <li>危险品运输资质</li>
                  <li>GPS实时监控</li>
                  <li>24小时调度服务</li>
                </ul>
              </motion.div>

              {/* 储存设施 */}
              <motion.div
                className="storage-card"
                initial={{ opacity: 0, x: 50 }}
                animate={fleetInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="card-icon">🏭</div>
                <div className="card-subtitle">{fleetStorage.storage?.totalCapacity || "20,000m³"}</div>
                <h3 className="card-title">现代化储存设施</h3>
                <ul className="features-list">
                  <li>{fleetStorage.storage?.facilities?.length || 3}个现代化储油库</li>
                  <li>温控储存系统</li>
                  <li>安全防护措施</li>
                  <li>24小时监控</li>
                </ul>
              </motion.div>
            </div>
          ) : (
            <div className="fleet-storage-grid">
              {/* 默认静态数据 */}
              <motion.div className="fleet-card" initial={{ opacity: 0, x: -50 }} animate={fleetInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
                <div className="card-icon">🚛</div>
                <div className="card-subtitle">30+</div>
                <h3 className="card-title">专业运输车队</h3>
                <ul className="features-list">
                  <li>5-30吨载重范围</li>
                  <li>危险品运输资质</li>
                  <li>GPS实时监控</li>
                  <li>24小时调度服务</li>
                </ul>
              </motion.div>
              <motion.div className="storage-card" initial={{ opacity: 0, x: 50 }} animate={fleetInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                <div className="card-icon">🏭</div>
                <div className="card-subtitle">20,000m³</div>
                <h3 className="card-title">现代化储存设施</h3>
                <ul className="features-list">
                  <li>3个现代化储油库</li>
                  <li>温控储存系统</li>
                  <li>安全防护措施</li>
                  <li>24小时监控</li>
                </ul>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="section leadership-section" ref={leadershipRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">管理团队</h2>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b', marginBottom: '60px' }}>
              经验丰富的管理团队，引领公司稳健发展，为客户提供专业的燃油供应服务
            </p>
          </motion.div>

          {loading ? (
            <div className="loading-container">
              加载管理团队数据中...
            </div>
          ) : leadershipTeam ? (
            <div className="leadership-grid">
              {leadershipTeam.leaders?.slice(0, 3).map((leader, index) => (
                <motion.div
                  key={leader.id}
                  className="leader-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="leader-avatar">
                    {leader.name.charAt(0)}
                  </div>
                  <h3 className="leader-name">{leader.name}</h3>
                  <div className="leader-position">{leader.position}</div>
                  <p className="leader-bio">{leader.bio}</p>
                  <div className="leader-contact">
                    <div className="contact-item">
                      <PhoneOutlined />
                      <span>{leader.phone}</span>
                    </div>
                    <div className="contact-item">
                      <MailOutlined />
                      <span>{leader.email}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="leadership-grid">
              {/* 默认静态数据 */}
              <motion.div className="leader-card" initial={{ opacity: 0, y: 30 }} animate={leadershipInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <div className="leader-avatar">张</div>
                <h3 className="leader-name">张董事长</h3>
                <div className="leader-position">董事长兼总经理</div>
                <p className="leader-bio">公司创始人，34年石化行业经验，带领公司从小型加油站发展为区域领先的燃油供应商。</p>
                <div className="leader-contact">
                  <div className="contact-item"><PhoneOutlined /><span>138****1234</span></div>
                  <div className="contact-item"><MailOutlined /><span>chairman@tianjun-petro.com</span></div>
                </div>
              </motion.div>
              <motion.div className="leader-card" initial={{ opacity: 0, y: 30 }} animate={leadershipInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="leader-avatar">李</div>
                <h3 className="leader-name">李副总</h3>
                <div className="leader-position">副总经理</div>
                <p className="leader-bio">负责公司运营管理，15年企业管理经验，专业化工程师背景。</p>
                <div className="leader-contact">
                  <div className="contact-item"><PhoneOutlined /><span>139****5678</span></div>
                  <div className="contact-item"><MailOutlined /><span>vice.president@tianjun-petro.com</span></div>
                </div>
              </motion.div>
              <motion.div className="leader-card" initial={{ opacity: 0, y: 30 }} animate={leadershipInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="leader-avatar">王</div>
                <h3 className="leader-name">王总监</h3>
                <div className="leader-position">技术总监</div>
                <p className="leader-bio">石油化工专业博士，10年技术研发经验，主导多项技术创新项目。</p>
                <div className="leader-contact">
                  <div className="contact-item"><PhoneOutlined /><span>137****9999</span></div>
                  <div className="contact-item"><MailOutlined /><span>tech.director@tianjun-petro.com</span></div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="cta-title">Join 500+ Fleet Partners</h2>
            <p className="cta-subtitle">
              成为我们的合作伙伴，享受专业的燃油供应服务
            </p>
            <div className="cta-buttons">
              <Button type="primary" size="large" style={{ marginRight: '20px' }}>
                立即询价
              </Button>
              <Button size="large" ghost>
                <Link to="/contact">联系我们</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </StyledAbout>
  )
}

export default About