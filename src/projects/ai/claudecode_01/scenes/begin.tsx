import { Camera, Icon, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import lit from "../assets/lit.png";
import pro from "../assets/pro.png";
import max from "../assets/max.png";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const cameraRef = createRef<Camera>();
  const imgRefs = Array.from({ length: 3 }, () => createRef<Img>());

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
          <Icon icon={"icon-park:brain"} size={180} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect
        grow={1}
        ref={contentRef}
        layout
        direction={"column"}
        alignItems={"start"}
        justifyContent={"start"}
      ></Rect>

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

  yield* titleRef().text("GLM Coding Plans", 1);

  yield contentRef().add(
    <Camera ref={cameraRef}>
      <Img scale={0.5} ref={imgRefs[0]} src={lit} x={-340} />
      <Img scale={0.5} ref={imgRefs[1]} src={pro} position={[0, 0]} />
      <Img scale={0.5} ref={imgRefs[2]} src={max} x={340} />
    </Camera>
  );

  yield* all(
    imgRefs[0]().scale(1.2, 1),
    imgRefs[0]().zIndex(1, 0.5),
    cameraRef().centerOn(imgRefs[0](), 1)
  );

  yield* all(
    imgRefs[0]().scale(0.5, 0.5),
    imgRefs[1]().scale(1.2, 1),
    imgRefs[1]().zIndex(2, 0.5),
    cameraRef().centerOn(imgRefs[1](), 1)
  );

  yield* all(
    imgRefs[1]().scale(0.5, 0.5),
    imgRefs[2]().scale(1.2, 1),
    imgRefs[2]().zIndex(3, 0.5),
    cameraRef().centerOn(imgRefs[2](), 1)
  );

  yield* all(imgRefs[2]().scale(0.5, 1), cameraRef().reset(1));

  yield* waitUntil("begin");
});
