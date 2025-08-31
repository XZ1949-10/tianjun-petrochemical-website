import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Typography, Divider, Tag, Avatar } from 'antd'
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const NewsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // 模拟新闻数据
  const news = {
    id: id,
    title: '新闻详情页面标题',
    subtitle: '这是一个新闻详情页面的副标题',
    content: `
      这是新闻详情页面的内容示例。您可以在这里展示完整的新闻内容、图片、视频等多媒体信息。
      
      新闻内容可以包含多个段落，详细描述事件的背景、过程和影响。这里可以添加更多的文字内容来充实新闻报道。
      
      您还可以在这里添加相关的数据、图表、引用等内容，使新闻报道更加丰富和有说服力。
    `,
    author: '编辑部',
    publishDate: '2024-01-15',
    category: '公司新闻',
    tags: ['重要', '最新', '行业动态']
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/news')}
        style={{ marginBottom: '20px' }}
      >
        返回新闻列表
      </Button>
      
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Tag color="blue" style={{ marginBottom: '16px' }}>
            {news.category}
          </Tag>
          
          <Title level={1} style={{ marginBottom: '8px' }}>
            {news.title}
          </Title>
          
          {news.subtitle && (
            <Title level={4} type="secondary" style={{ fontWeight: 'normal', marginBottom: '24px' }}>
              {news.subtitle}
            </Title>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar icon={<UserOutlined />} size="small" />
              <Text type="secondary">{news.author}</Text>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarOutlined style={{ color: '#999' }} />
              <Text type="secondary">{news.publishDate}</Text>
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            {news.tags.map((tag, index) => (
              <Tag key={index} style={{ marginRight: '8px', marginBottom: '8px' }}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        
        <Divider />
        
        <div style={{ 
          height: '300px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          marginBottom: '32px',
          borderRadius: '8px'
        }}>
          新闻配图展示区域
        </div>
        
        <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
          {news.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <Paragraph key={index} style={{ marginBottom: '16px' }}>
                {paragraph.trim()}
              </Paragraph>
            )
          ))}
        </div>
      </Card>
    </div>
  )
}

export default NewsDetail