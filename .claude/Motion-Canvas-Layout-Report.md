# Motion Canvas 布局系统完整调研报告

## 概述

Motion Canvas 2D 提供了强大的基于 Flexbox 的布局系统，允许开发者精确控制和排列各种视觉元素。该系统的核心是 `Layout` 组件，它支持现代 Web 开发中熟悉的 Flexbox 属性和概念。

## 1. Rect 组件详解

### 1.1 基础概念

Rect 组件是 Motion Canvas 中最基础的形状组件之一，继承自 Curve 组件，提供了丰富的矩形绘制功能。

### 1.2 核心属性

#### 尺寸属性
```typescript
<Rect
  width={200}           // 宽度
  height={100}          // 高度
  size={[200, 100]}     // 同时设置宽度和高度
/>
```

#### 样式属性
```typescript
<Rect
  fill="#ff6470"        // 填充颜色
  stroke="#000000"      // 边框颜色
  lineWidth={2}         // 边框宽度
  radius={10}           // 圆角半径
/>
```

#### 变换属性
```typescript
<Rect
  x={100}               // X 坐标
  y={50}                // Y 坐标
  rotation={45}         // 旋转角度（度数）
  scale={1.5}           // 缩放比例
/>
```

#### 高级功能（继承自 Curve）
```typescript
<Rect
  startArrow={true}     // 起始箭头
  endArrow={true}       // 结束箭头
  arrowSize={16}        // 箭头大小
  strokeDasharray={[5, 5]}  // 虚线样式
/>
```

### 1.3 使用示例

#### 基础矩形
```typescript
<Rect
  width={200}
  height={100}
  fill="#ff6470"
  stroke="#000000"
  lineWidth={2}
/>
```

#### 圆角矩形
```typescript
<Rect
  width={200}
  height={100}
  fill="#e6a700"
  radius={15}
/>
```

#### 不同圆角的矩形
```typescript
<Rect
  width={200}
  height={100}
  fill="#e13238"
  radius={[10, 20, 30, 40]}  // [左上, 右上, 右下, 左下]
/>
```

#### 完整圆形
```typescript
<Rect
  width={100}
  height={100}
  fill="#4a90e2"
  radius={50}  // 宽度和高度的一半
/>
```

## 2. Layout 系统工作原理

### 2.1 基本概念

Layout 系统是一个**选择性功能**，需要通过设置 `layout` 属性来启用。它基于 CSS Flexbox 布局模型实现。

### 2.2 层次结构

```
Layout Root (设置了 layout 属性)
├── Layout Child (直接子节点)
├── Layout Child
└── Nested Layout (嵌套布局)
    ├── Layout Child
    └── Layout Child
```

### 2.3 启用布局

```typescript
// 启用布局根节点
<Rect layout>
  <Circle width={320} height={320} />
</Rect>

// 嵌套布局
<Layout layout direction="column">
  <Rect height={100} />
  <Layout layout direction="row">
    <Circle size={50} />
    <Circle size={50} />
  </Layout>
</Layout>
```

### 2.4 组件支持

以下组件可以参与布局：
- `Rect`
- `Circle`
- `Img`
- `Layout`
- 任何继承了 Layout 的自定义组件

## 3. Flex 布局核心属性

### 3.1 方向控制 (direction)

控制主轴的方向，决定子元素的排列方式。

```typescript
<Layout
  layout
  direction="row"         // 水平排列（默认）
  // direction="column"   // 垂直排列
  // direction="row-reverse"  // 水平反向排列
  // direction="column-reverse" // 垂直反向排列
>
  {children}
</Layout>
```

### 3.2 主轴对齐 (justifyContent)

控制子元素在主轴上的对齐方式。

```typescript
<Layout
  layout
  direction="row"
  justifyContent="flex-start"     // 起始对齐（默认）
  // justifyContent="flex-end"   // 结束对齐
  // justifyContent="center"     // 居中对齐
  // justifyContent="space-between"  // 两端对齐
  // justifyContent="space-around"   // 环绕对齐
  // justifyContent="space-evenly"   // 均匀对齐
>
  {children}
</Layout>
```

### 3.3 交叉轴对齐 (alignItems)

控制子元素在交叉轴上的对齐方式。

