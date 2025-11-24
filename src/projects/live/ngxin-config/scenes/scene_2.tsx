import { Code, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, DEFAULT, waitUntil } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "@/shared/text-styles";
import { HTMLCode, MarkdownCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const rect1Ref = createRef<Rect>();
  const rect2Ref = createRef<Rect>();
  const markdown1Ref = createRef<Code>();
  const markdown2Ref = createRef<Code>();
  const html1Ref = createRef<Code>();
  const html2Ref = createRef<Code>();

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

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"column"}
        gap={50}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Rect
          ref={rect1Ref}
          direction={"column"}
          alignItems={"start"}
          stroke={"#666"}
          lineWidth={2}
          radius={20}
          padding={40}
          width={"80%"}
          gap={20}
        >
          <MarkdownCode
            ref={markdown1Ref}
            code={`\
dist
 ┣ bundle.old.js
 ┣ index.html
 ┗ chunk.old.js
`}
          />
          <HTMLCode ref={html1Ref} code={`<script src="bundle.old.js" />`} />
        </Rect>

        <Rect
          ref={rect2Ref}
          direction={"column"}
          alignItems={"start"}
          stroke={"#666"}
          lineWidth={2}
          radius={20}
          padding={40}
          width={"80%"}
          gap={20}
        >
          <MarkdownCode
            ref={markdown2Ref}
            code={`\
dist
 ┣ bundle.new.js
 ┣ index.html
 ┗ chunk.new.js
`}
          />
          <HTMLCode ref={html2Ref} code={`<script src="bundle.new.js" />`} />
        </Rect>
      </Rect>

      <Rect
        size={["100%", "15%"]}
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

  yield* titleRef().text("根本原因", 1);

  yield* all(rect1Ref().stroke("#ffcc00", 1), rect1Ref().lineWidth(6, 1));

  yield* chain(
    all(rect1Ref().stroke("#666", 1), rect1Ref().lineWidth(2, 1)),
    all(rect2Ref().stroke("#ffcc00", 1), rect2Ref().lineWidth(6, 1))
  );

  yield* all(rect2Ref().stroke("#666", 1), rect2Ref().lineWidth(2, 1));

  yield* all(
    markdown1Ref().selection(markdown1Ref().findFirstRange("index.html"), 1),
    html1Ref().selection(html1Ref().findFirstRange("index.html"), 1),
    markdown2Ref().selection(markdown2Ref().findFirstRange("index.html"), 1),
    html2Ref().selection(html2Ref().findFirstRange("index.html"), 1)
  );

  yield* all(
    markdown1Ref().selection(markdown1Ref().findFirstRange("bundle.old.js"), 1),
    html1Ref().selection(DEFAULT, 1)
  );

  yield* waitUntil("scene_2");
});
