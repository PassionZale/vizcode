import {
  Circle,
  Icon,
  IconProps,
  Img,
  makeScene2D,
  Rect,
  Txt,
  Video,
} from "@motion-canvas/2d";
import { all, createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import logoSvg from "../assets/logo.svg";
import slidevSvg from "../assets/slidev.svg";
import clapWebm from "../assets/clap.webm";
import projectLogo from "../assets/projects/logo.png";

const ICONS = [
  "skill-icons:ubuntu-light",
  "skill-icons:nginx",
  "skill-icons:mysql-light",
  "skill-icons:php-light",
  "skill-icons:github-light",
  "skill-icons:docker",
  "skill-icons:html",
  "skill-icons:css",
  "skill-icons:nodejs-light",
  "skill-icons:npm-light",
  "skill-icons:webpack-light",
  "skill-icons:typescript",
  "skill-icons:astro",
  "skill-icons:vite-light",
  "skill-icons:tailwindcss-light",
  "skill-icons:vuejs-light",
  "skill-icons:react-light",
  "skill-icons:nextjs-light",
  "skill-icons:vercel-light",
  slidevSvg,
];

const POSITIONS: IconProps["position"][] = [
  [-160, -470],
  [-310, -370],
  [-400, -210],
  [-460, -30],
  [-400, 170],
  [-320, 350],
  [-160, 470],
  [160, 470],
  [310, 350],
  [400, 170],
  [460, -30],
  [400, -210],
  [310, -370],
  [160, -470],
  [-160, -230],
  [-235, 10],
  [-160, 250],
  [160, -230],
  [235, 10],
  [160, 250],
];

// https://slama.dev/motion-canvas/introduction/
// 每个 repo 单独搞一个 scene, 单独做一个 repo card(可以搞成组件)，单独的一段口播文案：例如 2016年我购买了域名 xxxx
// 每个 repo 3 张截图，用上面这个示例展示，repo icon 使用各个项目的 favicon

const Projects = [
  {
    name: "lovchun.com-next",
    icon: projectLogo,
    url: "https://www.lovchun.com/",
  },
  {
    name: "TS 类型体操",
    icon: projectLogo,
    url: "https://tsch.lovchun.com/",
  },
  {
    name: "geist-design",
    icon: projectLogo,
    url: "https://geist-design.lovchun.com/",
  },
  {
    name: "create-app",
    icon: projectLogo,
    url: "https://create-app.lovchun.com/",
  },
  {
    name: "release-viewer",
    icon: projectLogo,
    url: "https://release-viewer.lovchun.com/",
  },
];

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const skillRef = createRef<Rect>();
  const iconRefs = Array.from({ length: ICONS.length }, () =>
    createRef<Icon | Img>()
  );

  const videoRef = createRef<Video>();

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
          <Img size={[180, 180]} src={logoSvg} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect grow={1}>
        <Rect ref={skillRef} layout={false} />
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

  yield* titleRef().text("2016 ~ 2023", 0.5).wait(1);

  for (let i = 0; i < ICONS.length; i++) {
    yield* waitFor(0.1);

    yield skillRef().add(
      i === ICONS.length - 1 ? (
        <Img
          key={`skill-icon-${i}`}
          ref={iconRefs[i]}
          src={ICONS[i]}
          size={200}
        />
      ) : (
        <Icon
          key={`skill-icon-${i}`}
          ref={iconRefs[i]}
          icon={ICONS[i]}
          size={200}
        />
      )
    );
  }

  yield* all(
    ...iconRefs.map((ref, i) =>
      all(ref().size(100, 0.8), ref().position(POSITIONS[i], 0.8))
    )
  );

  yield skillRef().add(
    <Video ref={videoRef} src={clapWebm} scale={0} size={200} loop />
  );

  videoRef().play();

  yield* videoRef().scale(1, 1);

  yield* waitUntil("skill_end");

  yield* waitUntil("2016_2023_end");
});
