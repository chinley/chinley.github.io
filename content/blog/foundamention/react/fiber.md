---
title: React之about fiber
date: "2022-02-22T23:46:37.121Z"
category: "react"
---

#### 为什么引入Fiber这个架构
JavaScript是单线程的并且它和ui渲染线程是互斥的。在React实现fiber架构之前，virtual dom(react.createElement，记录节点属性和children)形成的virtual dom tree，dom diff的过程就是对virtual dom tree进行递归的深度优先遍历，边比较边更新，因为是基于递归的，如果中断递归栈会被清空，因此整个流程不可中断。在调度过程中，JavaScript会长时间占据主线程，使得ui线程一直挂起，页面内容得不到刷新，造成一种卡顿的感觉

所以React通过 fiber架构 和 时间分片 来进行任务调度解决这个问题，目标就是将渲染任务分解成多个渲染任务，放到浏览器的每一帧里去执行，达到可中断、可恢复的效果。

具体的改动就是每个virtual dom都有一个对应的fibernode,fibernode会记录父节点、兄弟节点、子节点的索引，从而形成一个fiber tree。整个调度过程就会以fiber tree上进行深度优先遍历，并且是以迭代(while)的方式取代递归的方式，从而实现可中断、可恢复的效果。整个过程分为render阶段和commit阶段，render阶段进行建立fiber tree和dom diff，此时可中断，以便有更高优先级的任务插入。commit阶段渲染更新，整个流程不可中断。以fiber node为最小颗粒度，将整棵树的深度优先遍历和diff过程拆到浏览器的每一帧的空闲时间里进行，从而避免因为调度长时间占据主线程而导致的ui不更新造成卡顿的问题。

#### React如何将任务拆解到每一帧里
##### 一、React如何对齐浏览器的每一帧：
1. setTimeout
2. requestAnimationFrame
3. requestIdleCallback
4. MessageChannel

目前React是使用MessageChannel来实现时间分片（与浏览器的每一帧对齐），伪代码：
```js
const messagechannel = new MessageChannel();
const port = messagechannel.port2;
// 每次port.postMessage()调用就会执行一个宏任务
// 该宏任务为调用scheduler.scheduleTask方法
channel.port.onmessage = scheduler.scheduleTask;

const scheduler = {
  scheduleTask() {
    const task = pickTask();
    const continuousTask = task();

    // 如果该任务未执行完，则在下个宏任务继续执行
    if(continuousTask) {
      port.postMessage(null);
    }
  }
}
```

这样的思想就是将任务的继续执行逻辑放在宏任务里，就可以将主线程暂还给浏览器。在页面内容更新后，宏任务就会被执行，任务就会恢复执行。

###### 1.为什么是宏任务不是微任务
  因为微任务在页面更新之前就会被执行，达不到转让主线程的目的。

###### 2.产生宏任务的方式有很多种，为什么是用MessageChannel呢？
  setTimeout、setInterval: 递归执行的最小时间间隔是4ms,这里会造成时间浪费。

  requestAnimationFrame: requestAnimationFrame的执行在每一帧刷新前，看起来可以让回调在每一帧前执行。但是有一个问题，如果最开始不是由requestAnimation发起的话，第一帧回调会执行两次。

  requestIdeCallback: 兼容性太差

##### 二. 如何将当前task拆分到每一帧中
  在fibertree进行深度优先遍历过程中，每次遍历下一节点都会判断当前帧的时间是否用完。React会根据当前浏览器的帧率来计算每一帧的时间，从而计算出每一帧的结束时间。深度优先遍历下一节点前就会检查当前时间是否已经超过结束时间，是的话就中断执行，等待下一帧的到来。

##### 三. 如何调度任务
  React内部维护两个最小堆，timerQueue和taskQueue。timerQueue里存放的等待执行的任务，taskQueue存放的是立即执行的任务。当有新任务创建之后会根据是否需要立即执行来判断是存放进timerQueue还是taskQueue。当taskQueue为空时，就会取timerQueue的堆顶任务放入taskQueue中，然后React会陆续取taskQueue的堆顶任务执行。

##### 四. 如何插队和恢复执行
  在React执行当前更新任务，深度优先遍历fiber node的时候，每当遍历一个节点前会检查 当前帧时间是否用完 以及 是否有更高优先级的任务被创建，如果有就会停下当前任务，去执行更高级的任务。同时会将当前低优先级的任务重新创建一个任务对象放入到taskQueue中，等待下次重新执行(也就是恢复这个任务)

  衍生问题：
  就是一个任务被插队然后重新执行的时候会从头开始执行，也就是会重新进入深度优先遍历，这就造成生命周期有被重复执行的可能。

  UNSAFE_componentWillReceiveRrops(nextProps)
  UNSAFE_componentWillMount()
  UNSAFE_componentWillUpdate()

##### React框架运作可以分为三层：
  1. virtual dom: 描述页面长什么样
  2. reconciler层：负责调用组件生命周期方法，diff运算等
  3. render层：根据不同平台，渲染出响应页面，reactDOM or reactNative
   
  以前的reconciler层不能打断，必须一条路走到黑，react 16每执行一段时间，就会将控制权交还给浏览器，可以分段执行。

  fiber reconciler在执行过程中，分为两个阶段：
  1. render/reconcilation: 判断哪些组件需要更新，可中断
  2. commit: 插入、移动、删除阶段，不可中断

  reconcilation phase会先通过render更新组件，在第一次建立fiber阶段，并在之后更新与上一次渲染的dom比较。因此在render阶段判断一下生命周期是否有更新：
  componentWillMount
  componentWillReceiveProps
  componentWillUpdate
  getDerivedStateFromProps
  shouldComponentUpdate

  commit阶段执行的生命周期方法：
  getSnapshotBeforeUpdate
  componentDidMount
  componentDidUpdate
  componentWillUnmount


