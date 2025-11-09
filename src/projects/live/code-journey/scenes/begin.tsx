import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { chain, createRef } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "@/shared/text-styles";
import { waitForCut } from "@/shared/utils";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const txtRef = createRef<Txt>();
  const txtRefs = Array.from({ length: 4 }, () => createRef<Txt>());

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
          <Img size={[180, 180]} src={logoSvg} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"column"}
        paddingLeft={200}
        gap={50}
        alignItems={"start"}
        justifyContent={"center"}
      >
        {txtRefs.map((ref) => (
          <Txt ref={ref} {...TextStyles.subtitle} minHeight={65} minWidth={60}></Txt>
        ))}
      </Rect>

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

  yield* titleRef().text("Code Journey", 0.5);

  yield* chain(
    txtRefs[0]().text("十年前，", 0.5),
    txtRefs[1]().text("我写下了人生中的第一行代码，", 1),
    txtRefs[2]().text("我的代码没有改变这个世界，", 1),
    txtRefs[3]().text("但是编程却改变了我的生活。", 1)
  );

  yield* waitForCut();
});
