import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Carousel, Statistic, List, Tag, Avatar, Rate, Badge, Modal, Form, Input, Select, message } from 'antd'
import { 
  TrophyOutlined, 
  SafetyOutlined, 
  PhoneOutlined,
  RocketOutlined,
  BarChartOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  CrownFilled,
  SafetyCertificateFilled,
  ToolOutlined,
  ExperimentOutlined,
  SearchOutlined,
  DollarOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import EChartsNetworkMap from '../components/Common/EChartsNetworkMap'
import { TrustBar } from '../components/Trust'
// API集成导入
import { useAPI } from '../hooks/useAPI'
import api from '../services/api'

const StyledHome = styled.div`
  .hero-section {
    height: 100vh;
    position: relative;
    overflow: hidden;
    
    .ant-carousel {
      height: 100%;
      
      .slick-slide {
        height: 100vh;
        
        > div {
          height: 100%;
        }
      }
    }
    
    .hero-slide {
      height: 100vh;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1;
      }
      
      .hero-content {
        text-align: center;
        color: white;
        z-index: 2;
        position: relative;
        max-width: 900px;
        padding: 0 var(--spacing-lg);
        
        .hero-title {
          font-size: var(--font-size-6xl);
          font-weight: 700;
          margin-bottom: var(--spacing-xl);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          line-height: 1.2;
          
          @media (max-width: 576px) {
            font-size: var(--font-size-3xl);
            margin-bottom: var(--spacing-lg);
          }
          
          @media (max-width: 768px) {
            font-size: var(--font-size-4xl);
          }
        }
        
        .hero-subtitle {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-2xl);
          opacity: 0.95;
          line-height: 1.6;
          
          @media (max-width: 576px) {
            font-size: var(--font-size-base);
            margin-bottom: var(--spacing-lg);
          }
          
          @media (max-width: 768px) {
            font-size: var(--font-size-lg);
          }
        }
        
        .hero-features {
          display: flex;
          justify-content: center;
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
          
          .feature-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            font-size: var(--font-size-base);
            opacity: 0.9;
          }
          
          @media (max-width: 576px) {
            flex-direction: column;
            gap: var(--spacing-sm);
            
            .feature-item {
              font-size: var(--font-size-sm);
            }
          }
          
          @media (max-width: 768px) {
            flex-direction: column;
            gap: var(--spacing-md);
          }
        }
        
        .hero-cta {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          
          .ant-btn {
            height: 55px;
            padding: 0 var(--spacing-2xl);
            font-size: var(--font-size-lg);
            font-weight: 600;
            border-radius: var(--border-radius-xl);
            
            @media (max-width: 768px) {
              padding: 0 var(--spacing-xl);
              font-size: var(--font-size-base);
            }
          }
          
          @media (max-width: 576px) {
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-md);
            
            .ant-btn {
              width: 100%;
              max-width: 280px;
              height: 48px;
              padding: 0 var(--spacing-lg);
              font-size: var(--font-size-base);
            }
          }
          
          @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
          }
        }
      }
    }
  }
  
  .trust-bar {
    background: #ffffff;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
    border-radius: 0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    

    
    .trust-section-header {
      text-align: center;
      margin-bottom: 60px;
      position: relative;
      z-index: 2;
      
      .trust-main-title {
        font-size: 42px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 16px;
        text-shadow: none;
        letter-spacing: -0.5px;
      }
      
      .trust-subtitle {
        font-size: 18px;
        color: #64748b;
        margin: 0;
        font-weight: 400;
        letter-spacing: 2px;
      }
    }
    
    .trust-content {
      display: flex;
      gap: 40px;
      justify-content: center;
      align-items: stretch;
      position: relative;
      z-index: 2;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .trust-card-wrapper {
      flex: 1;
      max-width: 420px;
      display: flex;
    }
    
    .trust-card {
      width: 100%;
      height: 100%;
      border-radius: 24px !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12) !important;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      background: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      overflow: hidden !important;
      position: relative;
      display: flex;
      flex-direction: column;
      

      
      &:hover {
        transform: translateY(-15px) scale(1.02) !important;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2) !important;
      }
      
      .card-premium-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 30px 20px;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        
        .header-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 20px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          
          &.gold {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          }
          
          &.service {
            background: linear-gradient(135deg, #10b981, #059669);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          

          
          .badge-icon {
            font-size: 16px;
          }
        }
        
        .header-stats {
          text-align: right;
          
          .main-number {
            display: block;
            font-size: 32px;
            font-weight: 800;
            color: #1e293b;
            line-height: 1;
            margin-bottom: 4px;
          }
          
          .stats-label {
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
          }
        }
      }
      
      .card-content {
        padding: 30px;
        min-height: 320px;
        display: flex;
        flex-direction: column;
        flex: 1;
        
        .content-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 24px;
          text-align: center;
        }
        
        /* 确保内容区域填充剩余空间 */
        .clients-showcase,
        .certifications-grid,
        .performance-metrics {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .clients-showcase {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-content: start;
        }
      }
      
      .card-footer {
        padding: 24px 30px;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        background: linear-gradient(135deg, #fafbfc, #f4f6f8);
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
        
        .trust-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
          width: 100%;
          text-align: center;
          line-height: 1.4;
          
          .trust-icon {
            color: #10b981;
            font-size: 16px;
            flex-shrink: 0;
          }
        }
      }
    }
    
    /* Premium Clients Card Styles */
    .clients-showcase {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 0;
      flex: 1;
      
      .client-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
        border-radius: 16px;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05);
        
        &.featured {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border: 2px solid #3b82f6;
        }
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .client-logo {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }
        
        .client-type {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }
      }
      
      .clients-more {
        grid-column: 1 / -1;
        text-align: center;
        padding: 12px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 12px;
        color: #64748b;
        font-size: 14px;
        font-weight: 500;
      }
    }
    
    /* Certifications Card Styles */
    .certifications-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
      margin-bottom: 0;
      
      .cert-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 16px;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05);
        
        &:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .cert-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          font-weight: 700;
          color: white;
          text-align: center;
          
          &.iso-9001 {
            background: linear-gradient(135deg, #10b981, #059669);
          }
          
          &.iso-14001 {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          }
          
          &.ohsas {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }
          
          .cert-code {
            font-size: 10px;
            line-height: 1;
          }
          
          .cert-number {
            font-size: 14px;
            line-height: 1;
          }
        }
        
        .cert-name {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }
        
        .cert-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #10b981;
          font-weight: 600;
        }
      }
    }
    
    /* Service Statistics Card Styles */
    .performance-metrics {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
      margin-bottom: 0;
      
      .metric-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 20px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 16px;
        transition: all 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.05);
        
        &:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .metric-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          font-size: 14px;
          text-align: center;
          line-height: 1.2;
        }
        
        &.primary .metric-circle {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }
        
        &.success .metric-circle {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        &.warning .metric-circle {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }
        
        .metric-info {
          flex: 1;
          
          .metric-label {
            display: block;
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 4px;
          }
          
          .metric-desc {
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
          }
        }
      }
    }
    
    /* Responsive Design */
    @media (max-width: 1200px) {
      .trust-content {
        gap: 30px;
      }
      
      .trust-main-title {
        font-size: 36px;
      }
    }
    
    @media (max-width: 768px) {
      padding: 80px 0;
      
      .trust-content {
        flex-direction: column;
        gap: 30px;
      }
      
      .trust-main-title {
        font-size: 28px;
      }
      
      .trust-subtitle {
        font-size: 16px;
      }
      
      .clients-showcase {
        grid-template-columns: 1fr;
        
        .client-item.featured {
          grid-column: 1;
        }
        
        .clients-more {
          grid-column: 1;
        }
      }
      
      .card-premium-header {
        padding: 20px 20px 15px;
      }
      
      .card-content {
        padding: 20px;
      }
      
      .card-footer {
        padding: 20px;
        min-height: 70px;
      }
      
      .trust-card-wrapper {
        display: flex;
      }
      
      .trust-card {
        display: flex;
        flex-direction: column;
      }
      
      .card-content {
        flex: 1;
      }
    }
  }
  
  .services-section {
    padding: var(--spacing-5xl) 0;
    
    .service-card {
      border: none;
      border-radius: var(--border-radius-2xl);
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
      box-shadow: 0 8px 32px rgba(0, 76, 151, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(145deg, transparent 0%, rgba(0, 76, 151, 0.02) 50%, transparent 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
        border-radius: var(--border-radius-2xl);
        z-index: 1;
      }
      
      &:hover {
        transform: translateY(-12px) scale(1.02);
        box-shadow: 0 20px 60px rgba(0, 76, 151, 0.15), 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);
        
        &::before {
          opacity: 1;
        }
        
        .service-cover .service-overlay {
          opacity: 1;
        }
      }
      
      .service-cover {
        height: 180px;
        background: linear-gradient(135deg, rgba(0, 76, 151, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
        .service-icon {
          font-size: 3.5rem;
          color: var(--color-primary);
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0, 76, 151, 0.15);
          transition: all 0.3s ease;
        }
        
        .service-overlay {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 2;
        }
      }
      
      .ant-card-body {
        padding: var(--spacing-lg);
        position: relative;
        z-index: 2;
      }
      
      .service-title {
        font-size: var(--font-size-lg);
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-sm);
      }
      
      .service-content {
        .service-desc {
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-md);
          font-size: var(--font-size-sm);
        }
        
        .service-stats {
          padding: var(--spacing-sm) 0;
          border-top: 1px solid rgba(0, 76, 151, 0.1);
          
          .ant-statistic {
            text-align: center;
            
            .ant-statistic-title {
              font-size: var(--font-size-xs);
              color: var(--color-text-secondary);
              margin-bottom: 4px;
            }
          }
        }
      }
      
      .ant-card-actions {
        background: rgba(248, 250, 252, 0.5);
        border-top: 1px solid rgba(0, 76, 151, 0.08);
        padding: 0 !important;
        margin: 0 !important;
        
        li {
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          outline: none !important;
          text-align: center;
          position: relative;
          box-sizing: border-box;
          
          &:not(:last-child) {
            border-right: 1px solid rgba(0, 76, 151, 0.08) !important;
          }
          
          .ant-btn {
            border: none !important;
            background: transparent !important;
            font-weight: 600;
            width: 100% !important;
            height: 100% !important;
            min-height: 48px;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px;
            padding: 12px 16px !important;
            margin: 0 !important;
            position: relative;
            box-sizing: border-box;
            transform: translateZ(0);
            
            .anticon {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              line-height: 1 !important;
              transform: translateX(0) translateY(0);
            }
            
            &:hover {
              background: rgba(0, 76, 151, 0.05) !important;
              transform: translateZ(0) scale(1.02);
            }
            
            &:focus {
              outline: none !important;
              box-shadow: 0 0 0 2px rgba(0, 76, 151, 0.2) !important;
            }
          }
        }
      }
    }
  }
  
  .map-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-5xl) 0;
    
    .map-container {
      background: white;
      border-radius: var(--border-radius-2xl);
      padding: var(--spacing-2xl);
      box-shadow: var(--shadow-lg);
      text-align: center;
      
      .map-placeholder {
        height: 400px;
        background: linear-gradient(135deg, var(--color-cloud-gray) 0%, var(--color-light-gray) 100%);
        border-radius: var(--border-radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-secondary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-lg);
      }
      
      .depot-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-lg);
        
        .depot-item {
          text-align: left;
          padding: var(--spacing-md);
          background: var(--color-bg-secondary);
          border-radius: var(--border-radius-md);
          
          .depot-name {
            font-weight: 600;
            color: var(--color-primary);
            margin-bottom: var(--spacing-xs);
          }
          
          .depot-address {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
          }
        }
      }
    }
  }
  
  .testimonials-section {
    padding: var(--spacing-5xl) 0;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23004C97" opacity="0.02"/><circle cx="80" cy="80" r="1" fill="%23004C97" opacity="0.02"/><circle cx="40" cy="60" r="1" fill="%23004C97" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
      opacity: 0.5;
    }
    
    .testimonial-card {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 76, 151, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
        height: 100%;
        border: 1px solid rgba(0, 76, 151, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary-light) 100%);
        box-shadow: 0 2px 8px rgba(0, 76, 151, 0.3);
      }
      
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, transparent 0%, rgba(0, 76, 151, 0.05) 50%, transparent 100%);
        border-radius: 24px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.4s ease;
      }
      
      &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 30px 80px rgba(0, 76, 151, 0.15), 0 12px 40px rgba(0, 0, 0, 0.1);
        
        &::after {
          opacity: 1;
        }
        
        .testimonial-content {
          color: var(--color-text-primary);
        }
      }
      
      .ant-card-body {
        padding: var(--spacing-lg);
        position: relative;
        z-index: 2;
      }
      
      .testimonial-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-sm);
        
        .author-name {
          font-size: var(--font-size-md);
          font-weight: 600;
          color: var(--color-text-primary);
        }
      }
      
      .testimonial-content {
        .testimonial-text {
          font-size: var(--font-size-md);
          line-height: 1.8;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
          font-style: italic;
          position: relative;
          
          &::before {
            content: '"';
            font-size: 3rem;
            color: rgba(0, 76, 151, 0.1);
            position: absolute;
            top: -15px;
            left: -8px;
            font-family: serif;
          }
        }
        
        .testimonial-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--spacing-sm);
          border-top: 1px solid rgba(0, 76, 151, 0.1);
          
          .company {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            font-weight: 500;
          }
          
          .rating {
            .ant-rate {
              font-size: 14px;
              
              .ant-rate-star {
                margin-right: 2px;
              }
            }
          }
        }
      }
      
      .ant-card-meta {
        .ant-card-meta-avatar {
          .ant-badge {
            .ant-avatar {
              border: 2px solid rgba(255, 255, 255, 0.8);
              box-shadow: 0 4px 12px rgba(0, 76, 151, 0.15);
            }
          }
        }
        
        .ant-card-meta-detail {
          .ant-card-meta-title {
            margin-bottom: var(--spacing-xs);
          }
        }
      }
      
      .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-2xl);
          border-top: 1px solid rgba(0, 76, 151, 0.08);
          margin-top: auto;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
          border-radius: 0 0 20px 20px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          min-height: 100px;
          backdrop-filter: blur(5px);
          
          .author-main {
              display: flex;
              align-items: center;
              gap: var(--spacing-lg);
              flex: 1;
              min-height: 60px;
              
              .author-avatar {
                background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                color: white;
                font-weight: 700;
                box-shadow: 0 6px 20px rgba(0, 76, 151, 0.2);
                font-size: 18px;
                width: 56px;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid rgba(255, 255, 255, 0.95);
                border-radius: 50%;
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                
                &:hover {
                  transform: scale(1.05);
                  box-shadow: 0 8px 25px rgba(0, 76, 151, 0.3);
                }
              }
            
            .author-info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 6px;
                flex: 1;
                min-height: 60px;
               
                .author-name {
                  font-weight: 700;
                  color: var(--color-text-primary);
                  font-size: var(--font-size-lg);
                  line-height: 1.2;
                  margin: 0;
                  letter-spacing: 0.3px;
                }
               
                .author-company {
                 font-size: var(--font-size-sm);
                 color: var(--color-text-secondary);
                 opacity: 0.85;
                 font-weight: 500;
                 line-height: 1.3;
                 margin: 0;
                 letter-spacing: 0.2px;
                 display: flex;
                 align-items: baseline;
                 height: 20px;
               }
              }
          }
        
        .star-badge {
           background: linear-gradient(135deg, #ffd700 0%, #ffb300 100%);
           color: #8b4513;
           padding: 10px 16px;
           border-radius: 20px;
           font-size: var(--font-size-sm);
           font-weight: 700;
           text-align: center;
           box-shadow: 0 6px 20px rgba(255, 215, 0, 0.25);
           border: 2px solid rgba(255, 255, 255, 0.9);
           letter-spacing: 0.5px;
           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           white-space: nowrap;
           align-self: center;
           position: relative;
           overflow: hidden;
           height: fit-content;
           display: flex;
           align-items: center;
           justify-content: center;
           
           &::before {
             content: '';
             position: absolute;
             top: 0;
             left: -100%;
             width: 100%;
             height: 100%;
             background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
             transition: left 0.5s ease;
           }
           
           &:hover {
             transform: translateY(-3px) scale(1.08);
             box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
             
             &::before {
               left: 100%;
             }
           }
         }
      }
    }
    
    @media (max-width: 768px) {
      .testimonial-card {
        margin-bottom: var(--spacing-lg);
        padding: var(--spacing-md);
        
        .testimonial-content {
          font-size: var(--font-size-base);
          margin-bottom: var(--spacing-lg);
          
          &::before, &::after {
            font-size: 3rem;
          }
        }
        
        .testimonial-author {
             flex-direction: column;
             align-items: stretch;
             gap: var(--spacing-lg);
             padding: var(--spacing-xl);
             min-height: auto;
             position: absolute;
             bottom: 0;
             left: 0;
             right: 0;
             
             .author-main {
               gap: var(--spacing-md);
               align-items: center;
               min-height: 60px;
               
               .author-avatar {
                 width: 48px;
                 height: 48px;
                 font-size: 16px;
                 border-width: 2px;
               }
               
               .author-info {
                  gap: 4px;
                  min-height: 60px;
                  justify-content: center;
                 
                  .author-name {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                  }
                 
                  .author-company {
                   font-size: var(--font-size-xs);
                   margin: 0;
                   opacity: 0.8;
                   display: flex;
                   align-items: baseline;
                   height: 18px;
                 }
                }
             }
             
             .star-badge {
               align-self: center;
               padding: 8px 14px;
               font-size: var(--font-size-xs);
               border-radius: 16px;
               margin-top: var(--spacing-xs);
             }
           }
      }
    }
  }
  
  .news-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-5xl) 0;
    
    .news-card {
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        transition: all var(--transition-normal);
        background: white;
        height: 100%;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
      
      .news-cover {
        position: relative;
        height: 200px;
        overflow: hidden;
        
        .news-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .news-overlay {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
        }
        
        .news-tag {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
          z-index: 2;
        }
      }
      
      .ant-card-body {
        padding: var(--spacing-lg) !important;
      }
      
      .news-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
        
        .news-title {
          font-size: var(--font-size-lg);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
          margin-right: var(--spacing-sm);
          
          &:hover {
            color: var(--color-primary);
          }
        }
      }
      
      .news-content {
        display: flex;
        flex-direction: column;
        
        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-tertiary);
          font-size: var(--font-size-sm);
          
          .news-stats {
            .ant-statistic {
              margin: 0;
              
              .ant-statistic-content {
                font-size: 12px;
                color: var(--color-text-tertiary);
              }
            }
          }
        }
        
        .news-excerpt {
          color: var(--color-text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      
      .ant-card-actions {
        border-top: 1px solid #f0f0f0;
        background: #fafafa;
        
        > li {
          margin: 8px 0;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          
          > span {
            color: var(--color-primary);
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 4px 8px;
            
            &:hover {
              color: var(--color-primary-light);
            }
          }
          
          > a {
            color: var(--color-primary);
            font-weight: 500;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 4px 8px;
            
            &:hover {
              color: var(--color-primary-light);
            }
          }
        }
      }
      
      .ant-badge {
        z-index: 3;
      }
    }
  }
`

const Home = () => {
  const [dieselPrice, setDieselPrice] = useState(6.85)
  const { ref: servicesRef, inView: servicesInView } = useInView({ threshold: 0.1 })
  const { ref: mapRef, inView: mapInView } = useInView({ threshold: 0.1 })
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.1 })
  const { ref: newsRef, inView: newsInView } = useInView({ threshold: 0.1 })
  const navigate = useNavigate()

  // API数据获取 - 保持向后兼容的回退机制
  const { data: apiHeroSlides } = useAPI(api.home.getBanners, { immediate: true })
  const { data: apiServices } = useAPI(api.home.getServices, { immediate: true })
  const { data: apiTestimonials } = useAPI(api.home.getTestimonials, { immediate: true })
  const { data: apiNewsData } = useAPI(api.home.getHomeLatestNews, { immediate: true })
  const { data: apiFuelPrice } = useAPI(api.home.getFuelPrice, { immediate: true })

  // 状态管理
  const [quickQuoteVisible, setQuickQuoteVisible] = useState(false)
  const [orderTrackingVisible, setOrderTrackingVisible] = useState(false)
  const [priceDetailVisible, setPriceDetailVisible] = useState(false)
  const [form] = Form.useForm()
  const [trackingForm] = Form.useForm()

  useEffect(() => {
    // 使用API返回的价格，如果没有则模拟价格波动
    if (apiFuelPrice?.currentPrice) {
      setDieselPrice(apiFuelPrice.currentPrice)
    } else {
      const interval = setInterval(() => {
        setDieselPrice(prev => prev + (Math.random() - 0.5) * 0.1)
      }, 10000)
      
      return () => clearInterval(interval)
    }
  }, [apiFuelPrice])

  // 静态数据作为默认值，API数据作为优先选项
  const heroSlides = apiHeroSlides || [
    {
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: '可靠的0#柴油供应自1990年',
      subtitle: '第三代家族企业 • 当日配送 • 持证危化品经营商'
    }
  ]

  // 图标映射函数，支持API数据中的字符串图标
  const getIconComponent = (iconName) => {
    const iconMap = {
      'TruckOutlined': <TruckOutlined />,
      'RocketOutlined': <RocketOutlined />,
      'SafetyOutlined': <SafetyOutlined />
    }
    return iconMap[iconName] || <TruckOutlined />
  }

  const services = (apiServices || [
    {
      icon: <TruckOutlined />,
      title: '批量配送',
      desc: '专业的柴油批量配送服务，最小订单500升，覆盖整个区域。',
      link: '/products#delivery'
    },
    {
      icon: <RocketOutlined />,
      title: '现场加油',
      desc: '24/7现场加油车服务，为工地、物流中心、车队运营提供便利。',
      link: '/products#onsite'
    },
    {
      icon: <SafetyOutlined />,
      title: '应急供应',
      desc: '2小时应急响应服务，确保您的运营永不因燃料短缺而停止。',
      link: '/products#emergency'
    }
  ]).map(service => ({
    ...service,
    // 如果API返回的是字符串图标，转换为组件
    icon: typeof service.icon === 'string' ? getIconComponent(service.icon) : service.icon
  }))

  const testimonials = apiTestimonials || [
    {
      content: '天骏石化的配送服务非常及时可靠，他们的专业团队确保我们的施工现场从不缺油。24小时应急服务更是解决了我们的后顾之忧。',
      author: '张总',
      company: '建设集团',
      rating: 5,
      avatar: 'Z'
    },
    {
      content: '作为物流公司，燃油质量和供应稳定性对我们至关重要。天骏石化的0#柴油质量稳定，价格透明，是我们长期合作的可靠伙伴。',
      author: '李经理',
      company: '运输有限公司',
      rating: 5,
      avatar: 'L'
    },
    {
      content: '农业机械对燃油要求很高，天骏石化提供的柴油不仅质量好，而且他们的技术人员还会定期回访，提供专业的燃油管理建议。',
      author: '王农户',
      company: '农业合作社',
      rating: 5,
      avatar: 'W'
    }
  ]

  const newsData = apiNewsData || [
    {
      id: 1,
      title: '天骏石化与多家大型物流企业签署年度供油协议',
      excerpt: '近日，天骏石化成功与区域内多家知名物流企业签署2024年度燃油供应协议，进一步巩固了在商用车燃油市场的领先地位...',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-20',
      category: '业务拓展'
    },
    {
      id: 2,
      title: '公司获得ISO 14001环境管理体系认证续期',
      excerpt: '天骏石化顺利通过ISO 14001环境管理体系认证复审，这标志着公司在环境保护和可持续发展方面的持续努力得到了权威认可...',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-15',
      category: '企业资质'
    },
    {
      id: 3,
      title: '应急演练：2小时响应承诺的坚实保障',
      excerpt: '为确保应急供油服务质量，公司定期组织应急演练。本次演练模拟了极端天气下的紧急供油需求，全程用时1小时38分钟...',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-10',
      category: '安全管理'
    }
  ]

  // 事件处理函数
  const handleQuickQuote = () => {
    setQuickQuoteVisible(true)
  }

  const handleOrderTracking = () => {
    setOrderTrackingVisible(true)
  }

  const handlePriceDetail = () => {
    setPriceDetailVisible(true)
  }

  const handleServiceClick = (service) => {
    // 根据服务类型跳转到产品页面的对应部分
    if (service.link) {
      navigate(service.link)
    } else {
      navigate('/products')
    }
  }

  const handleNewsClick = (newsItem) => {
    navigate(`/news/${newsItem.id}`)
  }

  const handleQuickQuoteSubmit = async (values) => {
    try {
      const quoteData = {
        ...values,
        source: 'homepage_banner',
        timestamp: new Date().toISOString()
      }
      
      // 调用API
      const response = await api.home.quickQuote(quoteData)
      
      if (response) {
        message.success('询价请求提交成功！我们将在24小时内联系您。')
        setQuickQuoteVisible(false)
        form.resetFields()
      }
    } catch (error) {
      message.error('提交失败，请稍后重试。')
    }
  }

  const handleOrderTrackingSubmit = async (values) => {
    try {
      const response = await api.orders.getTracking(values.orderId)
      
      if (response) {
        // 显示订单信息
        message.success('订单查询成功！')
        // 可以在这里显示订单详情或跳转到订单页面
      }
    } catch (error) {
      message.error('订单查询失败，请检查订单号是否正确。')
    }
  }

  return (
    <StyledHome>
      <Helmet>
        <title>舟山天骏石油化工有限公司 - 专业0#柴油供应商</title>
        <meta name="description" content="天骏石化是第三代家族经营的石化公司，专业从事0#柴油的销售、储存和分销。提供批量配送、现场加油、应急供应等专业服务。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <Carousel autoplay effect="fade" dots={false} autoplaySpeed={8000}>
          {heroSlides.map((slide, index) => (
            <div key={index}>
              <div 
                className="hero-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <motion.div 
                  className="hero-content"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-features">
                    <div className="feature-item">
                      <SafetyOutlined />
                      <span>家族企业</span>
                    </div>
                    <div className="feature-item">
                      <TruckOutlined />
                      <span>当日配送</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircleOutlined />
                      <span>持证经营</span>
                    </div>
                  </div>
                  <div className="hero-cta">
                    <Button 
                      type="primary" 
                      size="large" 
                      className="btn-primary"
                      onClick={() => handleQuickQuote()}
                    >
                      立即询价
                    </Button>
                    <Button 
                      size="large" 
                      className="btn-secondary" 
                      ghost
                      onClick={() => handleOrderTracking()}
                    >
                      <PhoneOutlined /> 追踪订单
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Trust Bar - 组件化重构 */}
      <TrustBar />

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">专业服务</h2>
            <p className="section-subtitle">
              专业的0#柴油供应服务，满足不同行业的燃油需求
            </p>
          </motion.div>
          
          <Row gutter={[32, 32]}>
            {services.map((service, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={service.link} onClick={() => handleServiceClick(service)}>
                    <Card 
                      className="service-card" 
                      hoverable
                      cover={
                        <div className="service-cover">
                          <div className="service-icon">{service.icon}</div>
                          <div className="service-overlay">
                            <Badge 
                              count="专业"  
                              style={{ 
                                backgroundColor: 'rgba(0, 76, 151, 0.9)',
                                color: 'white',
                                fontWeight: 600
                              }} 
                            />
                          </div>
                        </div>
                      }
                      actions={[
                        <Button type="link" className="text-gradient" key="more">
                          了解更多
                        </Button>
                      ]}
                    >
                      <Card.Meta
                        title={<span className="service-title">{service.title}</span>}
                        description={
                          <div className="service-content">
                            <p className="service-desc">{service.desc}</p>
                            <div className="service-stats">
                              <Statistic 
                                title="服务时长" 
                                value="24" 
                                suffix="小时" 
                                valueStyle={{ color: 'var(--color-primary)', fontSize: '16px' }}
                              />
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="map-section" ref={mapRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">全国服务网络</h2>
            <p className="section-subtitle">
              总部位于江西，分部遍布全国6省市，构建完整的燃油供应网络
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EChartsNetworkMap />
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">客户证言</h2>
            <p className="section-subtitle">
              500+合作伙伴的信任之选
            </p>
          </motion.div>
          
          <Row gutter={[24, 24]} align="stretch">
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index} style={{ display: 'flex' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Card className="testimonial-card" hoverable>
                     <Card.Meta
                       avatar={
                         <Badge count={<StarFilled style={{ color: '#faad14' }} />} offset={[-5, 5]}>
                           <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
                             {testimonial.avatar}
                           </Avatar>
                         </Badge>
                       }
                       title={
                         <div className="testimonial-header">
                           <span className="author-name">{testimonial.author}</span>
                           <Tag color="blue">VIP客户</Tag>
                         </div>
                       }
                       description={
                         <div className="testimonial-content">
                           <div className="testimonial-text">
                             "{testimonial.content}"
                           </div>
                           <div className="testimonial-footer">
                             <span className="company">{testimonial.company}</span>
                             <div className="rating">
                               <Rate disabled defaultValue={5} style={{ fontSize: '14px' }} />
                             </div>
                           </div>
                         </div>
                       }
                     />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* News Teaser */}
      <section className="news-section" ref={newsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={newsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">最新动态</h2>
            <p className="section-subtitle">
              了解公司最新动态和行业资讯
            </p>
          </motion.div>
          
          <Row gutter={[24, 24]} align="stretch">
            {newsData.map((news, index) => (
              <Col xs={24} md={8} key={news.id} style={{ display: 'flex' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={newsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Card 
                    className="news-card" 
                    hoverable
                    cover={
                      <div className="news-cover">
                        <div 
                          className="news-image"
                          style={{ backgroundImage: `url(${news.image})` }}
                        >
                          <Tag color="blue" className="news-tag">{news.category}</Tag>
                        </div>
                        <div className="news-overlay">
                          <Badge count={<TrophyOutlined style={{ color: '#faad14' }} />} offset={[10, 10]} />
                        </div>
                      </div>
                    }
                    actions={[
                      <Link to={`/news/${news.id}`} key="read">阅读更多</Link>,
                      <span key="share">分享</span>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className="news-header">
                          <Link to={`/news/${news.id}`} onClick={() => handleNewsClick(news)}>
                            <span className="news-title">{news.title}</span>
                          </Link>
                        </div>
                      }
                      description={
                        <div className="news-content">
                          <div className="news-meta">
                            <span><CalendarOutlined /> {news.date}</span>
                            <div className="news-stats">
                              <Statistic value={Math.floor(Math.random() * 1000) + 500} suffix="次阅读" size="small" />
                            </div>
                          </div>
                          <p className="news-excerpt">{news.excerpt}</p>
                        </div>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            marginTop: '40px' 
          }}>
            <Button size="large" className="btn-secondary">
              <Link to="/news">查看更多新闻</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 实时价格显示 */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 76, 151, 0.85)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: 1000,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={handlePriceDetail}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)'
          e.target.style.background = 'rgba(0, 76, 151, 0.95)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)'
          e.target.style.background = 'rgba(0, 76, 151, 0.85)'
        }}
      >
        <div style={{ fontSize: '12px', opacity: 0.9 }}>今日0#柴油价格</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>¥{dieselPrice.toFixed(2)}/升</div>
        <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px' }}>点击查看详情</div>
      </div>

      {/* 快速询价模态框 */}
      <Modal
        title="快速询价"
        open={quickQuoteVisible}
        onCancel={() => setQuickQuoteVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleQuickQuoteSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="联系人"
                name="contactName"
                rules={[{ required: true, message: '请输入联系人姓名' }]}
              >
                <Input placeholder="请输入联系人姓名" prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系电话"
                name="contactPhone"
                rules={[
                  { required: true, message: '请输入联系电话' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                ]}
              >
                <Input placeholder="请输入联系电话" prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="需求数量"
                name="quantity"
                rules={[{ required: true, message: '请输入需求数量' }]}
              >
                <Input placeholder="请输入数量" suffix="升" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="用途"
                name="usage"
                rules={[{ required: true, message: '请选择用途' }]}
              >
                <Select placeholder="请选择用途">
                  <Select.Option value="construction">工程建设</Select.Option>
                  <Select.Option value="logistics">物流运输</Select.Option>
                  <Select.Option value="agriculture">农业机械</Select.Option>
                  <Select.Option value="mining">矿山开采</Select.Option>
                  <Select.Option value="other">其他</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="配送地址"
            name="deliveryAddress"
            rules={[{ required: true, message: '请输入配送地址' }]}
          >
            <Input placeholder="请输入详细配送地址" prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item label="备注" name="remarks">
            <Input.TextArea rows={3} placeholder="请输入特殊要求或备注信息" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button onClick={() => setQuickQuoteVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交询价
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 订单追踪模态框 */}
      <Modal
        title="订单追踪"
        open={orderTrackingVisible}
        onCancel={() => setOrderTrackingVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={trackingForm}
          layout="vertical"
          onFinish={handleOrderTrackingSubmit}
        >
          <Form.Item
            label="订单号"
            name="orderId"
            rules={[{ required: true, message: '请输入订单号' }]}
          >
            <Input placeholder="请输入订单号" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="phone"
            rules={[
              { required: true, message: '请输入联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input placeholder="请输入下单时的联系电话" prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button onClick={() => setOrderTrackingVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                查询订单
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 价格详情模态框 */}
      <Modal
        title="今日燃油价格详情"
        open={priceDetailVisible}
        onCancel={() => setPriceDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPriceDetailVisible(false)}>
            关闭
          </Button>,
          <Button key="quote" type="primary" onClick={() => {
            setPriceDetailVisible(false)
            setQuickQuoteVisible(true)
          }}>
            立即询价
          </Button>
        ]}
        width={700}
      >
        <div style={{ padding: '16px 0' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card title="当前价格" bordered={false} style={{ textAlign: 'center' }}>
                <Statistic
                  title="0#柴油"
                  value={dieselPrice.toFixed(2)}
                  suffix="元/升"
                  valueStyle={{ color: '#1890ff', fontSize: '2rem' }}
                />
                <p style={{ color: '#666', marginTop: '8px' }}>
                  更新时间: {new Date().toLocaleString()}
                </p>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="价格优势" bordered={false}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>市场基准价:</span>
                    <span style={{ color: '#666' }}>¥{(dieselPrice + 0.10).toFixed(2)}/升</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>天骏价格:</span>
                    <span style={{ color: '#52c41a', fontWeight: 'bold' }}>¥{dieselPrice.toFixed(2)}/升</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
                    <span>您可节省:</span>
                    <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>¥0.10/升</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Card title="价格说明" style={{ marginTop: '16px' }} bordered={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>价格含税，透明无隐藏费用</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>500升起订，量大价优</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>区域内免费配送</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <span>24小时客服热线: 400-1234-5678</span>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </StyledHome>
  )
}

export default Home