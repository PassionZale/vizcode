import { Icon, Img, makeScene2D, Rect, Txt, word } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  DEFAULT,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import deepSeekColor from "../assets/deepseek-color.svg";
import { appear, disappear } from "@/shared/utils";
import { Code } from "@motion-canvas/2d";
import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const deepseekSvgRef = createRef<Img>();
  const deepseekCodeRef1 = createRef<Code>();
  const baseHighlightRef = createRef<Rect>();
  const distillHighlightRef = createRef<Rect>();

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
        <Rect ref={contentRef} height={"60%"} width={"100%"} layout={false}>
          <Img
            ref={deepseekSvgRef}
            src={deepSeekColor}
            size={80}
            scale={4}
            opacity={0}
            position={[0, 0]}
          />

          <JavascriptCode
            ref={deepseekCodeRef1}
            code={"DeepSeek"}
            fontSize={80}
            opacity={0}
            position={[40, 20]}
          />
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

  yield* chain(titleRef().text("国产之光", 1), appear(deepseekSvgRef()));

  yield* all(
    deepseekSvgRef().scale(2, 1),
    deepseekSvgRef().left(deepseekSvgRef().left().addX(-200), 1),
    appear(deepseekCodeRef1())
  );

  const deepseekCodeRef2 = deepseekCodeRef1().clone();

  deepseekCodeRef2.opacity(1);

  contentRef().add(deepseekCodeRef2);

  yield* chain(
    all(deepseekCodeRef1().y(-155, 1), deepseekCodeRef2.y(155, 1)),
    all(
      deepseekSvgRef().left(deepseekSvgRef().left().addX(-80), 1),
      deepseekCodeRef1().code("DeepSeek-V3", 1),
      deepseekCodeRef2.code("DeepSeek-R1", 1)
    ),
    all(
      deepseekCodeRef1().selection(word(0, 9, 2), 1.5),
      deepseekCodeRef2.selection(word(0, 9, 2), 1.5)
    ),
    all(
      deepseekCodeRef1().selection(DEFAULT, 1),
      deepseekCodeRef2.selection(DEFAULT, 1)
    )
  );

  yield* all(
    deepseekSvgRef().size(70, 1),
    deepseekSvgRef().left(deepseekSvgRef().left().addX(-40), 1),
    deepseekCodeRef1().fontSize(70, 1),
    deepseekCodeRef1().code("DeepSeek-V3-0324", 1),
    deepseekCodeRef2.fontSize(70, 1),
    deepseekCodeRef2.code("DeepSeek-R1-0528", 1)
  );

  yield* chain(
    all(
      deepseekCodeRef1().selection(
        deepseekCodeRef1().findFirstRange("0324"),
        1.5
      ),
      deepseekCodeRef2.selection(deepseekCodeRef2.findFirstRange("0528"), 1.5)
    ),
    all(
      deepseekCodeRef1().selection(DEFAULT, 1),
      deepseekCodeRef2.selection(DEFAULT, 1)
    )
  );

  yield* chain(
    all(
      disappear(deepseekSvgRef()),
      deepseekCodeRef1().fontSize(60, 1),
      deepseekCodeRef1().x(0, 1),
      deepseekCodeRef1().code("DeepSeek-V3-Base", 1),
      deepseekCodeRef2.fontSize(55, 1),
      deepseekCodeRef2.x(0, 1),
      deepseekCodeRef2.code("DeepSeek-R1-Distill-Qwen-32B", 1)
    )
  );

  // 创建位置信号
  const baseRange = createSignal(() => {
    const range = deepseekCodeRef1().findFirstRange("Base");
    const bboxes = deepseekCodeRef1().getSelectionBBox(range);
    return bboxes[0].expand([6, 10]);
  });

  const distillRange = createSignal(() => {
    const range = deepseekCodeRef2.findFirstRange("Distill-Qwen-32B");
    const bboxes = deepseekCodeRef2.getSelectionBBox(range);
    return bboxes[0].expand([6, 10]);
  });

  // 添加高亮框到contentRef（作为Code的兄弟元素）
  contentRef().add(
    <Rect
      ref={baseHighlightRef}
      offset={-1}
      position={() => deepseekCodeRef1().position().add(baseRange().position)}
      size={baseRange().size}
      lineWidth={3}
      stroke={"#ffcc00"}
      radius={6}
      opacity={0}
    />
  );

  contentRef().add(
    <Rect
      ref={distillHighlightRef}
      offset={-1}
      position={() => deepseekCodeRef2.position().add(distillRange().position)}
      size={distillRange().size}
      lineWidth={3}
      stroke={"#ffcc00"}
      radius={6}
      opacity={0}
    />
  );

  // 高亮动画
  yield* all(
    baseHighlightRef().opacity(1, 0.8),
    distillHighlightRef().opacity(1, 0.8)
  );

  yield* waitFor(2);

  yield* all(
    baseHighlightRef().opacity(0, 0.8),
    distillHighlightRef().opacity(0, 0.8)
  );

  yield* waitUntil("deepseek");
});
