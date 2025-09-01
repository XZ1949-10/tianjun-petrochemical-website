import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Modal, Form, Input, Select, Upload, Tag, message } from 'antd'
import { 
  UserAddOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined, 
  DollarOutlined,
  BookOutlined,
  SafetyOutlined,
  TeamOutlined,
  TrophyOutlined,
  SendOutlined,
  UploadOutlined,
  HeartOutlined,
  RocketOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useCareersStore } from '../store'

const { TextArea } = Input
const { Option } = Select

const StyledCareers = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(30, 64, 175, 0.8) 100%), 
                url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    min-height: 70vh;
    display: flex;
    align-items: center;
    color: white;
    
    .hero-content {
      text-align: center;
      
      .hero-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      .hero-subtitle {
        font-size: 1.25rem;
        margin-bottom: 40px;
        opacity: 0.9;
        max-width: 700px;
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

  .positions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  .position-card {
    background: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
    
    .position-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1e293b;
    }
    
    .position-department {
      color: #3b82f6;
      font-weight: 500;
      margin-bottom: 16px;
    }
    
    .position-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #64748b;
        font-size: 14px;
      }
    }
    
    .position-description {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
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

  .benefits-section {
    background: #f8fafc;
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .benefit-category {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      text-align: center;
      
      .category-icon {
        font-size: 48px;
        color: #3b82f6;
        margin-bottom: 20px;
      }
      
      .category-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #1e293b;
      }
      
      .category-items {
        list-style: none;
        padding: 0;
        
        li {
          padding: 6px 0;
          color: #64748b;
          font-size: 14px;
        }
      }
    }
  }
