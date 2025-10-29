import { makeProject } from "@motion-canvas/core";
import begin from "./scenes/begin?scene";
import scene_2014 from "./scenes/2014?scene";
import scene_2015 from "./scenes/2015?scene";
import scene_2016_2023 from "./scenes/2016_2023?scene";
import repo_list from "./scenes/repo_list?scene";
import repo_blog from "./scenes/repo_blog?scene";
import repo_tsch from "./scenes/repo_tsch?scene";
import repo_geist_design from "./scenes/repo_geist_design?scene";
import repo_create_app from "./scenes/repo_create_app?scene";
import repo_release_viewer from "./scenes/repo_release_viewer?scene";
import end from "./scenes/end?scene";

export default makeProject({
  scenes: [
    begin,
    scene_2014,
    scene_2015,
    scene_2016_2023,
    repo_list,
    repo_blog,
    repo_tsch,
    repo_geist_design,
    repo_create_app,
    repo_release_viewer,
    end,
  ],
});
