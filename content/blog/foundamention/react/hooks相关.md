---
title: react hooks
date: "2022-03-31T23:46:37.121Z"
description: "笔记-- 「一文吃透react-hooks原理」"
updatedAt: "2022-04-17T23:46:37.121Z"
category: "react"
---

#### react hooks

###### 相关阅读
「react进阶」一文吃透react-hooks原理

https://juejin.cn/post/6944863057000529933

##### 为什么需要react hooks
  1. 在react hooks之前，类组件难以共享组件中与状态相关的逻辑，高阶组件学习成本高、组合方式为嵌套，可能props相互覆盖，嵌套地狱
  2. this绑定混乱
  3. 逻辑复杂的类组件会变的难以开发和维护
   - 类组件到处都是对状态的访问和处理，导致组件难以拆分
   - 在生命周期中混杂不想干的逻辑
   
##### hook如何解决上述问题
1. 通过一个hook函数封装跟状态有关的逻辑,将逻辑从组件中抽离出来
2. 函数组件没有this相关问题
3. 不同数据处理逻辑/不同副作用可以单独用一个useEffect实现
   
##### 相关QA
  1. 在无状态组件每一次函数上下执行的时候，react用什么方式记录了hooks的状态
   1.1 循环链表

  2. 多个react-hooks用什么来记录每一个hooks的顺序？为什么不能在条件语句中声明hooks？hooks声明为什么在组件的最顶部

  3. function函数组件中的useState，和class类组件的setState有什么区别
   3.1 函数组件的useState, setState时直接替换原数据， 类组件会合并对象数据
   3.2

  4. react是怎么捕获hooks的执行上下文，是在函数组件内部？
  5. 为什么useRef不需要依赖注入，就能访问到最新改变值
  6. useMemo是怎么对值做缓存，如果应用它优化性能
  7. 为什么两次传入useState的值相同，函数组件不更新

  current fiber树： 当完成一次渲染之后，会产生一个current树，current会在commit阶段替换成真实的dom树。
  当前屏幕上显示内容对应的fiber树称为current fiber树。

  workInProgress fiber树：即将调和渲染的fiber树。再一次新的组件更新过程中，会从current复制一份作为workInprogress，更新完毕之后，将当前的workInProgress树赋值给current树。正在内存中构建的fiber树称为workInprogress树，反映了要刷新到屏幕的未来状态。 

  workInProgress.memoizedState: 在class组件中，memoizedState存放state信息，在function组件中，memoizedState在一次调和渲染过程中，以链表的形式存放hooks信息

  currentHook: current树上的指向当前调度的hooks节点
  workInProgressHook: 可以理解workInProgress树上指向的当前调度的hooks节点

  #### renderWithHooks函数：
  1. 首先先制空workInProgress树的memoizedState和updateQueue。
  2. 通过current树上是否有memoizedState信息来判断是否第一次渲染，第一次渲染组件，用的是HooksDispatcherOnMount hooks对象。渲染后，需要更新的函数组件，用的是HooksDispatcherOnUpdate hooks对象。
  3. 调用Component(props, secondArg)执行函数组件，hooks被依次执行，把hooks信息依次保存到workInProgress树上。
  4. 重新置空一些变量
   
  ![hw-os-app](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adcbd09984f84d0d97a15df124e83c09~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

  #### hooks初始化，做了什么
  
  ##### 1.mountWorkInProgressHook
  在组件初始化时，每一次hooks执行，都会调用mountWorkInProgressHook
```js 
  function mountWorkInProgressHook() {
    const hook: Hook = {
      memoizedState: null,  // useState中 保存 state信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和deps ｜ useRef中保存的是ref 对象
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    if (workInProgressHook === null) { // 例子中的第一个`hooks`-> useState(0) 走的就是这样。
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    } else {
      workInProgressHook = workInProgressHook.next = hook;
    }
    return workInProgressHook;
}
```
  mountWorkInProgressHook函数每次执行一个hooks函数，都产生一个hook对象，里面保存当前hook信息，然后将每个hooks以链表的形式串联起来，并赋值给workInProgress的memoizedState。

  memoizedState: useState保存state信息｜useEffect保存effect对象｜useMemo保存缓存的值和deps|useRef保存的是ref对象

  baseQueue: useState和useReducer中保存最新的更新队列

  baseState: useState和useReducer中，一次更新里产生的最新state值

  queue: 保存待更新队列pendingQueue，更新函数dispatch等信息

  next: 指向下一个hooks

    
  ![hw-os-app](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5660f1be680140239a8cf4e34cfccc90~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.png)

  hooks通过什么来证明唯一性： 通过hooks链表顺序，因此不能在条件语句中声明hooks,**一旦在条件语句中声明hooks，下一次组件更新，hooks链表结构被破坏，current树的memoziedState缓存Hooks信息，和当前workInProgress不一致。如果涉及到读取state等操作，就会发生异常**

  ##### 2. 初始化useState -> mountState mountState做了什么

  ```js
  function mountState(
    initialState
  ){
    const hook = mountWorkInProgressHook();
    if (typeof initialState === 'function') {
      // 如果 useState 第一个参数为函数，执行函数得到state
      initialState = initialState();
    }
    hook.memoizedState = hook.baseState = initialState;
    const queue = (hook.queue = {
      pending: null,  // 带更新的
      dispatch: null, // 负责更新函数
      lastRenderedReducer: basicStateReducer, //用于得到最新的 state ,
      lastRenderedState: initialState, // 最后一次得到的 state
    });

    const dispatch = (queue.dispatch = (dispatchAction.bind( // 负责更新的函数
      null,
      currentlyRenderingFiber,
      queue,
    )))
    return [hook.memoizedState, dispatch];
  }
  ```
  mountState执行：首先得到初始化state，将它赋值给mountWorkInProgressHook产生的hook对象的memoizedState和baseState属性。创建queue对象，保存负责更新的信息。

  ###### dispatchAction是什么
  ```js
  function dispatchAction<S,A> (
    fiber: Fiber,
    queue: UpdateQueue<S,A>,
    action: A
  )
  ```
  ```js
  const [number, setNumber] = useState(0);
  ```
  dispatchAction就是**setNumber**，dispatchAction第一个参数和第二个参数，已经被bind给改成currentRenderingFiber和queue,传入的参数是第三个参数action.

  ##### dispatchAction 无状态组件更新机制
  dispatchAction首先产生一个update对象，里面记录此次更新的信息，将此update放入待更新的pending队列中。dispatchAction第二步就是判断当前函数组件的fiber对象是否处于渲染阶段，如果处于渲染阶段，就不需要更新当前函数组件，只需要更新update的expirationTime。

  如果当前fiber没有处于更新阶段，那么通过调用lastRenderedReducer获取最新的state，和上一次currentState进行浅比较，如果相等就退出。

  如果两次state不相等，调用scheduleUpdateOnFiber调度渲染当前fiber。scheduleUpdateOnFiber是react渲染更新的主要函数。

  ##### 3. 初始化useEffect -> mountEffect
  ```js
  function mountEffect(
    create,
    deps,
  ) {
    const hook = mountWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    hook.memoizedState = pushEffect(
      HookHasEffect | hookEffectTag, 
      create, // useEffect 第一次参数，就是副作用函数
      undefined,
      nextDeps, // useEffect 第二次参数，deps
    );
  }
  ```
  每个hooks初始化都会创建一个hook对象，然后将hook的memoizedState保存当前effect hook信息。

  两种memoizedState

  - workInProgress / current 树上的memoizedState保存的是当前函数组件每个hooks形成的链表
  - 每个hooks上的memoizedState保存当前hooks信息，不同种类的hooks的memoizedState内容不同。

  ##### pushEffect创建effect对象，挂载updateQueue
  ```js
  function pushEffect(tag, create, destroy, deps) {
    const effect = {
      tag,
      create,
      destroy,
      deps,
      next: null,
    };
    let componentUpdateQueue = currentlyRenderingFiber.updateQueue
    if (componentUpdateQueue === null) { // 如果是第一个 useEffect
      componentUpdateQueue = {  lastEffect: null  }
      currentlyRenderingFiber.updateQueue = componentUpdateQueue
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {  // 存在多个effect
      const lastEffect = componentUpdateQueue.lastEffect;
      if (lastEffect === null) {
        componentUpdateQueue.lastEffect = effect.next = effect;
      } else {
        // 建立循环链表
        const firstEffect = lastEffect.next;
        lastEffect.next = effect;
        effect.next = firstEffect;
        componentUpdateQueue.lastEffect = effect;
      }
    }
    return effect;
  }
  ```
  首先创建一个effect，判断组件如果第一次渲染，那么创建componentUpdateQueue, 就是workInProgress的updateQueue,将effect放入updateQueue中。

  假设在函数组件中这么写：
  ```js
  useEffect(()=>{
    console.log(1)
  },[ props.a ])
  useEffect(()=>{
      console.log(2)
  },[])
  useEffect(()=>{
      console.log(3)
  },[])
  ```
  workInProgress.update保存形式：
  ![hw-os-app](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14ac9e04c10e45e5b93fc76d47a5fdd5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.png)

  ##### 4. 初始化useMemo -> mountMemo
  ```js
  function mountMemo(nextCreate,deps){
    const hook = mountWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    const nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
  }
  ```
  初始化useMemo,就是创建一个hook，然后执行useMemo的第一个参数，得到需要缓存的值，然后将值和deps记录下来，赋值当前hook的memoizedState。

  ##### 5. 初始化useRef -> mountRef
  ```js
  function mountRef(initialValue) {
    const hook = mountWorkInProgressHook();
    const ref = {current: initialValue};
    hook.memoizedState = ref;
    return ref;
  }
  ```
  mountRef初始化先创建一个对象，对象的current属性来保存初始化的值，最后用memoizedState保存ref

  ##### 6. summary
  在一个函数组件第一次渲染执行上下文过程中，每个react-hooks执行，都产生一个hook对象，并形成链表结构，绑定在<font color="color">workInProgress的memoziedState属性上</font>，react-hooks上的状态，绑定在<font color="color">当前hooks对象的memozedState属性上</font>。对于effect副作用钩子，会绑定在workInProgress.updateQueue上，等到commit阶段，dom构建完成，再执行每个effect副作用的钩子。

  #### hooks更新阶段

  对于更新阶段，说明上一次workInProgress树已经赋值给了current树。存放信息的memoizedState, 此时已经存在current树上。

  对于一次函数组件更新，当再次执行hooks函数时，从current的Hooks中找到与当前workInProgressHook,对应的currentHooks,然后复制一份currentHooks给workInProgressHook, hooks函数执行时，把最新的状态更新到workInProgressHook。

  updateWorkInProgressHook这个函数去做上面的操作






   

