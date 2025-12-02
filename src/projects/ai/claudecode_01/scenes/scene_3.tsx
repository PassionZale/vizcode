import { Circle, Icon, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { JavascriptCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();

  view.add(
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
          <Icon icon={"icon-park:brain"} size={180} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}>
          联网搜索
        </Txt>
      </Rect>

      <Rect
        grow={1}
        layout
        direction={"column"}
        gap={50}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Rect size={"100%"} paddingLeft={30} paddingRight={30}>
          <Rect
            layout
            clip
            direction={"column"}
            size={"100%"}
            radius={40}
            fill={"#030712"}
          >
            <Rect alignItems={"center"}>
              <Rect layout gap={20} padding={40}>
                <Circle size={20} fill={"#ff0800"} />
                <Circle size={20} fill={"#fdbc40"} />
                <Circle size={20} fill={"#35cd4b"} />
              </Rect>

              <Txt grow={1} {...TextStyles.body}>
                claude.json
              </Txt>
            </Rect>

            <Rect grow={1} fill={"ffffff1a"} padding={40}>
              <JavascriptCode
                code={`\
"mcpSevers": {
  "tavily": {
    "type": "stdio",
    "command": "npx",
    "args": [
      "-y",
      "tavily-mcp@latest"
    ],
    "env": {
      "TAVILY_API_KEY": "TAVILY API KEY"
    }
  }		
}`}
              />
            </Rect>
          </Rect>
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

  yield* waitUntil("scene_3");
});
