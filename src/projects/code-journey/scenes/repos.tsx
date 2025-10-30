import { Icon, Img, Latex, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import blogPng from "../assets/repos/blog.png";
import createAppPng from "../assets/repos/create-app.png";
import geistDesingSvg from "../assets/repos/geist-design.svg";
import releaseViewerSvg from "../assets/repos/release-viewer.svg";
import tschSvg from "../assets/repos/tsch.svg";
import { appear } from "@/shared/utils";

const REPOS = [
  {
    title: "我的博客，基于 `Astro`",
    icon: blogPng,
  },
  {
    title: "我的 TS 类型体操",
    icon: tschSvg,
  },
  {
    title: "我的组件库，基于 `Vuejs`",
    icon: geistDesingSvg,
  },
  // {
  //   title: "我的脚手架，基于 `Nodejs`",
  //   icon: createAppPng,
  // },
  // {
  //   title: "我的发布器，基于 `Nextjs`",
  //   icon: releaseViewerSvg,
  // },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const contentRef = createRef<Rect>();
  const rectRefs = Array.from({ length: REPOS.length }, () =>
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
          <Img size={[180, 180]} src={logoSvg} />
        </Rect>

        <Rect
          ref={titleRef}
          layout
          gap={10}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Icon icon="tabler:brand-github" size={56} />
          <Txt {...TextStyles.body}>@</Txt>
          <Txt {...TextStyles.subtitle} fontWeight={500}>
            PassionZale
          </Txt>
        </Rect>
      </Rect>

      <Rect grow={1}>
        <Rect ref={contentRef} layout={false}>
          {/* <Rect width={'30%'} height={800} fill="#fff" layout>
            <Img src={blogPng} size={100} radius={60} />

            <Rect layout direction={"column"}>
              <Txt {...TextStyles.subtitle}>lovchun.com-next</Txt>
              <Txt {...TextStyles.caption}>
                articles and happiness I want share.
              </Txt>
            </Rect>
          </Rect> */}
          {/* <Rect size={300} fill={"#FBBC05"}></Rect>
          <Rect size={300} fill={"#EA4335"}></Rect>
          <Rect size={300} fill={"#ffcc00"}></Rect>
          <Rect size={300} fill={"#34A853"}></Rect> */}
        </Rect>
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
      <Rect ref={ref} size={300} stroke={"white"} lineWidth={5} />
    );
  });

  yield* all(...rectRefs.map((ref) => appear(ref())));

  yield* all(
    rectRefs[0]().right(rectRefs[1]().left().addX(-50), 1),
    rectRefs[2]().left(rectRefs[1]().right().addX(50), 1)
  );

  yield* waitUntil("repo_list_end");
});
