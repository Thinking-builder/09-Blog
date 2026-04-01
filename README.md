# 夜航博客

一个基于 Astro、Markdown/MDX、GitHub Pages 和 Giscus 的沉浸式个人博客模板。它不是文档站，也不是传统信息流首页，而是一个以阅读体验优先的深色入口页。

## 技术栈

- Astro 6
- Markdown / MDX
- Astro Content Collections
- GitHub Pages + GitHub Actions
- Giscus 评论

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run dev
npm run build
npm run preview
npm run check
```

## 项目结构

```txt
src/
  components/
  content/
    blog/
    essays/
  layouts/
  lib/
  pages/
  styles/
public/
  images/
.github/workflows/
```

## 内容写作方式

博客内容通过 Astro Content Collections 管理，目前保留两类正文集合，并额外提供一个关键词分类导引页：

- `src/content/blog`: 常规博客文章
- `src/content/essays`: 长文与专题
- `src/pages/categories.astro`: 按 Blog / Essays 分组的关键词网络与弹窗列表入口

每篇文章都使用统一 frontmatter：

```yaml
---
title: 标题
description: 简介
pubDate: 2026-03-31
updatedDate: 2026-03-31
tags:
  - Engineering
draft: false
cover: /images/cover-grid.svg
heroVariant: cover
featured: false
---
```

### 新增文章

1. 在对应集合目录中新建 `.md` 或 `.mdx` 文件。
2. 补齐 frontmatter。
3. 如果需要封面图，把图片放到 `public/images/` 或 `src/assets/`。
4. 运行 `npm run dev` 或 `npm run build` 验证。

## 如何使用 MDX

项目已经接入 `@astrojs/mdx`。你可以在 `.mdx` 中直接使用内置组件：

- `Callout`
- `QuoteBlock`
- `ImageFrame`
- `Timeline`

示例见：

- `src/content/blog/release-notes-at-midnight.mdx`

## 图片放置方式

当前示例统一把封面图放在 `public/images/`，引用方式如下：

```yaml
cover: /images/cover-grid.svg
```

如果你更偏好构建期导入，也可以在文章或组件中使用 `src/assets/` 下的文件。

首页和 About 页的大月球纹理是单独的本地静态资源，放在：

```txt
public/textures/nasa-lroc-moon-2k.jpg
```

当前使用的是 NASA SVS 的月球纹理资源，本地落库后由月球组件直接读取，不依赖运行时外链。

## Giscus 配置

复制环境变量模板：

```bash
cp .env.example .env
```

然后填写这些变量：

- `PUBLIC_GISCUS_REPO`
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`
- `PUBLIC_GISCUS_MAPPING`
- `PUBLIC_GISCUS_STRICT`
- `PUBLIC_GISCUS_REACTIONS_ENABLED`
- `PUBLIC_GISCUS_EMIT_METADATA`
- `PUBLIC_GISCUS_INPUT_POSITION`
- `PUBLIC_GISCUS_THEME`
- `PUBLIC_GISCUS_LANG`

如果未配置，评论区会优雅降级成说明文案，不会报错。

## GitHub Pages 部署

项目通过 `SITE_URL` 和 `BASE_PATH` 兼容 GitHub Pages 子路径部署：

- 用户页仓库：`SITE_URL=https://<user>.github.io`，`BASE_PATH=/`
- 项目页仓库：`SITE_URL=https://<user>.github.io`，`BASE_PATH=/repo-name`

仓库已包含 `.github/workflows/deploy.yml`。默认行为：

1. 推送到 `main` 分支
2. 自动解析当前仓库名
3. 自动构建并部署到 GitHub Pages

首次启用时需要在 GitHub 仓库设置里：

1. 打开 `Settings > Pages`
2. 将 `Source` 设为 `GitHub Actions`
3. 确认仓库默认分支是 `main`

如果你的默认分支不是 `main`，请同步修改工作流中的触发分支。

## 字体与主题

当前主题改为更克制的“NASA 月球主视觉 + 深夜阅读”方向：

- 全站基础背景是低干扰的深夜蓝灰渐变
- 首页首屏和 About 页页头使用高真实度月球主视觉
- 月球纹理来自本地静态资源，不依赖运行时外链
- 月球只做极轻微漂移和光晕变化，不做夸张旋转
- 文章详情页、列表页和分类页刻意不复用大月球，避免阅读疲劳
- 首页 Hero 的入口改成更轻的文字化题签，而不是高存在感按钮

核心颜色 token 位于 `src/styles/global.css`：

- 背景起点：`#06101D`
- 背景中段：`#0D1A31`
- 背景终点：`#121D33`
- 主文字：`#F3F0EB`
- 次文字：`#B7C1D2`
- 主强调：`#8EA9D8`
- 暖色强调：`#D8BF8B`
- 冷色点缀：`#8FD2FF`

字体变量同样集中在 `src/styles/global.css`：

- `--font-sans-zh`
- `--font-sans-en-display`
- `--font-sans-en-body`
- `--font-mono`

字体分工如下：

- 中文正文 / 中文 UI：以 `Source Han Sans SC` 风格栈为目标，当前用自托管的 `Noto Sans SC Variable` 落地
- 英文标题 / 导航 / 栏目名：`Geist`
- 英文正文说明：`Inter`
- 代码：`Geist Mono`

布局层通过 `backgroundVariant` 控制背景模式：

- `default`：普通页面，只保留深夜底色和弱光晕
- `moon-hero`：首页和 About，允许在页面内容区挂接大月球主视觉

这样做的原因是：首页和 About 需要更强的记忆点，但文章页首先要服务阅读，不应该持续承受大图形主体的视觉压力。

## 可扩展点

当前已预留但未实现：

- Pagefind 搜索接入点：`src/lib/search/pagefind.ts`
- 浅色主题扩展
- RSS
- sitemap
- 相关文章推荐