```typescript
<Layout
  layout
  direction="row"
  alignItems="stretch"        // 拉伸填充（默认）
  // alignItems="flex-start"  // 起始对齐
  // alignItems="flex-end"    // 结束对齐
  // alignItems="center"      // 居中对齐
  // alignItems="baseline"    // 基线对齐
>
  {children}
</Layout>
```

### 3.4 增长控制 (grow)

控制子元素如何分配容器的剩余可用空间。这是 Motion Canvas 布局系统中最重要的属性之一。

#### 工作原理
- **剩余空间分配**: 当容器有额外空间时，grow 决定如何分配这些空间给子元素
- **增长因子**: 数值越大，分配到的空间越多（默认为 0，不增长）
- **方向依赖**: 增长方向由容器的 `direction` 决定
  - `direction="row"`: 控制宽度增长
  - `direction="column"`: 控制高度增长

#### 基本用法
```typescript
<Layout layout direction="row" width={600}>
  <Rect width={100} fill="red" />           // 固定宽度 100px
  <Rect grow={1} fill="blue" />             // 占用剩余 500px
  <Rect grow={2} fill="green" />            // 占用剩余空间的 2/3（如果有其他 grow 元素）
</Layout>
```

#### 比例分配
```typescript
// 黄金比例布局
<Layout layout direction="row">
  <Rect grow={1.618} fill="primary" />      // 占用约 61.8% 空间
  <Rect grow={1} fill="secondary" />        // 占用约 38.2% 空间
</Layout>

// 等宽布局
<Layout layout direction="row">
  <Rect grow={1} fill="color1" />
  <Rect grow={1} fill="color2" />
  <Rect grow={1} fill="color3" />
</Layout>

// 复杂比例
<Layout layout direction="row">
  <Rect grow={1} fill="first" />    // 占用 1/4 空间
  <Rect grow={2} fill="second" />   // 占用 2/4 空间
  <Rect grow={1} fill="third" />    // 占用 1/4 空间
</Layout>
```

#### 与固定尺寸的配合
```typescript
<Layout layout direction="row" width={800}>
  <Rect width={200} fill="header" />        // 固定 200px
  <Rect grow={1} fill="content" />          // 占用剩余 600px
</Layout>

<Layout layout direction="row" width={800}>
  <Rect width={150} fill="sidebar" />       // 固定 150px
  <Rect width={100} fill="margin" />        // 固定 100px
  <Rect grow={1} fill="main" />             // 占用剩余 550px
</Layout>
```

#### 垂直方向增长
```typescript
// 垂直布局中的高度控制
<Layout layout direction="column" height={400}>
  <Rect height={60} fill="header" />        // 固定头部高度
  <Rect grow={1} fill="content" />          // 占用剩余垂直空间
  <Rect height={40} fill="footer" />        // 固定底部高度
</Layout>
```

#### 动态 grow 值
```typescript
// 可展开面板示例
const panelRef = createRef<Rect>();

<Layout layout direction="row">
  <Rect grow={1} fill="main" />
  <Rect
    ref={panelRef}
    width={80}
    grow={0}        // 初始不增长
    fill="sidebar"
  />
</Layout>

// 动画展开面板
yield* panelRef().grow(0.5, 0.5);  // 0.5秒内增长到 0.5
```

### 3.5 间距控制 (gap)

控制子元素之间的间距。

```typescript
<Layout
  layout
  gap={20}                    // 统一间距
  // gap={[10, 20]}           // [行间距, 列间距]
  // gap={{ row: 10, column: 20 }}  // 对象形式
>
  {children}
</Layout>
```

## 4. 尺寸和间距控制

### 4.1 内边距 (padding)

控制布局容器内部的边距。

```typescript
<Layout
  layout
  padding={20}               // 统一内边距
  // padding={[10, 20]}      // [垂直, 水平]
  // padding={[10, 20, 30, 40]}  // [上, 右, 下, 左]
  // padding={{ top: 10, right: 20, bottom: 30, left: 40 }}
>
  {children}
</Layout>
```

### 4.2 外边距 (margin)

控制元素的外部边距。

```typescript
<Rect
  layout
  margin={10}                // 统一外边距
  // margin={[5, 10]}        // [垂直, 水平]
  // margin={{ top: 5, right: 10, bottom: 15, left: 20 }}
/>
```

### 4.3 尺寸控制

