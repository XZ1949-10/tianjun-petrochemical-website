import React from 'react'
import { Layout, App as AntdApp } from 'antd'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Common/ScrollToTop'
import { AppRoutes } from './routes'

const { Content } = Layout

function App() {
  return (
    <AntdApp>
      <Layout className="min-h-screen">
        <Header />
        <Content className="flex-1">
          <ScrollToTop />
          <AppRoutes />
        </Content>
        <Footer />
      </Layout>
    </AntdApp>
  )
}

export default App