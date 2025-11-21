import {
  Img,
  Node,
  Rect,
  Txt,
  type NodeProps,
  initial,
  signal,
} from "@motion-canvas/2d";
import {
  createRef,
  type SignalValue,
  type SimpleSignal,
  waitFor,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";

export interface OpeningSceneProps extends NodeProps {
  title?: SignalValue<string>;
  logoSrc?: SignalValue<string>;
  middleText?: SignalValue<string>;
  backgroundColor?: SignalValue<string>;
}

export class OpeningScene extends Node {
  @initial("Code Journey")
  @signal()
  public declare readonly title: SimpleSignal<string, this>;

  @initial("")
  @signal()
  public declare readonly logoSrc: SimpleSignal<string, this>;

  @initial("A-rolling...")
  @signal()
  public declare readonly middleText: SimpleSignal<string, this>;

  @initial("#121b21")
  @signal()
  public declare readonly backgroundColor: SimpleSignal<string, this>;

  private titleRef = createRef<Txt>();
  private imgRef = createRef<Img>();

  public constructor(props?: OpeningSceneProps) {
    super(props);

    // 检查是否提供了logoSrc，如果没有则不显示logo部分
    const hasLogo = this.logoSrc() !== "";

    this.add(
      <Rect
        layout
        size={["100%", "100%"]}
        fill={this.backgroundColor()}
        direction={"column"}
      >
        {/* 顶部区域 - Logo 和标题 */}
        {hasLogo && (
          <Rect
            size={["100%", "25%"]}
            layout
            padding={[40, 20]}
            direction="column"
            alignItems="center"
            justifyContent="space-around"
          >
            <Rect padding={20} fill={"#ffcc00"}>
              <Img ref={this.imgRef} size={[180, 180]} src={this.logoSrc()} />
            </Rect>
            <Txt height={98} ref={this.titleRef} {...TextStyles.title}></Txt>
          </Rect>
        )}

        {/* 中间区域 - 主要文字 */}
        <Rect grow={1} layout alignItems={"center"} justifyContent={"center"}>
          <Txt {...TextStyles.title}>{this.middleText()}</Txt>
        </Rect>

        {/* 底部区域 - CodeSugar 品牌文字 */}
        <Rect
          size={["100%", "25%"]}
          layout
          padding={40}
          alignItems={"start"}
          justifyContent={"center"}
        >
          <Txt {...TextStyles.title} fill={"#4285F4"}>
            C
          </Txt>
          <Txt {...TextStyles.title} fill={"#FBBC05"}>
            o
          </Txt>
          <Txt {...TextStyles.title} fill={"#EA4335"}>
            d
          </Txt>
          <Txt {...TextStyles.title} fill={"#34A853"}>
            e
          </Txt>
          <Txt {...TextStyles.title}>S</Txt>
          <Txt {...TextStyles.title}>u</Txt>
          <Txt {...TextStyles.title}>g</Txt>
          <Txt {...TextStyles.title}>a</Txt>
          <Txt {...TextStyles.title}>r</Txt>
        </Rect>
      </Rect>
    );
  }

  /**
   * 播放开场动画序列
   */
  public *playAnimation() {
    try {
      // 等待一小段时间确保所有节点都已完全初始化
      yield* waitFor(0.1);

      // 如果有图片，等待图片加载完成
      if (this.imgRef() && this.logoSrc() !== "") {
        // 等待图片节点可用，然后进行额外的短暂等待以确保图片加载
        yield* waitFor(0.2);

        // 验证图片引用是否有效
        if (!this.imgRef()) {
          console.warn("OpeningScene: 图片引用未正确初始化");
        }
      }

      // 等待标题引用准备就绪后再执行动画
      if (this.titleRef()) {
        // 验证标题引用是否有效
        if (!this.titleRef()) {
          console.warn("OpeningScene: 标题引用未正确初始化");
          return;
        }

        yield* this.titleRef().text(this.title(), 1);
      } else {
        console.warn("OpeningScene: 未找到标题引用，跳过文本动画");
      }
    } catch (error) {
      console.error("OpeningScene: 播放动画时发生错误:", error);
      // 尝试执行备用动画逻辑
      if (this.titleRef()) {
        try {
          yield* this.titleRef().text(this.title(), 0.5);
        } catch (fallbackError) {
          console.error("OpeningScene: 备用动画也失败了:", fallbackError);
        }
      }
    }
  }
}
