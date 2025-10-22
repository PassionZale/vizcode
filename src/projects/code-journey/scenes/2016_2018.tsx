import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "../../../shared/text-styles";

// #101014
// #121b21
// #ffffff1a

export default makeScene2D(function* (view) {
  view.add(
    <Rect layout size={["100%", "100%"]} fill={"#121b21"} direction={"column"}>
      <Rect
        size={['100%', 400]}
        layout
				padding={[40, 20]}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
				gap={40}
      >
        <Img size={[160, 160]} src={logoSvg} fill={"yellow"}/>

        <Txt {...TextStyles.title}>Title</Txt>
      </Rect>

      <Rect grow={1}>
        <Txt {...TextStyles.subtitle}>456</Txt>
      </Rect>

      <Rect size={["100%", 400]}>
        <Txt {...TextStyles.subtitle}>789</Txt>
      </Rect>
    </Rect>
  );

  yield* waitFor(3);
});
