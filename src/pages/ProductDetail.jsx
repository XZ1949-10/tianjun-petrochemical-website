import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, Row, Col, Typography, Divider, Tag } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // 模拟产品数据
  const product = {
    id: id,
    name: '产品详情页面',
    category: '示例分类',
    description: '这是一个产品详情页面的示例。您可以在这里展示产品的详细信息、规格参数、应用场景等内容。',
    features: [
      '高性能',
      '环保材料',
      '持久耐用',
      '易于维护'
    ],
    specifications: {
      '型号': 'ZS-' + id,
      '尺寸': '100 x 50 x 30 cm',
      '重量': '2.5 kg',
      '材质': '高强度合金'
    }
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/products')}
        style={{ marginBottom: '20px' }}
      >
        返回产品列表
      </Button>
      
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card
            cover={
              <div style={{ 
                height: '400px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
              }}>
                产品图片展示区域
              </div>
            }
          />
        </Col>
        
        <Col xs={24} lg={12}>
          <Title level={1}>{product.name}</Title>
          <Tag color="blue" style={{ marginBottom: '16px' }}>
            {product.category}
          </Tag>
          
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {product.description}
          </Paragraph>
          
          <Divider />
          
          <Title level={3}>产品特点</Title>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <Text>{feature}</Text>
              </li>
            ))}
          </ul>
          
          <Divider />
          
          <Title level={3}>技术规格</Title>
          {Object.entries(product.specifications).map(([key, value]) => (
            <Row key={key} style={{ marginBottom: '8px' }}>
              <Col span={8}>
                <Text strong>{key}:</Text>
              </Col>
              <Col span={16}>
                <Text>{value}</Text>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail