import {
  Circle,
  Code,
  Img,
  makeScene2D,
  Rect,
  Txt,
  lines,
} from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitUntil } from "@motion-canvas/core";
import logoSvg from "../assets/logo.svg";
import { TextStyles } from "@/shared/text-styles";
import { HTMLCode } from "@/nodes/Code";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const txtRef = createRef<Txt>();
  const codeRef = createRef<Code>();

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
        justifyContent={"center"}
      >
        <Rect size={"100%"} paddingLeft={50} paddingRight={50}>
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

              <Txt ref={txtRef} grow={1} {...TextStyles.body}>
                index.html
              </Txt>
            </Rect>

            <Rect grow={1} fill={"ffffff1a"} padding={40}>
              <HTMLCode
                ref={codeRef}
                code={`\
<meta 
	http-equiv="cache-control" 
	content="no-cache" 
/>

<meta 
	http-equiv="Pragma" 
	content="no-cache" 
/>

<meta 
	http-equiv="expires" 
	content="0" 
/>
`}
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

  yield* titleRef().text("解决方法", 1);

  yield* codeRef().selection(lines(0, 3), 1);
  yield* codeRef().selection(lines(5, 8), 1);
  yield* codeRef().selection(lines(10, 13), 1);
  yield* codeRef().selection(DEFAULT, 1);

  yield* all(
    txtRef().text("nginx.conf", 1),
    codeRef().code(
      `\
server {
	# 其他配置项...

	# HTML 不缓存
  location ~ /\.(html|htm)$ {
    add_header Cache-Control "no-store";
    add_header Cache-Control "no-cache";       
    add_header Cache-Control "must-revalidate"; 
  }

	# 静态资源文件 缓存30天
  location ~ \.(css|js|
	              gif|jpg|jpeg|png|bmp|swf|
	              ttf|woff|otf|ttc|pfa)$ {
    expires 30d;
  }
}
`,
      2
    )
  );

  yield* codeRef().selection(lines(5, 5), 1);
  yield* codeRef().selection(lines(6, 6), 1);
  yield* codeRef().selection(lines(7, 7), 1);
  yield* codeRef().selection(DEFAULT, 1);

  yield* waitUntil("scene_3");
});
