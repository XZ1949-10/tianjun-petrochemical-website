# 舟山天骏石油化工有限公司官网

一个现代化的石油化工企业官网，采用React + Vite构建，具有响应式设计和丰富的交互功能。

## 功能特色

- 🎨 现代化UI设计，基于Ant Design组件库
- 📱 完全响应式设计，支持移动端和桌面端
- 🚀 基于Vite的快速开发和构建
- 📊 数据可视化图表（ECharts）
- 🎬 流畅的页面动画效果（Framer Motion）
- 🌐 多语言支持准备
- 📈 SEO优化

## 页面结构

- **首页** - Hero轮播、快捷入口、实时数据、新闻公告
- **关于天骏** - 公司概况、企业文化、组织架构、荣誉资质
- **产品中心** - 产品展示、筛选搜索、详情页、产品对比
- **解决方案** - 行业场景、成功案例、专家联系
- **可持续发展** - ESG数据可视化、政策认证、报告下载
- **新闻中心** - 新闻分类、标签筛选、富文本内容
- **投资者关系** - 股票信息、财务报告、公告披露
- **人才招聘** - 职位搜索、在线申请、企业文化
- **联系我们** - 智能表单、地图定位、多渠道联系

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **UI组件库**: Ant Design
- **路由**: React Router DOM
- **动画**: Framer Motion
- **图表**: ECharts for React
- **样式**: Styled Components + CSS
- **HTTP客户端**: Axios
- **日期处理**: Day.js
- **3D渲染**: Three.js

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

## 安装步骤

### 1. 安装Node.js

请访问 [Node.js官网](https://nodejs.org/) 下载并安装最新的LTS版本。

安装完成后，在命令行中验证安装：

```bash
node --version
npm --version
```

### 2. 安装项目依赖

在项目根目录下运行：

```bash
npm install
```

或使用yarn：

```bash
yarn install
```

### 3. 启动开发服务器

```bash
npm run dev
```

或使用yarn：

```bash
yarn dev
```

开发服务器将在 http://localhost:3000 启动。

### 4. 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

### 5. 预览生产版本

```bash
npm run preview
```

## 项目结构

```
舟山天骏石油化工有限公司/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── Common/        # 通用组件
│   │   └── Layout/        # 布局组件
│   ├── pages/             # 页面组件
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   └── index.css         # 全局样式
├── index.html             # HTML模板
├── package.json           # 项目配置
├── vite.config.js        # Vite配置
└── README.md             # 项目说明
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.jsx` 中添加路由配置
3. 在导航组件中添加菜单项

### 样式规范

- 使用Ant Design的主题系统
- 响应式断点：xs(<576px), sm(≥576px), md(≥768px), lg(≥992px), xl(≥1200px), xxl(≥1600px)
- 颜色主题：主色调#1890ff，辅助色根据企业VI调整

### 组件开发

- 优先使用Ant Design组件
- 自定义组件放在 `src/components/` 目录
- 使用Styled Components进行样式定制

## 部署说明

### 静态部署

构建完成后，将 `dist` 目录的内容部署到静态文件服务器即可。

### 服务器配置

由于使用了前端路由，需要配置服务器将所有路由重定向到 `index.html`。

**Nginx配置示例：**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache配置示例：**

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

本项目仅供舟山天骏石油化工有限公司内部使用。

## 联系方式

如有技术问题，请联系开发团队。