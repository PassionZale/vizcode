import {
  Circle,
  CircleProps,
  Icon,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import { createRef, sequence, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";

const PARTS: {
  zh: string;
  en: string;
  size?: CircleProps["size"];
  position: CircleProps["position"];
}[] = [
  {
    zh: "品牌名",
    en: "Branded Names",
    size: 320,
    position: [0, 0],
  },
  {
    zh: "版本号",
    en: "Model Version",
    position: [-280, -200],
  },
  {
    zh: "参数大小",
    en: "Model Size",
    position: [0, -350],
  },
  {
    zh: "模型用途",
    en: "Model Purposes",
    position: [280, -200],
  },
  {
    zh: "模型量化",
    en: "Model Quantization",
    size: 350,
    position: [-320, 150],
  },
  {
    zh: "模型蒸馏",
    en: "Model Distillation",
    size: 350,
    position: [4, 360],
  },
  {
    zh: "专家混合",
    en: "Mixture Of Experts",
    size: 350,
    position: [320, 150],
  },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();

  const circleRefs = Array.from({ length: PARTS.length }, () =>
    createRef<Circle>()
  );

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
        <Rect ref={contentRef} layout={false}>
          {circleRefs.map((ref, index) => {
            return (
              <Circle
                key={PARTS[index].en}
                ref={ref}
                layout
                opacity={0}
                size={PARTS[index].size ?? 300}
                direction={"column"}
                stroke={"#666"}
                lineWidth={2}
                gap={30}
                padding={[20, 40]}
                position={PARTS[index].position}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Txt {...TextStyles.subtitle}>{PARTS[index].zh}</Txt>
                <Txt {...TextStyles.body}>{PARTS[index].en}</Txt>
              </Circle>
            );
          })}
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

  yield* titleRef().text("名称构成", 1);

  yield* sequence(0.15, ...circleRefs.map((ref) => appear(ref())));

  yield* waitUntil("intro_appear");

  yield* sequence(1, ...circleRefs.map((ref) => ref().scale(1.5, 1).to(1, 1)));

  yield* waitUntil("intro_end");
});
