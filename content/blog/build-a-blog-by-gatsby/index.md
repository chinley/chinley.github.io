---
title: 通过gatsby搭建自己的博客
date: "2021-04-27T23:46:37.121Z"
description: "如何通过gatsby搭建博客，以及遇到的问题记录"
---
### 如何通过gatsby搭建博客
  - 下载gatsby脚手架
    - npm i gatsby-cli -g
  - 新建一个博客目录 
    - gatsby new blog
  - 运行博客 
    - gatsby develop
  - 在github page上关联gatsby项目
    - 添加项目原地址 git add remote xxxxx
    - 如有修改 git add、git push
  - 打包静态资源
    - 通过gh-pages打包，npm install gh-pages --save-dev
    - 在packag.json中添加脚本：gatsby build --prefix-paths && gh-pages -d public -b public，gh-pages就会将文件打包到public目录，并提交到分支public
    - 在github里将项目pages的sources设置为public分支
  - 打包资源成功后，在githubpage的页面就能看到样式啦
  - 如何关联自己的域名
    - 在自己域名下配置dns A类型, 记录值为githubpage ip 185.199.108.153
    - 添加CNAME dns, 记录值为你的githupage域名
    - githupage项目下设置custom domain为自己的域名

---------

### npm i一直停留在sharp-libvips
  一些包被墙了，打开vpn也下载不了,需要绑定host

    192.30.255.112	gist.github.com
    192.30.255.112	github.com
    192.30.255.112	www.github.com
    151.101.56.133	avatars0.githubusercontent.com
    151.101.56.133	avatars1.githubusercontent.com
    151.101.56.133	avatars2.githubusercontent.com
    151.101.56.133	avatars3.githubusercontent.com
    151.101.56.133	avatars4.githubusercontent.com
    151.101.56.133	avatars5.githubusercontent.com
    151.101.56.133	avatars6.githubusercontent.com
    151.101.56.133	avatars7.githubusercontent.com
    151.101.56.133	avatars8.githubusercontent.com
    151.101.56.133	camo.githubusercontent.com
    151.101.56.133	cloud.githubusercontent.com
    151.101.56.133	gist.githubusercontent.com
    151.101.56.133	marketplace-screenshots.githubusercontent.com
    151.101.56.133	raw.githubusercontent.com
    151.101.56.133	repository-images.githubusercontent.com
    151.101.56.133	user-images.githubusercontent.com

---------
### gatsby build WorkerError: failed to process image
  删除node_modules再重新npm i，无果，重新下载gatsby-cli，再搭建新的项目