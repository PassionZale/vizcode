import { Grid, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "../../../shared/text-styles";

export default makeScene2D(function* (view) {
  view.add(
    <Grid width={"100%"} height={"100%"} stroke={"#666"} start={0} end={1} />
  );

  const rect = createRef<Rect>();
  const txt = createRef<Txt>();

  view.add(
    <Rect ref={rect} lineWidth={10} width={600} height={400} radius={20}>
      <Txt ref={txt} {...TextStyles.title}>
        2014
      </Txt>
    </Rect>
  );

  yield* all(
    rect().stroke("#fff", 1),
    rect().fill("red", 1),
    txt().fill("#fff", 1)
  );

  // 等待3秒
  yield* waitFor(3);

  // 矩形和文字消失动画
  yield* all(rect().opacity(0, 1), txt().opacity(0, 1));

  const img = createRef<Img>();

  yield view.add(
    <Img
      ref={img}
      src="https://images.unsplash.com/photo-1679218407381-a6f1660d60e9"
      width={300}
      radius={20}
      opacity={0}
    />
  );

  // set the background using the color sampled from the image:
  img().fill(img().getColorAtPoint(0));

  yield* all(
    img().size([100, 100], 1).to([300, null], 1),
    img().radius(50, 1).to(20, 1),
    img().opacity(0, 1).to(1, 1)
  );
  yield* waitFor(0.5);
});
