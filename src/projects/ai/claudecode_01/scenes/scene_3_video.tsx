import { makeScene2D, Video } from "@motion-canvas/2d";
import tavily from "../assets/tavily.mp4";
import { createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const videoRef = createRef<Video>();

  yield view.add(<Video ref={videoRef} size={'100%'} src={tavily} />);

  videoRef().play();

  yield* waitUntil("scene_3_video");
});
