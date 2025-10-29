import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, waitUntil } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "@/shared/text-styles";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();

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

      <Rect grow={1} layout alignItems={"center"} justifyContent={"center"}>
        <Txt {...TextStyles.title}>A-rolling...</Txt>
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

  yield* titleRef().text("OpenSource Repos", 1);

  yield* waitUntil("repo_list_end");
});