```typescript
<Layout
  layout
  size={[960, 540]}         // [宽度, 高度]
  // width={960}
  // height={540}
  // maxWidth={1200}
  // maxHeight={800}
  // minWidth={300}
  // minHeight={200}
>
  {children}
</Layout>
```

## 5. 高级布局技巧

### 5.1 复杂嵌套布局

```typescript
<Layout
  layout
  direction="column"
  gap={20}
  padding={30}
  width={1200}
>
  {/* 头部区域 */}
  <Layout
    layout
    direction="row"
    justifyContent="space-between"
    height={80}
  >
    <Rect width={200} height={60} fill="#ff6470" radius={8} />
    <Layout layout direction="row" gap={10}>
      <Circle size={40} fill="#e6a700" />
      <Circle size={40} fill="#e13238" />
    </Layout>
  </Layout>

  {/* 主内容区域 */}
  <Layout
    layout
    direction="row"
    gap={20}
    flex={1}
  >
    {/* 侧边栏 */}
    <Layout
      layout
      direction="column"
      gap={15}
      width={250}
    >
      <Rect height={50} fill="#4a90e2" radius={6} />
      <Rect height={50} fill="#242424" radius={6} />
      <Rect height={50} fill="#242424" radius={6} />
    </Layout>

    {/* 内容区 */}
    <Layout
      layout
      direction="column"
      gap={20}
      flex={1}
    >
      <Rect height={120} fill="#7b68ee" radius={8} />
      <Layout layout direction="row" gap={15} flex={1}>
        <Rect flex={1} fill="#ff6470" radius={6} />
        <Rect flex={1} fill="#e6a700" radius={6} />
      </Layout>
    </Layout>
  </Layout>
</Layout>
```

### 5.2 使用 Node 包装器

Node 组件不会受父 Layout 的方向影响，适合需要独立定位的元素组。

```typescript
<Layout direction={'column'} layout>
  <Rect height={240} fill={'#ff6470'} />

  {/* Node 内的元素不受父 Layout 的 direction 影响 */}
  <Node opacity={0.8}>
    <Rect height={240} fill={'#e6a700'} />
    <Rect height={240} fill={'#e13238'} />
  </Node>

  <Rect height={240} fill={'#4a90e2'} />
</Layout>
```

### 5.3 方向定位 (Cardinal Directions)

使用方向属性进行精确定位：

```typescript
export default makeScene2D(function* (view) {
  const rect = createRef<Rect>();

  view.add(
    <>
      <Rect
        ref={rect}
        width={200}
        height={100}
        rotation={-10}
        fill={'#333333'}
      />

      {/* 右边对齐到 rect 的左边 */}
      <Rect
        size={50}
        fill={'#e6a700'}
        right={rect().left}
      />

      {/* 左下角对齐到 rect 的右下角 */}
      <Rect
        size={100}
        fill={'#e13238'}
        bottomLeft={rect().bottomRight}
      />
    </>,
  );
});
```

## 6. 动画布局

### 6.1 基础动画

```typescript
export default makeScene2D(function* (view) {
  const layout = createRef<Layout>();

  view.add(
    <Layout
      ref={layout}
      layout
      direction="column"
      gap={10}
      alignItems="center"
    >
      <Rect height={50} fill="#ff6470" />
      <Rect height={50} fill="#e6a700" />
      <Rect height={50} fill="#e13238" />
    </Layout>
  );

  // 动画布局属性
  yield* layout().gap(30, 1);                    // 1秒内改变间距
  yield* layout().direction("row", 0.5);          // 0.5秒内改变方向
  yield* layout().alignItems("flex-end", 0.5);    // 改变对齐方式
});
```

### 6.2 grow 属性动画

grow 属性的动画是 Motion Canvas 布局系统中最强大的功能之一。

#### 基础 grow 动画
```typescript
export default makeScene2D(function* (view) {
  const mainContent = createRef<Rect>();
  const sidebar = createRef<Rect>();

  view.add(
    <Layout layout direction="row" width={800}>
      <Rect
        ref={mainContent}
        grow={1}
        height={200}
        fill="#4a90e2"
        radius={8}
      />
      <Rect
        ref={sidebar}
        width={80}
        grow={0}
        height={200}
        fill="#7b68ee"
        radius={8}
      />
    </Layout>
  );

  // 展开侧边栏动画
  yield* all(
    sidebar().width(200, 1),
    sidebar().grow(0.3, 1),     // 同时设置 grow 值
  );

  // 收缩动画
  yield* all(
    sidebar().width(80, 1),
    sidebar().grow(0, 1),
  );
});
```

