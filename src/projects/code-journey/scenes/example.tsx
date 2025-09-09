import { Circle, Gradient, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { Color, createRef } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fontFamily("Roboto").fontSize(40);

  const backgroundFrom = Color.createSignal("rgba(85,88,218,1)");
  const backgroundTo = Color.createSignal("rgba(95,209,249,1)");

  const preview = createRef<Rect>();
  const previewSize = view.size().sub(160);

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

  view.add(
    <Rect
      ref={preview}
			fill={'black'}
      size={previewSize}
      radius={20}
      direction={"column"}
      justifyContent={"end"}
      clip
      // cache
    >
			<Txt fill={'white'}>123</Txt>
		</Rect>
  );
});
