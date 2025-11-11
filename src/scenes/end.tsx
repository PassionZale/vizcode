import {
  Video,
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
  sequence,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";

export interface ClosingSceneProps extends NodeProps {
  videoSrc?: SignalValue<string>;
  showLetters?: SignalValue<boolean>;
  backgroundColor?: SignalValue<string>;
  videoSize?: SignalValue<number>;
  gap?: SignalValue<number>;
}

export class ClosingScene extends Node {
  @initial("")
  @signal()
  public declare readonly videoSrc: SimpleSignal<string, this>;

  @initial(true)
  @signal()
  public declare readonly showLetters: SimpleSignal<boolean, this>;

  @initial("#121b21")
  @signal()
  public declare readonly backgroundColor: SimpleSignal<string, this>;

  @initial(300)
  @signal()
  public declare readonly videoSize: SimpleSignal<number, this>;

  @initial(60)
  @signal()
  public declare readonly gap: SimpleSignal<number, this>;

  private letters = ["C", "o", "d", "e", "S", "u", "g", "a", "r"];
  private colors = ["#4285F4", "#FBBC05", "#EA4335", "#34A853"];
  private contentRectRef = createRef<Rect>();
  private txtRefs: Array<ReturnType<typeof createRef<Txt>>> = [];
  private videoRef = createRef<Video>();

  public constructor(props?: ClosingSceneProps) {
    super(props);

    // 创建文本引用
    this.txtRefs = Array.from({ length: this.letters.length }, () =>
      createRef<Txt>()
    );

    this.add(
      <Rect
        direction="column"
        layout
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        gap={this.gap()}
        fill={this.backgroundColor()}
      >
        {/* 视频区域 */}
        {this.videoSrc() && (
          <Video
            ref={this.videoRef}
            src={this.videoSrc()}
            size={this.videoSize()}
          />
        )}

        {/* 字母动画区域 */}
        <Rect
          ref={this.contentRectRef}
          layout
          alignItems={"start"}
          justifyContent={"center"}
        >
          {this.showLetters() &&
            this.letters.map((letter, i) => (
              <Txt
                key={`${i}`}
                ref={this.txtRefs[i]}
                {...TextStyles.title}
                fontSize={120}
                fill={this.colors[i] || "#fff"}
                opacity={0}
              >
                {letter}
              </Txt>
            ))}
        </Rect>
      </Rect>
    );
  }

  /**
   * 播放结尾动画序列
   */
  public *playAnimation() {
    // 播放视频（如果有）
    if (this.videoRef() && this.videoSrc()) {
      this.videoRef()?.play();
    }

    // 显示字母动画
    if (this.showLetters()) {
      yield* sequence(0.1, ...this.txtRefs.map((ref) => appear(ref())));
    }
  }
}
