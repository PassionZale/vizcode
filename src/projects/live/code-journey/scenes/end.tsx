import { makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import { createRef, sequence } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear, waitForCut } from "@/shared/utils";
import partingFaceWebm from "@/assets/videos/parting-face.webm";

export default makeScene2D(function* (view) {
  const letters = ["C", "o", "d", "e", "S", "u", "g", "a", "r"];
  const colors = ["#4285F4", "#FBBC05", "#EA4335", "#34A853"];

  const contentReft = createRef<Rect>();
  const txtRefs = Array.from({ length: letters.length }, () =>
    createRef<Txt>()
  );

  const videoRef = createRef<Video>();

  view.add(
    <Rect
      direction="column"
      layout
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      gap={60}
    >
      <Video ref={videoRef} src={partingFaceWebm} size={300} />
      <Rect
        ref={contentReft}
        layout
        alignItems={"start"}
        justifyContent={"center"}
      ></Rect>
    </Rect>
  );

  txtRefs.forEach((ref, i) => {
    contentReft().add(
      <Txt
        ref={ref}
        {...TextStyles.title}
        fontSize={120}
        fill={colors[i] || "#fff"}
        opacity={0}
      >
        {letters[i]}
      </Txt>
    );
  });

  videoRef().play();

  yield* sequence(0.1, ...txtRefs.map((ref) => appear(ref())));

  yield* waitForCut();
});
