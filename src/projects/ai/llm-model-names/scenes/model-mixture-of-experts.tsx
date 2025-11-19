import { Icon, Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, sequence, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import moe from "../assets/moe.webp";
import { appear } from "@/shared/utils";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const wrapperRef = createRef<Rect>();
  const txt1Ref = createRef<Txt>();
  const txt2Ref = createRef<Txt>();
  const imgRef = createRef<Img>();

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

      <Rect grow={1}>
        <Rect ref={wrapperRef} layout={false}>
          <Txt
            ref={txt1Ref}
						opacity={0}
            position={[20, -450]}
            {...TextStyles.subtitle}
            fill={"#ffcc00"}
          >
            Prompt
          </Txt>
          <Img ref={imgRef} opacity={0} src={moe} width={() => view.width()} />
          <Txt
            ref={txt2Ref}
						opacity={0}
            position={[20, 450]}
            {...TextStyles.subtitle}
            fill={"#ffcc00"}
          >
            Completion
          </Txt>
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

  yield* titleRef().text("专家混合", 1);

  yield* sequence(0.15, appear(txt1Ref()), appear(imgRef()), appear(txt2Ref()));

  yield* waitUntil("model_moe");
});
