import { Rect, Circle, Txt } from '@motion-canvas/2d';

// 时间线（竖屏适配，底部横条）
export function Timeline({ years }: { years: string[] }) {
  return (
    <Rect
      layout
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width={600}
      height={80}
      y={550}   // 竖屏底部区域
    >
      {years.map((year, index) => (
        <Rect layout direction="column" alignItems="center" key={index}>
          <Circle
            width={20}
            height={20}
            fill={'#555'} // 默认灰色
            name={`dot-${year}`}
          />
          <Txt
            text={year}
            fontSize={24}
            fill={'#aaa'}
            marginTop={8}
            name={`label-${year}`}
          />
        </Rect>
      ))}
    </Rect>
  );
}
