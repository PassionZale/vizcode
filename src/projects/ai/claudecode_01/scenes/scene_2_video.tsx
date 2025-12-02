import { makeScene2D, Video } from "@motion-canvas/2d";
import z_ai from "../assets/z_ai.mp4";
import { createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const videoRef = createRef<Video>();

  yield view.add(<Video ref={videoRef} size={'100%'} src={z_ai} />);

  videoRef().play();

  yield* waitUntil("scene_2_video");
});
