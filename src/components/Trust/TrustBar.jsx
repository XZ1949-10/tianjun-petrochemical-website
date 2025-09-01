import React from 'react';
import { motion } from 'framer-motion';
import { CertificationsCard, PartnersCard, ServiceStatsCard } from './';
import './TrustBar.css';

const TrustBar = ({ data }) => {
  return (
    <section className="trust-bar">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="trust-section-header"
        >
          <h2 className="trust-main-title">企业实力展示</h2>
          <p className="trust-subtitle">专业资质 · 权威认证 · 卓越服务</p>
        </motion.div>
        
        <div className="trust-content">
          {/* 质量管理体系组件 - 左边 */}
          <div className="trust-card-wrapper">
            <CertificationsCard delay={0.1} data={data?.certifications} />
          </div>
          
          {/* 战略合作伙伴组件 - 中间 */}
          <div className="trust-card-wrapper">
            <PartnersCard delay={0.2} data={data?.partners} />
          </div>
          
          {/* 服务表现组件 - 右边 */}
          <div className="trust-card-wrapper">
            <ServiceStatsCard delay={0.3} data={data?.serviceStats} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;