`

const Careers = () => {
  const [applyModalVisible, setApplyModalVisible] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [form] = Form.useForm()
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: positionsRef, inView: positionsInView } = useInView({ threshold: 0.1 })
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ threshold: 0.1 })

  const { 
    positions, 
    benefits, 
    culture, 
    loading, 
    fetchPositions, 
    fetchBenefits, 
    fetchCulture, 
    submitApplication 
  } = useCareersStore()

  useEffect(() => {
    const loadData = async () => {
      console.log('🚀 开始获取招聘页面数据...')
      try {
        await Promise.all([fetchPositions(), fetchBenefits(), fetchCulture()])
        console.log('✅ 招聘页面数据获取成功')
      } catch (error) {
        console.error('❌ 获取招聘页面数据失败:', error)
      }
    }
    loadData()
  }, [fetchPositions, fetchBenefits, fetchCulture])

  const handleApplySubmit = async (values) => {
    try {
      const applicationData = {
        ...values,
        position: selectedPosition ? selectedPosition.title : '',
        appliedAt: new Date().toISOString()
      }
      
      const success = await submitApplication(applicationData)
      
      if (success) {
        message.success('申请提交成功！我们将在3个工作日内联系您。')
        setApplyModalVisible(false)
        form.resetFields()
        setSelectedPosition(null)
      } else {
        message.error('提交失败，请稍后重试。')
      }
    } catch (error) {
      message.error('提交失败，请稍后重试。')
    }
  }

  const openApplyModal = (position) => {
    setSelectedPosition(position)
    setApplyModalVisible(true)
    form.setFieldsValue({ position: position.title })
  }

  const defaultBenefits = {
    compensation: ['具有竞争力的薪酬待遇', '年终奖金', '绩效奖励', '长期激励计划'],
    insurance: ['五险一金', '补充医疗保险', '意外伤害保险', '年度体检'],
    welfare: ['带薪年假', '节日福利', '生日福利', '员工旅游'],
    development: ['专业培训', '职业规划', '晋升机会', '学历提升支持']
  }

  const benefitsToRender = benefits || defaultBenefits

  return (
    <StyledCareers>
      <Helmet>
        <title>招聘信息 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="加入天骏石化团队，享受具有竞争力的薪酬福利，在专业的工作环境中实现职业发展。" />
      </Helmet>

      <section className="hero-section" ref={heroRef}>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">加入我们的团队</h1>
            <p className="hero-subtitle">
              在天骏石化，每一位员工都是我们宝贵的财富。我们提供广阔的发展平台，与您一起成长，共创美好未来。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" ref={positionsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">热门职位</h2>
          </motion.div>

          {loading ? (
            <div className="loading-container">加载职位信息中...</div>
          ) : positions.length > 0 ? (
            <div className="positions-grid">
              {positions.map((position, index) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={positionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="position-card" bodyStyle={{ padding: 0 }}>
                    <h3 className="position-title">{position.title}</h3>
                    <div className="position-department">{position.department}</div>
                    <div className="position-meta">
                      <div className="meta-item">
                        <EnvironmentOutlined />
                        <span>{position.location}</span>
                      </div>
                      <div className="meta-item">
                        <ClockCircleOutlined />
                        <span>{position.type}</span>
                      </div>
                      <div className="meta-item">
                        <DollarOutlined />
                        <span>{position.salary}</span>
                      </div>
                      <div className="meta-item">
                        <BookOutlined />
                        <span>{position.experience}</span>
                      </div>
                    </div>
                    <p className="position-description">{position.description}</p>
                    <Button 
                      type="primary" 
                      className="btn-primary"
                      onClick={() => openApplyModal(position)}
                      block
                    >
                      <UserAddOutlined /> 立即申请
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="positions-grid">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={positionsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <Card className="position-card" bodyStyle={{ padding: 0 }}>
                  <h3 className="position-title">销售经理</h3>
                  <div className="position-department">销售部</div>
                  <div className="position-meta">
                    <div className="meta-item">
                      <EnvironmentOutlined />
                      <span>舟山</span>
                    </div>
                    <div className="meta-item">
                      <ClockCircleOutlined />
                      <span>全职</span>
                    </div>
                    <div className="meta-item">
                      <DollarOutlined />
                      <span>8-12K</span>
                    </div>
                    <div className="meta-item">
                      <BookOutlined />
                      <span>3-5年</span>
                    </div>
                  </div>
                  <p className="position-description">负责客户开发和维护，制定销售策略，完成销售目标</p>
                  <Button type="primary" className="btn-primary" onClick={() => openApplyModal({ title: '销售经理' })} block>
                    <UserAddOutlined /> 立即申请
                  </Button>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <section className="section benefits-section" ref={benefitsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">福利待遇</h2>
          </motion.div>

          <div className="benefits-grid">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="benefit-category">
                <div className="category-icon"><DollarOutlined /></div>
                <h3 className="category-title">薪酬激励</h3>
                <ul className="category-items">
                  {benefitsToRender.compensation?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="benefit-category">
                <div className="category-icon"><SafetyOutlined /></div>
                <h3 className="category-title">保险保障</h3>
                <ul className="category-items">
                  {benefitsToRender.insurance?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="benefit-category">
                <div className="category-icon"><HeartOutlined /></div>
                <h3 className="category-title">员工福利</h3>
                <ul className="category-items">
                  {benefitsToRender.welfare?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
              <div className="benefit-category">
                <div className="category-icon"><RocketOutlined /></div>
                <h3 className="category-title">发展机会</h3>
                <ul className="category-items">
                  {benefitsToRender.development?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Modal
        title={`申请职位：${selectedPosition?.title || ''}`}
        open={applyModalVisible}
        onCancel={() => {
          setApplyModalVisible(false)
          form.resetFields()
          setSelectedPosition(null)
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleApplySubmit}>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input placeholder="请输入您的姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入正确的邮箱地址' }]}>
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item label="工作经验" name="experience">
            <TextArea placeholder="请简要描述您的工作经验" rows={4} />
          </Form.Item>
          <Form.Item label="自我介绍" name="introduction">
            <TextArea placeholder="请简要介绍您的优势、为什么适合这个职位等" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary" block size="large">
              <SendOutlined /> 提交申请
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </StyledCareers>
  )
}

export default Careers