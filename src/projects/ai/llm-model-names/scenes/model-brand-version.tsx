import { Code, Icon, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  DEFAULT,
  sequence,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";
import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const wrapperRef = createRef<Rect>();
  const contentRef = createRef<Rect>();
  const code1Ref = createRef<Code>();
  const code2Ref = createRef<Code>();
  const code3Ref = createRef<Code>();
  const code4Ref = createRef<Code>();
  const v3HighlightRef = createRef<Rect>();
  const v31HighlightRef = createRef<Rect>();

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
        <Rect ref={wrapperRef} layout={false}>
          <Rect ref={contentRef} layout direction={"column"} gap={40}>
            <JavascriptCode
              ref={code1Ref}
              opacity={0}
              fontSize={70}
              code="DeepSeek-V1-67B"
            />
            <JavascriptCode
              ref={code2Ref}
              fontSize={70}
              opacity={0}
              code="DeepSeek-V2-236B"
            />
            <JavascriptCode
              ref={code3Ref}
              fontSize={70}
              opacity={0}
              code="DeepSeek-V3-671B"
            />
            <JavascriptCode
              ref={code4Ref}
              fontSize={70}
              opacity={0}
              code="DeepSeek-V3.1-671B"
            />
          </Rect>
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

  yield* all(titleRef().text("版本号 & 参数大小", 1), appear(code1Ref(), 1));

  yield* chain(
    waitUntil("v1_start"),
    code1Ref().selection(code1Ref().findFirstRange("V1"), 0.5),
    waitUntil("v1"),
    code1Ref().selection(code1Ref().findFirstRange("67B"), 0.5),
    waitUntil("67b")
  );

  yield* chain(
    sequence(
      0.15,
      code1Ref().selection(DEFAULT, 0.5),
      appear(code2Ref(), 0.5),
      appear(code3Ref(), 0.5)
    ),
		waitUntil('v1_2_3_start'),
    all(
      code1Ref().selection(code1Ref().findFirstRange("V1-67B"), 0.5),
      code2Ref().selection(code2Ref().findFirstRange("V2-236B"), 0.5),
      code3Ref().selection(code3Ref().findFirstRange("V3-671B"), 0.5)
    )
  );

	yield* waitUntil('v1_2_3_end'),

  yield* all(
    code1Ref().selection(DEFAULT, 0.5),
    code2Ref().selection(DEFAULT, 0.5),
    code3Ref().selection(DEFAULT, 0.5)
  );

  yield* chain(
    appear(code4Ref()),
    all(
      code1Ref().selection(code1Ref().findFirstRange("V3.1"), 1.5),
      code2Ref().selection(code2Ref().findFirstRange("V3.1"), 1.5),
      code3Ref().selection(code3Ref().findFirstRange("V3"), 1.5),
      code4Ref().selection(code4Ref().findFirstRange("V3.1"), 1.5)
    )
  );

  // 创建位置信号
  const v3Range = createSignal(() => {
    const range = code3Ref().findFirstRange("V3");
    const bboxes = code3Ref().getSelectionBBox(range);
    return bboxes[0].expand([6, 10]);
  });

  const v31Range = createSignal(() => {
    const range = code4Ref().findFirstRange("V3.1");
    const bboxes = code4Ref().getSelectionBBox(range);
    return bboxes[0].expand([6, 10]);
  });

  // 添加高亮框到contentRef
  wrapperRef().add(
    <Rect
      ref={v3HighlightRef}
      offset={-1}
      position={() => code3Ref().position().add(v3Range().position)}
      size={v3Range().size}
      lineWidth={3}
      stroke={"#ffcc00"}
      radius={6}
      opacity={0}
    />
  );

  wrapperRef().add(
    <Rect
      ref={v31HighlightRef}
      offset={-1}
      position={() => code4Ref().position().add(v31Range().position)}
      size={v31Range().size}
      lineWidth={3}
      stroke={"#ffcc00"}
      radius={6}
      opacity={0}
    />
  );

  // 高亮动画
  yield* all(
    v3HighlightRef().opacity(1, 0.8),
    v31HighlightRef().opacity(1, 0.8)
  );

  yield* waitUntil("brand_version_end");
});
