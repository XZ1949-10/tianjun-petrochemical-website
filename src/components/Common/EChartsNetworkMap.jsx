import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Modal, Descriptions, Badge, Card, Statistic, Button } from 'antd'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { EnvironmentOutlined, BankOutlined, ShopOutlined, PhoneOutlined } from '@ant-design/icons'

const StyledEChartsMap = styled.div`
  .echarts-map-container {
    width: 100%;
    height: 800px;
    position: relative;
    background: 
      radial-gradient(ellipse at 25% 15%, rgba(255, 215, 0, 0.08) 0%, transparent 40%),
      radial-gradient(ellipse at 75% 85%, rgba(0, 150, 255, 0.12) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.06) 0%, transparent 60%),
      linear-gradient(135deg, 
        #0a0e27 0%, 
        #1a1f3a 15%, 
        #2d3561 30%, 
        #1e2749 45%, 
        #0f1429 60%, 
        #1c2951 75%, 
        #0d1b2a 90%, 
        #0a0e27 100%);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 
      0 30px 60px rgba(0, 0, 0, 0.4),
      0 15px 35px rgba(0, 0, 0, 0.3),
      0 0 120px rgba(0, 76, 151, 0.15),
      0 0 80px rgba(255, 215, 0, 0.08),
      inset 0 0 120px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    border: 2px solid;
    border-image: linear-gradient(135deg, 
      rgba(255, 215, 0, 0.3) 0%, 
      rgba(0, 150, 255, 0.2) 25%, 
      rgba(138, 43, 226, 0.15) 50%, 
      rgba(0, 150, 255, 0.2) 75%, 
      rgba(255, 215, 0, 0.3) 100%) 1;
    backdrop-filter: blur(15px) saturate(1.2);
  }

  .map-info {
    position: absolute;
    top: 30px;
    right: 30px;
    background: rgba(0, 20, 40, 0.95);
    backdrop-filter: blur(15px);
    padding: 25px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    min-width: 240px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(0, 150, 255, 0.1);
    text-align: center;
    z-index: 10;

    .info-title {
      font-size: 20px;
      font-weight: 700;
      color: #FFD700;
      margin-bottom: 20px;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      &::before {
        content: '🏢';
        font-size: 24px;
      }
    }

    .info-subtitle {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      font-weight: 500;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }
  }

  .map-legend {
    position: absolute;
    bottom: 30px;
    left: 30px;
    background: rgba(0, 20, 40, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 16px;
    padding: 25px;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-width: 240px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(0, 150, 255, 0.1);
    z-index: 10;

    .legend-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 18px;
      color: #FFD700;
      text-align: center;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &::before {
        content: '📍';
        font-size: 20px;
      }
    }

    .legend-items {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 15px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateX(5px);
          color: #FFD700;
        }

        .legend-marker {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }

        .legend-line {
          width: 28px;
          height: 4px;
          border-radius: 3px;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
        }
      }
    }
  }
`

