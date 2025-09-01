/**
 * 产品卡片组件 - 展示单个产品信息
 */
import React from 'react'
import { Card, Button, Tag, Statistic, Space } from 'antd'
import { Link } from 'react-router-dom'
import { TruckOutlined, SafetyOutlined, RocketOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledProductCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .product-cover {
    position: relative;
    height: 200px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    
    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover .cover-image {
      transform: scale(1.05);
    }
    
    .service-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
    }
  }
  
  .product-content {
    .product-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1f2937;
    }
    
    .product-description {
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
      min-height: 60px;
    }
    
    .product-features {
      margin-bottom: 16px;
      
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 13px;
        color: #4b5563;
        
        .anticon {
          margin-right: 8px;
          color: #004c97;
        }
      }
    }
    
    .product-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      
      .ant-statistic {
        .ant-statistic-content {
          font-size: 16px !important;
          color: #004c97 !important;
        }
      }
    }
  }
`

const ProductCard = ({ product, className }) => {
  const {
    id,
    title,
    description,
    image,
    features,
    price,
    unit,
    tags = []
  } = product

  const getIconForFeature = (feature) => {
    if (feature.includes('配送')) return <TruckOutlined />
    if (feature.includes('安全') || feature.includes('应急')) return <SafetyOutlined />
    if (feature.includes('现场') || feature.includes('加油')) return <RocketOutlined />
    return <TruckOutlined />
  }

  return (
    <StyledProductCard 
      className={className}
      cover={
        <div className="product-cover">
          <img 
            src={image || 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={title}
            className="cover-image"
          />
          {tags.length > 0 && (
            <Tag color="blue" className="service-tag">
              {tags[0]}
            </Tag>
          )}
        </div>
      }
      actions={[
        <Button type="primary" key="detail">
          <Link to={`/products/${id}`}>查看详情</Link>
        </Button>
      ]}
    >
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-features">
          {features?.slice(0, 3).map((feature, index) => (
            <div className="feature-item" key={index}>
              {getIconForFeature(feature)}
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="product-stats">
          <Statistic 
            title="参考价格" 
            value={price} 
            suffix={unit || '元/升'} 
            precision={2}
          />
        </div>
      </div>
    </StyledProductCard>
  )
}

export default ProductCard