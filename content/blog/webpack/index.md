---
title: webpack学习
date: "2021-05-18T23:46:37.121Z"
description: "学习笔记: about webapck"
---

# webpack 模块打包工具
## 为什么需要webpack

  1.解决浏览器兼容问题
  2.将散落的模块打包到一起，解决频繁请求的问题
  3.支持将不同的资源，例如图片、字体等作为模块调用，便于维护与处理业务

## 模块打包

  1.定义打包入口 entry, entry内部默认是只能处理javascript代码
  2.配置打包出口 output
  3.三种配置模式： 
    1.development: 自动优化加载速度，添加辅助工作的插件
    2.production: 自动优化打包结果，打包速度偏慢
    3.node: 不作任何操作

## loader机制：实现特殊资源加载

  css-loader只把css模块加载到js中，并不会使用这个模块
  style-loade把css-loader转换后的结果通过追加style的方式加载到页面上
  一旦配置多个 Loader，执行顺序是从后往前执行的

## 插件机制：增强webpack自动化构建的能力

### 常用插件

  clean-webpack-plugin: 实现自动在打包之前清除 dist 目录（上次的打包结果）


