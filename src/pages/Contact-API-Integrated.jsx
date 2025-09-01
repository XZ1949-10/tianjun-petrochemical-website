import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Form, Input, Select, message, Divider } from 'antd'
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  SendOutlined,
  UserOutlined,
  GlobalOutlined,
  WechatOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useContactStore } from '../store'

const { TextArea } = Input
const { Option } = Select

const StyledContact = styled.div`
  .hero-section {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%), 
                url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    min-height: 50vh;
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

  .contact-section {
    background: #f8fafc;
    
    .contact-form-card {
      border-radius: 16px;
      border: none;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      padding: 40px;
      height: 100%;
      
      .form-title {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 30px;
        text-align: center;
        
        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: #3b82f6;
          margin: 20px auto 0;
          border-radius: 2px;
        }
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #3b82f6, #1e40af);
        border: none;
        border-radius: 8px;
        font-weight: 600;
        height: 50px;
        
        &:hover {
          background: linear-gradient(135deg, #1e40af, #1e3a8a);
        }
      }
    }
    
    .contact-info-card {
      border-radius: 16px;
      border: none;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      padding: 40px;
      height: 100%;
      background: white;
      
      .info-title {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 30px;
        text-align: center;
        
        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: #fbbf24;
          margin: 20px auto 0;
          border-radius: 2px;
        }
      }
      
      .contact-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 24px;
        padding: 16px;
        border-radius: 12px;
        background: #f8fafc;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(59, 130, 246, 0.05);
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .contact-icon {
          font-size: 20px;
          color: #3b82f6;
          margin-top: 2px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
        }
        
        .contact-content {
          flex: 1;
          
          .contact-label {
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 4px;
          }
          
          .contact-value {
            color: #64748b;
            line-height: 1.5;
          }
        }
      }
      
      .departments-section {
        margin-top: 30px;
        
        .departments-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
        }
        
        .department-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #f1f5f9;
          border-radius: 8px;
          margin-bottom: 8px;
          
          .dept-name {
            font-weight: 500;
            color: #1e293b;
          }
          
          .dept-phone {
            color: #3b82f6;
            font-weight: 500;
          }
        }
      }
      
      .social-media {
        margin-top: 30px;
        text-align: center;
        
        .social-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          
          .social-link {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3b82f6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.3s ease;
            
            &:hover {
              background: #1e40af;
              transform: translateY(-3px);
              box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            }
            
            &.wechat {
              background: #07c160;
              
              &:hover {
                background: #059e4a;
              }
            }
            
            &.weibo {
              background: #e6162d;
              
              &:hover {
                background: #c41327;
              }
            }
          }
        }
      }
    }
  }

  .offices-section {
    background: white;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 60px;
      color: #1e293b;
    }
    
    .offices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .office-card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 2px solid transparent;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #3b82f6;
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      }
      
      .office-type {
        display: inline-block;
        background: #3b82f6;
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      
      .office-name {
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 16px;
      }
      
      .office-info {
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          color: #64748b;
          
          .info-icon {
            color: #3b82f6;
            margin-top: 2px;
          }
        }
      }
    }
  }
`

