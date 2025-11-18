import { Icon, Img, makeScene2D, Node, Rect, Txt, Circle } from "@motion-canvas/2d";
import { Vector2, createRef, createSignal, linear, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import oldSrc from "../assets/old.png";
import currentSrc from "../assets/current.png";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const wrapperRef = createRef<Rect>();
  const backgroundsRef = createRef<Node>();
  const imageMaskRef = createRef<Circle>();

  // 创建预览尺寸信号，基于 wrapperRef 的尺寸
  const previewSize = Vector2.createSignal(Vector2.zero);

  yield view.add(
    <Rect layout size={["100%", "100%"]} fill={"#121b21"} direction={"column"}>
      <Rect
        size={["100%", "25%"]}
        layout
        padding={[40, 20]}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <Rect padding={20} fill={"#ffcc00"}>
          <Icon icon={"icon-park:brain"} size={180} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect grow={1}>
        <Rect ref={wrapperRef} size={['100%', '60%']} layout={false}>
          <Node ref={backgroundsRef}>
            <Img src={currentSrc} width={() => previewSize().x} />
            <Node cache>
              <Img src={oldSrc} width={() => previewSize().x} />
              <Circle
                fill={'red'}
                ref={imageMaskRef}
                scale={0}
                position={() => previewSize().scale(-0.5)}
                size={() => previewSize().magnitude * 2}
                compositeOperation={'destination-out'}
              />
            </Node>
          </Node>
        </Rect>
      </Rect>

      <Rect
        size={["100%", "15%"]}
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

  yield* titleRef().text("模型量化", 1);

  // 设置预览尺寸为 wrapperRef 的尺寸
  previewSize(new Vector2(wrapperRef().width(), wrapperRef().height()));

	// 实现圆形擦除转场动画
  yield* imageMaskRef().scale(1, 2, linear);

  yield* waitUntil("model_quantization");
});