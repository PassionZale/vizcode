import { makeScene2D, Code, word, lines } from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitFor } from "@motion-canvas/core";

import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const code = createRef<Code>();

  view.add(
    <JavascriptCode
      ref={code}
      fontSize={28}
      fontFamily={"JetBrains Mono, monospace"}
      code={`\
function example() {
  console.log('Hello!');
}`}
    />
  );

  // insert code at line 2, column 0
  yield* code().code.insert([2, 0], "  return 7;\n", 0.6);

  // replace the word "Hello!" with "Goodbye!"
  yield* code().code.replace(word(1, 15, 6), "Goodbye!", 0.6);

  // remove line 2
  yield* code().code.remove(lines(2), 0.6);

  // animate multiple changes at the same time
  yield* all(
    code().code.replace(word(0, 9, 7), "greet", 0.6),
    code().code.replace(word(1, 15, 8), "Hello!", 0.6)
  );

  yield* waitFor(0.6);
});