const Contact = () => {
  const [form] = Form.useForm()
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.1 })
  const { ref: officesRef, inView: officesInView } = useInView({ threshold: 0.1 })

  const { 
    contactInfo, 
    offices, 
    loading, 
    fetchContactInfo, 
    fetchOffices, 
    submitMessage 
  } = useContactStore()

  useEffect(() => {
    const loadData = async () => {
      console.log('🚀 开始获取联系我们页面数据...')
      try {
        await Promise.all([fetchContactInfo(), fetchOffices()])
        console.log('✅ 联系我们页面数据获取成功')
      } catch (error) {
        console.error('❌ 获取联系我们页面数据失败:', error)
      }
    }
    loadData()
  }, [fetchContactInfo, fetchOffices])

  const handleMessageSubmit = async (values) => {
    try {
      const messageData = {
        ...values,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      
      const success = await submitMessage(messageData)
      
      if (success) {
        message.success('消息发送成功！我们将在24小时内回复您。')
        form.resetFields()
      } else {
        message.error('发送失败，请稍后重试。')
      }
    } catch (error) {
      message.error('发送失败，请稍后重试。')
    }
  }

  // 默认联系信息
  const defaultContactInfo = {
    company: '舟山天骏石油化工有限公司',
    address: '浙江省舟山市定海区工业园区石化路88号',
    phone: '0580-1234567',
    fax: '0580-1234568',
    email: 'info@tianjun-petro.com',
    website: 'www.tianjun-petro.com',
    emergencyHotline: '400-1234-9999',
    businessHours: {
      weekdays: '08:00-17:30',
      weekends: '09:00-16:00',
      emergency: '24小时'
    },
    departments: [
      { name: '销售部', phone: '0580-1234571', manager: '李经理' },
      { name: '客服部', phone: '0580-1234572', manager: '王经理' },
      { name: '技术部', phone: '0580-1234573', manager: '赵工程师' },
      { name: '财务部', phone: '0580-1234574', manager: '陈经理' }
    ],
    socialMedia: {
      wechat: 'tianjun_petro',
      weibo: '@舟山天骏石化'
    }
  }

  const contactInfoToRender = contactInfo || defaultContactInfo

  // 默认办公地点
  const defaultOffices = [
    {
      id: 1,
      name: '总部',
      address: '浙江省舟山市定海区工业园区石化路88号',
      phone: '0580-1234567',
      type: 'headquarters'
    },
    {
      id: 2,
      name: '普陀分公司',
      address: '浙江省舟山市普陀区沈家门街道海洋路168号',
      phone: '0580-1234577',
      type: 'branch'
    }
  ]

  const officesToRender = offices.length > 0 ? offices : defaultOffices

  return (
    <StyledContact>
      <Helmet>
        <title>联系我们 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="联系天骏石化，获取专业的燃油供应服务。多种联系方式，24小时应急热线，随时为您服务。" />
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
            <h1 className="hero-title">联系我们</h1>
            <p className="hero-subtitle">
              专业的燃油供应服务，随时为您提供支持。多种联系方式，选择最便捷的沟通渠道。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" ref={contactRef}>
        <div className="container">
          {loading ? (
            <div className="loading-container">
              加载联系信息中...
            </div>
          ) : (
            <Row gutter={[40, 40]}>
              {/* Contact Form */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="contact-form-card" bodyStyle={{ padding: 0 }}>
                    <h3 className="form-title">发送消息</h3>
                    <Form form={form} layout="vertical" onFinish={handleMessageSubmit}>
                      <Row gutter={[16, 0]}>
                        <Col span={12}>
                          <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入您的姓名' }]}>
                            <Input placeholder="请输入您的姓名" prefix={<UserOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="公司名称" name="company">
                            <Input placeholder="请输入公司名称" prefix={<GlobalOutlined />} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[16, 0]}>
                        <Col span={12}>
                          <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                            <Input placeholder="请输入联系电话" prefix={<PhoneOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="邮箱地址" name="email" rules={[{ type: 'email', message: '请输入正确的邮箱地址' }]}>
                            <Input placeholder="请输入邮箱地址" prefix={<MailOutlined />} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label="咨询类型" name="inquiryType" rules={[{ required: true, message: '请选择咨询类型' }]}>
                        <Select placeholder="请选择咨询类型">
                          <Option value="product">产品咨询</Option>
                          <Option value="price">价格询问</Option>
                          <Option value="service">服务咨询</Option>
                          <Option value="cooperation">合作洽谈</Option>
                          <Option value="complaint">投诉建议</Option>
                          <Option value="other">其他</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="详细信息" name="message" rules={[{ required: true, message: '请输入详细信息' }]}>
                        <TextArea placeholder="请详细描述您的需求或问题，我们将尽快回复您" rows={5} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-primary" block size="large">
                          <SendOutlined /> 发送消息
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </motion.div>
              </Col>

              {/* Contact Info */}
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="contact-info-card" bodyStyle={{ padding: 0 }}>
                    <h3 className="info-title">联系信息</h3>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <PhoneOutlined />
                      </div>
                      <div className="contact-content">
                        <div className="contact-label">联系电话</div>
                        <div className="contact-value">{contactInfoToRender.phone}</div>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <CustomerServiceOutlined />
                      </div>
                      <div className="contact-content">
                        <div className="contact-label">应急热线</div>
                        <div className="contact-value">{contactInfoToRender.emergencyHotline}</div>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <MailOutlined />
                      </div>
                      <div className="contact-content">
                        <div className="contact-label">邮箱地址</div>
                        <div className="contact-value">{contactInfoToRender.email}</div>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <EnvironmentOutlined />
                      </div>
                      <div className="contact-content">
                        <div className="contact-label">公司地址</div>
                        <div className="contact-value">{contactInfoToRender.address}</div>
                      </div>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <ClockCircleOutlined />
                      </div>
                      <div className="contact-content">
                        <div className="contact-label">营业时间</div>
                        <div className="contact-value">
                          工作日：{contactInfoToRender.businessHours?.weekdays}<br />
                          周末：{contactInfoToRender.businessHours?.weekends}<br />
                          应急服务：{contactInfoToRender.businessHours?.emergency}
                        </div>
                      </div>
                    </div>

                    <Divider />

                    <div className="departments-section">
                      <div className="departments-title">部门直线</div>
                      {contactInfoToRender.departments?.map((dept, index) => (
                        <div key={index} className="department-item">
                          <span className="dept-name">{dept.name}</span>
                          <span className="dept-phone">{dept.phone}</span>
                        </div>
                      ))}
                    </div>

                    <div className="social-media">
                      <div className="social-title">关注我们</div>
                      <div className="social-links">
                        <a href="#" className="social-link wechat" title="微信">
                          <WechatOutlined />
                        </a>
                        <a href="#" className="social-link weibo" title="微博">
                          <GlobalOutlined />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          )}
        </div>
      </section>

      {/* Offices Section */}
      <section className="section offices-section" ref={officesRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={officesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">办公地点</h2>
          </motion.div>

          <div className="offices-grid">
            {officesToRender.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 30 }}
                animate={officesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="office-card">
                  <div className="office-type">
                    {office.type === 'headquarters' ? '总部' : '分公司'}
                  </div>
                  <h3 className="office-name">{office.name}</h3>
                  <div className="office-info">
                    <div className="info-item">
                      <EnvironmentOutlined className="info-icon" />
                      <span>{office.address}</span>
                    </div>
                    <div className="info-item">
                      <PhoneOutlined className="info-icon" />
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </StyledContact>
  )
}

export default Contact