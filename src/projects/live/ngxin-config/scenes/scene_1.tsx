import { Icon, Img, makeScene2D, Ray, Rect, Txt } from "@motion-canvas/2d";
import { chain, createRef, sequence, waitUntil } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const rectRef1 = createRef<Rect>();
  const ray1 = createRef<Ray>();
  const rectRef2 = createRef<Rect>();
  const ray2 = createRef<Ray>();
  const rectRef3 = createRef<Rect>();

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

        <Txt ref={titleRef} {...TextStyles.title}>
          前端构建
        </Txt>
      </Rect>

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={30}
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

  yield* titleRef().text("前端构建", 1);

  yield contentRef().add(
    <Rect
      ref={rectRef1}
      grow={1}
      direction={"column"}
      gap={30}
      alignItems={"center"}
    >
      <Icon icon={"skill-icons:javascript"} size={120} />
      <Icon icon={"skill-icons:typescript"} size={120} />
      <Icon icon={"skill-icons:css"} size={120} />
      <Icon icon={"mdi:file-png-box"} size={140} />
      <Icon icon={"mdi:file-jpg-box"} size={140} />
      <Txt {...TextStyles.title}>...</Txt>
    </Rect>
  );

  yield* appear(rectRef1());

  yield contentRef().add(
    <>
      <Ray
        opacity={0}
        ref={ray1}
        fromX={-100}
        toX={100}
        lineWidth={10}
        endArrow
        end={1}
        stroke={"#ffcc00"}
      />

      <Rect
        opacity={0}
        ref={rectRef2}
        grow={1}
        direction={"column"}
        gap={30}
        alignItems={"center"}
      >
        <Icon icon={"skill-icons:vite-light"} size={120} />
        <Icon icon={"skill-icons:webpack-light"} size={120} />
        <Icon icon={"skill-icons:rollupjs-light"} size={120} />
        <Txt {...TextStyles.title}>...</Txt>
      </Rect>
    </>
  );

  yield* sequence(0.15, appear(ray1(), 0.5), appear(rectRef2(), 0.5));

  yield contentRef().add(
    <>
      <Ray
        ref={ray2}
        opacity={0}
        fromX={-80}
        toX={80}
        lineWidth={10}
        endArrow
        end={1}
        stroke={"#ffcc00"}
      />
      <Rect
        ref={rectRef3}
        opacity={0}
        direction={"column"}
        gap={20}
        grow={1}
        alignItems={"center"}
      >
        <Icon icon={"mdi:file"} size={140} />
        <Txt {...TextStyles.body}>[chunk].[hash].[ext]</Txt>
      </Rect>
    </>
  );

  yield* sequence(
    0.15,
    ray1().end(0.8, 0.5),
    appear(ray2(), 0.5),
    appear(rectRef3(), 0.5)
  );

  yield* waitUntil("scene_1");
});
