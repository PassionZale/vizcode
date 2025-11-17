import {
  Camera,
  Icon,
  makeScene2D,
  Rect,
  RectProps,
  Txt,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  DEFAULT,
  sequence,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";

const MODELS = [
  {
    zh: "基础模型",
    en: "Base models",
    desc: "大学毕业生（潜力股）",
    model: "Qwen3-8B-Base",
    position: [-260, -360],
  },
  {
    zh: "指令微调模型",
    en: "Instruct models",
    desc: "经验员工（主力军）",
    model: "Qwen3-8B-Instruct",
    position: [180, -380],
  },
  {
    zh: "视觉模型",
    en: "Vision models",
    desc: "艺术家（视觉专家）",
    model: "Qwen3-VL-8B-Instruct",
    position: [-225, -40],
  },
  {
    zh: "代码模型",
    en: "Code models",
    desc: "程序员（技术专家）",
    model: "Qwen3-Coder-480B-A35B-Instruct",
    position: [160, -130],
  },
  {
    zh: "嵌入模型",
    en: "Embedding models",
    desc: "图书管理员（整理专家）",
    model: "Qwen3-8B-Instruct",
    position: [-230, 250],
  },
  {
    zh: "守卫模型",
    en: "Guard models",
    desc: "保安（安全专家）",
    model: "Qwen3Guard-Gen-0.6B",
    position: [150, 120],
  },
  {
    zh: "推理模型",
    en: "Reasoning models",
    desc: "科学家（研究专家）",
    model: "DeepSeek-R1",
    position: [180, 370],
  },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const cameraRef = createRef<Camera>();
  const rectRefs = Array.from({ length: MODELS.length }, () =>
    createRef<Rect>()
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
        <Camera ref={cameraRef}>
          {rectRefs.map((ref, index) => (
            <Rect
              ref={ref}
              layout
              direction={"column"}
              padding={[20, 40]}
              gap={20}
              radius={20}
              stroke={"#666"}
              lineWidth={2}
              opacity={0}
              position={MODELS[index].position as RectProps["position"]}
            >
              <Txt {...TextStyles.subtitle}>{MODELS[index].zh}</Txt>
              <Txt {...TextStyles.body}>{MODELS[index].en}</Txt>
            </Rect>
          ))}
        </Camera>
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

  yield* all(
    titleRef().text("模型用途", 1),
    sequence(0.15, ...rectRefs.map((ref) => appear(ref())))
  );

  yield* all(
    yield rectRefs[0]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[0].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[0].model}</Txt>
      </>
    ),
    rectRefs[0]().scale(3, 1),
    rectRefs[0]().zIndex(2, 1),
    rectRefs[0]().lineWidth(0, 1),
    rectRefs[0]().fill("#ffcc00", 1),
    ...rectRefs[0]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000000", 1)),
    cameraRef().centerOn(rectRefs[0](), 1)
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[1]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[1].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[1].model}</Txt>
      </>
    ),
    rectRefs[0]().scale(1, 1),
    rectRefs[0]().zIndex(DEFAULT, 1),
    rectRefs[0]().lineWidth(2, 1),
    rectRefs[0]().fill(DEFAULT, 1),
    ...rectRefs[0]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[1](), 1),
    rectRefs[1]().scale(2.3, 1),
    rectRefs[1]().zIndex(2, 1),
    rectRefs[1]().lineWidth(0, 1),
    rectRefs[1]().fill("#ffcc00", 1),
    ...rectRefs[1]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[2]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[2].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[2].model}</Txt>
      </>
    ),
    rectRefs[1]().scale(1, 1),
    rectRefs[1]().zIndex(DEFAULT, 1),
    rectRefs[1]().lineWidth(2, 1),
    rectRefs[1]().fill(DEFAULT, 1),
    ...rectRefs[1]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[2](), 1),
    rectRefs[2]().scale(3, 1),
    rectRefs[2]().zIndex(2, 1),
    rectRefs[2]().lineWidth(0, 1),
    rectRefs[2]().fill("#ffcc00", 1),
    ...rectRefs[2]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[3]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[3].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[3].model}</Txt>
      </>
    ),
    rectRefs[2]().scale(1, 1),
    rectRefs[2]().zIndex(DEFAULT, 1),
    rectRefs[2]().lineWidth(2, 1),
    rectRefs[2]().fill(DEFAULT, 1),
    ...rectRefs[2]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[3](), 1),
    rectRefs[3]().scale(2.3, 1),
    rectRefs[3]().zIndex(2, 1),
    rectRefs[3]().lineWidth(0, 1),
    rectRefs[3]().fill("#ffcc00", 1),
    ...rectRefs[3]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[4]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[4].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[4].model}</Txt>
      </>
    ),
    rectRefs[3]().scale(1, 1),
    rectRefs[3]().zIndex(DEFAULT, 1),
    rectRefs[3]().lineWidth(2, 1),
    rectRefs[3]().fill(DEFAULT, 1),
    ...rectRefs[3]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[4](), 1),
    rectRefs[4]().scale(2.4, 1),
    rectRefs[4]().zIndex(2, 1),
    rectRefs[4]().lineWidth(0, 1),
    rectRefs[4]().fill("#ffcc00", 1),
    ...rectRefs[4]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[5]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[5].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[5].model}</Txt>
      </>
    ),
    rectRefs[4]().scale(1, 1),
    rectRefs[4]().zIndex(DEFAULT, 1),
    rectRefs[4]().lineWidth(2, 1),
    rectRefs[4]().fill(DEFAULT, 1),
    ...rectRefs[4]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[5](), 1),
    rectRefs[5]().scale(3, 1),
    rectRefs[5]().zIndex(2, 1),
    rectRefs[5]().lineWidth(0, 1),
    rectRefs[5]().fill("#ffcc00", 1),
    ...rectRefs[5]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitFor(2);

  yield* all(
    yield rectRefs[6]().add(
      <>
        <Txt {...TextStyles.caption}>{MODELS[6].desc}</Txt>
        <Txt {...TextStyles.caption}>{MODELS[6].model}</Txt>
      </>
    ),
    rectRefs[5]().scale(1, 1),
    rectRefs[5]().zIndex(DEFAULT, 1),
    rectRefs[5]().lineWidth(2, 1),
    rectRefs[5]().fill(DEFAULT, 1),
    ...rectRefs[5]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#fff", 1)),
    cameraRef().centerOn(rectRefs[6](), 1),
    rectRefs[6]().scale(2.6, 1),
    rectRefs[6]().zIndex(2, 1),
    rectRefs[6]().lineWidth(0, 1),
    rectRefs[6]().fill("#ffcc00", 1),
    ...rectRefs[6]()
      .childrenAs<Txt>()
      .map((txt) => txt.fill("#000", 1))
  );

  yield* waitUntil("model_purposes");
});
