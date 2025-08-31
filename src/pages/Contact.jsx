import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Input, Select, Form, message, Modal, QRCode, Badge, Space, Divider, Alert } from 'antd'
import { 
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  WechatOutlined,
  CustomerServiceOutlined,
  SendOutlined,
  UserOutlined,
  BankOutlined,
  TruckOutlined,
  SafetyOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  QrcodeOutlined,
  MessageOutlined,
  TeamOutlined,
  ScheduleOutlined,
  DollarOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const { Option } = Select
const { TextArea } = Input

const StyledContact = styled.div`
  .hero-section {
    background: transparent;
    background-image: url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    min-height: 70vh;
    display: flex;
    align-items: center;
    text-align: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
    }
    
    .hero-title {
      font-size: var(--font-size-5xl);
      font-weight: 700;
      margin-bottom: var(--spacing-lg);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      
      @media (max-width: 576px) {
        font-size: var(--font-size-3xl);
      }
      
      @media (max-width: 768px) {
        font-size: var(--font-size-4xl);
      }
    }
    
    .hero-subtitle {
      font-size: var(--font-size-xl);
      opacity: 0.95;
      max-width: 700px;
      margin: 0 auto var(--spacing-xl);
      line-height: 1.6;
    }
    
    .hero-features {
      display: flex;
      justify-content: center;
      gap: var(--spacing-2xl);
      margin-top: var(--spacing-xl);
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-size: var(--font-size-base);
        opacity: 0.9;
        
        .feature-icon {
          font-size: var(--font-size-lg);
          color: var(--color-secondary);
        }
      }
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-lg);
                
        .feature-item {
          font-size: var(--font-size-sm);
        }
      }
              
      @media (max-width: 768px) {
        flex-direction: column;
        gap: var(--spacing-md);
      }
    }
  }
  
  .contact-section {
    padding: var(--spacing-5xl) 0;
    background: var(--color-bg-secondary);
    
    .ant-row {
      width: 100%;
      height: 100%;
      margin: 0;
      
      .ant-col {
        padding: 0;
        height: 100%;
        
        &:first-child {
          padding-right: calc(var(--spacing-lg) / 2);
        }
        
        &:last-child {
          padding-left: calc(var(--spacing-lg) / 2);
        }
      }
    }
    
    .ant-card {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      margin: 0;
      
      .ant-card-body {
        padding: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
    }
    
    .contact-form-card {
        border-radius: var(--border-radius-2xl);
        border: none;
        box-shadow: var(--shadow-xl);
        padding: var(--spacing-3xl);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
        
        .form-title {
          font-size: var(--font-size-3xl);
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--spacing-sm);
          text-align: center;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
          
          &::after {
            content: '';
            display: block;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%);
            margin: var(--spacing-lg) auto 0;
            border-radius: var(--border-radius-base);
          }
        }
        
        .form-subtitle {
          color: var(--color-text-secondary);
          text-align: center;
          margin-bottom: var(--spacing-2xl);
          font-size: var(--font-size-lg);
          opacity: 0.85;
        }
        
        .ant-form {
              .ant-form-item {
                position: relative;
                margin-bottom: var(--spacing-xl);
              }
              
              .ant-form-item:last-of-type {
                margin-bottom: 0;
              }
           
             .input-wrapper {
               display: flex;
               align-items: center;
               gap: 12px;
               justify-content: flex-start;
             }
          
            .input-icon {
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, rgba(0, 76, 151, 0.1), rgba(0, 76, 151, 0.05));
              border-radius: 12px;
              color: var(--color-primary);
              font-size: 20px;
              transition: all 0.3s ease;
              flex-shrink: 0;
              border: 2px solid rgba(0, 76, 151, 0.1);
            }
          
          .ant-input, .ant-select, .ant-input-affix-wrapper {
            height: 56px;
            border-radius: 16px;
            border: 2px solid rgba(0, 76, 151, 0.15);
            background: white;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(0, 76, 151, 0.08), 
                       0 2px 4px rgba(0, 0, 0, 0.04);
            font-size: 16px;
            font-weight: 500;
            flex: 1;
            
            &::placeholder {
              color: rgba(0, 76, 151, 0.4);
              font-weight: 400;
            }
            
            &:focus, &:hover {
              border-color: var(--color-primary);
              box-shadow: 0 8px 24px rgba(0, 76, 151, 0.15), 
                         0 4px 8px rgba(0, 0, 0, 0.08),
                         0 0 0 4px rgba(0, 76, 151, 0.1);
              transform: translateY(-2px);
            }
            
            &:focus {
              outline: none;
            }
          }
          
          .input-wrapper:focus-within .input-icon {
              background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
              color: white;
              transform: scale(1.05);
              border-color: var(--color-primary);
            }
          
          .ant-input[type="textarea"] {
            height: auto;
            min-height: 160px;
            resize: vertical;
            border-radius: var(--border-radius-lg);
          }
          
          .ant-btn {
            height: 56px;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 600;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            border: 2px solid transparent;
            box-shadow: 0 8px 20px rgba(0, 76, 151, 0.25), 
                       0 4px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: white;
            letter-spacing: 0.02em;
            position: relative;
            overflow: hidden;
            
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: left 0.6s ease;
            }
            
            &:hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 28px rgba(0, 76, 151, 0.35), 
                         0 6px 12px rgba(0, 0, 0, 0.12);
              background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
              
              &::before {
                left: 100%;
              }
            }
            
            &:active {
              transform: translateY(-1px);
            }
          }
          
          .ant-form-item-label {
            padding-bottom: var(--spacing-sm);
            
            > label {
              font-weight: 600;
              color: var(--color-text-primary);
              font-size: 16px;
              margin-bottom: 8px;
              display: block;
              position: relative;
              letter-spacing: 0.02em;
              text-align: left;
              line-height: 1.5;
              
              &.ant-form-item-required::before {
                color: var(--color-accent);
                font-size: 18px;
                margin-right: 6px;
                font-weight: 700;
              }
              
              &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                transition: width 0.3s ease;
                border-radius: 1px;
              }
            }
          }
          
          .ant-form-item:focus-within .ant-form-item-label > label::after {
            width: 100%;
          }
          
          .ant-input-prefix {
            color: var(--color-primary);
            margin-right: var(--spacing-md);
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, rgba(0, 76, 151, 0.1), rgba(0, 76, 151, 0.05));
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .ant-input-affix-wrapper:hover .ant-input-prefix,
          .ant-input-affix-wrapper:focus-within .ant-input-prefix {
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: white;
            transform: scale(1.1);
          }
        }
      }
    
    .contact-info-card {
      border-radius: var(--border-radius-2xl);
      border: none;
      box-shadow: var(--shadow-xl);
      padding: var(--spacing-3xl);
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      background: white;
      
      .info-title {
        font-size: var(--font-size-3xl);
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-2xl);
        text-align: center;
        
        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: var(--color-secondary);
          margin: var(--spacing-lg) auto 0;
          border-radius: var(--border-radius-base);
        }
      }
      
      .contact-item {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        padding: var(--spacing-lg);
        border-radius: var(--border-radius-lg);
        background: var(--color-bg-tertiary);
        border: 2px solid transparent;
        transition: all var(--transition-normal);
        
        &:hover {
          background: rgba(0, 76, 151, 0.05);
          border-color: var(--color-primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        
        .contact-icon {
          font-size: var(--font-size-2xl);
          color: var(--color-primary);
          margin-top: var(--spacing-xs);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 76, 151, 0.1);
          border-radius: 50%;
        }
        
        .contact-content {
          flex: 1;
          
          .contact-label {
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-xs);
            font-size: var(--font-size-lg);
          }
          
          .contact-value {
            color: var(--color-text-secondary);
            line-height: 1.6;
            font-size: var(--font-size-base);
          }
        }
      }
      
      .emergency-contact {
        background: linear-gradient(135deg, var(--color-warning) 0%, #ff9800 100%);
        color: white;
        margin-top: var(--spacing-lg);
        transition: all 0.3s ease;
        
        .contact-icon {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .contact-content {
          .contact-label {
            color: white;
            transition: all 0.3s ease;
          }
          
          .contact-value {
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
          }
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 152, 0, 0.3);
          
          .contact-icon {
            color: #ff0000 !important;
            background: rgba(255, 0, 0, 0.1) !important;
          }
          
          .contact-label {
            color: #ff0000 !important;
          }
          
          .contact-value {
            color: #ff0000 !important;
          }
        }
      }
      
      .ant-alert {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-xxl) var(--spacing-xl);
        border-radius: var(--border-radius-lg);
        border: 2px solid #faad14;
        background: linear-gradient(135deg, #fff7e6 0%, #fffbe6 100%);
        box-shadow: 0 4px 12px rgba(250, 173, 20, 0.15);
        min-height: 180px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(250, 173, 20, 0.25);
          border-color: #d48806;
        }
        
        .ant-alert-icon {
          font-size: 24px;
          color: #d48806;
          margin-right: var(--spacing-md);
        }
        
        .ant-alert-content {
          flex: 1;
          
          .ant-alert-message {
            font-size: var(--font-size-lg);
            font-weight: 700;
            color: #d48806;
            margin-bottom: var(--spacing-xs);
          }
          
          .ant-alert-description {
            font-size: var(--font-size-base);
            color: #8c5a00;
            line-height: 1.6;
            margin: 0;
          }
        }
      }
    }
  }
  
  .map-section {
    padding: var(--spacing-5xl) 0;
    background: white;
    
    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-4xl);
      
      .section-title {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-lg);
      }
      
      .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }
    
    .map-container {
      border-radius: var(--border-radius-2xl);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      height: 500px;
      background: linear-gradient(135deg, var(--color-cloud-gray) 0%, var(--color-light-gray) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 3px solid var(--color-primary);
      
      .map-placeholder {
        text-align: center;
        color: var(--color-text-secondary);
        
        .map-icon {
          font-size: 4rem;
          color: var(--color-primary);
          margin-bottom: var(--spacing-lg);
        }
        
        .map-text {
          font-size: var(--font-size-xl);
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
        }
        
        .map-address {
          color: var(--color-text-secondary);
          font-size: var(--font-size-base);
        }
      }
    }
    
    .location-cards {
      margin-top: var(--spacing-4xl);
      
      .location-card {
        border-radius: var(--border-radius-xl);
        border: none;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
        height: 100%;
        background: white;
        overflow: hidden;
        
        &:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-2xl);
        }
        
        .location-header {
          text-align: center;
          padding: var(--spacing-xl) var(--spacing-lg) 0;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
          color: white;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid var(--color-primary-light);
          }
          
          .location-icon {
            font-size: var(--font-size-4xl);
            color: var(--color-secondary);
            margin-bottom: var(--spacing-lg);
          }
          
          .location-title {
            font-size: var(--font-size-xl);
            font-weight: 700;
            margin-bottom: var(--spacing-sm);
          }
          
          .location-type {
            font-size: var(--font-size-sm);
            opacity: 0.9;
            margin-bottom: var(--spacing-lg);
            background: rgba(255, 255, 255, 0.2);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--border-radius-base);
            display: inline-block;
          }
        }
        
        .location-content {
          padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-xl);
          
          .location-address {
            color: var(--color-text-secondary);
            line-height: 1.6;
            margin-bottom: var(--spacing-lg);
            font-size: var(--font-size-base);
            padding: var(--spacing-md);
            background: var(--color-bg-tertiary);
            border-radius: var(--border-radius-md);
            border-left: 4px solid var(--color-primary);
          }
          
          .location-contact {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
            
            .contact-detail {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              color: var(--color-text-secondary);
              font-size: var(--font-size-sm);
              padding: var(--spacing-xs) var(--spacing-sm);
              border-radius: var(--border-radius-base);
              transition: all var(--transition-fast);
              
              &:hover {
                background: var(--color-bg-secondary);
                color: var(--color-primary);
              }
              
              .anticon {
                color: var(--color-primary);
                font-size: var(--font-size-base);
              }
            }
          }
        }
      }
    }
  }
  
  .services-section {
    padding: 100px 0;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .container {
      position: relative;
      z-index: 1;
    }
    
    .service-card {
      /* Framework7 卡片设计 - 固定尺寸确保一致性 */
      border-radius: 20px;
      border: none;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(59, 130, 246, 0.1);
      
      /* 固定高度确保所有卡片大小一致 */
         height: 450px;
         min-height: 450px;
         max-height: 450px;
       
       /* Flexbox布局确保内容垂直分布 */
       display: flex;
       flex-direction: column;
       justify-content: flex-start;
       padding: 32px 24px;
      
      /* Framework7 风格的边框效果 */
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
        transform: scaleX(0);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 20px 20px 0 0;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%);
        transform: scale(0);
        transition: transform 0.6s ease;
        pointer-events: none;
      }
      
      &:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 20px 60px rgba(59, 130, 246, 0.25);
        border-color: rgba(59, 130, 246, 0.3);
        
        &::before {
          transform: scaleX(1);
        }
        
        &::after {
          transform: scale(1);
        }
        
        .service-icon {
          transform: scale(1.1);
          
          &::before {
            transform: scale(1);
          }
        }
        
        .service-title {
          &::after {
            transform: translateX(-50%) scaleX(1);
          }
        }
        
        .service-hours {
          background: linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(16, 185, 129, 0.15));
          border-color: rgba(5, 150, 105, 0.3);
          transform: scale(1.05);
          
          &::before {
            left: 100%;
          }
        }
      }
      
      /* 图标区域 */
      .service-icon {
        font-size: 52px;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        position: relative;
        transition: all 0.3s ease;
        
        &::before {
          content: '';
          position: absolute;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.1));
          border-radius: 50%;
          z-index: -1;
          transform: scale(0);
          transition: transform 0.3s ease;
        }
      }
      
      /* 标题区域 */
      .service-title {
        font-size: 20px;
        font-weight: 700;
        background: linear-gradient(135deg, #1e293b, #374151);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 18px;
        line-height: 1.4;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: -0.02em;
        position: relative;
        text-align: center;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          border-radius: 2px;
          transition: transform 0.3s ease;
        }
      }
      
      /* 描述区域 - 固定高度防止内容溢出 */
      .service-desc {
        color: #4b5563;
        line-height: 1.7;
        margin-bottom: 32px;
        font-size: 14px;
        min-height: 140px;
        flex-grow: 1;
        overflow: visible;
        font-weight: 400;
        letter-spacing: 0.01em;
        text-align: center;
        padding: 0 12px;
      }
      
      /* 服务时间区域 */
      .service-hours {
        background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(16, 185, 129, 0.1));
        padding: 14px 20px;
        border-radius: 25px;
        font-size: 13px;
        color: #059669;
        font-weight: 600;
        border: 2px solid rgba(5, 150, 105, 0.2);
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 44px;
        flex-shrink: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
        }
        
        .anticon {
          margin-right: 6px;
          color: var(--color-primary);
        }
      }
      
      /* 响应式设计 */
      @media (max-width: 768px) {
        height: 280px;
        min-height: 280px;
        max-height: 280px;
        padding: 20px 16px;
        
        .service-icon {
          font-size: 40px;
          height: 50px;
        }
        
        .service-title {
          font-size: 16px;
        }
        
        .service-desc {
          font-size: 13px;
          height: 72px;
          -webkit-line-clamp: 3;
        }
      }
      
      @media (max-width: 576px) {
        height: 260px;
        min-height: 260px;
        max-height: 260px;
        padding: 18px 14px;
        
        .service-icon {
          font-size: 36px;
          height: 45px;
        }
        
        .service-title {
          font-size: 15px;
        }
        
        .service-desc {
          font-size: 12px;
          height: 60px;
          -webkit-line-clamp: 3;
        }
        
        .service-hours {
          font-size: 12px;
          padding: 10px 12px;
        }
      }
    }
  }
  
  /* 服务时间区域 - Context7风格 */
  .office-hours {
    padding: 120px 0;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    
    .hours-content {
      position: relative;
      z-index: 2;
    }
    
    .hours-title {
      font-size: 42px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 20px;
      text-align: center;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hours-subtitle {
      font-size: 18px;
      color: #475569;
      text-align: center;
      margin-bottom: 60px;
      font-weight: 400;
      line-height: 1.6;
      letter-spacing: 0.01em;
    }
    
    .hours-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      
      .hours-item {
        background: #ffffff;
        border-radius: 20px;
        padding: 32px 24px;
        border: 2px solid #e2e8f0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        text-align: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        &:hover {
          transform: translateY(-8px);
          border-color: #2563eb;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          
          &::before {
            transform: scaleX(1);
          }
          
          .hours-icon {
            transform: scale(1.1);
            
            .anticon {
              background: linear-gradient(135deg, #1d4ed8, #2563eb);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          }
          
          .hours-label {
            color: #1e293b;
          }
          
          .hours-value {
            color: #2563eb;
            transform: scale(1.05);
          }
        }
        
        .hours-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(29, 78, 216, 0.1));
          border: 2px solid rgba(37, 99, 235, 0.2);
          transition: all 0.3s ease;
          
          .anticon {
            font-size: 28px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transition: all 0.3s ease;
          }
        }
        
        .hours-label {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
        }
        
        .hours-value {
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          line-height: 1.5;
          transition: all 0.3s ease;
        }
      }
    }
    
    /* 响应式设计 */
    @media (max-width: 992px) {
      padding: 80px 0;
      
      .hours-title {
        font-size: 36px;
      }
      
      .hours-subtitle {
        font-size: 16px;
        margin-bottom: 40px;
      }
      
      .hours-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        
        .hours-item {
          padding: 28px 20px;
          
          .hours-icon {
            width: 56px;
            height: 56px;
            
            .anticon {
              font-size: 24px;
            }
          }
          
          .hours-label {
            font-size: 16px;
          }
          
          .hours-value {
            font-size: 14px;
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      padding: 60px 0;
      
      .hours-title {
        font-size: 32px;
      }
      
      .hours-grid {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
        padding: 0 16px;
        
        .hours-item {
          padding: 24px 16px;
        }
      }
    }
    
    @media (max-width: 576px) {
      padding: 40px 0;
      
      .hours-title {
        font-size: 28px;
      }
      
      .hours-subtitle {
        font-size: 14px;
        margin-bottom: 30px;
      }
      
      .hours-grid {
        grid-template-columns: 1fr;
        gap: 12px;
        
        .hours-item {
          padding: 20px 16px;
          
          .hours-icon {
            width: 48px;
            height: 48px;
            
            .anticon {
              font-size: 20px;
            }
          }
          
          .hours-label {
            font-size: 14px;
          }
          
          .hours-value {
            font-size: 13px;
          }
        }
      }
    }
  }
  
  .chat-float-btn {
    @media (max-width: 576px) {
      bottom: 16px !important;
      right: 16px !important;
      width: 50px !important;
      height: 50px !important;
      fontSize: 20px !important;
    }
  }
`

const Contact = () => {
  const [form] = Form.useForm()
  const [chatVisible, setChatVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.1 })
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.1 })
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })
  const { ref: hoursRef, inView: hoursInView } = useInView({ threshold: 0.1 })

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      label: '联系电话',
      value: '销售热线：400-8888-668\n客服热线：400-9999-668\n总机：0580-2688888'
    },
    {
      icon: <MailOutlined />,
      label: '邮箱地址',
      value: '商务合作：business@tianjun-petro.com\n客户服务：service@tianjun-petro.com\n人才招聘：hr@tianjun-petro.com'
    },
    {
      icon: <EnvironmentOutlined />,
      label: '公司地址',
      value: '浙江省舟山市定海区临城街道\n天骏石化产业园区1号\n邮编：316021'
    },
    {
      icon: <AlertOutlined />,
      label: '24小时应急热线',
      value: '应急供应：400-1234-567\n安全事故：119\n专线直达：0580-2688999',
      emergency: true
    }
  ]

  const locations = [
    {
      title: '总部大楼',
      type: '行政管理',
      address: '浙江省舟山市定海区临城街道天骏石化产业园区1号',
      phone: '0580-2688888',
      email: 'info@tianjun-petro.com',
      icon: <BankOutlined />
    },
    {
      title: '定海储油库',
      type: '储存设施',
      address: '浙江省舟山市定海区临城街道，储量8000m³',
      phone: '0580-2688777',
      email: 'dinghai@tianjun-petro.com',
      icon: <TruckOutlined />
    },
    {
      title: '普陀储油库',
      type: '储存设施',
      address: '浙江省舟山市普陀区东港街道，储量6000m³',
      phone: '0580-2688666',
      email: 'putuo@tianjun-petro.com',
      icon: <TruckOutlined />
    },
    {
      title: '岱山储油库',
      type: '储存设施',
      address: '浙江省舟山市岱山县高亭镇，储量6000m³',
      phone: '0580-2688555',
      email: 'daishan@tianjun-petro.com',
      icon: <TruckOutlined />
    }
  ]

  const services = [
    {
      icon: <CustomerServiceOutlined />,
      title: '在线客服',
      desc: '专业的客服团队为您提供7×24小时在线咨询服务，解答产品和服务相关问题。',
      hours: '7×24小时在线'
    },
    {
      icon: <PhoneOutlined />,
      title: '电话咨询',
      desc: '拨打我们的销售热线，专业销售顾问将为您提供详细的产品介绍和报价服务。',
      hours: '周一至周六 8:00-18:00'
    },
    {
      icon: <WechatOutlined />,
      title: '微信咨询',
      desc: '添加企业微信，获取实时价格信息、配送状态查询和专业技术支持。',
      hours: '工作日 9:00-17:30'
    },
    {
      icon: <MessageOutlined />,
      title: '邮件咨询',
      desc: '发送详细需求到我们的邮箱，技术团队将在24小时内为您提供专业解决方案。',
      hours: '24小时内回复'
    }
  ]

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form values:', values)
      message.success('您的消息已发送，我们会在2小时内回复您！')
      form.resetFields()
    } catch (error) {
      message.error('发送失败，请稍后重试或直接拨打客服热线')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChatToggle = () => {
    setChatVisible(!chatVisible)
  }

  return (
    <StyledContact>
      <Helmet>
        <title>联系我们 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="联系天骏石化，获取专业的0#柴油产品和服务。多种联系方式，24小时应急响应。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">联系我们</h1>
              <p className="hero-subtitle">
                第三代家族经营石化企业，为您提供专业的0#柴油产品和优质服务
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <PhoneOutlined className="feature-icon" />
                  <span>24小时热线</span>
                </div>
                <div className="feature-item">
                  <TruckOutlined className="feature-icon" />
                  <span>2小时应急响应</span>
                </div>
                <div className="feature-item">
                  <SafetyOutlined className="feature-icon" />
                  <span>持证经营</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" ref={contactRef}>
        <div className="container">
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Card className="contact-form-card">
                  <h3 className="form-title">发送消息</h3>
                  <p className="form-subtitle">请填写以下信息，我们会在2小时内与您联系</p>
                  
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    size="large"
                  >
                    <Form.Item
                      label="姓名"
                      name="name"
                      rules={[{ required: true, message: '请输入您的姓名' }]}
                    >
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <UserOutlined />
                        </span>
                        <Input placeholder="请输入您的姓名" />
                      </div>
                    </Form.Item>
                    
                    <Form.Item
                      label="公司"
                      name="company"
                      rules={[{ required: true, message: '请输入公司名称' }]}
                    >
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <BankOutlined />
                        </span>
                        <Input placeholder="请输入公司名称" />
                      </div>
                    </Form.Item>
                    
                    <Form.Item
                      label="手机号"
                      name="phone"
                      rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                      ]}
                    >
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <PhoneOutlined />
                        </span>
                        <Input placeholder="请输入手机号" />
                      </div>
                    </Form.Item>
                    
                    <Form.Item
                      label="邮箱"
                      name="email"
                      rules={[
                        { required: true, message: '请输入邮箱地址' },
                        { type: 'email', message: '请输入正确的邮箱地址' }
                      ]}
                    >
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <MailOutlined />
                        </span>
                        <Input placeholder="请输入邮箱地址" />
                      </div>
                    </Form.Item>
                    
                    <Form.Item
                      label="需求类别"
                      name="category"
                      rules={[{ required: true, message: '请选择需求类别' }]}
                    >
                      <Select placeholder="请选择您的需求类别">
                        <Option value="purchase">产品采购</Option>
                        <Option value="delivery">配送服务</Option>
                        <Option value="emergency">应急供应</Option>
                        <Option value="cooperation">商务合作</Option>
                        <Option value="career">人才招聘</Option>
                        <Option value="other">其他咨询</Option>
                      </Select>
                    </Form.Item>
                    
                    <Form.Item
                      label="详细需求"
                      name="message"
                      rules={[{ required: true, message: '请输入详细需求' }]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="请详细描述您的需求，我们会为您提供专业的解决方案"
                      />
                    </Form.Item>
                    
                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        block 
                        icon={<SendOutlined />}
                        loading={submitting}
                        className="btn-primary"
                      >
                        {submitting ? '发送中...' : '发送消息'}
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </motion.div>
            </Col>
            
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={contactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="contact-info-card">
                  <h3 className="info-title">联系信息</h3>
                  
                  {contactInfo.map((item, index) => (
                    <div key={index} className={`contact-item ${item.emergency ? 'emergency-contact' : ''}`}>
                      <div className="contact-icon">{item.icon}</div>
                      <div className="contact-content">
                        <div className="contact-label">{item.label}</div>
                        <div className="contact-value">
                          {item.value.split('\n').map((line, idx) => (
                            <div key={idx}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Alert
                    message="应急提示"
                    description="如遇紧急情况，请直接拨打400-1234-567应急热线，我们将2小时内响应。"
                    type="warning"
                    showIcon
                    style={{ marginTop: 'var(--spacing-lg)' }}
                  />
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section" ref={mapRef}>
        <div className="container">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title">我们的位置</h2>
              <p className="section-subtitle">
                覆盖舟山地区的服务网络，3个储油库 + 总部大楼，为您提供便捷的服务
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="map-container">
              <div className="map-placeholder">
                <EnvironmentOutlined className="map-icon" />
                <div className="map-text">舟山市服务网络地图</div>
                <div className="map-address">浙江省舟山市定海区临城街道</div>
                <div style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-primary)', fontWeight: 600 }}>
                  3个储油库 • 1个总部 • 全市覆盖
                </div>
              </div>
            </div>
          </motion.div>
          
          <Row gutter={[24, 24]} className="location-cards">
            {locations.map((location, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={mapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="location-card">
                    <div className="location-header">
                      {location.icon}
                      <div className="location-title">{location.title}</div>
                      <div className="location-type">{location.type}</div>
                    </div>
                    <div className="location-content">
                      <div className="location-address">{location.address}</div>
                      <div className="location-contact">
                        <div className="contact-detail">
                          <PhoneOutlined />
                          <span>{location.phone}</span>
                        </div>
                        <div className="contact-detail">
                          <MailOutlined />
                          <span>{location.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}>联系方式</h2>
            <p style={{
              fontSize: '18px',
              color: '#475569',
              fontWeight: '400',
              lineHeight: '1.6',
              letterSpacing: '0.01em'
            }}>
              多种便捷的联系方式，随时为您服务
            </p>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="service-card">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-title">{service.title}</div>
                    <div className="service-desc">{service.desc}</div>
                    <div className="service-hours">
                      <ClockCircleOutlined style={{ marginRight: '8px' }} />
                      {service.hours}
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Office Hours */}
      <section className="office-hours" ref={hoursRef}>
        <div className="container">
          <div className="hours-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={hoursInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="hours-title">服务时间</h2>
              <p className="hours-subtitle">全方位服务保障，随时为您提供专业支持</p>
              <div className="hours-grid">
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="hours-icon"><CustomerServiceOutlined /></div>
                  <div className="hours-label">客服热线</div>
                  <div className="hours-value">7×24小时全天候服务</div>
                </motion.div>
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="hours-icon"><DollarOutlined /></div>
                  <div className="hours-label">销售咨询</div>
                  <div className="hours-value">周一至周六 8:00-18:00</div>
                </motion.div>
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="hours-icon"><TeamOutlined /></div>
                  <div className="hours-label">技术支持</div>
                  <div className="hours-value">周一至周五 9:00-17:30</div>
                </motion.div>
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="hours-icon"><AlertOutlined /></div>
                  <div className="hours-label">应急响应</div>
                  <div className="hours-value">2小时内快速响应</div>
                </motion.div>
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="hours-icon"><ToolOutlined /></div>
                  <div className="hours-label">设备维护</div>
                  <div className="hours-value">周一至周日 24小时待命</div>
                </motion.div>
                <motion.div 
                  className="hours-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoursInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="hours-icon"><SafetyOutlined /></div>
                  <div className="hours-label">安全监控</div>
                  <div className="hours-value">全年无休安全保障</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 在线客服浮动按钮 */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<MessageOutlined />}
        onClick={handleChatToggle}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          zIndex: 1000,
          boxShadow: 'var(--shadow-xl)',
          background: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)',
          color: 'var(--color-graphite)'
        }}
        className="chat-float-btn"
      />

      {/* 简单的在线客服模态框 */}
      <Modal
        title="在线客服"
        open={chatVisible}
        onCancel={() => setChatVisible(false)}
        footer={null}
        width={400}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CustomerServiceOutlined style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '16px' }}>在线客服</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
            欢迎使用天骏石化在线客服，我们为您提供专业的产品咨询和服务支持。
          </p>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button 
              block 
              icon={<PhoneOutlined />}
              onClick={() => window.open('tel:400-8888-668')}
            >
              拨打销售热线
            </Button>
            <Button 
              block 
              icon={<WechatOutlined />}
              style={{ background: '#07c160', borderColor: '#07c160', color: 'white' }}
            >
              微信咨询
            </Button>
            <Button 
              block 
              icon={<MailOutlined />}
              onClick={() => window.open('mailto:service@tianjun-petro.com')}
            >
              邮件咨询
            </Button>
          </Space>
        </div>
      </Modal>
    </StyledContact>
  )
}

export default Contact