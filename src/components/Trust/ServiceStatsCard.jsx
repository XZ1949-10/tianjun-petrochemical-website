import React, { useState } from 'react';
import { Card } from 'antd';
import { BarChartOutlined, TrophyOutlined, RiseOutlined, StarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const ServiceStatsCard = ({ delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="trust-card-wrapper"
    >
      <Card
         hoverable
         className="trust-card"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={() => setIsActive(!isActive)}
         style={{
           height: '100%',
           transform: isHovered ? 'scale(1.02)' : 'scale(1)',
           transition: 'all 0.3s ease'
         }}
      >
        <div className="card-premium-header">
          <div className="header-badge service">
            <BarChartOutlined className="badge-icon" />
            <span className="badge-text">服务数据</span>
          </div>
          <div className="header-stats">
            <span className="main-number">15+</span>
            <span className="stats-label">年经验</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="content-title">服务表现</h3>
          <div className="performance-metrics">
            <div className="metric-item primary">
              <div className="metric-circle">
                <span className="metric-value">500+</span>
              </div>
              <div className="metric-info">
                <span className="metric-label">合作客户</span>
                <span className="metric-desc">遍布全国</span>
              </div>
            </div>
            
            <div className="metric-item success">
              <div className="metric-circle">
                <span className="metric-value">99.8%</span>
              </div>
              <div className="metric-info">
                <span className="metric-label">准时交付</span>
                <span className="metric-desc">行业领先</span>
              </div>
            </div>
            
            <div className="metric-item warning">
              <div className="metric-circle">
                <span className="metric-value">24/7</span>
              </div>
              <div className="metric-info">
                <span className="metric-label">全天服务</span>
                <span className="metric-desc">随时响应</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <div className="trust-indicator">
            <StarOutlined className="trust-icon" />
            <span>卓越服务品质</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceStatsCard;