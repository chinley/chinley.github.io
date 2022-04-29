---
title: React之setState
date: "2022-02-22T23:46:37.121Z"
category: "react"
---

#### setState是同步还是异步
  react是会合并setstate的操作，避免多次渲染更新页面，造成一种异步的假象。React内部有一个全局唯一的标识(isBatchingUpdates)来表示是否进行合并更新。当生命周期函数或合成事件开始执行前，标识会设为true，代码执行完毕之后恢复为false

  在react管控的事件里，表现为异步。不受react管控的事件，就会直接更新。故

  生命周期函数和合成事件中，表现为异步。
  原生事件和异步代码，表现为异步
