import { Shape, Rect, Img } from "@motion-canvas/2d";
import { all, ThreadGenerator, waitFor, loop } from "@motion-canvas/core";

/**
 * 元素淡入动画效果
 *
 * 将元素从完全隐藏状态（缩放为0，透明度为0）动画到原始显示状态。
 * 同时执行缩放和透明度动画，创造流畅的淡入效果。
 *
 * @param object - 要应用动画的元素对象
 * @param duration - 动画持续时间（秒），默认为1秒
 * @returns ThreadGenerator - Motion Canvas动画生成器
 *
 * @example
 * ```typescript
 * // 使用默认时长
 * yield* appear(element);
 *
 * // 自定义时长
 * yield* appear(element, 0.5);
 * ```
 */
export function* appear(object: Shape, duration = 1): ThreadGenerator {
  let scale = object.scale();

  yield* all(
    object.scale(0).scale(scale, duration),
    object.opacity(0).opacity(1, duration)
  );
}

/**
 * 元素淡出动画效果
 *
 * 将元素从当前显示状态动画到完全隐藏状态（缩放为0，透明度为0）。
 * 同时执行缩放和透明度动画，创造流畅的淡出效果。
 * 与 appear 函数形成完整的显示/隐藏动画组合。
 *
 * @param object - 要应用动画的元素对象
 * @param duration - 动画持续时间（秒），默认为1秒
 * @returns ThreadGenerator - Motion Canvas动画生成器
 *
 * @example
 * ```typescript
 * // 使用默认时长
 * yield* disappear(element);
 *
 * // 自定义时长
 * yield* disappear(element, 0.5);
 *
 * // 与 appear 函数配合使用
 * yield* appear(element, 0.8);
 * yield* waitFor(2);
 * yield* disappear(element, 0.6);
 * ```
 */
export function* disappear(object: Shape, duration = 1): ThreadGenerator {
  let scale = object.scale();

  yield* all(
    object.scale(scale).scale(0, duration),
    object.opacity(1).opacity(0, duration)
  );
}

/**
 * 等待指定时间间隔的工具函数
 *
 * 提供一个简单的方法来暂停动画执行，常用于在动画序列中创建停顿
 * 或延迟下一个动作的开始。
 *
 * @param seconds - 等待的时间（秒），默认为5秒
 * @returns ThreadGenerator - Motion Canvas动画生成器
 *
 * @example
 * ```typescript
 * // 使用默认5秒等待
 * yield* waitForCut();
 *
 * // 等待1秒
 * yield* waitForCut(1);
 *
 * // 等待0.5秒
 * yield* waitForCut(0.5);
 *
 * // 在动画序列中使用
 * yield* appear(element, 0.8);
 * yield* waitForCut(2);
 * yield* disappear(element, 0.6);
 * ```
 */
export function* waitForCut(seconds = 5): ThreadGenerator {
  yield* waitFor(seconds);
}

/**
 * 脉冲边框动画配置选项
 */
export interface PulseBorderOptions {
  /** 边框颜色，默认为 '#ffcc00' */
  color?: string;
  /** 边框线宽，默认为 3 */
  lineWidth?: number;
  /** 动画持续时间（秒），默认为 1 秒 */
  duration?: number;
  /** 缩放比例，默认为 1.1 */
  scale?: number;
  /** 边框圆角半径，默认为 6 */
  radius?: number;
  /** 最大透明度，默认为 0.8 */
  maxOpacity?: number;
  /** 最小透明度，默认为 0.3 */
  minOpacity?: number;
}

/**
 * 为图片添加脉冲边框动画效果
 *
 * 创建一个围绕图片的边框矩形，并实现扩大缩小的脉冲动画。
 * 边框会从原始大小放大到指定比例，然后缩小回原始大小，形成循环的脉冲效果。
 * 同时配合透明度变化，使动画更加生动。
 *
 * @param image - 图片元素对象
 * @param options - 配置选项
 * @returns ThreadGenerator - Motion Canvas动画生成器
 *
 * @example
 * ```typescript
 * // 基本使用
 * yield* pulseBorder(imageRef());
 *
 * // 自定义参数
 * yield* pulseBorder(imageRef(), {
 *   color: '#ff6b6b',
 *   lineWidth: 4,
 *   duration: 1.5,
 *   scale: 1.2,
 *   radius: 8
 * });
 *
 * // 透明度控制
 * yield* pulseBorder(imageRef(), {
 *   color: '#4ecdc4',
 *   maxOpacity: 1.0,
 *   minOpacity: 0.1
 * });
 * ```
 */
export function* pulseBorder(
  image: Img,
  options: PulseBorderOptions = {}
): ThreadGenerator {
  const {
    color = '#ffcc00',
    lineWidth = 3,
    duration = 1,
    scale = 1.1,
    radius = 6,
    maxOpacity = 0.8,
    minOpacity = 0.3
  } = options;

  // 创建边框矩形，匹配图片的位置和尺寸
  const borderRect = (
    <Rect
      lineWidth={lineWidth}
      stroke={color}
      radius={radius}
      opacity={0}
      size={image.size()}
      position={image.position()}
      compositeOperation={'source-over'} // 确保边框在图片上层
    />
  );

  // 将边框添加到图片的父容器
  image.parent().add(borderRect);

  // 创建脉冲动画循环
  yield* loop(() =>
    all(
      // 放大阶段：从原始大小放大到指定比例，透明度从低到高
      all(
        borderRect.scale(1).scale(scale, duration / 2),
        borderRect.opacity(minOpacity).opacity(maxOpacity, duration / 2)
      ),
      // 缩小阶段：从放大状态缩回原始大小，透明度从高到低
      all(
        borderRect.scale(scale).scale(1, duration / 2),
        borderRect.opacity(maxOpacity).opacity(minOpacity, duration / 2)
      )
    )
  );
}
