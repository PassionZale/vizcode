# Motion Canvas 最佳实践指南

基于官方文档和项目实际使用经验，以下是 Motion Canvas 的核心最佳实践：

## 1. 项目架构与组织

### 1.1 多项目管理结构
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/projects/code-journey/index.ts",
        "./src/projects/self-intro/index.ts",
        "./src/projects/example/index.ts",
      ],
    }),
  ],
});
```

**最佳实践：**
- 为每个动画项目创建独立的目录
- 使用统一的目录结构：`scenes/`, `assets/`, `index.ts`
- 配置路径别名简化导入：`@/` → `./src/`

### 1.2 场景组织
```typescript
// 每个场景文件
export default makeScene2D(function* (view) {
  // 场景逻辑
});
```

**最佳实践：**
- 场景文件使用描述性命名（如 `2015.tsx`, `begin.tsx`）
- 在 `index.ts` 中使用 `?scene` 后缀导入场景
- 为复杂场景创建对应的 `.meta` 文件

## 2. 组件与引用管理

### 2.1 使用 createRef 管理元素引用
```typescript
const titleRef = createRef<Txt>();
const contentRef = createRef<Rect>();

// 在 JSX 中分配引用
<Txt ref={titleRef} {...TextStyles.title} />
<Rect ref={contentRef}>
```

**最佳实践：**
- 为需要动画的元素创建引用
- 使用 TypeScript 泛型指定引用类型
- 为多个相似元素使用数组引用：
```typescript
const locationRefs = Array.from({ length: LOCATIONS.length }, () =>
  createRef<Rect>()
);
```

### 2.2 组件层次结构
```typescript
view.add(
  <Rect layout size={["100%", "100%"]} fill={"#121b21"} direction={"column"}>
    <Rect size={["100%", "25%"]} layout padding={[40, 20]}>
      {/* 头部内容 */}
    </Rect>
    <Rect grow={1}>
      {/* 主要内容 */}
    </Rect>
    <Rect size={["100%", "25%"]} layout padding={40}>
      {/* 底部内容 */}
    </Rect>
  </Rect>
);
```

**最佳实践：**
- 使用布局容器（`layout` 属性）管理复杂结构
- 利用 `grow` 属性实现弹性布局
- 统一背景颜色和尺寸规范

## 3. 动画制作与流程控制

### 3.1 动画序列控制
```typescript
// 并行动画
yield* all(
  titleRef().text("2015", 1),
  gridRef().start(0.5, 1).to(0, 1),
  gridRef().end(0.5, 1).to(1, 1)
);

// 顺序动画
yield* chain(
  hubeiRef().end(1, 1),
  hubeiRef().fill("#f2ebbf", 1),
  guangdongRef().end(1, 1)
);

// 带延迟的序列动画
yield* sequence(0.15, ...locationRefs.map((ref) => appear(ref(), 0.5)));
```

**最佳实践：**
- 使用 `all()` 执行并行动画
- 使用 `chain()` 执行顺序动画
- 使用 `sequence()` 创建带时间间隔的动画序列
- 合理使用 `waitFor()` 添加停顿

### 3.2 可重用动画函数
```typescript
// utils.ts
export function* appear(object: Shape, duration = 1): ThreadGenerator {
  let scale = object.scale();
  yield* all(
    object.scale(0).scale(scale, duration),
    object.opacity(0).opacity(1, duration)
  );
}

// 在场景中使用
yield* sequence(0.15, ...locationRefs.map((ref) => appear(ref(), 0.5)));
```

**最佳实践：**
- 将常用动画提取为可重用函数
- 使用 `yield*` 委托给动画生成器
- 为动画函数提供合理的默认参数

## 4. 样式与资源管理

### 4.1 统一样式系统
```typescript
// text-styles.ts
export const TextStyles = {
  title: {
    fontSize: 88,
    fontWeight: 700,
    fill: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  subtitle: {
    fontSize: 56,
    fontWeight: 600,
    fill: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  // ... 其他样式
};

// 使用样式
<Txt {...TextStyles.title}>标题内容</Txt>
```

**最佳实践：**
- 创建全局样式配置
- 使用扩展运算符应用样式
- 针对目标分辨率优化字体大小
- 使用语义化样式名称

### 4.2 资源管理
```typescript
// 导入资源
import logoSvg from "../assets/logo.svg";
import targetWebm from "../assets/target.webm";

// 使用资源
<Img size={[180, 180]} src={logoSvg} />
<Video src={targetWebm} size={100} />
```

**最佳实践：**
- 将资源文件放在专门的 `assets/` 目录
- 使用 import 导入资源获得类型检查
- 为视频资源提供播放控制：`flagRefs[0]().play();`

## 5. 场景过渡与时间控制

### 5.1 场景过渡
```typescript
// 在场景开始处添加过渡
yield* slideTransition(Direction.Left);
```

**最佳实践：**
- 在场景开始处放置过渡效果
- 使用预定义过渡：`slideTransition`, `fadeTransition`, `zoomInTransition`
- 为过渡指定合理的方向和持续时间

### 5.2 时间事件控制
```typescript
// 简单等待
yield* waitFor(1);

// 基于事件的等待（注释掉的备用方案）
// yield* waitUntil("2015_end");
```

**最佳实践：**
- 优先使用 `waitFor()` 进行简单时间控制
- 为复杂同步需求保留 `waitUntil()` 选项
- 在调试时注释掉时间等待，生产时启用

## 6. 性能优化

### 6.1 数据驱动的内容
```typescript
const LOCATIONS = [
  {
    city: "武汉",
    rectPosition: [-230, -320] as RectProps["position"],
    flagWebm: targetWebm,
    flagPosition: [-230, -320] as RectProps["position"],
  },
  // ...
];
```

**最佳实践：**
- 使用数据驱动的方式管理重复内容
- 将配置数据提取为常量
- 使用 TypeScript 类型确保数据结构正确

### 6.2 渲染优化
```typescript
// 使用 start/end 属性控制渐变显示
<Grid
  stroke={"#666"}
  start={0.5}
  end={0.5}
/>

// 动画控制显示范围
yield* all(
  gridRef().start(0.5, 1).to(0, 1),
  gridRef().end(0.5, 1).to(1, 1)
);
```

**最佳实践：**
- 使用 `start`/`end` 属性控制元素显示范围
- 避免频繁的添加/删除操作
- 使用 opacity 和 scale 进行动画而非显示/隐藏

## 7. 开发工作流

### 7.1 项目配置
```json
{
  "scripts": {
    "dev": "motion-canvas serve",
    "build": "motion-canvas build",
    "render": "motion-canvas render"
  }
}
```

**最佳实践：**
- 使用 `npm run dev` 启动开发服务器
- 定期使用 `npm run build` 检查编译错误
- 使用 `npm run render` 导出最终视频

### 7.2 调试与测试
```typescript
// 保留调试用的注释代码
// yield* waitUntil("2015_end");
```

**最佳实践：**
- 在关键位置保留调试注释
- 使用合理的动画时长便于调试
- 分阶段测试复杂动画序列

## 总结

这些最佳实践基于 Motion Canvas 官方文档和项目实际代码模式。遵循这些实践可以帮助创建更专业、可维护且性能良好的动画作品。记住始终优先考虑代码的可读性和可维护性，这样在项目扩展时会更加容易。