import { makeScene2D, Img, Txt } from "@motion-canvas/2d";
import { createRef, all, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const logo = createRef<Img>();
  const title = createRef<Txt>();

  view.add(
    <>
      <Img ref={logo} src="/logo.png" scale={0} opacity={0} />
      <Txt
        ref={title}
        text="My Product"
        fontSize={80}
        fill="white"
        y={200}
        opacity={0}
      />
    </>
  );

  yield* all(
    logo().scale(1, 1.5).to(1.2, 0.3).to(1, 0.2),
    logo().opacity(1, 1),
    waitFor(0.5),
    title().opacity(1, 0.8),
    title().y(150, 0.8)
  );

  yield* waitFor(2);
});
