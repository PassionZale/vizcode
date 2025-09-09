import { Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export function YearTitle(year: string, subtitle?: string) {
  const ref = createRef<Txt>();
  return (
    <Txt
      ref={ref}
      text={`${year}${subtitle ? " - " + subtitle : ""}`}
      fontSize={64}
      fontWeight={700}
      fill={"#ffffff"}
      opacity={0}
    />
  );
}