const EChartsNetworkMap = () => {
  const chartRef = useRef(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // 地理坐标映射
  const geoCoordMap = {
    '江西': [115.89, 28.68],
    '浙江': [120.19, 30.26],
    '上海': [121.48, 31.22],
    '广东': [113.23, 23.16],
    '山东': [117.00, 36.65],
    '辽宁': [123.38, 41.80],
    '四川': [104.06, 30.67],
    '北京': [116.46, 39.92],
    '河南': [113.65, 34.76],
    '湖北': [114.31, 30.52],
    '安徽': [117.27, 31.86],
    '福建': [119.30, 26.08],
    '江苏': [118.78, 32.04],
    '湖南': [113.00, 28.21],
    '河北': [114.48, 38.03],
    '山西': [112.53, 37.87],
    '陕西': [108.95, 34.27],
    '重庆': [106.54, 29.59],
    '云南': [102.73, 25.04],
    '贵州': [106.71, 26.57]
  }

  // 总部和分公司数据
  const headquarters = {
    name: '天骏石化总部',
    province: '江西',
    city: '南昌',
    address: '江西省南昌市红谷滩新区天骏大厦',
    phone: '0791-88888888',
    established: '1990年',
    employees: 500,
    type: 'headquarters'
  }

  const branches = [
    { name: '浙江分公司', province: '浙江', city: '杭州', address: '浙江省杭州市西湖区', phone: '0571-88888888', established: '1995年', employees: 120 },
    { name: '上海分公司', province: '上海', city: '上海', address: '上海市浦东新区陆家嘴', phone: '021-88888888', established: '1996年', employees: 150 },
    { name: '广东分公司', province: '广东', city: '广州', address: '广东省广州市天河区', phone: '020-88888888', established: '1997年', employees: 200 },
    { name: '山东分公司', province: '山东', city: '青岛', address: '山东省青岛市市南区', phone: '0532-88888888', established: '1998年', employees: 180 },
    { name: '辽宁分公司', province: '辽宁', city: '大连', address: '辽宁省大连市中山区', phone: '0411-88888888', established: '1999年', employees: 100 },
    { name: '四川分公司', province: '四川', city: '成都', address: '四川省成都市锦江区', phone: '028-88888888', established: '2000年', employees: 130 }
  ]

  // 转换连线数据
  const convertConnectionData = () => {
    const connections = []
    branches.forEach(branch => {
      const fromCoord = geoCoordMap[headquarters.province]
      const toCoord = geoCoordMap[branch.province]
      if (fromCoord && toCoord) {
        connections.push([
          { coord: fromCoord, name: headquarters.name },
          { coord: toCoord, name: branch.name }
        ])
      }
    })
    return connections
  }

  // 转换散点数据
  const convertScatterData = () => {
    const data = []
    // 总部数据
    const hqCoord = geoCoordMap[headquarters.province]
    if (hqCoord) {
      data.push({
        name: headquarters.name,
        value: [...hqCoord, headquarters.employees],
        itemStyle: { color: '#FFD700' },
        symbolSize: 25,
        data: headquarters
      })
    }
    
    // 分公司数据
    branches.forEach(branch => {
      const coord = geoCoordMap[branch.province]
      if (coord) {
        data.push({
          name: branch.name,
          value: [...coord, branch.employees],
          itemStyle: { color: '#00BFFF' },
          symbolSize: 15,
          data: branch
        })
      }
    })
    return data
  }

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      backgroundColor: 'transparent',
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 20, 40, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        formatter: function(params) {
          if (params.seriesType === 'effectScatter') {
            const data = params.data.data
            return `
              <div style="padding: 10px;">
                <div style="color: #FFD700; font-weight: bold; margin-bottom: 8px;">${data.name}</div>
                <div style="margin-bottom: 4px;">📍 ${data.city}, ${data.province}</div>
                <div style="margin-bottom: 4px;">👥 员工: ${data.employees}人</div>
                <div style="margin-bottom: 4px;">📅 成立: ${data.established}</div>
                <div>📞 ${data.phone}</div>
              </div>
            `
          }
          return params.name
        }
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.2,
        center: [108, 35],
        label: {
          show: true,
          color: '#fff',
          fontSize: 11,
          fontWeight: 'bold',
          textShadow: '0 0 8px rgba(0, 0, 0, 0.8)'
        },
        itemStyle: {
          areaColor: 'rgba(255, 255, 255, 0.08)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1
        },
        emphasis: {
          label: {
            show: true,
            color: '#FFD700',
            fontSize: 13,
            fontWeight: 'bold'
          },
          itemStyle: {
            areaColor: 'rgba(0, 150, 255, 0.25)',
            borderColor: 'rgba(0, 200, 255, 0.9)',
            borderWidth: 2
          }
        },
        regions: [
          // 总部省份 - 江西
          { name: '江西', itemStyle: { areaColor: 'rgba(255, 215, 0, 0.3)' }, label: { color: '#FFD700' } },
          // 分公司省份 - 蓝色系
          { name: '浙江', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          { name: '上海', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          { name: '广东', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          { name: '山东', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          { name: '辽宁', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          { name: '四川', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.2)' }, label: { color: '#00BFFF' } },
          // 其他省份 - 渐变色彩
          { name: '北京', itemStyle: { areaColor: 'rgba(138, 43, 226, 0.15)' } },
          { name: '天津', itemStyle: { areaColor: 'rgba(255, 20, 147, 0.15)' } },
          { name: '河北', itemStyle: { areaColor: 'rgba(50, 205, 50, 0.15)' } },
          { name: '山西', itemStyle: { areaColor: 'rgba(255, 165, 0, 0.15)' } },
          { name: '内蒙古', itemStyle: { areaColor: 'rgba(255, 69, 0, 0.15)' } },
          { name: '吉林', itemStyle: { areaColor: 'rgba(30, 144, 255, 0.15)' } },
          { name: '黑龙江', itemStyle: { areaColor: 'rgba(72, 61, 139, 0.15)' } },
          { name: '江苏', itemStyle: { areaColor: 'rgba(255, 105, 180, 0.15)' } },
          { name: '安徽', itemStyle: { areaColor: 'rgba(34, 139, 34, 0.15)' } },
          { name: '福建', itemStyle: { areaColor: 'rgba(255, 140, 0, 0.15)' } },
          { name: '河南', itemStyle: { areaColor: 'rgba(220, 20, 60, 0.15)' } },
          { name: '湖北', itemStyle: { areaColor: 'rgba(75, 0, 130, 0.15)' } },
          { name: '湖南', itemStyle: { areaColor: 'rgba(255, 215, 0, 0.15)' } },
          { name: '广西', itemStyle: { areaColor: 'rgba(0, 250, 154, 0.15)' } },
          { name: '海南', itemStyle: { areaColor: 'rgba(64, 224, 208, 0.15)' } },
          { name: '重庆', itemStyle: { areaColor: 'rgba(255, 99, 71, 0.15)' } },
          { name: '贵州', itemStyle: { areaColor: 'rgba(147, 112, 219, 0.15)' } },
          { name: '云南', itemStyle: { areaColor: 'rgba(255, 182, 193, 0.15)' } },
          { name: '西藏', itemStyle: { areaColor: 'rgba(176, 196, 222, 0.15)' } },
          { name: '陕西', itemStyle: { areaColor: 'rgba(205, 92, 92, 0.15)' } },
          { name: '甘肃', itemStyle: { areaColor: 'rgba(255, 160, 122, 0.15)' } },
          { name: '青海', itemStyle: { areaColor: 'rgba(135, 206, 235, 0.15)' } },
          { name: '宁夏', itemStyle: { areaColor: 'rgba(221, 160, 221, 0.15)' } },
          { name: '新疆', itemStyle: { areaColor: 'rgba(240, 230, 140, 0.15)' } },
          { name: '台湾', itemStyle: { areaColor: 'rgba(255, 192, 203, 0.15)' } },
          { name: '香港', itemStyle: { areaColor: 'rgba(255, 218, 185, 0.15)' } },
          { name: '澳门', itemStyle: { areaColor: 'rgba(250, 240, 230, 0.15)' } }
        ]
      },
      series: [
        // 连线动画
        {
          name: '网络连线',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.02,
            symbol: 'arrow',
            symbolSize: 8,
            color: '#FFD700'
          },
          lineStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: 'rgba(255, 215, 0, 0.8)' },
                { offset: 0.5, color: 'rgba(255, 165, 0, 0.6)' },
                { offset: 1, color: 'rgba(0, 191, 255, 0.4)' }
              ]
            },
            width: 3,
            curveness: 0.3,
            opacity: 0.8
          },
          data: convertConnectionData()
        },
        // 总部和分公司标记
        {
          name: '服务网点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          rippleEffect: {
            period: 4,
            scale: 4,
            brushType: 'stroke'
          },
          label: {
            show: true,
            position: 'bottom',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            formatter: function(params) {
              return params.data.data.city
            }
          },
          symbolSize: function(val) {
            return val[2] / 10 + 10
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: function(params) {
              return params.data.itemStyle.color
            }
          },
          data: convertScatterData()
        }
      ]
    }

    // 注册中国地图数据 - 使用本地文件
    fetch('/china.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load map data')
        }
        return response.json()
      })
      .then(geoJson => {
        echarts.registerMap('china', geoJson)
        chart.setOption(option)
      })
      .catch((error) => {
        console.warn('Failed to load china map data:', error)
        // 如果本地文件加载失败，尝试使用外部API作为备用
        fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
          .then(response => response.json())
          .then(geoJson => {
            echarts.registerMap('china', geoJson)
            chart.setOption(option)
          })
          .catch(() => {
            console.error('Both local and remote map data failed to load')
            // 如果都失败，使用简化的地图配置
            chart.setOption({
              ...option,
              geo: {
                ...option.geo,
                map: undefined,
                regions: [
                  { name: '江西', itemStyle: { areaColor: 'rgba(255, 215, 0, 0.1)' } },
                  { name: '浙江', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } },
                  { name: '上海', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } },
                  { name: '广东', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } },
                  { name: '山东', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } },
                  { name: '辽宁', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } },
                  { name: '四川', itemStyle: { areaColor: 'rgba(0, 191, 255, 0.1)' } }
                ]
              }
            })
          })
      })

    // 点击事件
    chart.on('click', function(params) {
      if (params.seriesType === 'effectScatter' && params.data.data) {
        setSelectedLocation(params.data.data)
        setModalVisible(true)
      }
    })

    // 响应式处理
    const handleResize = () => {
      chart.resize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }, [])

  const handleCallPhone = (phone) => {
    window.open(`tel:${phone}`)
  }

  return (
    <StyledEChartsMap>
      <motion.div
        className="echarts-map-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        
        {/* 地图信息 */}
        <div className="map-info">
          <div className="info-title">全国服务网络</div>
          <div className="info-subtitle">
            覆盖全国重点区域<br/>
            1个总部 • 6个分公司
          </div>
        </div>
        
        {/* 图例 */}
        <div className="map-legend">
          <div className="legend-title">网络分布</div>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-marker" style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)' }}></div>
              <span>总部（江西）</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker" style={{ background: 'linear-gradient(45deg, #00BFFF, #0080FF)' }}></div>
              <span>分公司</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{ background: 'linear-gradient(90deg, rgba(255,165,0,0.3), #FFA500, rgba(255,165,0,0.3))' }}></div>
              <span>物流网络</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 详情模态框 */}
      <Modal
        title={selectedLocation?.name}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="phone" icon={<PhoneOutlined />} onClick={() => handleCallPhone(selectedLocation?.phone)}>
            拨打电话
          </Button>,
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {selectedLocation && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="位置类型">
              <Badge 
                status={selectedLocation.type === 'headquarters' ? 'processing' : 'success'} 
                text={selectedLocation.type === 'headquarters' ? '总部' : '分公司'} 
              />
            </Descriptions.Item>
            <Descriptions.Item label="所在城市">{selectedLocation.city}, {selectedLocation.province}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{selectedLocation.phone}</Descriptions.Item>
            <Descriptions.Item label="详细地址">{selectedLocation.address}</Descriptions.Item>
            <Descriptions.Item label="成立时间">{selectedLocation.established}</Descriptions.Item>
            <Descriptions.Item label="员工人数">{selectedLocation.employees}人</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </StyledEChartsMap>
  )
}

export default EChartsNetworkMap