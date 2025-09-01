/**
 * 服务卡片组件 - 展示服务项目
 */
import React from 'react'
import { Card, Button, Badge, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledServiceCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .service-cover {
    position: relative;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #004c97 0%, #336bb3 100%);
    border-radius: 8px 8px 0 0;
    
    .service-icon {
      font-size: 48px;
      color: white;
      margin-bottom: 16px;
    }
    
    .service-overlay {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
    }
  }
  
  .ant-card-body {
    padding: 20px;
  }
  
  .service-content {
    .service-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1f2937;
    }
    
    .service-desc {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
      min-height: 60px;
    }
    
    .service-stats {
      .ant-statistic {
        .ant-statistic-content {
          font-size: 16px !important;
          color: #004c97 !important;
        }
      }
    }
  }
  
  .ant-card-actions {
    border-top: 1px solid #f0f0f0;
    background: #fafafa;
    
    > li {
      margin: 6px 0;
      
      .ant-btn-link {
        color: #004c97;
        font-weight: 500;
        padding: 0 8px;
        
        &:hover {
          color: #003d7a;
        }
      }
    }
  }
`

const ServiceCard = ({ service, className }) => {
  const {
    id,
    icon,
    title,
    description,
    link,
    serviceHours = '24'
  } = service

  return (
    <StyledServiceCard 
      className={className}
      cover={
        <div className="service-cover">
          <div className="service-icon">{icon}</div>
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
        <Button type="link" key="more">
          了解更多
        </Button>
      ]}
    >
      <div className="service-content">
        <Card.Meta
          title={<span className="service-title">{title}</span>}
          description={
            <div className="service-content">
              <p className="service-desc">{description}</p>
              <div className="service-stats">
                <Statistic 
                  title="服务时长" 
                  value={serviceHours} 
                  suffix="小时" 
                  valueStyle={{ color: '#004c97', fontSize: '16px' }}
                />
              </div>
            </div>
          }
        />
      </div>
    </StyledServiceCard>
  )
}

export default ServiceCard