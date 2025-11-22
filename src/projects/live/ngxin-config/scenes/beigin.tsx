import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { chain, createRef, waitUntil } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
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
          <Img size={[180, 180]} src={logoSvg} />
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
        paddingTop={100}
        gap={50}
        alignItems={"start"}
        justifyContent={"start"}
      >
        {txtRefs.map((ref) => (
          <Txt
            ref={ref}
            {...TextStyles.subtitle}
            minHeight={65}
            minWidth={60}
          ></Txt>
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

  yield* titleRef().text("前端发版无效?", 1);

  yield* chain(
    txtRefs[0]().text("经过数周 996 的研发,", 0.5),
    txtRefs[1]().text("你将 feature 分支合并至 beta,", 1),
    txtRefs[2]().text("点击构建按钮,", 1),
    txtRefs[3]().text("成功部署了测试环境!", 1),
    txtRefs[4]().text("测试同学 F5 刷新了 100 遍浏览器,", 1),
    txtRefs[5]().text("仍然看不到新的 feature...", 1)
  );

  yield* waitUntil("begin");
});
