import {
  Circle,
  Grid,
  makeScene2D,
  Rect,
  Spline,
  SplineProps,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";

const points: SplineProps["points"] = [
  [-240, -720],
  [0, -560],
  [0, -240],
  [-240, -75],
  [-240, 320],
  [0, 480],
];

export default makeScene2D(function* (view) {
  const grid = createRef<Grid>();

  view.add(
    <Grid
      ref={grid}
      width={"100%"}
      height={"100%"}
      stroke={"#666"}
      start={0.5}
      end={0.5}
    />
  );

  yield* all(grid().start(0.5, 1).to(0, 1), grid().end(0.5, 1).to(1, 1));

  const spline = createRef<Spline>();

  view.add(
    <>
      {points.map((point) => (
        <Circle fill={"lightseagreen"} size={40} position={point} />
      ))}
    </>
  );

  view.add(
    <Spline
      ref={spline}
      lineWidth={6}
      stroke={"lightseagreen"}
      points={points}
      end={0}
    />
  );

  yield* spline().end(1, 1.5);

  view.add(
    <>
      <Txt position={points[0]} fill={"red"}>
        2024
      </Txt>
    </>
  );

  yield* waitFor(3);
});
