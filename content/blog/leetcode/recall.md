---
title: 回溯
date: "2021-08-08T23:46:37.121Z"
description: 回溯系列题
category: "算法"
---

  回溯涉及到的类型：组合：给定几个数字，返回所有组合， 切割：一个字符串做分割， 子集、排列、棋盘

  所有的回溯法都可以抽象为一个树形结构

 ```js
 function backtrack() {
   if(终止条件) {
     收集结果;
     return;
   }
   for(集合元素) {
     处理节点;
     递归函数;
     回溯
   }
 }
 ```

 ### 组合题
 #### 17. 电话号码的字母组合

  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

  ![hw-os-app](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

  输入：digits = "23"

  输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

  解题思路：
  
  1. 画树状图，初始化path，作为每个叶子节点结果，res保存结果，index为遍历的深度
  2. 每次遍历path添加字母，遍历完回溯path回退，当index === digits.length时保存结果
   
  ##### code
  ```js
  var letterCombinations = function(digits) {
      const digitalMap = {
          2: ["a","b","c"],
          3: ["d","e","f"],
          4: ["g", "h", "i"],
          5: ["j", "k", "l"],
          6: ["m", "n", "o"],
          7: ["p", "q", "r", "s"],
          8: ["t", "u", "v"],
          9: ["w", "x", "y", "z"]
      }
      const digitsArray = digits.split("");
      const res = [], path = [];
      if(digits.length === 0) return res;
      const backtrack = (path, index) => {
          if(index === digits.length) {
              res.push(path.join(''));
              return;
          }
          const curDigits = digitalMap[digitsArray[index]];
          for(let i = 0; i < curDigits.length; i++) {
              path.push(curDigits[i]);
              backtrack(path, index + 1);
              path.pop();
          }
      }
      backtrack(path, 0);
      console.log(res);
      return res;
  };
  ```          
 #### 39. 组合总和
  给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

  candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。 

  对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

  输入: candidates = [2,3,6,7], target = 7

  输出: [[7],[2,2,3]]

  #### code
  ```js
  var combinationSum = function(candidates, target) {
    const res = [];
    const backtrack = (path, index) => {
        const curSum = path.reduce((pre, cur) => { return pre + cur;}, 0);
        if(curSum > target || index === candidates.length) return;
        if(curSum === target) { 
            res.push([...path]); // res.push(path)，res会跟随path变化，因此需要扩展运算符
            return;
        }
        for(let i = index; i<candidates.length;i++) { //下一次从i的地方开始遍历
            path.push(candidates[i]);
            backtrack(path, i); //下一次从i的地方开始遍历
            path.pop();
        }
    }
    backtrack([], 0);
    return res;
  };
  ```
 #### 46. 全排列
  给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

  输入：nums = [1,2,3]

  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

  ##### code
  ```js
  var permute = function(nums) {
    const res = [];

    const backtrack = (path, index) => {
        if(path.length === nums.length){
            res.push([...path]);
            return;
        }
        for(let i=0;i<nums.length;i++) {
            if(path.includes(nums[i])) { // 当已存在这个数字，跳过
                continue;
            }
            path.push(nums[i]);
            backtrack(path);
            path.pop();
        }
    }
    backtrack([]);
    console.log(res);
    return res;
  };
  ```
 #### 22. 括号生成

  数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

  输入：n = 3

  输出：["((()))","(()())","(())()","()(())","()()()"]

  解题思路：
  
  1. 确定终止条件：当(和)数量等于n时，收集结果
  2. 当字符串）比（数量多时，无效括号，需要剪枝

  ##### code

  ```js
  var generateParenthesis = function(n) {
    const res = [];
    const backtrack = (lRemaind, rRemaind, str) => {
        if(lRemaind === 0 && rRemaind===0) {
            res.push(str);
        }
        if(lRemaind > rRemaind) { // 如果剩余的（比）多，无效分枝，剪枝
            return;
        }

        if(lRemaind>0) {
            backtrack(lRemaind-1,rRemaind, str + '(');
        }

        if(rRemaind > lRemaind) {
            backtrack(lRemaind,rRemaind - 1, str + ')');
        }
    }
    backtrack(n,n,'');
    return res;
  };
  ```

  ### 78. 子集
  给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

  解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

  输入：nums = [1,2,3]

  输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  #### code 
  ```js
  var subsets = function(nums) {
    const res = [[]];
    const backtrack = (path, index) => {
        if(path[path.length -1] === nums[nums.length-1]) {
            return;
        }
        for(let i=index;i<nums.length;i++) { //不重复的元素从startIndex开始，重复的从0开始
            path.push(nums[i]);
            res.push([...path]);
            backtrack(path, i+1);
            path.pop();
        }
    }
    backtrack([], 0);
    return res;
};
  ```

