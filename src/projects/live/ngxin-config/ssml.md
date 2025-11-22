# nginx config

## begin

<speak>
前端发版无效?
<break time="200ms" />
经过数周 996 的研发,
你将 feature 分支合并至 beta,
点击构建按钮,
成功部署了测试环境!
测试同学 F5 刷新了 100 遍浏览器,
仍然看不到新的 feature...
</speak>

## scene_1

<speak>
前端工程的构建意味着静态资源文件名称的改变,
JS TS CSS PNG JPG 等等静态资源文件,
在经过 Vite Webpack Rollup 等工具的打包后,
只要文件产生了 diff 那么最终的哈希名都会改变,
既然文件名都改变了, 为什么仍然加载上一个版本的内容?
</speak>