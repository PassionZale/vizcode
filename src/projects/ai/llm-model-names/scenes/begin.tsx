import { makeScene2D } from "@motion-canvas/2d";
import { OpeningScene } from "@/scenes/begin";
import { waitForCut } from "@/shared/utils";
import logoSvg from "../assets/logo.svg";

export default makeScene2D(function* (view) {
  const openingScene = new OpeningScene({
    title: "LLM model names",
    logoSrc: logoSvg,
    middleText: "A-rolling...",
    backgroundColor: "#121b21",
  });

  yield view.add(openingScene);

  // 播放开场动画
  yield* openingScene.playAnimation();

  // 等待指定时间
  yield* waitForCut(5);
});
