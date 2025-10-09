import {
  Gradient,
  Img,
  Layout,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import { Color, createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fontFamily("Roboto").fontSize(40);

  const backgroundFrom = Color.createSignal("rgba(85,88,218,1)");
  const backgroundTo = Color.createSignal("rgba(95,209,249,1)");

  view.fill(
    new Gradient({
      type: "linear",
      from: view.size().scale(-0.5),
      to: view.size().scale(0.5),
      stops: [
        { offset: 0, color: backgroundFrom },
        { offset: 1, color: backgroundTo },
      ],
    })
  );

  const preview = createRef<Rect>();
  const previewSize = view.size().sub(160);

  view.add(
    <Layout
      layout
      width={"100%"}
      height={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Img src="/logo.png" />

      <Rect ref={preview} grow={1} fill={"black"}>
        <Txt>123</Txt>
      </Rect>

      <Txt>CodeSugar</Txt>
    </Layout>
  );
});
