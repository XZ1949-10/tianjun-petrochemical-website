import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button, Drawer, Space, Dropdown } from 'antd'
import { MenuOutlined, GlobalOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const { Header: AntHeader } = Layout

const StyledHeader = styled(AntHeader)`
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(229, 232, 235, 0.8);
  padding: 0 24px !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 70px !important;
  line-height: 70px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 76, 151, 0.2);
  }
  
  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;
  }
  
  .logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary) !important;
    text-decoration: none;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    &:hover {
      color: var(--color-primary-dark) !important;
      transform: translateY(-1px);
    }
    
    .logo-icon {
      width: 48px;
      height: 48px;
      margin-right: 16px;
      background: linear-gradient(135deg, #004C97 0%, #336bb3 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(0, 76, 151, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 76, 151, 0.3);
      }
    }
    
    .logo-text {
      display: flex;
      flex-direction: column;
      
      .company-name {
        display: block;
        font-size: 1.5rem;
        line-height: 1.2;
        font-weight: 700;
        margin-bottom: 2px;
      }
      
      .company-tagline {
        display: block;
        font-size: 0.8rem;
        color: #6B7280;
        font-weight: 400;
        line-height: 1;
        opacity: 0.8;
      }
    }
  }
  
  .nav-menu {
    flex: 1;
    justify-content: center;
    border: none !important;
    background: transparent !important;
    line-height: 70px;
    
    .ant-menu-item {
      font-weight: 500;
      color: #1F2937;
      margin: 0 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-size: 15px;
      
      &:hover {
        color: #004C97 !important;
        background: rgba(0, 76, 151, 0.08) !important;
      }
      
      &.ant-menu-item-selected {
        color: #004C97 !important;
        background: rgba(0, 76, 151, 0.1) !important;
        
        &::after {
          display: none;
        }
      }
      
      a {
        color: inherit !important;
        text-decoration: none;
      }
    }
    
    .ant-menu-submenu {
      .ant-menu-submenu-title {
        font-weight: 500;
        color: #1F2937;
        margin: 0 8px;
        border-radius: 6px;
        transition: all 0.3s ease;
        font-size: 15px;
        
        &:hover {
          color: #004C97 !important;
          background: rgba(0, 76, 151, 0.08) !important;
        }
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    
    .emergency-phone {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6B7280;
      font-size: 14px;
      font-weight: 500;
      
      .phone-icon {
        color: #FFD100;
        font-size: 16px;
      }
      
      @media (max-width: 1200px) {
        display: none;
      }
    }
    
    .quote-btn {
      background: #004C97 !important;
      border-color: #004C97 !important;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0, 76, 151, 0.2);
      height: 36px;
      padding: 0 20px;
      border-radius: 6px;
      
      &:hover {
        background: #003d7a !important;
        border-color: #003d7a !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 76, 151, 0.3);
      }
    }
  }
  
  .mobile-menu-btn {
    display: none;
    position: relative;
    z-index: 1001;
    pointer-events: auto;
    
    .ant-btn {
      pointer-events: auto;
      cursor: pointer;
      touch-action: manipulation;
    }
  }
  
  @media (max-width: 1024px) {
    .nav-menu {
      display: none !important;
    }
    
    .header-actions .quote-btn {
      display: none;
    }
    
    .mobile-menu-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 6px;
      position: relative;
      z-index: 1001;
      pointer-events: auto;
      
      .ant-btn {
        pointer-events: auto;
        cursor: pointer;
        touch-action: manipulation;
        user-select: none;
      }
    }
  }
  
  @media (max-width: 576px) {
    padding: 0 16px !important;
    height: 60px !important;
    line-height: 60px !important;
    
    .header-content {
      height: 60px;
    }
    
    .logo {
      .logo-icon {
        width: 36px;
        height: 36px;
        font-size: 1rem;
        margin-right: 12px;
      }
      
      .logo-text .company-name {
        font-size: 1.1rem;
      }
      
      .logo-text .company-tagline {
        display: none;
      }
    }
    
    .mobile-menu-btn {
      .ant-btn {
        padding: 0;
        width: 40px;
        height: 40px;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 20px !important;
    
    .logo {
      .logo-text .company-name {
        font-size: 1.3rem;
      }
      
      .logo-text .company-tagline {
        font-size: 0.75rem;
      }
    }
    
    .header-actions {
      gap: 12px;
    }
  }
  
  /* 全局占位符样式 */
  + .header-spacer {
    height: 70px;
    
    @media (max-width: 576px) {
      height: 60px;
    }
  }
`

const HeaderSpacer = styled.div`
  height: 70px;
  transition: height 0.3s ease;
  
  @media (max-width: 576px) {
    height: 60px;
  }
`

const getMenuItems = () => [
  { key: '/', label: '首页' },
  { key: '/about', label: '关于我们' },
  { 
    key: '/products', 
    label: '产品与服务',
    children: [
      { key: '/products/center', label: '产品中心' },
      { key: '/products#services', label: '服务项目' },
      { key: '/products#pricing', label: '价格信息' }
    ]
  },
  { key: '/safety', label: '安全与合规' },
  { key: '/news', label: '新闻与见解' },
  { key: '/careers', label: '招聘信息' },
  { key: '/contact', label: '联系我们' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [language, setLanguage] = useState('zh')
  const location = useLocation()
  const menuItems = getMenuItems()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  const handleMenuClick = () => {
    setMobileMenuVisible(false)
  }

  const handleMobileMenuToggle = () => {
    console.log('Mobile menu button clicked')
    setMobileMenuVisible(true)
  }

  const languageDropdown = {
    items: [
      {
        key: 'zh',
        label: '简体中文',
        onClick: () => setLanguage('zh')
      },
      {
        key: 'en',
        label: 'English',
        onClick: () => setLanguage('en')
      }
    ]
  }

  return (
    <>
      <StyledHeader className={scrolled ? 'scrolled' : ''}>
        <div className="header-content">
          <Link to="/" className="logo">
            <motion.div 
              className="logo-icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              天骏
            </motion.div>
            <div className="logo-text">
              <span className="company-name">天骏石化</span>
              <span className="company-tagline">第三代家族企业 • 专业柴油供应</span>
            </div>
          </Link>

          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="nav-menu"
            items={menuItems.map(item => ({
              key: item.key,
              label: <Link to={item.key}>{item.label}</Link>
            }))}
          />

          <div className="header-actions">
            <div className="emergency-phone">
              <PhoneOutlined className="phone-icon" />
              <span>应急热线：400-XXX-XXXX</span>
            </div>
            
            <Dropdown menu={languageDropdown} trigger={['click']}>
              <Button
                type="text"
                icon={<GlobalOutlined />}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {language === 'zh' ? '中文' : 'EN'} <DownOutlined />
              </Button>
            </Dropdown>
            
            <Button 
              type="primary" 
              className="quote-btn"
              size="middle"
            >
              立即询价
            </Button>

            <Button
              type="text"
              icon={<MenuOutlined />}
              className="mobile-menu-btn"
              onClick={handleMobileMenuToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '44px',
                minHeight: '44px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
                userSelect: 'none',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
        </div>
      </StyledHeader>

      {/* 移动端菜单 */}
      <Drawer
        title="天骏石化导航"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={300}
        zIndex={1002}
        styles={{
          wrapper: {
            zIndex: 1002
          },
          mask: {
            zIndex: 1001
          },
          content: {
            zIndex: 1002
          }
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          inlineIndent={24}
          expandIconPosition="end"
          items={menuItems.map(item => {
            if (item.children) {
              return {
                key: item.key,
                label: item.label,
                type: 'submenu',
                children: item.children.map(child => ({
                  key: child.key,
                  label: <Link to={child.key}>{child.label}</Link>
                }))
              }
            }
            return {
              key: item.key,
              label: <Link to={item.key}>{item.label}</Link>
            }
          })}
        />
        
        <div style={{ padding: '20px 0', borderTop: '1px solid #f0f0f0', marginTop: '20px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                应急热线
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                <PhoneOutlined /> 400-XXX-XXXX
              </div>
            </div>
            
            <Dropdown menu={languageDropdown} trigger={['click']}>
              <Button
                type="text"
                icon={<GlobalOutlined />}
                block
                style={{ textAlign: 'left' }}
              >
                语言切换：{language === 'zh' ? '中文' : 'English'} <DownOutlined />
              </Button>
            </Dropdown>
            
            <Button type="primary" block className="btn-primary">
              立即询价
            </Button>
          </Space>
        </div>
      </Drawer>

      {/* 占位符，防止内容被固定头部遮挡 */}
      <HeaderSpacer />
    </>
  )
}

export default Header