---
title: babel
date: "2021-05-18T23:46:37.121Z"
description: "学习笔记：梳理混乱的Babel, 不再被编译报错困扰"
category: "杂记"
---

#### Babel是什么
  Babel就是一个JS的“编译器”。主要因为前端语言特性和宿主(浏览器/node.js)环境高速发展，但宿主环境对新语言的特性支持无法做到时，而开发者又需要兼容各种宿主环境，因此需要语言特性的降级。

  babel主要完成以下内容：
   1. 语法转换，一般是高级语言特性的降级
   2. polyfill特性的实现和接入
   3. 源码转换，比如JSX等
   
#### 梳理Babel

1. @babel/core 是babel实现转换的核心，可以根据配置，进行源码的转换
2. @babel/cli 是babel提供的命令行
3. @babel/standalone 非node.js环境自动编译text/babel或text/jsx的type值的script标签， 可以在浏览器中直接执行，浏览器环境动态插入高级语言特性的脚本、在线自动解析编译非常有意义


![babel](https://s0.lgstatic.com/i/image2/M01/04/5A/Cip5yF_tojyAfvQeAAMW8bbGBAY698.png)