#### 比例变化动画
```typescript
export default makeScene2D(function* (view) {
  const panels = createRef<Rect[]>([]);

  view.add(
    <Layout layout direction="row" width={600} height={100}>
      {[0, 1, 2].map(i => (
        <Rect
          key={i}
          ref={panels}
          grow={1}
          height={80}
          fill={['#ff6470', '#e6a700', '#e13238'][i]}
          radius={8}
        />
      ))}
    </Layout>
  );

  // 交替增长动画
  yield* loop(Infinity, function* () {
    // 第一个面板占据主要空间
    yield* all(
      panels[0]().grow(3, 1),
      panels[1]().grow(0.5, 1),
      panels[2]().grow(0.5, 1),
    );

    yield* waitFor(0.5);

    // 第二个面板占据主要空间
    yield* all(
      panels[0]().grow(0.5, 1),
      panels[1]().grow(3, 1),
      panels[2]().grow(0.5, 1),
    );

    yield* waitFor(0.5);

    // 第三个面板占据主要空间
    yield* all(
      panels[0]().grow(0.5, 1),
      panels[1]().grow(0.5, 1),
      panels[2]().grow(3, 1),
    );

    yield* waitFor(0.5);

    // 恢复平衡
    yield* all(
      panels[0]().grow(1, 1),
      panels[1]().grow(1, 1),
      panels[2]().grow(1, 1),
    );

    yield* waitFor(1);
  });
});
```

#### 响应式布局动画
```typescript
export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const sidebar = createRef<Layout>();
  const mainContent = createRef<Layout>();

  view.add(
    <Layout
      ref={container}
      layout
      direction="row"
      width={800}
      height={400}
    >
      <Layout
        ref={sidebar}
        layout
        direction="column"
        width={60}
        grow={0}
        gap={10}
      >
        <Rect height={50} fill="#ff6470" radius={6} />
        <Rect height={50} fill="#e6a700" radius={6} />
        <Rect height={50} fill="#e13238" radius={6} />
      </Layout>

      <Layout
        ref={mainContent}
        layout
        direction="column"
        grow={1}
        gap={15}
      >
        <Rect height={100} fill="#4a90e2" radius={8} />
        <Rect grow={1} fill="#7b68ee" radius={8} />
        <Rect height={80} fill="#242424" radius={8} />
      </Layout>
    </Layout>
  );

  // 展开侧边栏并调整主内容
  yield* all(
    sidebar().width(180, 1),
    sidebar().grow(0.2, 1),
    mainContent().grow(0.8, 1),
  );

  yield* waitFor(1);

  // 收回侧边栏
  yield* all(
    sidebar().width(60, 1),
    sidebar().grow(0, 1),
    mainContent().grow(1, 1),
  );
});
```

### 6.3 复杂动画组合

```typescript
export default makeScene2D(function* (view) {
  const container = createRef<Layout>();
  const items = createRef<Rect[]>([]);

  view.add(
    <Layout
      ref={container}
      layout
      direction="row"
      gap={20}
      justifyContent="center"
      alignItems="center"
      width={600}
      height={200}
    >
      {[0, 1, 2, 3].map(i => (
        <Rect
          key={i}
          ref={items}
          width={60}
          height={60}
          grow={1}  // 添加 grow 属性
          fill={['#ff6470', '#e6a700', '#e13238', '#4a90e2'][i]}
          radius={10}
        />
      ))}
    </Layout>
  );

  // 复杂动画序列
  yield* all(
    container().gap(40, 1),
    container().direction('column', 1),
    items.map(item => item().rotation(360, 1))
  );

  yield* all(
    container().alignItems('flex-end', 0.8),
    container().justifyContent('space-around', 0.8)
  );
});
```

## 7. 性能优化建议

### 7.1 减少嵌套层级

避免过深的 Layout 嵌套，这会影响性能：

```typescript
// ❌ 不推荐：过深嵌套
<Layout layout>
  <Layout layout>
    <Layout layout>
      <Layout layout>
        <Rect />
      </Layout>
    </Layout>
  </Layout>
</Layout>

// ✅ 推荐：合理嵌套
<Layout layout direction="column" gap={10}>
  <Rect />
  <Layout layout direction="row" gap={5}>
    <Rect />
    <Rect />
  </Layout>
</Layout>
```

