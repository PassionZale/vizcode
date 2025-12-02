import { Circle, Icon, makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import { createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { JavascriptCode } from "@/nodes/Code";
import z_ai from "../assets/z_ai.mp4";

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
          视觉理解
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
  "zai": {
    "type": "stdio",
    "command": "npx",
    "args": [
      "-y",
      "@z_ai/mcp-server@latest"
    ],
    "env": {
      "Z_AI_MODE": "ZHIPU",
      "Z_AI_BASE_URL": 
			    "https://api-inference.modelscope.cn/v1/",
      "Z_AI_API_KEY": "魔搭 API Key",
      "Z_AI_VISION_MODEL": 
			    "Qwen/Qwen3-VL-235B-A22B-Instruct",
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

  yield* waitUntil("scene_2");
});
