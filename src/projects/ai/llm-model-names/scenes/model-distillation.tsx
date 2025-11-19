import { Icon, Img, makeScene2D, Ray, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  sequence,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { TextStyles } from "@/shared/text-styles";
import { appear } from "@/shared/utils";
import chefFrom from "../assets/chef-from.png";
import chefTo from "../assets/chef-to.png";

export default makeScene2D(function* (view) {
  const titleRef = createRef<Txt>();
  const wrapperRef = createRef<Rect>();
  const txtRef = createRef<Txt>();

  const chefFromRef = createRef<Img>();
  const chefToRef = createRef<Img>();
  const rayRef = createRef<Ray>();

  const chefFromRectRef = createRef<Rect>();
  const chefToRectRef = createRef<Rect>();

  yield view.add(
    <Rect layout size={["100%", "100%"]} fill={"#121b21"} direction={"column"}>
      <Rect
        size={["100%", "25%"]}
        layout
        padding={[40, 20]}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
      >
        <Rect padding={20} fill={"#ffcc00"}>
          <Icon icon={"icon-park:brain"} size={180} />
        </Rect>

        <Txt ref={titleRef} {...TextStyles.title}></Txt>
      </Rect>

      <Rect grow={1}>
        <Rect ref={wrapperRef} size={["100%", "60%"]} layout={false}>
          <Txt
            ref={txtRef}
            opacity={0}
            position={[0, -500]}
            {...TextStyles.subtitle}
            fill={"#ffcc00"}
          >
            把大模型的"智慧"传授给小模型
          </Txt>

          <Rect
            ref={chefFromRectRef}
            position={[-280, -280]}
            layout
            opacity={0}
            direction={"column"}
            width={400}
            alignItems={"center"}
          >
            <Txt {...TextStyles.body}>老厨师（大模型）</Txt>
            <Txt {...TextStyles.body}>会做1000道菜，但做饭慢</Txt>
          </Rect>

          <Rect
            ref={chefToRectRef}
            position={[280, -280]}
            layout
            opacity={0}
            direction={"column"}
            width={400}
            alignItems={"center"}
          >
            <Txt {...TextStyles.body}>聪明的徒弟（蒸馏模型）</Txt>
            <Txt {...TextStyles.body}>学会后能做800道菜，但做饭快</Txt>
          </Rect>
        </Rect>
      </Rect>

      <Rect
        size={["100%", "15%"]}
        layout
        padding={40}
        alignItems={"start"}
        justifyContent={"center"}
      >
        <Txt {...TextStyles.title} fill={"#4285F4"}>
          C
        </Txt>
        <Txt {...TextStyles.title} fill={"#FBBC05"}>
          o
        </Txt>
        <Txt {...TextStyles.title} fill={"#EA4335"}>
          d
        </Txt>
        <Txt {...TextStyles.title} fill={"#34A853"}>
          e
        </Txt>
        <Txt {...TextStyles.title}>S</Txt>
        <Txt {...TextStyles.title}>u</Txt>
        <Txt {...TextStyles.title}>g</Txt>
        <Txt {...TextStyles.title}>a</Txt>
        <Txt {...TextStyles.title}>r</Txt>
      </Rect>
    </Rect>
  );

  yield* titleRef().text("模型蒸馏", 1);

  yield* appear(txtRef());

  yield wrapperRef().add(
    <Img
      ref={chefFromRef}
      src={chefFrom}
      opacity={0}
      width={500}
      position={[0, 100]}
    />
  );

  yield* appear(chefFromRef());

  yield* waitFor(1);

  yield wrapperRef().add(
    <Img
      ref={chefToRef}
      src={chefTo}
      opacity={0}
      width={300}
      position={[280, 30]}
    />
  );

  wrapperRef().add(
    <Ray
      ref={rayRef}
      lineWidth={10}
      endArrow
      stroke={"#ffcc00"}
      fromX={-90}
      toX={90}
      end={0}
    />
  );

  yield* chain(
    all(chefFromRef().position([-280, 30], 1), chefFromRef().width(300, 1)),
    rayRef().end(1, 1),
    appear(chefToRef()),
    sequence(0.15, appear(chefFromRectRef()), appear(chefToRectRef()))
  );

  yield* waitUntil("model_distillation");
});
