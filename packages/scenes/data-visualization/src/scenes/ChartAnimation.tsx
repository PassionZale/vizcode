import { makeScene2D, Rect } from "@motion-canvas/2d";
import { all, sequence, easeOutCubic } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const data = [20, 45, 80, 60, 90];
  const bars: Rect[] = [];

  // 创建柱状图
  for (let i = 0; i < data.length; i++) {
    const bar = new Rect({
      width: 80,
      height: 0, // 从0开始动画
      fill: `hsl(${200 + i * 30}, 70%, 50%)`,
      x: (i - 2) * 120,
      y: 200,
    });
    bars.push(bar);
    view.add(bar);
  }

  yield* sequence(
    0.1,
    ...bars.map((bar, i) =>
      all(
        bar.height(data[i] * 3, 1, easeOutCubic),
        bar.y(200 - (data[i] * 3) / 2, 1, easeOutCubic)
      )
    )
  );
});
