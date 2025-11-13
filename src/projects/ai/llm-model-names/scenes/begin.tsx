import { Icon, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { chain, createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const txtRefs = Array.from({ length: 6 }, () => createRef<Txt>());

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

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"column"}
        paddingLeft={100}
        paddingRight={100}
        gap={50}
        alignItems={"start"}
        justifyContent={"center"}
      >
        {txtRefs.map((ref) => (
          <Txt
            ref={ref}
            {...TextStyles.subtitle}
            minHeight={65}
            minWidth={60}
          />
        ))}
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

  yield* titleRef().text("LLM model names", 1);

  yield* chain(
    txtRefs[0]().text("每个 LLM 都有独特的品牌名称，", 1),
    txtRefs[1]().text("承载着公司的技术理念和品牌定位，", 1),
    txtRefs[2]().text("使用 LLM 的首要挑战之一，", 1),
    txtRefs[3]().text("是理解它们的名称。", 1)
  );

  yield* waitUntil("begin");
});
