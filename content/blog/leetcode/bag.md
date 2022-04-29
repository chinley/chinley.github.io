---
title: 动态规划之背包问题
date: "2021-12-26T23:46:37.121Z"
description: "背包背包背包笔记"
category: "算法"
---

### 背包问题


单词就是物品，字符串s就是背包，单词能否组成字符串s, 就是问物品能不能把背包装满。
拆分时可以重复使用字典中的单词，说明就是一个完全背包。
动态规划分析五部曲：
- 1.确定dp数组以及下标的含义
  dp[i]：字符串长度为i的话，dp[i]为true，表示可以拆分为一个或多个在字段中出现的单词。
- 2.确定递推公式
  如果确定dp[j]是true,且[i,j]这个区间的子串出现在字典里，那么dp[i]一定是true。所以递推公式是if([j,i]这个区间的子串出现在字典里&&dp[j]===true), 那么dp[i]是true
- 3.dp数组如何初始化
  从递归公式中可以看出，dp[i]的状态依靠dp[j]是否为true，dp[0]就是递归的根基，dp[0]一定要为true。
  下标非0的dp[i]初始化为false，只要没有被覆盖说明都是不分拆分一分或多个在字典中出现的单词
- 4.确定遍历顺序
  如果求组合数就是外层for循环遍历物品，内层for遍历背包
  如果求排列数就是外层for遍历背包，内层for循环遍历物品
- 5.举例推导dp数组

### 01背包
  有n件物品和一个最多能背重量为w的背包。第i件物品的重量是weight[i]，得到的价值是value[i]，每件物品只能用一次，求解将哪些物品装进背包里物品价值总和最大

1. 确定dp数组以及下标的含义，使用二位数组，即**dp[i][j]表示从下表为[0-i]的物品里任意取，放进容量为j的背包，价值总和最大食多少**。
2. 确定递推公式
   dp[i][j]的含义：从下标为[0-i]的物品里任意取，放进容量为j的背包，价值总和最大是多少。那么有两个方向推出来dp[i][j]

  - 不放物品i:背包容量为j,里面不放物品i的最大价值，此时dp[i][j]就是dp[i-1][j]
  - 放物品i: dp[i-1][j-weight[i]]为背包容量为j-weight[i]的时候不放物品i的最大价值，那么dp[i-1][j-weight[i]] + value[i]，就是背包放物品i得到的最大价值

  所以递归公式：dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]]+value[i])
3. dp数组如何初始化
  如果背包容量j为0的话，即dp[i][0]，无论是选取哪些物品，都放不进背包里，背包价值总和一定是0。
  dp[0][j], 即：i为0，存放编号0的物品的时候，各个容量的背包所能存放的最大价值。
  那么当j<weight[0]时，dp[0][j]应该是0，因为背包容量比编号0的物品重量还小。
  当j>weight[0]时，dp[0][j]应该是value[0]，因为背包容量足够放编号0物品。

  ```js
    for(let j = 0; j < weight[0]; j++) {
      dp[0][j] = 0;
    }

    for(let j = weight[0]; j <= badweight; j++) {
      dp[0][j] = value[0];
    }
  ```

4. 确定遍历顺序
  先遍历物品还是先遍历背包重量， 都ok
5. 举例推导dp数组

```js
function testWeightBagProblem (wight, value, size) {
  const len = wight.length, 
    dp = Array.from({length: len + 1}).map(
      () => Array(size + 1).fill(0)
    );
  
  for(let i = 1; i <= len; i++) {
    for(let j = 0; j <= size; j++) {
      if(wight[i - 1] <= j) {
        dp[i][j] = Math.max(
          dp[i - 1][j], 
          value[i - 1] + dp[i - 1][j - wight[i - 1]]
        )
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[len][size];
}

```


###### 相关阅读
代码随想录 https://leetcode-cn.com/problems/word-break/solution/dai-ma-sui-xiang-lu-139-dan-ci-chai-fen-50a1a/