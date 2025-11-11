import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * 动态发现 src/projects 目录下的所有项目
 * 项目结构: /projects/[tag]/[projectName]/index.ts
 */
export function discoverProjects(): string[] {
  const projectsDir = path.resolve(__dirname, "../src/projects");
  const projects: string[] = [];

  if (!existsSync(projectsDir)) {
    console.warn(`Projects directory not found: ${projectsDir}`);
    return projects;
  }

  try {
    // 读取第一级目录（tag）
    const tagDirs = readdirSync(projectsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const tag of tagDirs) {
      const tagDir = path.join(projectsDir, tag);

      // 读取第二级目录（projectName）
      const projectDirs = readdirSync(tagDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const projectName of projectDirs) {
        const projectIndexFile = path.join(tagDir, projectName, "index.ts");

        // 检查 index.ts 是否存在
        if (existsSync(projectIndexFile)) {
          // 生成相对于项目根目录的路径
          const relativePath = path.relative(
            path.resolve(__dirname, "../"),
            projectIndexFile
          );

          // 使用正斜杠路径（Motion Canvas 期望的格式）
          const normalizedPath = relativePath.replace(/\\/g, "/");

          projects.push(`./${normalizedPath}`);
          console.log(`发现项目: ${tag}/${projectName} -> ${normalizedPath}`);
        } else {
          console.warn(
            `项目 ${tag}/${projectName} 缺少 index.ts 文件，跳过`
          );
        }
      }
    }

    // 按字母顺序排序项目
    projects.sort();

    console.log(`总共发现 ${projects.length} 个项目:`);
    projects.forEach(project => console.log(`  - ${project}`));

  } catch (error) {
    console.error("扫描项目目录时出错:", error);
  }

  return projects;
}

// 如果直接运行此脚本，则执行发现功能并打印结果
if (require.main === module) {
  console.log("=== Motion Canvas 项目发现脚本 ===");
  const projects = discoverProjects();
  console.log("\n=== 发现的项目路径（用于配置）===");
  projects.forEach(project => console.log(project));
}