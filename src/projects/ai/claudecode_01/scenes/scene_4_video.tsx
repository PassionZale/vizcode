import { makeScene2D, Video } from "@motion-canvas/2d";
import fetch from "../assets/fetch.mp4";
import { createRef, waitUntil } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const videoRef = createRef<Video>();

  yield view.add(<Video ref={videoRef} size={'100%'} src={fetch} />);

  videoRef().play();

  yield* waitUntil("scene_4_video");
});
