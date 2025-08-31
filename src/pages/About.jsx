import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Row, Col, Card, Button, Statistic, Avatar } from 'antd'
import { 
  SafetyOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  EnvironmentOutlined,
  RocketOutlined,
  HeartOutlined,
  StarOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

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
      
      .hero-stats {
        display: flex;
        justify-content: center;
        gap: var(--spacing-2xl);
        
        @media (max-width: 768px) {
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        
        .stat-item {
          text-align: center;
          
          .stat-number {
            font-size: var(--font-size-4xl);
            font-weight: 700;
            display: block;
            color: var(--color-secondary);
          }
          
          .stat-label {
            font-size: var(--font-size-base);
            opacity: 0.9;
          }
        }
      }
    }
  }
  
  .development-history-section {
    padding: var(--spacing-5xl) 0;
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
      background-image: 
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }

    .section-title {
      color: #1e293b;
      text-align: center;
      font-size: var(--font-size-3xl);
      font-weight: 700;
      margin-bottom: var(--spacing-4xl);
      background: linear-gradient(135deg, #1e293b, #475569);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .development-timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-3xl) var(--spacing-lg);
  }

  .timeline-bg-decoration {
    display: none;
  }

  .timeline-main {
    position: relative;
    z-index: 2;
  }

  .timeline-connector {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #3b82f6, #8b5cf6);
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      background: #3b82f6;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #ffffff, 0 0 0 8px rgba(59, 130, 246, 0.2);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      background: #8b5cf6;
      border-radius: 50%;
      box-shadow: 0 0 0 4px #ffffff, 0 0 0 8px rgba(139, 92, 246, 0.2);
    }
  }

  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fadeInDot {
    to {
      opacity: 1;
    }
  }
  
  .timeline-nodes {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 60px;
    padding: 40px 0;
  }

  .timeline-node {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    
    &:nth-child(odd) {
      flex-direction: row;
      
      .node-content {
        margin-right: 40px;
        text-align: right;
      }
      
      .timeline-dot {
        order: 2;
      }
      
      .node-spacer {
        order: 3;
        width: 50%;
      }
    }
    
    &:nth-child(even) {
      flex-direction: row-reverse;
      
      .node-content {
        margin-left: 40px;
        text-align: left;
      }
      
      .timeline-dot {
        order: 2;
      }
      
      .node-spacer {
        order: 3;
        width: 50%;
      }
    }
  }

  .node-content {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    width: 280px;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(59, 130, 246, 0.1);
      border-color: #3b82f6;
      
      &::before {
        opacity: 1;
      }
    }
  }
  
  .timeline-dot {
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    flex-shrink: 0;
    z-index: 4;
  }
  
  .node-spacer {
    flex: 1;
  }

  .node-year {
    display: inline-block;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  .node-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
    line-height: 1.3;
    position: relative;
    z-index: 2;
  }

  .node-subtitle {
    font-size: 14px;
    color: #3b82f6;
    font-weight: 600;
    margin-bottom: 12px;
    position: relative;
    z-index: 2;
  }

  .node-desc {
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 1024px) {
    .development-timeline {
      padding: var(--spacing-2xl) var(--spacing-md);
    }
    
    .node-content {
      width: 240px;
      padding: 20px;
    }
    
    .timeline-node {
      gap: 40px;
      
      &:nth-child(odd) .node-content {
        margin-right: 30px;
      }
      
      &:nth-child(even) .node-content {
        margin-left: 30px;
      }
    }
  }
  
  @media (max-width: 768px) {
    .timeline-nodes {
      gap: 40px;
    }
    
    .timeline-node {
      flex-direction: column !important;
      align-items: center;
      text-align: center;
      
      &:nth-child(odd),
      &:nth-child(even) {
        .node-content {
          margin: 0;
          text-align: center;
          width: 100%;
          max-width: 300px;
        }
        
        .node-spacer {
          display: none;
        }
      }
    }
    
    .timeline-connector {
      left: 20px;
      transform: none;
    }
    
    .timeline-dot {
      margin: 16px 0;
    }
  }
  
  .values-section {
    padding: 140px 0;
    background: white;
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
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 70%);
      pointer-events: none;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(45deg, transparent 49%, rgba(0, 0, 0, 0.02) 50%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, rgba(0, 0, 0, 0.02) 50%, transparent 51%);
      background-size: 60px 60px;
      pointer-events: none;
    }
  }

  .values-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 2;
  }

  .values-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2));
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 50px;
    margin-bottom: 24px;
    backdrop-filter: blur(10px);
  }

  .badge-text {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #60a5fa;
    text-transform: uppercase;
  }

  .values-main-title {
    font-size: 48px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #1e293b, #475569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }

  .values-main-subtitle {
    font-size: 18px;
    color: #64748b;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    position: relative;
    z-index: 2;
  }

  .modern-value-card {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 24px;
    padding: 40px 32px;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-8px);
      border-color: rgba(59, 130, 246, 0.2);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(59, 130, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
      
      .card-glow {
        opacity: 1;
        transform: scale(1.1);
      }
      
      .icon-bg {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
      }
      
      .value-icon-modern {
        transform: scale(1.1);
        color: #ffffff;
      }
    }
  }

  .card-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    opacity: 0;
    transition: all 0.4s ease;
    pointer-events: none;
  }

  .card-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .value-icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
  }

  .icon-bg {
    position: absolute;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2));
    border-radius: 50%;
    transition: all 0.4s ease;
    filter: blur(1px);
  }

  .value-icon-modern {
    position: relative;
    font-size: 48px;
    color: #60a5fa;
    z-index: 1;
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.3));
  }

  .card-text {
    position: relative;
  }

  .value-title-modern {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 16px;
    line-height: 1.3;
  }

  .value-desc-modern {
    color: #64748b;
    line-height: 1.7;
    font-size: 16px;
  }

  .card-border {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3), rgba(168, 85, 247, 0.3));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .modern-value-card:hover .card-border {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    .values-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .fleet-grid {
      grid-template-columns: 1fr;
      gap: 40px;
      max-width: 600px;
    }

    .fleet-main-title {
      font-size: 40px;
    }

    .fleet-main-subtitle {
      font-size: 16px;
    }

    .leadership-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .leadership-main-title {
      font-size: 40px;
    }

    .leadership-main-subtitle {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    .values-section {
      padding: 80px 0;
    }

    .values-main-title {
      font-size: 36px;
    }

    .values-main-subtitle {
      font-size: 16px;
      padding: 0 20px;
    }

    .values-grid {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 0 20px;
    }

    .modern-value-card {
      padding: 32px 24px;
    }

    .value-title-modern {
      font-size: 20px;
    }

    .value-desc-modern {
      font-size: 14px;
    }

    .icon-bg {
      width: 80px;
      height: 80px;
    }

    .value-icon-modern {
      font-size: 40px;
    }

    .fleet-section {
      padding: 80px 0;
    }

    .fleet-header {
      margin-bottom: 60px;
    }

    .fleet-main-title {
      font-size: 32px;
    }

    .fleet-main-subtitle {
      font-size: 16px;
    }

    .fleet-grid {
      margin-top: 60px;
      gap: 30px;
    }

    .modern-fleet-card {
      padding: 30px 20px;
    }

    .fleet-number {
      font-size: 28px;
    }

    .fleet-card-title {
      font-size: 20px;
    }

    .fleet-icon {
      font-size: 32px;
      width: 80px;
      height: 80px;
    }

    .fleet-icon-bg {
      width: 80px;
      height: 80px;
    }

    .feature-item {
      font-size: 14px;
    }

    .leadership-section {
      padding: 80px 0;
    }

    .leadership-header {
      margin-bottom: 60px;
    }

    .leadership-main-title {
      font-size: 32px;
    }

    .leadership-main-subtitle {
      font-size: 16px;
    }

    .leadership-grid {
      grid-template-columns: 1fr;
      gap: 30px;
      margin-top: 60px;
    }

    .modern-leadership-card {
      padding: 30px 20px;
    }

    .leader-name-modern {
      font-size: 20px;
    }

    .leader-avatar-modern .ant-avatar {
      width: 80px !important;
      height: 80px !important;
      font-size: 28px !important;
    }

    .avatar-bg-gradient {
      width: 100px;
      height: 100px;
    }

    .avatar-ring {
      width: 90px;
      height: 90px;
    }
  }

  @media (max-width: 576px) {
    .values-section {
      padding: 60px 0;
    }

    .values-grid {
      padding: 0 16px;
      gap: 20px;
    }

    .modern-value-card {
      padding: 24px 16px;
      border-radius: 16px;
    }

    .value-title-modern {
      font-size: 18px;
    }

    .value-desc-modern {
      font-size: 13px;
    }

    .icon-bg {
      width: 70px;
      height: 70px;
    }

    .value-icon-modern {
      font-size: 32px;
    }

    .fleet-section {
      padding: 60px 0;
    }

    .fleet-grid {
      gap: 20px;
      padding: 0 16px;
    }

    .modern-fleet-card {
      padding: 24px 16px;
      border-radius: 16px;
    }

    .fleet-number {
      font-size: 24px;
    }

    .fleet-card-title {
      font-size: 18px;
      margin-bottom: 16px;
    }

    .fleet-icon {
      font-size: 28px;
      width: 70px;
      height: 70px;
    }

    .fleet-icon-bg {
      width: 70px;
      height: 70px;
    }

    .fleet-icon-wrapper {
      margin-bottom: 20px;
    }

    .fleet-divider {
      width: 40px;
      margin-bottom: 20px;
    }

    .feature-item {
      font-size: 13px;
      gap: 8px;
    }

    .leadership-section {
      padding: 60px 0;
    }

    .leadership-grid {
      gap: 20px;
      padding: 0 16px;
    }

    .modern-leadership-card {
      padding: 24px 16px;
      border-radius: 16px;
    }

    .leader-name-modern {
      font-size: 18px;
    }

    .leader-avatar-modern .ant-avatar {
      width: 70px !important;
      height: 70px !important;
      font-size: 24px !important;
    }

    .avatar-bg-gradient {
      width: 90px;
      height: 90px;
    }

    .avatar-ring {
      width: 80px;
      height: 80px;
    }

    .leader-avatar-wrapper {
      margin-bottom: 20px;
    }

    .leader-title-badge {
      font-size: 12px;
      padding: 4px 12px;
      margin-bottom: 16px;
    }

    .leader-bio-modern {
      font-size: 14px;
      margin-bottom: 20px;
    }

    .contact-item-modern {
      font-size: 13px;
      padding: 6px 12px;
      gap: 8px;
    }

    .contact-icon-wrapper {
      width: 20px;
      height: 20px;
      font-size: 10px;
    }

    .leader-divider {
      width: 40px;
      margin-bottom: 20px;
    }
  }
  
  /* 移动端竖屏模式优化 */
  @media (max-width: 768px) and (orientation: portrait) {
    .fleet-section {
      .fleet-grid {
        grid-template-columns: 1fr !important;
        gap: var(--spacing-lg);
      }
      
      .modern-fleet-card {
        width: 100%;
        max-width: none;
      }
    }
    
    .leadership-section {
      .leadership-grid {
        grid-template-columns: 1fr !important;
        gap: var(--spacing-lg);
      }
      
      .modern-leadership-card {
        width: 100%;
        max-width: none;
      }
    }
  }
  
  .fleet-section {
    background: #ffffff;
    padding: 120px 0;
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
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  }

  .fleet-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 2;
  }

  .fleet-badge {
    display: inline-block;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  .fleet-main-title {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(135deg, #1e293b, #475569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .fleet-main-subtitle {
    font-size: 18px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .fleet-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    margin-top: 80px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .modern-fleet-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    &:hover {
      border-color: #3b82f6;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(59, 130, 246, 0.1);
    }
  }

  .card-glow-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .modern-fleet-card:hover .card-glow-effect {
    opacity: 1;
  }

  .fleet-icon-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
  }

  .fleet-icon-bg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;

    &.transport {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    }

    &.storage {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }
  }

  .modern-fleet-card:hover .fleet-icon-bg {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }

  .fleet-icon {
    font-size: 40px;
    position: relative;
    z-index: 2;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fleet-content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .fleet-number {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }

  .fleet-card-title {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .fleet-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    margin: 0 auto 25px;
    border-radius: 2px;
  }

  .fleet-features {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 15px;
    color: #475569;
    font-weight: 500;
    text-align: center;
    width: 100%;
  }

  .feature-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  .card-border-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .modern-fleet-card:hover .card-border-gradient {
    opacity: 1;
  }
  
  .leadership-section {
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
      background: 
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
  }

  .leadership-header {
    text-align: center;
    margin-bottom: 80px;
    position: relative;
    z-index: 2;
  }

  .leadership-badge {
    display: inline-block;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  .leadership-main-title {
    font-size: 48px;
    font-weight: 800;
    background: linear-gradient(135deg, #1e293b, #475569);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .leadership-main-subtitle {
    font-size: 18px;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .leadership-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 80px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .modern-leadership-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 500px;

    &:hover {
      border-color: #3b82f6;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(59, 130, 246, 0.1);
    }
  }

  .leader-avatar-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
  }

  .avatar-bg-gradient {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    opacity: 0.1;
    transition: all 0.4s ease;
  }

  .modern-leadership-card:hover .avatar-bg-gradient {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.2;
  }

  .leader-avatar-modern {
    position: relative;
    z-index: 2;
    
    .ant-avatar {
      width: 100px !important;
      height: 100px !important;
      font-size: 36px !important;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
      border: 4px solid #ffffff;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }
  }

  .avatar-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110px;
    height: 110px;
    border: 2px solid transparent;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    background-clip: padding-box;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .modern-leadership-card:hover .avatar-ring {
    opacity: 0.3;
  }

  .leader-content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .leader-name-modern {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .leader-title-badge {
    display: inline-block;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
    color: #3b82f6;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }

  .leader-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    margin: 0 auto 25px;
    border-radius: 2px;
  }

  .leader-bio-modern {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 30px;
    font-size: 15px;
  }

  .leader-contact-modern {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .contact-item-modern {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 14px;
    color: #475569;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 12px;
    background: rgba(59, 130, 246, 0.05);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(59, 130, 246, 0.1);
      transform: translateY(-2px);
    }
  }

  .contact-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    font-size: 12px;
  }
  
  .cta-section {
    background: white;
    padding: var(--spacing-4xl) 0;
    text-align: center;
    color: var(--color-text-primary);
    
    .cta-title {
      font-size: var(--font-size-4xl);
      font-weight: 700;
      margin-bottom: var(--spacing-lg);
      color: var(--color-text-primary);
    }
    
    .cta-subtitle {
      font-size: var(--font-size-lg);
      margin-bottom: var(--spacing-2xl);
      color: var(--color-text-secondary);
    }
    
    .cta-buttons {
      display: flex;
      justify-content: center;
      gap: var(--spacing-lg);
      
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
`

const About = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 })
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.1 })
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1 })
  const { ref: fleetRef, inView: fleetInView } = useInView({ threshold: 0.1 })
  const { ref: leadershipRef, inView: leadershipInView } = useInView({ threshold: 0.1 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  
  // 检测用户是否偏好减少动画
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const milestones = [
    {
      year: '1990',
      title: '公司成立',
      desc: '张氏家族在舟山创立天骏石化，开始从事成品油零售业务。'
    },
    {
      year: '1995',
      title: '业务扩展',
      desc: '获得危险化学品经营许可证，开始涉足0#柴油批发业务。'
    },
    {
      year: '2003',
      title: '第二代接班',
      desc: '第二代家族成员加入公司管理，引入现代企业管理理念。'
    },
    {
      year: '2010',
      title: '仓储建设',
      desc: '投资建设三个现代化储油库，总储量达到20,000立方米。'
    },
    {
      year: '2015',
      title: '质量认证',
      desc: '通过ISO 9001质量管理体系认证，服务标准化水平显著提升。'
    },
    {
      year: '2020',
      title: '第三代传承',
      desc: '第三代家族成员正式接管企业，推动数字化转型。'
    },
    {
      year: '2024',
      title: '持续发展',
      desc: '成为舟山地区领先的0#柴油供应商，服务500+企业客户。'
    }
  ]

  const values = [
    {
      icon: <SafetyOutlined className="safety" />,
      title: '安全第一',
      desc: '严格遵守安全生产规范，建立完善的HSE管理体系，确保每一次作业的安全性。'
    },
    {
      icon: <TrophyOutlined className="reliability" />,
      title: '可靠服务',
      desc: '34年诚信经营，建立了良好的市场信誉，为客户提供稳定可靠的燃油供应服务。'
    },
    {
      icon: <EnvironmentOutlined className="green" />,
      title: '绿色未来',
      desc: '致力于环境保护，推动清洁能源发展，为可持续发展贡献力量。'
    },
    {
      icon: <HeartOutlined className="family" />,
      title: '家族精神',
      desc: '三代传承的家族企业，以诚待人，以信立业，传承家族企业文化。'
    },
    {
      icon: <RocketOutlined className="innovation" />,
      title: '创新发展',
      desc: '持续技术创新和管理创新，提升服务质量和运营效率，引领行业发展。'
    },
    {
      icon: <TeamOutlined className="cooperation" />,
      title: '合作共赢',
      desc: '与客户、供应商建立长期战略合作关系，实现互利共赢的可持续发展。'
    }
  ]

  const leadership = [
    {
      name: '张董事长',
      title: '董事长兼总经理',
      bio: '公司创始人，34年石化行业经验，带领公司从小型加油站发展为区域领先的燃油供应商。',
      avatar: '张',
      phone: '138****1234',
      email: 'chairman@tianjun-petro.com'
    },
    {
      name: '张总经理',
      title: '执行总经理',
      bio: '第二代接班人，工商管理硕士，负责公司日常运营管理和战略规划实施。',
      avatar: '总',
      phone: '139****5678',
      email: 'gm@tianjun-petro.com'
    },
    {
      name: '李运营总监',
      title: '运营总监',
      bio: '15年物流运营经验，负责公司配送网络建设和运营效率优化。',
      avatar: '李',
      phone: '137****9012',
      email: 'ops@tianjun-petro.com'
    }
  ]

  return (
    <StyledAbout>
      <Helmet>
        <title>关于我们 - 舟山天骏石油化工有限公司</title>
        <meta name="description" content="天骏石化成立于1990年，是一家第三代家族经营的石化企业，专业从事0#柴油供应服务，拥有34年行业经验，服务500+企业客户。" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: isReducedMotion ? 0 : 50 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isReducedMotion ? 0.1 : 0.8 }}
          >
            <h1 className="hero-title">3rd Generation, 1 Promise</h1>
            <p className="hero-subtitle">
              三代传承的家族企业，始终坚持为客户提供安全、可靠、高效的燃油供应服务
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">34</span>
                <span className="stat-label">年行业经验</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">企业客户</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20,000</span>
                <span className="stat-label">m³储量</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Development History */}
      <section className="development-history-section" ref={timelineRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">我们的发展历史</h2>
          </motion.div>

          <div className="development-timeline">
            <div className="timeline-bg-decoration">
              <div className="bg-circle left"></div>
              <div className="bg-circle right"></div>
              <div className="bg-lines"></div>
            </div>

            <div className="timeline-main">
              <div className="timeline-connector"></div>

              <div className="timeline-nodes">
                {[
                  { year: '2014.06', title: '公司成立', subtitle: '产品上市', desc: '公司正式成立，首款产品成功上市，标志着我们进入市场的重要里程碑。' },
                  { year: '2015.07', title: '平台建设', subtitle: '搭建平台', desc: '建立完善的业务平台，为后续发展奠定坚实的技术和运营基础。' },
                  { year: '2017.02', title: '品牌推广', subtitle: '线上宣传', desc: '全面启动品牌推广战略，通过多渠道营销提升品牌知名度和市场影响力。' },
                  { year: '2019.07', title: '企业发展', subtitle: '规模扩张', desc: '业务规模快速扩张，团队不断壮大，企业进入高速发展阶段。' },
                  { year: '2020.04', title: '研发创新', subtitle: '技术突破', desc: '加大研发投入，实现多项技术突破，产品创新能力显著提升。' },
                  { year: '2021.09', title: '推出新品', subtitle: '产品升级', desc: '推出新一代产品，技术更加先进，功能更加完善，市场竞争力进一步增强。' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="timeline-node"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="node-content">
                      <div className="node-year">{item.year}</div>
                      <div className="node-title">{item.title}</div>
                      {item.subtitle && <div className="node-subtitle">{item.subtitle}</div>}
                      <div className="node-desc">{item.desc}</div>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="node-spacer"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <motion.div
            className="values-header"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="values-badge">
              <span className="badge-text">CORE VALUES</span>
            </div>
            <h2 className="values-main-title">核心价值观</h2>
            <p className="values-main-subtitle">
              指导我们行为的核心原则和价值理念，塑造企业文化的基石
            </p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="modern-value-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={valuesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="value-icon-wrapper">
                    <div className="icon-bg"></div>
                    <div className="value-icon-modern">{value.icon}</div>
                  </div>
                  <div className="card-text">
                    <h3 className="value-title-modern">{value.title}</h3>
                    <p className="value-desc-modern">{value.desc}</p>
                  </div>
                </div>
                <div className="card-border"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="fleet-section" ref={fleetRef}>
        <div className="container">
          <motion.div
            className="fleet-header"
            initial={{ opacity: 0, y: 30 }}
            animate={fleetInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="fleet-badge">
              <span className="badge-text">FLEET & STORAGE</span>
            </div>
            <h2 className="fleet-main-title">车队与储存</h2>
            <p className="fleet-main-subtitle">
              专业的运输车队和现代化储存设施，为您提供全方位的物流保障
            </p>
          </motion.div>

          <div className="fleet-grid">
            <motion.div
              className="modern-fleet-card"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={fleetInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card-glow-effect"></div>
              <div className="fleet-icon-wrapper">
                <div className="fleet-icon-bg transport"></div>
                <div className="fleet-icon">🚛</div>
              </div>
              <div className="fleet-content">
                <div className="fleet-number">30+</div>
                <h3 className="fleet-card-title">专业运输车队</h3>
                <div className="fleet-divider"></div>
                <div className="fleet-features">
                  <div className="feature-item">
                    <span className="feature-icon">⚡</span>
                    <span>5-30吨载重范围</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🛡️</span>
                    <span>危险品运输资质</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📍</span>
                    <span>GPS实时监控</span>
                  </div>
                </div>
              </div>
              <div className="card-border-gradient"></div>
            </motion.div>

            <motion.div
              className="modern-fleet-card"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={fleetInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card-glow-effect"></div>
              <div className="fleet-icon-wrapper">
                <div className="fleet-icon-bg storage"></div>
                <div className="fleet-icon">🏭</div>
              </div>
              <div className="fleet-content">
                <div className="fleet-number">20,000m³</div>
                <h3 className="fleet-card-title">现代化储存设施</h3>
                <div className="fleet-divider"></div>
                <div className="fleet-features">
                  <div className="feature-item">
                    <span className="feature-icon">🏢</span>
                    <span>3个现代化储油库</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌡️</span>
                    <span>温控储存系统</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔒</span>
                    <span>安全防护措施</span>
                  </div>
                </div>
              </div>
              <div className="card-border-gradient"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership-section" ref={leadershipRef}>
        <div className="container">
          <motion.div
            className="leadership-header"
            initial={{ opacity: 0, y: 30 }}
            animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="leadership-badge">LEADERSHIP TEAM</div>
            <h2 className="leadership-main-title">管理团队</h2>
            <p className="leadership-main-subtitle">
              经验丰富的管理团队，引领公司稳健发展，为客户提供专业的燃油供应服务
            </p>
          </motion.div>

          <div className="leadership-grid">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                className="modern-leadership-card"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={leadershipInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="card-glow-effect"></div>
                <div className="leader-avatar-wrapper">
                  <div className="avatar-bg-gradient"></div>
                  <div className="leader-avatar-modern">
                    <Avatar size={100}>{leader.avatar}</Avatar>
                  </div>
                  <div className="avatar-ring"></div>
                </div>
                <div className="leader-content">
                  <h3 className="leader-name-modern">{leader.name}</h3>
                  <div className="leader-title-badge">{leader.title}</div>
                  <div className="leader-divider"></div>
                  <p className="leader-bio-modern">{leader.bio}</p>
                  <div className="leader-contact-modern">
                    <div className="contact-item-modern">
                      <div className="contact-icon-wrapper">
                        <PhoneOutlined />
                      </div>
                      <span>{leader.phone}</span>
                    </div>
                    <div className="contact-item-modern">
                      <div className="contact-icon-wrapper">
                        <MailOutlined />
                      </div>
                      <span>{leader.email}</span>
                    </div>
                  </div>
                </div>
                <div className="card-border-gradient"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
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
              <Button type="primary" size="large" className="btn-warning">
                立即询价
              </Button>
              <Button size="large" className="btn-secondary" ghost>
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