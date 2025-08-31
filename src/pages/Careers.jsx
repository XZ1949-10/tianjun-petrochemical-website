import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal, Form, Input, Select, Upload, message, Tag } from 'antd'
import { 
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  DollarOutlined,
  SendOutlined,
  UploadOutlined,
  HeartOutlined,
  TrophyOutlined,
  SafetyOutlined,
  BookOutlined,
  CoffeeOutlined,
  PlayCircleOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const { TextArea } = Input
const { Option } = Select

const StyledCareers = styled.div`
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
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  
  .culture-video {
    padding: var(--spacing-5xl) 0;
    
    .video-placeholder {
      background: linear-gradient(135deg, var(--color-cloud-gray) 0%, var(--color-light-gray) 100%);
      height: 400px;
      border-radius: var(--border-radius-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all var(--transition-normal);
      
      &:hover {
        background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
        color: white;
      }
      
      .play-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-md);
      }
      
      .video-title {
        font-size: var(--font-size-xl);
        font-weight: 600;
      }
    }
  }
  
  .positions-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-5xl) 0;
    
    .position-card {
      background: white;
      border-radius: var(--border-radius-xl);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-base);
      transition: all var(--transition-normal);
      height: 100%;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      .position-header {
        margin-bottom: var(--spacing-lg);
        
        .position-title {
          font-size: var(--font-size-xl);
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }
        
        .position-department {
          color: var(--color-primary);
          font-weight: 500;
          margin-bottom: var(--spacing-md);
        }
        
        .position-tags {
          display: flex;
          gap: var(--spacing-xs);
          flex-wrap: wrap;
        }
      }
      
      .position-details {
        margin-bottom: var(--spacing-lg);
        
        .detail-item {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          
          .anticon {
            color: var(--color-primary);
            margin-right: var(--spacing-sm);
            width: 16px;
          }
        }
      }
      
      .position-requirements {
        margin-bottom: var(--spacing-lg);
        
        .requirements-title {
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }
        
        .requirements-list {
          list-style: none;
          padding: 0;
          
          li {
            color: var(--color-text-secondary);
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-xs);
            position: relative;
            padding-left: var(--spacing-md);
            
            &:before {
              content: '•';
              color: var(--color-primary);
              position: absolute;
              left: 0;
            }
          }
        }
      }
      
      .apply-btn {
        width: 100%;
      }
    }
  }
  
  .benefits-section {
    padding: 120px 0;
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
      background: linear-gradient(135deg, rgba(41, 128, 185, 0.03) 0%, rgba(142, 68, 173, 0.03) 100%);
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      top: 20%;
      right: -10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(41, 128, 185, 0.05) 0%, transparent 70%);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }

    .container {
      position: relative;
      z-index: 2;
    }

    .benefits-header {
      text-align: center;
      margin-bottom: 80px;
      position: relative;
      z-index: 2;
    }

    .benefits-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #2980b9 0%, #8e44ad 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 24px;
      box-shadow: 0 8px 25px rgba(41, 128, 185, 0.3);
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

      &:hover::before {
        left: 100%;
      }

      .badge-icon {
        font-size: 1.1rem;
        animation: pulse 2s infinite;
      }
    }

    .benefits-main-title {
      color: #2c3e50;
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .benefits-subtitle {
      color: #7f8c8d;
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .modern-benefit-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(41, 128, 185, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #2980b9, #8e44ad, #e74c3c, #f39c12);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
      border-color: rgba(41, 128, 185, 0.3);

      &::before {
        transform: scaleX(1);
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .benefit-icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;

      &.benefit-1 {
        background: linear-gradient(135deg, #3498db, #2980b9);
      }

      &.benefit-2 {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
      }

      &.benefit-3 {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
      }

      &.benefit-4 {
        background: linear-gradient(135deg, #f39c12, #e67e22);
      }

      &.benefit-5 {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
      }

      &.benefit-6 {
        background: linear-gradient(135deg, #1abc9c, #16a085);
      }

      .icon-container {
        color: white;
        font-size: 1.8rem;
        z-index: 2;
        position: relative;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.4s ease;
      }
    }

    &:hover .benefit-icon-wrapper::after {
      width: 100px;
      height: 100px;
    }

    .benefit-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #bdc3c7;
      opacity: 0.6;
    }

    .card-content {
      margin-bottom: 24px;
    }

    .benefit-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
      line-height: 1.3;
    }

    .benefit-desc {
      color: #7f8c8d;
      line-height: 1.6;
      font-size: 0.95rem;
      margin-bottom: 16px;
    }

    .benefit-features {
      display: flex;
      align-items: center;
      gap: 8px;

      .feature-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2980b9, #8e44ad);
      }

      .feature-text {
        font-size: 0.85rem;
        color: #95a5a6;
        font-weight: 500;
      }
    }

    .card-footer {
      border-top: 1px solid #ecf0f1;
      padding-top: 16px;
    }

    .benefit-status {
      display: flex;
      align-items: center;
      gap: 8px;

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2ecc71;
        animation: statusPulse 2s infinite;
      }

      .status-text {
        font-size: 0.85rem;
        color: #2ecc71;
        font-weight: 600;
      }
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(10px) rotate(240deg); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes fadeInUp {
     from {
       opacity: 0;
       transform: translateY(30px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }

   /* 响应式设计 */
   @media (max-width: 1200px) {
     .benefits-grid {
       grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
       gap: 25px;
     }

     .modern-benefit-card {
       padding: 28px;
     }
   }

   @media (max-width: 768px) {
     .benefits-section {
       padding: 80px 0;

       &::after {
         width: 200px;
         height: 200px;
         top: 10%;
         right: -15%;
       }

       .benefits-main-title {
         font-size: 2.2rem;
       }

       .benefits-subtitle {
         font-size: 1.1rem;
         padding: 0 20px;
       }

       .benefits-header {
         margin-bottom: 60px;
       }
     }

     .benefits-grid {
       grid-template-columns: 1fr;
       gap: 20px;
       padding: 0 20px;
     }

     .modern-benefit-card {
       padding: 24px;

       .benefit-icon-wrapper {
         width: 60px;
         height: 60px;

         .icon-container {
           font-size: 1.5rem;
         }
       }

       .benefit-number {
         font-size: 1.3rem;
       }

       .benefit-title {
         font-size: 1.2rem;
       }

       .benefit-desc {
         font-size: 0.9rem;
       }
     }
   }

   @media (max-width: 480px) {
     .benefits-section {
       padding: 60px 0;

       .benefits-main-title {
         font-size: 1.8rem;
       }

       .benefits-badge {
         padding: 10px 20px;
         font-size: 0.85rem;
       }
     }

     .benefits-grid {
       padding: 0 15px;
     }

     .modern-benefit-card {
       padding: 20px;

       .card-header {
         margin-bottom: 20px;
       }

       .card-content {
         margin-bottom: 20px;
       }

       .benefit-icon-wrapper {
         width: 50px;
         height: 50px;

         .icon-container {
           font-size: 1.3rem;
         }
       }

       .benefit-title {
         font-size: 1.1rem;
       }

       .benefit-desc {
         font-size: 0.85rem;
       }
     }
   }
  
  .internship-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-5xl) 0;
    
    .internship-card {
      background: white;
      border-radius: var(--border-radius-2xl);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-lg);
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s ease;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        
        &::before {
          left: 100%;
        }
        
        .internship-title {
          color: var(--color-secondary);
        }
        
        .feature-item {
          transform: translateY(-2px);
        }
      }
      
      .internship-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: var(--spacing-lg);
      }
      
      .internship-desc {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: var(--spacing-xl);
      }
      
      .internship-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
        
        .feature-item {
          text-align: left;
          padding: 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(41, 128, 185, 0.05), rgba(142, 68, 173, 0.05));
            border-radius: 8px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          &:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            
            &::before {
              opacity: 1;
            }
            
            .feature-title {
              color: var(--color-primary);
            }
          }
          
          .feature-title {
            font-weight: 600;
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-xs);
            transition: color 0.3s ease;
            position: relative;
            z-index: 1;
          }
          
          .feature-desc {
            color: var(--color-text-secondary);
            font-size: var(--font-size-sm);
            position: relative;
            z-index: 1;
          }
        }
      }
      
      .btn-secondary {
        display: block;
        margin: 0 auto;
        width: auto;
        min-width: 200px;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
        
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }
        
        &:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          
          &::before {
            width: 300px;
            height: 300px;
          }
        }
        
        &:active {
          transform: translateY(0) scale(0.98);
        }
      }
    }
  }
  
  .apply-modal {
    .ant-modal-content {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
    
    .ant-modal-header {
      background: linear-gradient(135deg, #2980b9 0%, #8e44ad 100%);
      border: none;
      padding: 30px;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: shimmer 3s infinite;
      }
      
      .ant-modal-title {
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        margin: 0;
        position: relative;
        z-index: 2;
      }
    }
    
    .ant-modal-close {
      top: 20px;
      right: 20px;
      color: white;
      
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    
    .ant-modal-body {
      padding: 40px;
      background: #fafbfc;
    }
    
    .form-section {
      background: white;
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(41, 128, 185, 0.1);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #2980b9, #8e44ad, #e74c3c, #f39c12);
      }
      
      .section-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 2px solid #ecf0f1;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(135deg, #2980b9, #8e44ad);
        }
      }
    }
    
    .ant-form-item {
      margin-bottom: 20px;
      
      .ant-form-item-label {
        padding-bottom: 8px;
        
        label {
          font-weight: 600;
          color: #34495e;
          font-size: 0.95rem;
          
          &.ant-form-item-required::before {
            color: #e74c3c;
          }
        }
      }
      
      .ant-input,
      .ant-select-selector,
      .ant-input-affix-wrapper {
        border-radius: 12px;
        border: 2px solid #ecf0f1;
        padding: 12px 16px;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #bdc3c7;
        }
        
        &:focus,
        &.ant-input-focused,
        &.ant-select-focused {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
      }
      
      .ant-input::placeholder,
      .ant-select-selection-placeholder {
        color: #95a5a6;
        font-style: italic;
      }
    }
    
    .ant-upload {
      .ant-btn {
        border-radius: 12px;
        border: 2px dashed #bdc3c7;
        background: #f8f9fa;
        color: #7f8c8d;
        font-weight: 600;
        padding: 12px 24px;
        height: auto;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #3498db;
          background: #ebf3fd;
          color: #3498db;
        }
        
        .anticon {
          margin-right: 8px;
        }
      }
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #2980b9 0%, #8e44ad 100%);
      border: none;
      border-radius: 12px;
      padding: 16px 32px;
      font-size: 1.1rem;
      font-weight: 700;
      height: auto;
      box-shadow: 0 8px 25px rgba(41, 128, 185, 0.3);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(41, 128, 185, 0.4);
        
        &::before {
          width: 300px;
          height: 300px;
        }
      }
      
      &:active {
        transform: translateY(0);
      }
      
      .anticon {
        margin-right: 8px;
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

  const openPositions = [
    {
      id: 1,
      title: '运输司机',
      department: '运营部',
      location: '舟山',
      type: '全职',
      salary: '6000-8000',
      requirements: [
        '持有A2或以上驾驶证',
        '3年以上危险品运输经验',
        '熟悉舟山地区道路',
        '工作责任心强，安全意识高'
      ]
    },
    {
      id: 2,
      title: '销售经理',
      department: '销售部',
      location: '舟山',
      type: '全职',
      salary: '8000-12000',
      requirements: [
        '本科以上学历，市场营销相关专业',
        '3年以上B2B销售经验',
        '具备石化行业客户资源优先',
        '良好的沟通协调能力'
      ]
    },
    {
      id: 3,
      title: '安全管理员',
      department: '安全部',
      location: '舟山',
      type: '全职',
      salary: '7000-9000',
      requirements: [
        '安全工程或相关专业本科以上学历',
        '持有注册安全工程师证书',
        '熟悉危化品安全管理法规',
        '5年以上安全管理工作经验'
      ]
    },
    {
      id: 4,
      title: '财务专员',
      department: '财务部',
      location: '舟山',
      type: '全职',
      salary: '5000-7000',
      requirements: [
        '财务、会计相关专业本科学历',
        '持有会计师职业资格证书',
        '熟练操作财务软件',
        '2年以上财务工作经验'
      ]
    },
    {
      id: 5,
      title: '设备维护技师',
      department: '技术部',
      location: '舟山',
      type: '全职',
      salary: '6000-8000',
      requirements: [
        '机械、电气相关专业大专以上学历',
        '熟悉油品储运设备维护',
        '具备电工、焊工等相关证书',
        '3年以上设备维护经验'
      ]
    },
    {
      id: 6,
      title: '人事专员',
      department: '行政部',
      location: '舟山',
      type: '全职',
      salary: '4500-6500',
      requirements: [
        '人力资源管理相关专业本科学历',
        '熟悉劳动法律法规',
        '良好的人际沟通能力',
        '1年以上人事工作经验'
      ]
    }
  ]

  const benefits = [
    {
      icon: <TrophyOutlined className="insurance" />,
      title: '完善保险',
      desc: '五险一金全覆盖，额外商业保险，全方位保障员工权益'
    },
    {
      icon: <BookOutlined className="training" />,
      title: '培训发展',
      desc: '系统化培训体系，专业技能提升，职业发展规划指导'
    },
    {
      icon: <HeartOutlined className="family" />,
      title: '家庭关爱',
      desc: '员工家庭日活动，子女教育补贴，节日慰问福利'
    },
    {
      icon: <SafetyOutlined className="growth" />,
      title: '晋升机制',
      desc: '公平的晋升通道，绩效考核体系，优秀员工表彰奖励'
    },
    {
      icon: <CoffeeOutlined className="welfare" />,
      title: '员工福利',
      desc: '年度体检，团建活动，带薪年假，节日礼品发放'
    },
    {
      icon: <EnvironmentOutlined className="environment" />,
      title: '工作环境',
      desc: '现代化办公环境，完善的设施设备，舒适的工作氛围'
    }
  ]

  const handleApply = (position) => {
    setSelectedPosition(position)
    setApplyModalVisible(true)
  }

  const handleSubmitApplication = (values) => {
    console.log('应聘信息:', values)
    message.success('简历已提交，我们将在3个工作日内联系您！')
    setApplyModalVisible(false)
    form.resetFields()
  }

  return (
    <StyledCareers>
      <Helmet>
        <title>招聘信息 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="加入天骏石化团队，我们提供有竞争力的薪酬、完善的福利待遇和广阔的职业发展空间。查看最新招聘职位。" />
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
            <h1 className="hero-title">加入天骏大家庭</h1>
            <p className="hero-subtitle">
              与我们一起成长，在第三代家族企业中实现职业梦想<br />
              提供有竞争力的薪酬和完善的职业发展平台
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Video */}
      <section className="culture-video">
        <div className="container">
          <h2 className="section-title">企业文化视频</h2>
          <p className="section-subtitle">了解天骏石化的企业文化和工作环境</p>
          
          <div className="video-placeholder">
            <PlayCircleOutlined className="play-icon" />
            <div className="video-title">天骏石化企业文化宣传片</div>
            <p style={{ marginTop: 'var(--spacing-sm)', opacity: 0.8 }}>点击播放 (3分钟)</p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="positions-section" ref={positionsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">招聘职位</h2>
            <p className="section-subtitle">
              我们正在寻找优秀的人才加入我们的团队
            </p>
          </motion.div>

          <Row gutter={[24, 24]}>
            {openPositions.map((position, index) => (
              <Col xs={24} md={12} lg={8} key={position.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={positionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="position-card">
                    <div className="position-header">
                      <h3 className="position-title">{position.title}</h3>
                      <div className="position-department">{position.department}</div>
                      <div className="position-tags">
                        <Tag color="blue">{position.type}</Tag>
                        <Tag color="green">{position.location}</Tag>
                      </div>
                    </div>
                    
                    <div className="position-details">
                      <div className="detail-item">
                        <EnvironmentOutlined />
                        <span>工作地点：{position.location}</span>
                      </div>
                      <div className="detail-item">
                        <ClockCircleOutlined />
                        <span>工作类型：{position.type}</span>
                      </div>
                      <div className="detail-item">
                        <DollarOutlined />
                        <span>薪资范围：{position.salary}元/月</span>
                      </div>
                    </div>
                    
                    <div className="position-requirements">
                      <div className="requirements-title">任职要求：</div>
                      <ul className="requirements-list">
                        {position.requirements.slice(0, 3).map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      type="primary" 
                      className="btn-primary apply-btn"
                      onClick={() => handleApply(position)}
                    >
                      <SendOutlined /> 立即申请
                    </Button>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="benefits-header"
          >
            <div className="benefits-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">员工关怀</span>
            </div>
            <h2 className="benefits-main-title">员工福利待遇</h2>
            <p className="benefits-subtitle">
              全面的福利保障体系，为您的职业发展保驾护航
            </p>
          </motion.div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="modern-benefit-card"
              >
                <div className="card-header">
                  <div className={`benefit-icon-wrapper benefit-${index + 1}`}>
                    <div className="icon-container">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="benefit-number">0{index + 1}</div>
                </div>
                <div className="card-content">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-desc">{benefit.desc}</p>
                  <div className="benefit-features">
                    <div className="feature-dot"></div>
                    <span className="feature-text">专业保障</span>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="benefit-status">
                    <span className="status-indicator"></span>
                    <span className="status-text">全员享有</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <section className="internship-section">
        <div className="container">
          <h2 className="section-title">实习生计划</h2>
          <p className="section-subtitle">为优秀学生提供实习和学习机会</p>
          
          <Card className="internship-card">
            <h3 className="internship-title">天骏石化实习生项目</h3>
            <p className="internship-desc">
              我们欢迎来自石化、安全、物流、商务等相关专业的优秀学生加入我们的实习项目。
              在这里，您将获得宝贵的行业经验和专业技能培训。
            </p>
            
            <div className="internship-features">
              <div className="feature-item">
                <div className="feature-title">实习津贴</div>
                <div className="feature-desc">提供有竞争力的实习津贴</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">导师制度</div>
                <div className="feature-desc">配备专业导师一对一指导</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">转正机会</div>
                <div className="feature-desc">表现优秀者可获得正式工作机会</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">实习证明</div>
                <div className="feature-desc">提供正式的实习证明和推荐信</div>
              </div>
            </div>
            
            <Button 
              type="primary" 
              className="btn-secondary" 
              size="large"
              onClick={() => handleApply({ id: 'intern', title: '实习生', department: '各部门' })}
            >
              申请实习机会
            </Button>
          </Card>
        </div>
      </section>

      {/* Apply Modal */}
      <Modal
        title={`申请职位：${selectedPosition?.title || ''}`}
        open={applyModalVisible}
        onCancel={() => setApplyModalVisible(false)}
        footer={null}
        width={700}
        className="apply-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitApplication}>
          <div className="form-section">
            <h4 className="section-title">个人信息</h4>
            <Row gutter={16}>
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}>
                  <Input placeholder="请输入邮箱地址" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="期望薪资" name="expectedSalary">
                  <Select placeholder="请选择期望薪资范围">
                    <Option value="4000-6000">4000-6000元</Option>
                    <Option value="6000-8000">6000-8000元</Option>
                    <Option value="8000-10000">8000-10000元</Option>
                    <Option value="10000+">10000元以上</Option>
                    <Option value="面议">面议</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <h4 className="section-title">工作经历</h4>
            <Form.Item label="工作经验" name="experience">
              <TextArea placeholder="请简要描述您的工作经验，包括公司名称、职位、主要职责等" rows={4} />
            </Form.Item>
          </div>

          <div className="form-section">
            <h4 className="section-title">简历上传</h4>
            <Form.Item label="简历文件" name="resume">
              <Upload>
                <Button icon={<UploadOutlined />}>上传简历 (PDF/DOC)</Button>
              </Upload>
            </Form.Item>
          </div>

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