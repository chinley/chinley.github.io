---
title: babel
date: "2021-05-18T23:46:37.121Z"
description: "学习笔记：代码拆分和按需加载：缩减bundle size"
category: "杂记"
---

##### 按需打包
目前按需打包一般通过两种方式进行：
- 使用ES Module支持的tree shaking方案，在使用构建工具打包时，完成按需打包；
- 使用以Babel-plugin-import为主的babel插件，实现自动按需打包


#####  Tree shaking 实现按需打包
webpack可以在package.json中设置sideEffects:false

#####  按需加载
如何在webpack环境下支持代码拆分和按需加载
- 通过入口配置手动分割代码(entry)
- 动态导入支持；
- 通过splitchunk插件提取公共代码(公共代码分割)

#####  webpack对动态引入能力支持