### 7.2 合理使用 Node

对于不需要布局的复杂元素组，使用 Node 包装：

```typescript
// ✅ 使用 Node 包装不需要布局的元素组
<Node>
  <ComplexComponent1 />
  <ComplexComponent2 />
</Node>
```

### 7.3 批量操作

在动画中同时修改多个属性：

```typescript
// ✅ 批量操作
yield* all(
  layout().gap(20, 1),
  layout().direction('row', 1),
  layout().alignItems('center', 1)
);
```

## 8. 常见问题与解决方案

### 8.1 元素不显示

**问题**: 布局中的元素没有显示
**原因**: 通常是因为没有设置可见的尺寸或颜色
**解决方案**:
```typescript
// 确保设置了尺寸和颜色
<Rect
  width={100}      // 必须设置宽度
  height={50}      // 必须设置高度
  fill="#ff6470"   // 必须设置填充颜色
/>
```

### 8.2 布局不生效

**问题**: 设置的布局属性没有生效
**原因**: 忘记设置 `layout` 属性
**解决方案**:
```typescript
// 必须设置 layout 属性来启用布局
<Layout layout direction="row">  // ✅
<Layout direction="row">         // ❌ 布局不生效
```

### 8.3 嵌套布局问题

**问题**: 嵌套布局的行为不符合预期
**原因**: 对嵌套布局的层次关系理解不清
**解决方案**:
```typescript
// 理解嵌套层次
<Layout layout>         // Layout Root
  <Rect />              // Layout Child
  <Layout layout>       // 嵌套 Layout，也是父级的 Layout Child
    <Rect />            // 嵌套的 Layout Child
  </Layout>
</Layout>
```

### 8.4 动画性能问题

**问题**: 布局动画卡顿
**原因**: 同时动画过多元素或属性
**解决方案**:
```typescript
// 使用 all() 批量执行动画
yield* all(
  layout().gap(20, 1),
  children.map(child => child().opacity(1, 1))
);
```

## 9. 最佳实践总结

### 9.1 设计原则

1. **KISS 原则**: 保持布局结构简单明了
2. **一致性**: 在项目中保持布局模式的一致性
3. **可维护性**: 使用有意义的变量名和注释
4. **性能优先**: 避免不必要的嵌套和动画

### 9.2 grow 属性最佳实践

#### 基本使用原则
```typescript
// ✅ 推荐：明确的 grow 值
<Layout layout direction="row">
  <Rect grow={1} fill="content" />
  <Rect grow={2} fill="sidebar" />
</Layout>

// ❌ 不推荐：不明确的比例
<Layout layout direction="row">
  <Rect grow={1.333333} fill="content" />
  <Rect grow={2.666666} fill="sidebar" />
</Layout>
```

#### 与固定尺寸的配合
```typescript
// ✅ 推荐：固定 + 弹性布局
<Layout layout direction="row" width={800}>
  <Rect width={200} fill="fixed" />        // 固定侧边栏
  <Rect grow={1} fill="content" />         // 弹性内容区
</Layout>

// ✅ 推荐：多个固定尺寸 + 弹性
<Layout layout direction="row" width={800}>
  <Rect width={150} fill="left" />
  <Rect width={100} fill="margin" />
  <Rect grow={1} fill="main" />
  <Rect width={80} fill="right" />
</Layout>
```

#### 动画使用技巧
```typescript
// ✅ 推荐：平滑的 grow 动画
yield* all(
  panel().grow(0.5, 0.8),     // 0.8秒动画
  panel().width(200, 0.8),   // 同时改变宽度
);

// ✅ 推荐：循环动画中使用 wait
yield* loop(Infinity, function* () {
  yield* panel().grow(1, 1);
  yield* waitFor(0.5);
  yield* panel().grow(0.2, 1);
  yield* waitFor(0.5);
});
```

#### 响应式布局模式
```typescript
// ✅ 推荐：使用 grow 创建响应式布局
const createResponsiveLayout = (isExpanded: boolean) => (
  <Layout layout direction="row">
    <Rect
      grow={isExpanded ? 0.7 : 1}
      fill="main"
    />
    <Rect
      width={isExpanded ? 250 : 80}
      grow={isExpanded ? 0.3 : 0}
      fill="sidebar"
    />
  </Layout>
);
```

