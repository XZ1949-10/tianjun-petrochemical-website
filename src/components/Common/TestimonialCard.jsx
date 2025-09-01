/**
 * 客户评价卡片组件 - 展示客户证言
 */
import React from 'react'
import { Card, Avatar, Rate, Tag, Badge } from 'antd'
import { StarFilled } from '@ant-design/icons'
import styled from 'styled-components'

const StyledTestimonialCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-body {
    padding: 24px;
  }
  
  .testimonial-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    .author-name {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-right: 8px;
    }
  }
  
  .testimonial-content {
    .testimonial-text {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 16px;
      font-style: italic;
    }
    
    .testimonial-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .company {
        font-size: 14px;
        color: #6b7280;
      }
      
      .rating {
        .ant-rate {
          font-size: 14px;
        }
      }
    }
  }
`

const TestimonialCard = ({ testimonial, className }) => {
  const {
    id,
    customerName,
    company,
    rating = 5,
    comment,
    avatar
  } = testimonial

  return (
    <StyledTestimonialCard 
      className={className}
      hoverable
    >
      <Card.Meta
        avatar={
          <Badge count={<StarFilled style={{ color: '#faad14' }} />} offset={[-5, 5]}>
            <Avatar size={64} style={{ backgroundColor: '#004c97' }}>
              {avatar || customerName?.charAt(0)}
            </Avatar>
          </Badge>
        }
        title={
          <div className="testimonial-header">
            <span className="author-name">{customerName}</span>
            <Tag color="blue">VIP客户</Tag>
          </div>
        }
        description={
          <div className="testimonial-content">
            <div className="testimonial-text">
              "{comment}"
            </div>
            <div className="testimonial-footer">
              <span className="company">{company}</span>
              <div className="rating">
                <Rate disabled defaultValue={rating} style={{ fontSize: '14px' }} />
              </div>
            </div>
          </div>
        }
      />
    </StyledTestimonialCard>
  )
}

export default TestimonialCard