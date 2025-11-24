# nginx config

## begin

**前端发版无效?**

<speak>
<break time="200ms" />
经过数周 996 的研发,
你将 feature 分支合并至 beta,
点击构建按钮,
成功部署了测试环境!
测试同学 F5 刷新了 100 遍浏览器,
仍然看不到新的 feature...
</speak>

## scene_1

**前端构建**

<speak>
前端工程的构建意味着静态资源文件名称的改变,
JS TS CSS PNG JPG 等等静态资源文件,
在经过 Vite Webpack Rollup 等工具的打包后,
只要文件产生了 diff 那么最终的哈希名都会改变,
既然文件名都改变了, 为什么仍然加载上一个版本的内容?
</speak>

## scene_2

**根本原因**

<speak>
这是上个版本的构建产物,
这是当前版本的构建产物,
由于 index.html 文件名没有发生变化，发版成功后，
浏览器访问时, 仍然会使用缓存，即上个版本缓存的 index.html，此时仍然会加载 bundle.old.js，
测试同学不论怎么刷新, 他都无法看到最新的 feature.
</speak>

## scene_3

**解决方法**

<speak>
解决这个问题，我们需要使用 Meta 标签设置缓存:
<break time="300ms" />
告诉浏览器不要缓存页面内容;
<break time="300ms" />
向后兼容 HTTP1.0;
<break time="300ms" />
设置页面立即过期;
<break time="300ms" />
仅设置 Meta 标签仍然是不够的,
还需要增加 NG 的配置:
<break time="300ms" />
禁止浏览器缓存;
<break time="300ms" />
强制验证缓存有效性;
<break time="300ms" />
必须重新验证过期资源;
<break time="300ms" />
完成这些配置后, html 永不缓存, 每次新版本发布, 一旦刷新页面, 新的功能都会立即生效.
</speak>
