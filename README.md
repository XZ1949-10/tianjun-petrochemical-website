# 舟山天骏石油化工有限公司官网

一个现代化、响应式的企业官网项目，采用 React + Vite 构建，集成了完整的 API 接口和动态数据展示功能。

## 🚀 项目特性

- **现代化技术栈**: React 18 + Vite + Ant Design 5
- **响应式设计**: 完美适配桌面端和移动端
- **动态数据驱动**: 完整的 API 集成，支持动态内容展示
- **精美动画效果**: Framer Motion 打造流畅用户体验
- **数据可视化**: ECharts 图表展示企业数据
- **SEO 优化**: 完整的 SEO 元信息和结构化数据

## 📁 项目结构

```
zssy/
├── src/
│   ├── components/         # 可复用组件
│   │   ├── Common/        # 通用组件
│   │   └── Layout/        # 布局组件
│   ├── pages/             # 页面组件
│   ├── services/          # API 服务
│   ├── hooks/             # 自定义 Hooks
│   ├── utils/             # 工具函数
│   ├── store/             # 状态管理
│   └── styles/            # 样式文件
├── server.js              # API 模拟服务器
├── db.json               # 模拟数据库
├── routes.json           # API 路由配置
└── package.json          # 项目配置
```

## 🛠️ 技术栈

### 前端框架
- **React 18**: 最新的 React 版本，支持并发特性
- **Vite**: 快速的构建工具和开发服务器
- **React Router DOM**: 单页应用路由管理

### UI 组件库
- **Ant Design 5.12.0**: 企业级 UI 设计语言和 React 组件库
- **Styled Components**: CSS-in-JS 样式解决方案
- **Framer Motion**: 强大的动画库

### 数据可视化
- **ECharts 5.6.0**: 强大的图表库
- **echarts-for-react**: ECharts 的 React 封装

### 开发工具
- **ESLint**: 代码质量检查
- **JSON Server**: API 模拟服务
- **Concurrently**: 并行运行多个命令

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 同时启动前端和后端服务
npm run dev:full

# 或分别启动
npm run dev      # 前端服务 (http://localhost:5173)
npm run server   # 后端服务 (http://localhost:3001)
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📊 API 接口

项目集成了完整的 RESTful API 接口，包括：

- **首页接口**: 轮播图、服务介绍、客户证言、最新动态
- **关于我们**: 企业信息、发展历程、核心价值观、管理团队
- **产品服务**: 产品列表、服务详情、价格信息、技术咨询
- **新闻中心**: 新闻列表、详情页、分享统计、Newsletter 订阅
- **安全合规**: 安全政策、认证证书、文档下载
- **招聘信息**: 职位列表、企业福利、简历投递
- **联系我们**: 联系信息、留言提交、服务区域

## 🎨 页面功能

### 首页 (Home)
- Hero 轮播展示
- 实时价格显示
- 快速询价模态框
- 订单追踪功能
- 服务介绍卡片
- 客户证言展示
- 最新动态预览

### 关于我们 (About)
- 企业发展时间线
- 核心价值观展示
- 车队储存信息
- 管理团队介绍
- 团队成员详情模态框

### 新闻中心 (News)
- 新闻分类筛选
- 实时搜索功能
- 新闻分享统计
- Newsletter 订阅
- 响应式新闻卡片

### 安全合规 (Safety)
- 资质认证展示
- 安全统计数据
- 政策文档下载
- 文档预览功能

## 🔧 开发规范

### 代码规范
- 使用 ESLint 进行代码质量检查
- 遵循 React Hooks 最佳实践
- 组件化开发，提高代码复用性

### API 规范
- 统一的响应格式
- 错误处理机制
- 智能回退策略

### 样式规范
- 响应式设计原则
- 统一的设计语言
- 性能优化考虑

## 📱 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

该项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目地址: [GitHub Repository](https://github.com/yourusername/zssy)
- 问题反馈: [Issues](https://github.com/yourusername/zssy/issues)

---

© 2024 舟山天骏石油化工有限公司. 保留所有权利.