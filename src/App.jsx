import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, Spin, App as AntdApp } from 'antd'
import { motion } from 'framer-motion'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Common/ScrollToTop'

// 懒加载页面组件
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Products = React.lazy(() => import('./pages/Products'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))
const Safety = React.lazy(() => import('./pages/Safety'))
const News = React.lazy(() => import('./pages/News'))
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'))
const Careers = React.lazy(() => import('./pages/Careers'))
const Contact = React.lazy(() => import('./pages/Contact'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const { Content } = Layout

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

function App() {
  return (
    <AntdApp>
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex-1">
          <ScrollToTop />
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
        </Content>
        <Footer />
      </Layout>
    </AntdApp>
  )
}

export default App