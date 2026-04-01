---
title: 合并之后，先别急着庆祝
description: 代码合入主分支并不意味着工作结束，很多真正的维护成本从这时才开始显影。
pubDate: 2026-03-19
tags:
  - Notes
  - Engineering
draft: false
cover: /images/cover-grid.svg
heroVariant: plain
featured: false
---

每次看到 “merged” 的绿色标记，我都会提醒自己：这只是一个阶段性的完成，不是全部完成。

上线之后，文档是否补齐、环境变量是否说明清楚、失败路径是否被验证、回滚是否简单，这些事情通常不会出现在最显眼的位置，却决定了这次变更是否真的被系统吸收。

如果一个改动只能在 PR 里看懂，那它还没有真正完成。
