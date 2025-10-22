import { makeProject } from "@motion-canvas/core";
import aRol from "./scenes/a-rol?scene";
import scene_2014 from "./scenes/2014?scene";
import scene_2015 from "./scenes/2015?scene";
import scene_2016_2018 from "./scenes/2016_2018?scene";

export default makeProject({
  scenes: [scene_2016_2018, aRol, scene_2014, scene_2015],
});
