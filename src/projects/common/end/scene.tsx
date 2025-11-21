import { Circle, Img, makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import { appear } from "@/shared/utils";
import avatar from "@/assets/images/avatar.jpg";
import hugFace from "@/assets/videos/hug-face.webm";
import heartHands from "@/assets/videos/heart-hands.webm";
import glowingStar from "@/assets/videos/glowing-star.webm";
import { TextStyles } from "@/shared/text-styles";
import { all, createRef, sequence, waitUntil } from "@motion-canvas/core";
import claude from "@/assets/images/models/claude.svg";
import glm from "@/assets/images/models/glm.png";
import qwen from "@/assets/images/models/qwen.svg";

export default makeScene2D(function* (view) {
  const letters = ["C", "o", "d", "e", "S", "u", "g", "a", "r"];
  const colors = ["#4285F4", "#FBBC05", "#EA4335", "#34A853"];

  // 数据驱动的制作信息列表
  const credits = [
    { label: "视频制作:", icon: claude, value: "ClaudeCode" },
    { label: "脚本润色:", icon: glm, value: "GML-4.6" },
    { label: "图片生成:", icon: qwen, value: "Qwen-Image-Edit" },
    { label: "语音合成:", icon: qwen, value: "CosyVoice-V2" },
    { label: "语音音色:", icon: qwen, value: "longlaotie_v2" },
  ];

  const txtRefs = Array.from({ length: letters.length }, () =>
    createRef<Txt>()
  );

  const avatarRef = createRef<Img>();
  const contentRef = createRef<Rect>();
  const footerRef = createRef<Rect>();

  const hugFaceRectRef = createRef<Rect>();
  const hugFaceRef = createRef<Video>();
  const heartHandsRectRef = createRef<Rect>();
  const heartHandsRef = createRef<Video>();
  const glowingStarRectRef = createRef<Rect>();
  const glowingStarRef = createRef<Video>();

  yield view.add(
    <Rect
      layout
      size={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Rect layout direction={"column"} alignItems={"center"} gap={50}>
        <Circle size={300} clip>
          <Img
            ref={avatarRef}
            opacity={0}
            radius={300}
            src={avatar}
            size={"100%"}
          />
        </Circle>

        <Rect
          layout
          direction={"row"}
          gap={60}
          alignItems={"center"}
          justifyContent={"center"}
          height={138}
        >
          <Rect
            ref={heartHandsRectRef}
            opacity={0}
            layout
            direction={"column"}
            gap={20}
            alignItems={"center"}
          >
            <Video ref={heartHandsRef} src={heartHands} size={80} loop />
            <Txt {...TextStyles.body} fill={"#ffcc00"} fontWeight={800}>
              点赞
            </Txt>
          </Rect>
          <Rect
            ref={glowingStarRectRef}
            opacity={0}
            layout
            direction={"column"}
            gap={20}
            alignItems={"center"}
          >
            <Video ref={glowingStarRef} src={glowingStar} size={80} loop />
            <Txt {...TextStyles.body} fill={"#ffcc00"} fontWeight={800}>
              收藏
            </Txt>
          </Rect>
          <Rect
            ref={hugFaceRectRef}
            opacity={0}
            layout
            direction={"column"}
            gap={20}
            alignItems={"center"}
          >
            <Video ref={hugFaceRef} src={hugFace} size={80} loop />
            <Txt {...TextStyles.body} fill={"#ffcc00"} fontWeight={800}>
              + 关注
            </Txt>
          </Rect>
        </Rect>
      </Rect>

      <Rect
        ref={contentRef}
        opacity={0}
        layout
        direction={"column"}
        alignItems={"center"}
        gap={20}
      >
        {credits.map((item, index) => (
          <Rect
            key={`credit-${index}`}
            layout
            direction={"row"}
            gap={20}
            alignItems={"center"}
            width={500}
          >
            {/* 固定宽度的 label 容器，确保所有标签右对齐 */}
            <Rect width={140} justifyContent={"end"} alignItems={"center"}>
              <Txt {...TextStyles.body} fontWeight={800}>
                {item.label}
              </Txt>
            </Rect>

            {/* value 容器，包含图标和文字 */}
            <Rect layout direction="row" gap={16} alignItems="center">
              <Img src={item.icon} size={40} fill={"#fff"} radius={6} />
              <Txt {...TextStyles.body} fontFamily={"JetBrains Mono"}>
                {item.value}
              </Txt>
            </Rect>
          </Rect>
        ))}
      </Rect>

      <Rect
        ref={footerRef}
        height={144}
        layout
        alignItems={"start"}
        justifyContent={"center"}
      />
    </Rect>
  );

  txtRefs.forEach((ref, i) => {
    footerRef().add(
      <Txt
        ref={ref}
        {...TextStyles.title}
        fill={colors[i] || "#fff"}
        opacity={0}
      >
        {letters[i]}
      </Txt>
    );
  });

  yield* all(
    sequence(
      0.1,
      appear(avatarRef(), 0.8),
      appear(heartHandsRectRef(), 0.8),
      yield heartHandsRef().play(),
      appear(glowingStarRectRef(), 0.8),
      yield glowingStarRef().play(),
      appear(hugFaceRectRef(), 0.8),
      yield hugFaceRef().play()
    ),
    appear(contentRef()),
    sequence(0.1, ...txtRefs.map((ref) => appear(ref(), 0.8)))
  );

  yield* waitUntil("end");
});
