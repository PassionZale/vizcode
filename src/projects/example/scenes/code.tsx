import { makeScene2D, Code, lines } from "@motion-canvas/2d";
import { createRef, DEFAULT, waitFor } from "@motion-canvas/core";

import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <JavascriptCode
      ref={code}
      fontSize={28}
      offsetX={-1}
      x={-400}
      code={`\
function hello() {
  console.log('Hello');
}`}
    />
  );

  yield* code().selection(code().findAllRanges(/hello/gi), 0.6);
  yield* waitFor(0.3);

  yield* code().selection(lines(1), 0.6);
  yield* waitFor(0.3);

  yield* code().selection(DEFAULT, 0.6);
  yield* waitFor(0.3);
});
