import React from 'react'
/**
 * 新闻卡片组件 - 展示单条新闻信息
 */
import React from 'react'
import { Card, Tag, Statistic, Space } from 'antd'
import { Link } from 'react-router-dom'
import { CalendarOutlined, EyeOutlined, TrophyOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import dayjs from 'dayjs'

const StyledNewsCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .news-cover {
    position: relative;
    height: 200px;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    
    .news-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover .news-image {
      transform: scale(1.05);
    }
    
    .news-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 2;
    }
    
    .news-overlay {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
    }
  }
  
  .news-content {
    .news-header {
      margin-bottom: 12px;
      
      .news-title {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.2s ease;
        
        &:hover {
          color: #004c97;
        }
      }
    }
    
    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 13px;
      color: #6b7280;
      
      .anticon {
        margin-right: 4px;
      }
      
      .news-stats {
        .ant-statistic {
          .ant-statistic-content {
            font-size: 12px !important;
            color: #6b7280 !important;
          }
          
          .ant-statistic-content-value {
            font-size: 12px !important;
          }
        }
      }
    }
    
    .news-excerpt {
      color: #4b5563;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 16px;
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
      margin: 4px 0;
      
      span {
        font-size: 13px;
        color: #6b7280;
        transition: color 0.2s ease;
        
        &:hover {
          color: #004c97;
        }
      }
    }
  }
`

const NewsCard = ({ news, className }) => {
  const {
    id,
    title,
    excerpt,
    image,
    date,
    category,
    readCount = 0
  } = news

  return (
    <StyledNewsCard 
      className={className}
      cover={
        <div className="news-cover">
          <img 
            src={image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={title}
            className="news-image"
          />
          <Tag color="blue" className="news-tag">{category}</Tag>
          <div className="news-overlay">
            <TrophyOutlined style={{ color: '#faad14', fontSize: '20px' }} />
          </div>
        </div>
      }
      actions={[
        <Link to={`/news/${id}`} key="read">阅读更多</Link>,
        <span key="share">分享</span>
      ]}
    >
      <div className="news-content">
        <div className="news-header">
          <Link to={`/news/${id}`}>
            <span className="news-title">{title}</span>
          </Link>
        </div>
        
        <div className="news-meta">
          <span><CalendarOutlined /> {dayjs(date).format('YYYY-MM-DD')}</span>
          <div className="news-stats">
            <Statistic value={readCount} suffix="次阅读" size="small" />
          </div>
        </div>
        
        <p className="news-excerpt">{excerpt}</p>
      </div>
    </StyledNewsCard>
  )
}

export default NewsCard
