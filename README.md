# 基于 Next.js 以及 CloudBase CMS 的静态博客 demo 

+ [CloudBase CMS](https://docs.cloudbase.net/cms/intro.html) 是腾讯云云开发推出的，基于 Node.js 的 Headless 内容管理平台，提供了丰富的内容管理功能。
+ [Next.js](https://nextjs.org/docs/getting-started) 是能够提供静态生成、服务端渲染等功能的优秀生产级 React 框架。

本 demo 使用了 Next.js 静态生成（Static Generation）的特性，将 CloudBase CMS 作为数据拉取的数据源，并且能够通过 TencentCloudBase 轻易部署部署到云端。

## 配置与使用

### 开通 CMS
首先，在腾讯云控制台中创建云开发 CloudBase 云环境，并在扩展应用中开通 CMS 内容管理系统。

### 导入模型和集合
在 ./schema 和 ./data 文件夹下可以找到 json 格式的模型文件和集合数据文件，可以在 CMS 系统的内容模型和内容集合中分别导入两个文件夹下的文件，图片资源可能失效，可以自行替换。

### 配置环境变量
在 cloudbaserc.json 配置文件中配置好自己的云环境 ID，然后在 env.js.bak 中配置自己账号或者子账号的 secretId 以及 secretKey，并删除文件名的bak后缀。

### 运行
确认模型和集合数据导入成功，以及配置文件完善后，在命令行中运行
```shell
npm install
npm run dev
```
应用启动之后，浏览器访问 localhost:3000/next-ssr，就可以看到渲染返回的页面。

### 部署
在命令行中运行
```
npm install -g @cloudbase/cli@latest
cloudbase
```