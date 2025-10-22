// 全局文本样式配置 - 针对1080×1920移动端短视频优化
export const TextStyles = {
  // 基础样式
  base: {
    fill: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.4,
  },
  
  // 主标题（年份/大标题）
  title: {
    fontSize: 88,
    fontWeight: 700,
    fill: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.2,
  },
  
  // 副标题（章节标题）
  subtitle: {
    fontSize: 56,
    fontWeight: 600,
    fill: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.3,
  },
  
  // 正文内容
  body: {
    fontSize: 32,
    fontWeight: 400,
    fill: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.5,
  },
  
  // 补充说明文字
  caption: {
    fontSize: 22,
    fontWeight: 400,
    fill: '#ffffffcc', // 80% 透明度
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.4,
  },
  
  // 强调文字
  emphasis: {
    fontSize: 36,
    fontWeight: 600,
    fill: '#ffff00', // 黄色强调
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.4,
  },

  // 兼容性：保留原有的简单样式（向后兼容）
  legacy: {
    fontSize: 32,
    fill: '#ffffff',
    fontFamily: 'Arial',
  }
};

// 导出类型定义（如果需要TypeScript类型检查）
export type TextStyleKey = keyof typeof TextStyles;
