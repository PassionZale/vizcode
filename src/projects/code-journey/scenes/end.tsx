import { makeScene2D, Rect, Txt, Img } from "@motion-canvas/2d";
import { waitUntil } from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";

export default makeScene2D(function* (view) {
  // 参与人员模拟数据
  const teamMembers = [
    "张三 - 项目负责人",
    "李四 - 前端开发",
    "王五 - 动画设计",
    "赵六 - 音效制作",
    "孙七 - 内容策划"
  ];

  view.add(
    <Rect
      direction="column"
      layout
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      {/* 头像区域 - 顶部中央 */}
      <Rect
        width={400}
        height={400}
        fill="white"
        stroke="#4A90E2"
        lineWidth={6}
        radius={24}
        marginBottom={60}
        alignItems="center"
        justifyContent="center"
        layout
      >
        <Img
          src="/logo.png"
          width={360}
          height={360}
        />
      </Rect>

      {/* "记得点赞哦"提示 - 头像下方 */}
      <Rect
        width={640}
        height={140}
        fill="#FFE600"
        radius={50}
        marginBottom={80}
        alignItems="center"
        justifyContent="center"
        layout
      >
        <Txt
          text="-记得点赞哦-"
          fontSize={72}
          fontWeight={700}
          fill="black"
          fontFamily="Arial, sans-serif"
        />
      </Rect>

      {/* 参与人员列表 - 底部中央 */}
      <Rect
        direction="column"
        layout
        alignItems="center"
        gap={24}
      >
        <Txt
          text="制作团队"
          {...TextStyles.subtitle}
          fontSize={96}
          fontWeight={700}
        />
        {teamMembers.map((member, index) => (
          <Txt
            key={`${index}`}
            text={member}
            {...TextStyles.body}
            fontSize={72}
            fill="#ffffff"
          />
        ))}
      </Rect>
    </Rect>
  );

  yield* waitUntil("end");
});
