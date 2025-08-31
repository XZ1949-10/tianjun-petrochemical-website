import React, { useState } from 'react';
import { Card } from 'antd';
import { SafetyOutlined, CheckCircleOutlined, StarOutlined, TrophyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const CertificationsCard = ({ delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="trust-card-wrapper"
    >
      <Card 
        className="trust-card certifications-card"
        variant="borderless"
        hoverable
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
          <div className="header-badge gold">
            <SafetyOutlined className="badge-icon" />
            <span className="badge-text">权威认证</span>
          </div>
          <div className="header-stats">
            <span className="main-number">3+</span>
            <span className="stats-label">国际标准</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="content-title">质量管理体系</h3>
          <div className="certifications-grid">
            <div className="cert-item">
              <div className="cert-badge iso-9001">
                <span className="cert-code">ISO</span>
                <span className="cert-number">9001</span>
              </div>
              <span className="cert-name">质量管理</span>
              <div className="cert-status active">
                <CheckCircleOutlined /> 有效
              </div>
            </div>
            
            <div className="cert-item">
              <div className="cert-badge iso-14001">
                <span className="cert-code">ISO</span>
                <span className="cert-number">14001</span>
              </div>
              <span className="cert-name">环境管理</span>
              <div className="cert-status active">
                <CheckCircleOutlined /> 有效
              </div>
            </div>
            
            <div className="cert-item">
              <div className="cert-badge ohsas">
                <span className="cert-code">OHSAS</span>
                <span className="cert-number">18001</span>
              </div>
              <span className="cert-name">职业健康</span>
              <div className="cert-status active">
                <CheckCircleOutlined /> 有效
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <div className="trust-indicator">
            <TrophyOutlined className="trust-icon" />
            <span>国际标准认证</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CertificationsCard;