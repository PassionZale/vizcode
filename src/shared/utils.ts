import { Shape } from "@motion-canvas/2d";
import { all, ThreadGenerator } from "@motion-canvas/core";

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
