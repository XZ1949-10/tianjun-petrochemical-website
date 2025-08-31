// 通用组件库索引文件
// 提供统一的组件导入入口

// 布局组件
export { default as Header } from '../Layout/Header'
export { default as Footer } from '../Layout/Footer'

// 通用功能组件
export { default as ScrollToTop } from './ScrollToTop'

// 组件使用说明
/*
使用示例：

1. 页面滚动管理 (ScrollToTop)
import { ScrollToTop } from '@/components/Common'

组件特性：
- 所有组件都支持响应式设计
- 使用统一的设计系统（CSS变量）
- 支持动画效果（framer-motion）
- 遵循Ant Design设计规范
- 针对石化行业进行定制化设计
*/