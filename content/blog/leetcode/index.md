---
title: 最长回文字符串
date: "2021-05-23T23:46:37.121Z"
description: "算法题：最长回文字符串"
category: "算法"
---

### 最长回文字符串

  从下标i为1开始遍历字符串str，以str[i]为中心扩展查找最长字符串

  ```js
  var find = function(start, end, s) {
    while(start >= 0 && end < s.length && s[start] === s[end] && start <= end) {
        start-=1;
        end+=1;
    }
    return [start+1, end-1]; // 因为退出while循环时s[start] ！== s[end]，因此需要回退上一个值
  }

  var max = function(start1, end1, start2, end2) {
    return (end1 - start1) > (end2 - start2) ? [start1, end1] : [start2, end2];
  }

  var longestPalindrome = function(s) {
    if(s.length == 1) {
        return s;
    }
    let len = s.length - 1;
    let start = 0, end = 0;
    for(let i= 1;i<=len;i++) {
        const [start1, end1] = find(i,i,s);
        const [start2, end2] = find(i-1, i, s);
        const [maxStart, maxEnd] = max(start1, end1, start2, end2);
        if((maxEnd - maxStart) >= (end - start)) {
            start = maxStart;
            end = maxEnd;
        }
    }
    return s.substring(start, end+1); // substring不包含end下标的值，因此需要+1
  };
```