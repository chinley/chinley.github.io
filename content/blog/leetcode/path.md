---
title: 路径问题
date: "2021-08-01T23:46:37.121Z"
description: "算法题：不同路径--动态规划"
category: "算法"
---

### 问题描述

  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

  问总共有多少条不同的路径？

  ![hw-os-app](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

  输入：m = 3, n = 7

  输出：28

### 做题思路

  给定终点，不同方向不同路径，或者每步步数不定，典型的动态规划题目

  动态规划三要素：1.重叠子问题 2.最优子结构 3.状态转移方程

  1. 重叠子问题
    走到（m,n)位置的路径，由走到（m, n-1)路径数量和走到（m-1，n)路径数量组成
  2. 最优子结构
  3. 状态转移方程
   
    f(m,n)=f(m−1,n)+f(m,n−1)

    f(i, 0) = 1, i < m

    f(0, j) = 1, j < n

### code

  ```js
   var uniquePaths = function(m, n) {
    const arr = [];
    for(let i = 0; i < m; i++) {
        arr[i] = [];
        arr[i][0] = 1;
    }
    for(let j = 0; j<n; j++) {
        arr[0][j] = 1;
    }
    for(let i=1;i<m;i++) {
        for(let j=1;j<n;j++) {
            arr[i][j] = arr[i-1][j] + arr[i][j-1];
        }
    }

    return arr[m-1][n-1];
  };
 ```
### 延伸题

#### 不同路径 II

  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

  ![hw-os-app](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)
  
  解题思路： 当有0时把当前点置0，边界中若f(i,0)有障碍，则 i< j < m都要置0

  ```js
  var uniquePathsWithObstacles = function(obstacleGrid) {
    const n = obstacleGrid.length, m = obstacleGrid[0].length;
    const arr = createArray(m,n);
    arr[0][0] = obstacleGrid[0][0] ? 0 : 1;
    for(let i= 1;i<m;i++) {
        arr[0][i] = obstacleGrid[0][i] === 1 ? 0 : arr[0][i-1];
    }

    for(let j=1;j<n;j++) {
        arr[j][0] = obstacleGrid[j][0] === 1 ? 0 : arr[j-1][0];
    }
    for(let i = 1; i< m; i++) {
        for(let j=1;j<n;j++) {
            arr[j][i] = obstacleGrid[j][i] === 1 ? 0 : arr[j-1][i] + arr[j][i-1];
        }
    }
    return arr[n-1][m-1];
};

function createArray(m,n) {
    return new Array(n).fill('').map(() => new Array(m).fill(0));
}
  ```


#### 路径最小和

  给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

  说明：每次只能向下或者向右移动一步。


  ![hw-os-app](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

  输入：grid = [[1,3,1],[1,5,1],[4,2,1]]

  输出：7

  解释：因为路径 1→3→1→1→1 的总和最小。

  把（m,n)上的数字表示成a(m,n),路径(m,n)上数字最小和为Sum(m,n)

  Sum(m,n) = Math.min(Sum(m-1,n), Sum(m, n-1)) + a(m,n)

  表中的数据把路径之和替换为路径的最小数

```js
  var minPathSum = function(grid) {
    const n = grid.length, m = grid[0].length;
    const arr = createArray(m,n);
    arr[0][0] = grid[0][0];
    for(let i = 1; i < m; i++) {
        arr[0][i] = arr[0][i-1] + grid[0][i];
    }

    for(let j = 1; j < n; j++) {
        arr[j][0] = arr[j-1][0] + grid[j][0];
    }

    for(let i = 1; i<m; i++) {
        for(let j =1; j<n;j++) {
            arr[j][i] = grid[j][i] + Math.min(arr[j][i-1], arr[j-1][i]);
        }
    }
    
    return arr[n-1][m-1];
};

function createArray(m,n) {
    return new Array(n).fill('').map(()=>new Array(m).fill(0));
}
```