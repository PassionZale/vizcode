# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Motion Canvas animation project called "vizcode" (Visualize My Ideas With Code). It uses the Motion Canvas framework to create programmatic animations and visual presentations.

## Development Commands

- `npm run dev` or `npm run serve` - Start the development server
- `npm run build` - Build the project (runs TypeScript compilation and Vite build)

## Project Architecture

### Project Structure
The repository is organized as a multi-project Motion Canvas setup with three main animation projects:

1. **example** (`src/projects/example/`) - Basic example scenes and animations
2. **self-intro** (`src/projects/self-intro/`) - Personal introduction animations
3. **code-journey** (`src/projects/code-journey/`) - Code-related journey animations

### Scene Organization
Each project follows this pattern:
- `index.ts` - Main project entry point that imports and configures scenes using `makeProject()`
- `scenes/` directory containing individual animation scenes
- Scene files are imported with the `?scene` suffix (e.g., `import example from "./scenes/example?scene"`)
- Each scene typically has a corresponding `.meta` file for metadata

### Shared Scenes
- `src/scenes/` contains shared scenes used across projects (like `logo-intro.tsx`, `chart-animation.tsx`)

### Configuration
- **Vite Config** (`vite.config.ts`): Configures Motion Canvas plugin with all three projects and sets up path aliases
- **TypeScript Config**: Extends Motion Canvas 2D configuration with custom path aliases
- **Path Aliases**:
  - `@/` → `./src/`
  - `@@/` → `./`

### Motion Canvas Usage
- Uses `@motion-canvas/2d` for 2D animations and components
- Uses `@motion-canvas/core` for core animation functionality
- Scenes are created using `makeScene2D()` function with generator functions
- Components include Circle, Txt, Img, and other Motion Canvas primitives
- Animations use generator functions with `yield*` for sequencing

### Dependencies
- Core: Motion Canvas 2D, Core, and FFmpeg for video export
- UI: CodeMirror themes for code display
- Development: Vite, TypeScript, Motion Canvas UI and Vite plugin

## Development Guidelines

### Language Preference
- 优先使用中文回复用户问题和交流
- 代码注释和文档可以使用中文

### Code Compatibility
- 除非有明确要求，否则不要编写兼容性代码
- 优先考虑现代浏览器和最新标准
- 避免不必要的 polyfill 和向后兼容处理