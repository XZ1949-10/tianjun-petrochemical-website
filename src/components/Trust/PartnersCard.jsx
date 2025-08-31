import React, { useState } from 'react';
import { Card } from 'antd';
import { CrownOutlined, TeamOutlined, GlobalOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const PartnersCard = ({ delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
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
          <div className="header-badge">
            <TeamOutlined className="badge-icon" />
            <span className="badge-text">核心客户</span>
          </div>
          <div className="header-stats">
            <span className="main-number">6+</span>
            <span className="stats-label">主要车队</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="content-title">战略合作伙伴</h3>
          <div className="clients-showcase">
            <div className="client-item featured">
              <div className="client-logo">中石化</div>
              <span className="client-type">物流集团</span>
            </div>
            <div className="client-item">
              <div className="client-logo">中海运</div>
              <span className="client-type">运输公司</span>
            </div>
            <div className="client-item">
              <div className="client-logo">中建</div>
              <span className="client-type">建设集团</span>
            </div>
            <div className="client-item">
              <div className="client-logo">华润</div>
              <span className="client-type">燃气公司</span>
            </div>
            <div className="clients-more">
              <span>+2 更多</span>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <div className="trust-indicator">
            <CheckCircleOutlined className="trust-icon" />
            <span>长期合作伙伴</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PartnersCard;