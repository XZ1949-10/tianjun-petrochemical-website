/**
 * 路由配置文件
 * 统一管理应用所有路由
 */
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'
import { motion } from 'framer-motion'

// 懒加载页面组件
const Home = React.lazy(() => import('../pages/Home'))
const About = React.lazy(() => import('../pages/About'))
const Products = React.lazy(() => import('../pages/Products'))
const ProductDetail = React.lazy(() => import('../pages/ProductDetail'))
const Safety = React.lazy(() => import('../pages/Safety'))
const News = React.lazy(() => import('../pages/News'))
const NewsDetail = React.lazy(() => import('../pages/NewsDetail'))
const Careers = React.lazy(() => import('../pages/Careers'))
const Contact = React.lazy(() => import('../pages/Contact'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

// 页面加载动画
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// 加载组件
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh' 
  }}>
    <Spin size="large">
      <div style={{ padding: '20px' }}>加载中...</div>
    </Spin>
  </div>
)

/**
 * 应用路由配置
 */
export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/products" element={
          <PageTransition>
            <Products />
          </PageTransition>
        } />
        <Route path="/products/:id" element={
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        } />
        <Route path="/safety" element={
          <PageTransition>
            <Safety />
          </PageTransition>
        } />
        <Route path="/news" element={
          <PageTransition>
            <News />
          </PageTransition>
        } />
        <Route path="/news/:id" element={
          <PageTransition>
            <NewsDetail />
          </PageTransition>
        } />
        <Route path="/careers" element={
          <PageTransition>
            <Careers />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </Suspense>
  )
}

/**
 * 路由配置对象
 * 可用于生成面包屑、菜单等
 */
export const routeConfig = [
  {
    path: '/',
    name: '首页',
    component: 'Home',
    exact: true
  },
  {
    path: '/about',
    name: '关于我们',
    component: 'About'
  },
  {
    path: '/products',
    name: '产品服务',
    component: 'Products'
  },
  {
    path: '/products/:id',
    name: '产品详情',
    component: 'ProductDetail',
    hidden: true // 不在导航中显示
  },
  {
    path: '/safety',
    name: '安全合规',
    component: 'Safety'
  },
  {
    path: '/news',
    name: '新闻中心',
    component: 'News'
  },
  {
    path: '/news/:id',
    name: '新闻详情',
    component: 'NewsDetail',
    hidden: true
  },
  {
    path: '/careers',
    name: '招聘信息',
    component: 'Careers'
  },
  {
    path: '/contact',
    name: '联系我们',
    component: 'Contact'
  }
]

export default AppRoutes