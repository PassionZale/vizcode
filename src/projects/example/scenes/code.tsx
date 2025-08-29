import { makeScene2D, Code } from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitFor } from "@motion-canvas/core";

import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <JavascriptCode
      ref={code}
      fontSize={28}
      fontFamily={"JetBrains Mono, monospace"}
      code={"const number = 7;"}
    />
  );

  yield* waitFor(0.6);
  yield* all(
    code().code.replace(code().findFirstRange("number"), "variable", 0.6),
    code().code.prepend(0.6)`function example() {\n  `,
    code().code.append(0.6)`\n}`
  );

  yield* waitFor(0.6);
  yield* code().selection(code().findFirstRange("variable"), 0.6);

  yield* waitFor(0.6);
  yield* all(
    code().code("const number = 7;", 0.6),
    code().selection(DEFAULT, 0.6)
  );
});
