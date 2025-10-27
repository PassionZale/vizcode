import { Grid, Img, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import wuhanPng from "../assets/wuhan.png";
import shenzhenPng from "../assets/shenzhen.png";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const gridRef = createRef<Grid>();
  const shenzhenRef = createRef<Img>();
  const lineRef = createRef<Line>();
  const wuhanRef = createRef<Img>();

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

      <Grid ref={gridRef} grow={1} stroke={"#666"} start={0.5} end={0.5}></Grid>

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

  yield* waitUntil("2015_end");
});
