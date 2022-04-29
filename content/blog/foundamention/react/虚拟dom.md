---
title: React之虚拟dom
date: "2022-02-22T23:46:37.121Z"
category: "react"
---



#### 什么虚拟dom
  平时编写react时候，使用jsx语法糖，经过babel编译后会被转成一个个的createElement的方法。而createElement方法返回的描述dom节点对象就是虚拟dom。
  虚拟dom是一种模式，是对ui层的一种抽象。这样可以针对不同的运行环境使用一套相同/类似的概念和api进行映射和操作。再通过react dom等类库来进行它和真实dom之间的同步。
  ps: jsx只是react.createElement方法提供的语法糖

#### 为什么需要虚拟dom
  因为之前重新渲染的方法就是重新构建dom,替换旧dom，性能消耗高。虚拟dom页会操作dom树进行渲染更新，但是只针对修改部分进行局部渲染。

#### diff算法
  diff算法做的事情就是比较新旧虚拟dom树，判断如何更高效的更新真实dom。为了优化diff的时间复杂度，react根据经验做了一些前提假设：
  1. webUI中dom跨层级的移动特别少，可以忽略不计。只针对同层级dom节点做比较
  2. 两个不同类型的元素会产生不同的树
  3. 开发者可以通过设置key的属性，来告知渲染哪些子元素在不同的渲染下可以保存不变
   
  在这三个前提下，对新旧虚拟dom树进行深度优先遍历，每遍历到一个节点就会对节点本身和childrens进行对比。

  ##### 节点本身diff
  节点本身的对比分为：component和element的diff

  1. component的对比：
    i. 如果是同一类型的组件，就会查看有没有调用类似shouldcomponentUpdate之类的生命周期，如果需要rerender，就继续对比props和子节点
    ii. 如果不是同一类型的组件，就直接摧毁替换
  2. element的对比：
    i. 如果不是同一类型的元素就直接替换
    ii. 否则就对比它的属性

  ##### childrens的对比
  如果当前节点不需要直接催毁替换的话，就会对当前的新旧childrens进行对比，看是否有新增、插入、删除或移动操作。
  最后就按深度优先遍历的顺序对下一个节点迭代相同的操作

  #### about KEY
  key的机制：
  1. 如果key发生了变化，就会摧毁重新创建节点
  2. 如果key没有发生改变，而组件内容或属性有变化，就会更新组件