#### 性能优化
```typescript
// ✅ 推荐：避免过度复杂的 grow 计算
<Layout layout direction="row">
  <Rect grow={1} fill="simple" />        // 简单比例
  <Rect grow={1} fill="simple" />
</Layout>

// ❌ 避免：复杂的数学计算
<Layout layout direction="row">
  <Rect grow={Math.PI} fill="complex" />  // 复杂值难以理解和维护
  <Rect grow={Math.E} fill="complex" />
</Layout>
```

### 9.2 开发流程

1. **规划布局**: 先设计整体结构，再实现细节
2. **分层开发**: 从外到内逐步构建布局
3. **测试验证**: 在不同尺寸和方向下测试布局
4. **优化调整**: 根据实际效果调整参数

### 9.3 代码规范

```typescript
// 推荐的代码风格
const createCardLayout = () => (
  <Layout
    layout
    direction="column"
    gap={15}
    padding={20}
    background="#1a1a1a"
    radius={12}
    width={300}
  >
    <Txt
      text="标题"
      fontSize={18}
      fill="#ffffff"
      marginBottom={10}
    />
    <Layout layout direction="row" gap={10}>
      <Rect width={60} height={40} fill="#ff6470" radius={6} />
      <Rect width={60} height={40} fill="#e6a700" radius={6} />
    </Layout>
  </Layout>
);
```

## 10. 实际应用示例

### 10.1 响应式网格布局

```typescript
const createResponsiveGrid = (columns: number, gap: number) => (
  <Layout
    layout
    direction="row"
    flexWrap="wrap"
    gap={gap}
    justifyContent="space-between"
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <Rect
        key={i}
        width={`${100 / columns}%`}
        height={100}
        fill={['#ff6470', '#e6a700', '#e13238', '#4a90e2'][i % 4]}
        radius={8}
      />
    ))}
  </Layout>
);
```

### 10.2 仪表板布局

```typescript
const createDashboard = () => (
  <Layout
    layout
    direction="column"
    gap={20}
    padding={30}
    width={1200}
    height={800}
  >
    {/* 顶部导航 */}
    <Layout
      layout
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      height={60}
    >
      <Txt text="仪表板" fontSize={24} fill="#ffffff" />
      <Layout layout direction="row" gap={15}>
        <Circle size={30} fill="#ff6470" />
        <Circle size={30} fill="#e6a700" />
      </Layout>
    </Layout>

    {/* 主要内容区 */}
    <Layout layout direction="row" gap={25} flex={1}>
      {/* 侧边栏 */}
      <Layout layout direction="column" gap={15} width={250}>
        <Rect height={80} fill="#4a90e2" radius={8} />
        <Rect height={120} fill="#242424" radius={8} />
        <Rect height={80} fill="#7b68ee" radius={8} />
      </Layout>

      {/* 内容网格 */}
      <Layout
        layout
        direction="row"
        gap={20}
        justifyContent="space-between"
        flex={1}
      >
        <Layout layout direction="column" gap={15} flex={1}>
          <Rect height={200} fill="#e13238" radius={8} />
          <Rect height={150} fill="#ff6470" radius={8} />
        </Layout>
        <Layout layout direction="column" gap={15} flex={1}>
          <Rect height={180} fill="#e6a700" radius={8} />
          <Rect height={170} fill="#4a90e2" radius={8} />
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);
```

## 11. 总结

Motion Canvas 的布局系统提供了强大而灵活的界面组织能力。通过理解 Rect 组件的基础功能、Layout 系统的工作原理以及 Flex 布局的各种属性，开发者可以创建出复杂而美观的动画界面。

### 关键要点

1. **Rect 组件**: 基础形状组件，支持丰富的样式和变换属性
2. **Layout 系统**: 基于 Flexbox 的选择性布局功能
3. **Flex 属性**: direction、justifyContent、alignItems、gap 等核心属性
4. **嵌套布局**: 支持复杂的层次结构
5. **动画能力**: 平滑的布局属性动画
6. **性能优化**: 合理使用嵌套和 Node 组件

通过掌握这些概念和技术，你将能够在 Motion Canvas 中创建出专业级的动画界面和交互效果。