import { Circle, Img, ImgProps, Node } from "@motion-canvas/2d";
import { Reference, ReferenceReceiver, Vector2Signal } from "@motion-canvas/core";

export interface CircleWipeTransitionProps {
  /**
   * 源图片路径 - 初始显示的图片，会被圆形遮罩擦除
   * 支持静态图片URL或动态图片源
   */
  oldSrc: ImgProps["src"];

  /**
   * 目标图片路径 - 擦除完成后显示的图片
   * 支持静态图片URL或动态图片源
   */
  currentSrc: ImgProps["src"];

  /**
   * 根节点的引用
   */
  rootRef?: ReferenceReceiver<any>;

  /**
   * 圆形遮罩的引用 - 用于控制擦除动画
   * 通过此引用可以调用 scale() 方法来控制擦除进度
   */
  imageMaskRef: Reference<Circle>;

  /**
   * 预览区域尺寸信号 - 用于计算图片和遮罩的位置和大小
   * Vector2Signal 提供响应式的尺寸计算，支持 .x, .y, .scale(), .magnitude 等方法
   */
  previewSize: Vector2Signal<void>;
}

export function CircleWipeTransition({
  oldSrc,
  currentSrc,
	rootRef,
  imageMaskRef,
  previewSize,
}: CircleWipeTransitionProps) {
  return (
    <Node ref={rootRef}>
      <Img src={currentSrc} width={() => previewSize().x} />
      <Node cache>
        <Img src={oldSrc} width={() => previewSize().x} />
        <Circle
          fill={"red"}
          ref={imageMaskRef}
          scale={0}
          position={() => previewSize().scale(-0.5)}
          size={() => previewSize().magnitude * 2}
          compositeOperation={"destination-out"}
        />
      </Node>
    </Node>
  );
}
