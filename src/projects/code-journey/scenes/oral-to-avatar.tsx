import {makeScene2D, Video, Rect} from '@motion-canvas/2d';
import {
  createRef,
  easeInOutCubic,
  waitFor,
  all,
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // 设置画布尺寸为 1080x1920 (竖屏)
  view.fill('#000000');

  // 创建视频引用
  const videoRef = createRef<Video>();
  
  // 画布尺寸
  const canvasWidth = 1080;
  const canvasHeight = 1920;
  
  // 目标尺寸和位置
  const targetSize = 400;
  const targetBottom = 200;
  const targetRight = 200;
  
  // 计算目标位置 (相对于画布中心)
  const targetX = canvasWidth / 2 - targetRight - targetSize / 2;
  const targetY = canvasHeight / 2 - targetBottom - targetSize / 2;

  view.add(
    <Video
      ref={videoRef}
      src={'/video.mp4'} // 替换为你的视频路径
      width={canvasWidth}
      height={canvasHeight}
      play={true}
      loop={true}
      radius={0}
      lineWidth={0}
      stroke={'#ffffff'}
    />
  );

  // 初始位置：铺满全屏，中心对齐
  videoRef().position([0, 0]);

  // 等待一段时间后开始缩放转场
  yield* waitFor(3);

  // 计算缩放比例
  const scale = targetSize / canvasHeight;

  // 平滑过渡到右下角
  yield* all(
    videoRef().scale(scale, 1.5, easeInOutCubic),
    videoRef().position([targetX, targetY], 1.5, easeInOutCubic),
    videoRef().radius(20, 1.5, easeInOutCubic), // 添加圆角
    videoRef().lineWidth(4, 1.5, easeInOutCubic), // 添加边框宽度
    videoRef().stroke('#e94560', 1.5, easeInOutCubic), // 边框颜色变化
  );

  // 保持在右下角
  yield* waitFor(3);

  // 可选：添加返回全屏的动画
  yield* all(
    videoRef().scale(1, 1.5, easeInOutCubic),
    videoRef().position([0, 0], 1.5, easeInOutCubic),
    videoRef().radius(0, 1.5, easeInOutCubic), // 圆角归零
    videoRef().lineWidth(0, 1.5, easeInOutCubic), // 边框消失
  );

  yield* waitFor(2);
});