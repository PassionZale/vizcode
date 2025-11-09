import {
  Icon,
  Img,
  makeScene2D,
  Rect,
  Txt,
  Latex,
  Camera,
} from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import slidevSvg from "../assets/slidev.svg";
import { waitForCut } from "@/shared/utils";

const REPOS = [
  {},
  {
    title: "lovchun.com",
    icon: "skill-icons:astro",
    desc: "我的博客，基于 `Astro`。",
  },
  {
    title: "Talks",
    img: slidevSvg,
    desc: "我的演讲，基于 `Slidev`。",
  },
  {
    title: "Geist Design",
    icon: "skill-icons:vuejs-light",
    desc: "我的组件库，基于 `Vuejs`。",
  },
  {
    title: "Type Challenges",
    icon: "skill-icons:typescript",
    desc: "我的 TS 类型体操。",
  },
  {
    title: "Create App",
    icon: "skill-icons:npm-light",
    desc: "我的脚手架，基于 `Nodejs`。",
  },
  {
    title: "Release Viewer",
    icon: "skill-icons:nextjs-light",
    desc: "我的发布器，基于 `Nextjs`。",
  },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const rectRefs = Array.from({ length: REPOS.length }, () =>
    createRef<Rect>()
  );
  const cameraRef = createRef<Camera>();

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

        <Rect
          ref={titleRef}
          layout
          gap={10}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon icon="simple-icons:github" size={56} />
          <Txt {...TextStyles.body}>@</Txt>
          <Txt {...TextStyles.subtitle} fontWeight={500}>
            PassionZale
          </Txt>
        </Rect>
      </Rect>

      <Rect grow={1}>
        <Camera ref={cameraRef}>
          {rectRefs.map((ref, i) => (
            <Rect
              ref={ref}
              size={[640, 280]}
              position={[i === 0 ? 0 : i * 640 + i * 50, 0]}
              scale={i === 0 ? 1.2 : 0.8}
              layout
              direction={"column"}
              alignItems={"start"}
              justifyContent={"space-around"}
              stroke={i === 0 ? undefined : "#666"}
              lineWidth={2}
              radius={20}
              gap={40}
              padding={60}
            >
              <Rect layout gap={20} direction={"row"} alignItems={"center"}>
                {REPOS[i].icon ? (
                  <Icon icon={REPOS[i].icon} size={60} />
                ) : (
                  <Img src={REPOS[i].img} size={60} />
                )}
                <Latex tex={REPOS[i].title} fontSize={40} fill={"#fff"} />
              </Rect>

              <Txt fontSize={40} fill={"#ffffffcc"}>
                {REPOS[i].desc}
              </Txt>
            </Rect>
          ))}
        </Camera>
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

  yield* all(
    cameraRef().centerOn(rectRefs[1](), 1.2),
    rectRefs[1]().scale(1.2, 1),
    rectRefs[1]().stroke("#FBBC05", 1)
  );
  yield* waitForCut();

  yield* all(
    rectRefs[1]().stroke("#666", 1),
    rectRefs[1]().scale(0.8, 0.5),
    cameraRef().centerOn(rectRefs[2](), 1.2),
    rectRefs[2]().scale(1.2, 1),
    rectRefs[2]().stroke("#FBBC05", 1)
  );

  yield* waitForCut();

  yield* all(
    rectRefs[2]().stroke("#666", 1),
    rectRefs[2]().scale(0.8, 0.5),
    cameraRef().centerOn(rectRefs[3](), 1.2),
    rectRefs[3]().scale(1.2, 1),
    rectRefs[3]().stroke("#FBBC05", 1)
  );

  yield* waitForCut();

  yield* all(
    rectRefs[3]().stroke("#666", 1),
    rectRefs[3]().scale(0.8, 0.5),
    cameraRef().centerOn(rectRefs[4](), 1.2),
    rectRefs[4]().scale(1.2, 1),
    rectRefs[4]().stroke("#FBBC05", 1)
  );

  yield* waitForCut();

  yield* all(
    rectRefs[4]().stroke("#666", 1),
    rectRefs[4]().scale(0.8, 0.5),
    cameraRef().centerOn(rectRefs[5](), 1.2),
    rectRefs[5]().scale(1.2, 1),
    rectRefs[5]().stroke("#FBBC05", 1)
  );

  yield* waitForCut();

  yield* all(
    rectRefs[5]().stroke("#666", 1),
    rectRefs[5]().scale(0.8, 0.5),
    cameraRef().centerOn(rectRefs[6](), 1.2),
    rectRefs[6]().scale(1.2, 1),
    rectRefs[6]().stroke("#FBBC05", 1)
  );

  yield* waitForCut();
});
