import { Code, Icon, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, sequence, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { JavascriptCode } from "@/nodes/Code";
import { appear } from "@/shared/utils";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const codeRef = createRef<Code>();
  const text1Ref = createRef<Txt>();
  const text2Ref = createRef<Txt>();
  const text3Ref = createRef<Txt>();

  view.add(
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

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"start"}
        paddingTop={100}
        gap={100}
      ></Rect>

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

  yield* titleRef().text("Lit VS Pro", 1);

  contentRef().add(
    <>
      <JavascriptCode
        ref={codeRef}
        opacity={0}
        fontSize={56}
        code={`840(pro) - 168(lit) = "¥672"`}
      />
      <Txt ref={text1Ref} opacity={0} {...TextStyles.subtitle}>
        视觉理解
      </Txt>
      <Txt ref={text2Ref} opacity={0} {...TextStyles.subtitle}>
        联网搜索
      </Txt>
      <Txt ref={text3Ref} opacity={0} {...TextStyles.subtitle}>
        网页读取
      </Txt>
    </>
  );

  // 使用 sequence 逐个显示，每个间隔 0.5 秒
  yield* sequence(
    0.5,
    appear(codeRef(), 1),
    appear(text1Ref(), 1),
    appear(text2Ref(), 1),
    appear(text3Ref(), 1)
  );

  yield* all(
    text1Ref().text("视觉理解__`@z_ai/mcp-server`", 1),
    text2Ref().text("联网搜索__`tavily-mcp`", 1),
    text3Ref().text("网页读取__`mcp-fetch-server`", 1)
  );

  yield* waitUntil("scene_1");
});
