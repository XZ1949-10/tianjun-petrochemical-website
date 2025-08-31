import React, { useState } from 'react'
import { Layout, Row, Col, Space, Divider, Button, Input, QRCode, message } from 'antd'
import { 
  WechatOutlined, 
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  FileTextOutlined,
  SafetyOutlined,
  TruckOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { Footer: AntFooter } = Layout

const StyledFooter = styled(AntFooter)`
  background: var(--color-graphite);
  color: white;
  padding: var(--spacing-4xl) 0 var(--spacing-lg);
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }
  
  .company-info {
    .logo {
      display: flex;
      align-items: center;
      margin-bottom: var(--spacing-lg);
      gap: var(--spacing-md);
      
      .logo-icon {
        width: 48px;
        height: 48px;
        background: var(--color-primary);
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        flex-shrink: 0;
      }
      
      .logo-text {
        display: flex;
        flex-direction: column;
        
        .company-name {
          font-size: var(--font-size-xl);
          font-weight: 700;
          color: white;
          line-height: 1.2;
          margin-bottom: 2px;
        }
        
        .company-tagline {
          font-size: var(--font-size-sm);
          color: var(--color-text-tertiary);
          line-height: 1.2;
        }
      }
    }
    
    .company-desc {
      color: var(--color-text-tertiary);
      font-size: var(--font-size-sm);
      line-height: 1.6;
      margin: 0;
    }
  }
  
  .footer-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
    color: white;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 100%;
      height: 3px;
      background: var(--color-secondary);
      border-radius: 2px;
    }
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: var(--spacing-sm);
      
      a {
        color: var(--color-text-tertiary);
        text-decoration: none;
        transition: color var(--transition-normal);
        font-size: var(--font-size-sm);
        
        &:hover {
          color: var(--color-secondary);
        }
      }
    }
  }
  
  .qr-section {
    text-align: center;
    
    .qr-container {
      display: inline-block;
      padding: var(--spacing-md);
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all var(--transition-normal);
      
      &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }
      
      .ant-qrcode {
        margin-bottom: var(--spacing-sm);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      p {
        margin: 0;
        font-size: 12px;
        color: var(--color-text-tertiary);
        font-weight: 500;
      }
    }
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
    margin-top: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    
    .footer-links-bottom {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      
      a {
        color: #999;
        font-size: 14px;
        text-decoration: none;
        transition: color var(--transition-normal);
        
        &:hover {
          color: var(--color-secondary);
        }
      }
    }
    
    .footer-copyright {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      
      .copyright-text {
        white-space: nowrap;
      }
      
      .icp-text a {
        color: #999;
        text-decoration: none;
        transition: color var(--transition-normal);
        
        &:hover {
          color: var(--color-secondary);
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-2xl) 0 var(--spacing-lg);
    
    .footer-content {
      padding: 0 var(--spacing-md);
    }
    
    .company-info .logo {
      .logo-icon {
        width: 40px;
        height: 40px;
        font-size: 14px;
      }
      
      .logo-text .company-name {
        font-size: var(--font-size-lg);
      }
    }
    
    .footer-title {
      font-size: var(--font-size-lg);
      
      &::after {
        width: 100%;
        height: 2px;
      }
    }
    
    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      
      .qr-container {
        padding: var(--spacing-sm);
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        
        .ant-qrcode {
          margin-bottom: 0;
          flex-shrink: 0;
        }
        
        p {
          font-size: 11px;
          margin: 0;
          flex: 1;
          text-align: left;
        }
      }
    }
    
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      margin-top: 32px;
      padding-top: 20px;
      
      .footer-links-bottom {
        gap: 16px;
        
        a {
          font-size: 13px;
        }
      }
      
      .footer-copyright {
        font-size: 11px;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        
        .copyright-text {
          white-space: normal;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    .qr-section {
      .qr-container {
        gap: var(--spacing-sm);
        
        p {
          font-size: 10px;
        }
      }
    }
    
    .footer-bottom {
      .footer-links-bottom {
        flex-direction: column;
        gap: 12px;
        
        a {
          font-size: 12px;
        }
      }
      
      .footer-copyright {
        font-size: 10px;
      }
    }
  }
`

const Footer = () => {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = () => {
    if (!email) {
      message.warning('请输入邮箱地址')
      return
    }
    message.success('订阅成功！感谢您的关注。')
    setEmail('')
  }

  return (
    <StyledFooter>
      <div className="footer-content">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div className="footer-section company-info">
              <div className="logo">
                <div className="logo-icon">TJ</div>
                <div className="logo-text">
                  <span className="company-name">天骏石化</span>
                  <span className="company-tagline">第三代家族企业</span>
                </div>
              </div>
              <p className="company-desc">
                天骏石化是一家第三代家族经营的石化公司，专业从事0#柴油的销售、储存和分销业务。
                我们致力于为客户提供可靠、高效的燃油解决方案。
              </p>
            </div>
          </Col>
          
          <Col xs={24} sm={8} md={4}>
            <div className="footer-section">
              <h3 className="footer-title">公司</h3>
              <ul className="footer-links">
                <li><Link to="/about">关于我们</Link></li>
                <li><Link to="/careers">加入我们</Link></li>
                <li><Link to="/news">新闻动态</Link></li>
                <li><Link to="/contact">联系我们</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={24} sm={8} md={4}>
            <div className="footer-section">
              <h3 className="footer-title">产品服务</h3>
              <ul className="footer-links">
                <li><Link to="/products">0#柴油</Link></li>
                <li><Link to="/products">批量配送</Link></li>
                <li><Link to="/products">现场加油</Link></li>
                <li><Link to="/products">应急供应</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={24} sm={8} md={4}>
            <div className="footer-section">
              <h3 className="footer-title">资源</h3>
              <ul className="footer-links">
                <li><Link to="/safety">安全与合规</Link></li>
                <li><Link to="/safety">安全数据表</Link></li>
                <li><Link to="/safety">应急预案</Link></li>
                <li><Link to="/products">下载中心</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={24} md={4}>
            <div className="footer-section qr-section">
              <h3 className="footer-title">关注我们</h3>
              <div className="qr-container">
                <QRCode 
                  value="https://www.tianjun-petro.com" 
                  size={100}
                  color="#000"
                  bgColor="#fff"
                  variant="borderless"
                />
                <p>扫码关注微信</p>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <div className="footer-links-bottom">
            <Link to="/privacy">隐私政策</Link>
            <Link to="/terms">使用条款</Link>
            <Link to="/sitemap">网站地图</Link>
          </div>
          <div className="footer-copyright">
            <span className="copyright-text">
              © {currentYear} 舟山天骏石油化工有限公司 版权所有
            </span>
            <span className="icp-text">
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                浙ICP备12345678号-1
              </a>
            </span>
          </div>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer