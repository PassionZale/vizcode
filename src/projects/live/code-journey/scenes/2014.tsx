import { Circle, Code, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { JavaCode } from "@/nodes/Code";
import logoSvg from "../assets/logo.svg";
import imgJpg from "../assets/2014.jpg";
import { waitForCut } from "@/shared/utils";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const imageRef = createRef<Img>();
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
        ref={contentRef}
        grow={1}
        layout
        justifyContent="center"
        alignItems="center"
      >
        <Img
          ref={imageRef}
          src={imgJpg}
          width={700}
          scale={0}
          smoothing={true}
        />
      </Rect>

      <Rect
        size={["100%", "25%"]}
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

  yield* all(titleRef().text("2014", 0.5), imageRef().scale(1, 0.5));

  yield* waitForCut();

  yield* imageRef().scale(0, 0.5);

  imageRef().remove();

  contentRef()
    .alignItems("start")
    .justifyContent("start")
    .add(
      <Rect size={"100%"} paddingLeft={80} paddingRight={80}>
        <Rect
          layout
          clip
          direction={"column"}
          size={"100%"}
          radius={40}
          fill={"#030712"}
        >
          <Rect layout gap={20} padding={40}>
            <Circle size={20} fill={"#ff0800"} />
            <Circle size={20} fill={"#fdbc40"} />
            <Circle size={20} fill={"#35cd4b"} />
          </Rect>

          <Rect grow={1} fill={"ffffff1a"} padding={40}>
            <JavaCode ref={codeRef} />
          </Rect>
        </Rect>
      </Rect>
    );

  yield* codeRef().code("// 👋 HelloWorld", 0.6);

  yield* codeRef().code(
    `\
// 👋 HelloWorld
class HelloWorld {

}`,
    1
  );

  yield* codeRef().code(
    `\
// 👋 HelloWorld
class HelloWorld {
    public static void main(String[] args) {

    }
}`,
    1
  );

  yield* codeRef().code(
    `\
// 👋 HelloWorld
class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello, World!");
    }
}`,
    1
  );

  yield* codeRef().code(
    `\
/**
 * HelloWorld 类 - 我的第一个 Java 程序
 * 包含主方法 main 作为程序入口点
 * 向控制台输出 "Hello, World!" 消息
 */
class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello, World!");
    }
}`,
    1
  );

  yield* waitForCut();
});
