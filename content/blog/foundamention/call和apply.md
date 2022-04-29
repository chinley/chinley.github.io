---
title: js深入之call和apply的模拟实现
date: "2022-02-27T23:46:37.121Z"
description: "读书笔记"
category: "js"
---

#### 什么是call
  call方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法

  ```js
  function foo() {
    return this.value
  }
  const bar = {
    value: 4
  }
  foo.call(bar);

  Function.prototype.call2 = function(context) {
    const _context = context || window;
    // 用this获取调用call2的函数
    _context.fn = this;
    const _args = [...arguments].slice(1);
    const result = _context.fn(_args);
    delete _context.fn
    return result;
  }
  foo.call2(bar);
  ```
  1. call改变了this的指向，指向到foo
  2. bar函数执行了
   
#### call与apply的区别
foo.call(bar, 'kevin', 18);
foo.call(bar, ['kevin', 18]);

#### bind
  bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。