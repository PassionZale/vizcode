import { Grid, Img, Spline, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import wuhanPng from "../assets/wuhan.png";
import shenzhenPng from "../assets/shenzhen.png";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const gridRef = createRef<Grid>();
  const wuhanRef = createRef<Img>();
  const shenzhenRef = createRef<Img>();
  const lineRef = createRef<Spline>();

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
          <Img size={[180, 180]} src={logoSvg} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect grow={1}>
        <Rect layout={false}>
          <Grid
            size={["100%", "50%"]}
            ref={gridRef}
            grow={1}
            stroke={"#666"}
            start={0.5}
            end={0.5}
          />

          <Img ref={wuhanRef} src={wuhanPng} size={300} scale={0} />

          <Spline
            ref={lineRef}
            lineWidth={6}
            stroke={"lightseagreen"}
            points={[
              [-230, -320],
              [160, -72],
              [-160, 90],
              [230, 330],
            ]}
            end={0}
          />

          <Img ref={shenzhenRef} src={shenzhenPng} size={300} scale={0} />
        </Rect>
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

  yield* all(
    titleRef().text("2015", 1),
    gridRef().start(0.5, 1).to(0, 1),
    gridRef().end(0.5, 1).to(1, 1)
  );

  yield* chain(
    wuhanRef().scale(1, 1),
    wuhanRef().position([-390, -330], 1),
    shenzhenRef().scale(1, 1),
    shenzhenRef().position([390, 330], 1),
    lineRef().end(1, 1.5)
  );

  yield* chain(
    waitFor(1),
    shenzhenRef().scale(0, 1),
    lineRef().end(0, 1.5),
    wuhanRef().scale(0, 1)
  );

  yield* waitUntil("2015_end");
});
