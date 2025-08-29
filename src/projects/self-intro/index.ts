import {makeProject} from '@motion-canvas/core';

import logoIntro from "@/scenes/logo-intro?scene"
import chartAnimation from '@/scenes/chart-animation?scene';
import example from './scenes/example?scene';

export default makeProject({
  scenes: [example, logoIntro, chartAnimation],
});
