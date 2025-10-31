import {
  Icon,
  Img,
  makeScene2D,
  Rect,
  Txt,
  Latex,
  RectProps,
} from "@motion-canvas/2d";
import { all, createRef, sequence, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import slidevSvg from "../assets/slidev.svg";
import { appear } from "@/shared/utils";

const REPOS = [
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
    title: "lovchun.com",
    icon: "skill-icons:astro",
    desc: "我的博客，基于 `Astro`。",
  },
  {
    title: "Release Viewer",
    icon: "skill-icons:nextjs-light",
    desc: "我的发布器，基于 `Nextjs`。",
  },
  {
    title: "Geist Design",
    icon: "skill-icons:vuejs-light",
    desc: "我的组件库，基于 `Vuejs`。",
  },
  {
    title: "Talks",
    img: slidevSvg,
    desc: "我的演讲，基于 `Slidev`。",
  },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const rectRefs = Array.from({ length: REPOS.length }, () =>
    createRef<Rect>()
  );
  const repoRefs = Array.from({ length: REPOS.length }, () =>
    createRef<Rect>()
  );

  const rectSize: RectProps["size"] = [(view.width() - 90) / 2, 200];

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
        <Rect ref={contentRef} layout={false} />
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

  rectRefs.forEach((ref) => {
    contentRef().add(
      <Rect
        ref={ref}
        size={rectSize}
        stroke={"#666"}
        lineWidth={2}
        radius={20}
      />
    );
  });

  yield* all(...rectRefs.map((ref) => appear(ref())));

  yield* all(
    rectRefs[0]().top(rectRefs[1]().bottom().addY(40), 1),
    rectRefs[3]().top(rectRefs[4]().bottom().addY(40), 1),
    rectRefs[2]().bottom(rectRefs[1]().top().addY(-40), 1),
    rectRefs[5]().bottom(rectRefs[4]().top().addY(-40), 1)
  );

  yield* all(
    rectRefs[0]().x(-265, 1),
    rectRefs[1]().x(-265, 1),
    rectRefs[2]().x(-265, 1),
    rectRefs[3]().x(265, 1),
    rectRefs[4]().x(265, 1),
    rectRefs[5]().x(265, 1)
  );

  yield repoRefs.forEach((ref, i) => {
    contentRef().add(
      <Rect
        ref={ref}
        opacity={0}
        layout
        size={rectSize}
        direction={"column"}
        paddingLeft={30}
        alignItems={"start"}
        justifyContent={"space-around"}
      >
        <Rect layout gap={20} direction={"row"} alignItems={"center"}>
          {REPOS[i].icon ? (
            <Icon icon={REPOS[i].icon} size={60} />
          ) : (
            <Img src={REPOS[i].img} size={60} />
          )}
          <Latex tex={REPOS[i].title} fontSize={40} fill={"#fff"} />
        </Rect>

        <Txt fontSize={32} fill={"#ffffffcc"}>
          {REPOS[i].desc}
        </Txt>
      </Rect>
    );
  });

  repoRefs.forEach((ref, i) => {
    ref().position(rectRefs[i]().position());
  });

  yield* sequence(0.15, ...repoRefs.map((ref) => appear(ref())));

  yield* waitUntil("repo_list_end");
});
