---
title: 前端基础建设与架构
date: "2021-06-10T23:46:37.121Z"
description: "学习笔记: npm"
category: "杂记"
---

##### npm内部机制和核心原理
  优先安装依赖到当前的项目目录，使得不同项目依赖自成体系。

  npm安装流程：

  1.执行npm install后，首先检查npm配置。npm配置文件优先级：项目级.npmrc > 用户级.npmrc > 全局级.npmrc > npm内置的.npmrc

  2.检查完配置后，检查package-lock.json文件是否和package.json文件声明的依赖一致：

   a.一致，直接使用package-lock.json文件，从缓存或者网络中加载依赖

   b.不一致，按照npm版本处理，不同版本处理方式不同。

  3.如果没有package-lock.json文件，则根据packge,json构建递归依赖树，按照依赖树下载资源，在下载过程中就会检查是否有相关资源缓存。

   a.存在缓存资源，将缓存资源解压到node_modules中

   b.不存在，从npm下载包，检验包的完整，添加到缓存中，并解压到node_modules.

  最后生成packge-lock.json文件

  本地开发node_modules下的npm包，npm link

  npx vs npm，npx 可以快速执行node_modules包下的命令

  npx eslint --init vs ./node_modules/.bin/eslint --init


##### yarn vs npm
  yarn是更新的包管理工具，用于弥补一些npm的不足, 出现时机在npm v3时

  npm缺陷：

  1. npm i慢
  2. 同一个项目，安装的版本无法保证一致性
  ```js
  "5.0.3", // 指定5.0.3版本
  "~5.0.3", // 安装5.0.x中的最新版本
  "^5.0.3" // 安装5.x.x中的最新版本
  ```
  3. 包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。

  yarn优点：

  1. 不同于npm串行安装，yarn并行安装
  2. 安装版本统一
  3. 更简洁的输出
  4. 更语义化 npm install react --save vs	yarn add react

  npm dedupe 简化依赖树

##### 为什么要lockfiles

  lockfiles出现的原因：完整准确地还原项目依赖

