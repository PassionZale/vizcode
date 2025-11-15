import { Code, Icon, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  DEFAULT,
  sequence,
  waitUntil,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";
import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const code1Ref = createRef<Code>();
  const code2Ref = createRef<Code>();
  const code3Ref = createRef<Code>();
  const code4Ref = createRef<Code>();

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
        <Rect layout={false}>
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

  yield* titleRef().text("版本号 & 参数大小", 1);

  yield* appear(code1Ref());

  yield* chain(
    code1Ref().selection(code1Ref().findFirstRange("V1"), 1.5),
    code1Ref().selection(code1Ref().findFirstRange("67B"), 1.5),
    code1Ref().selection(DEFAULT, 1.5)
  );

  // 解释版本号和名称
  yield* waitUntil("version_size");

  yield* chain(
    sequence(0.15, appear(code2Ref()), appear(code3Ref())),
    all(
      code1Ref().selection(code1Ref().findFirstRange("V1-67B"), 1.5),
      code2Ref().selection(code2Ref().findFirstRange("V2-236B"), 1.5),
      code3Ref().selection(code3Ref().findFirstRange("V3-671B"), 1.5)
    )
  );

  yield* all(
    code1Ref().selection(DEFAULT, 1.5),
    code2Ref().selection(DEFAULT, 1.5),
    code3Ref().selection(DEFAULT, 1.5)
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

  yield* waitUntil("basic_end");
});
