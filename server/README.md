# 服务端


## 接口文档

目前后端提供 [GraphiQL](https://github.com/graphql/graphiql) 接口。大部分响应都是 GraphiQL 返回的数据。

### GraphQL 接口

-   接口文档和接口试用：
    -   运行起服务器程序后，终端中会显示 GraphQL 接口的地址
    -   把 GraphQL 接口的地址放入以下 GraphQL 客户端后，可以查看文档并试用接口
        -   [GraphiQL](https://github.com/graphql/graphiql) 官方提供的可编程的客户端，默认包含基本功能，可自己编程扩展需要的功能
        -   [Altair](https://altair.sirmuel.design/) 第三方提供的功能较丰富的客户端，可以设置 HTTP Header 等，有中文，有桌面版
            -   已知问题：无法显示输入字段的默认值。在 GraphiQL 中可以看到默认值。
-   接口可视化：
    -   GraphQL Visualizer
        -   http://nathanrandal.com/graphql-visualizer/
        -   运行 GraphQL Visualizer 给出的 Introspection Query 查询，
            把查询结果复制回 GraphQL Visualizer 的 Introspection Result 输入框，
            再把焦点移出输入框（鼠标点下输入框外的空白区域），
            就可以看到接口涉及到的实体的关系网了
    -   GraphQL Voyager
        -   https://github.com/APIs-guru/graphql-voyager
        -   https://apis.guru/graphql-voyager/
        -   使用方式类似 GraphQL Visualizer

## 程序配置方法
本程序通过环境变量配置

可以在 .env、.env.local 中配置

### 需要配置的参数
见 .env.local.sample

## 本地编译运行方法

1.  进入本 server 目录：`cd server`
1.  编译
    1.  用 Yarn 安装依赖：`yarn`
    1.  安装类型定义依赖库：`flow-typed install`
    1.  转译：`yarn run dev`
1.  安装：`yarn link`
1.  运行：`ticket --help`
1.  卸载：`yarn unlink`

临时运行可以从简，直接用 npm 编译运行：
1.  进入本目录：`cd server`
1.  编译
    1.  安装依赖：`npm install`
    1.  转译：`npm run dev`
1.  安装：`npm link`
1.  运行：`ticket --help`
1.  卸载：`npm unlink`




用例：
-   查看命令行帮助：`ticket --help`


## 需部署到服务器上的组件
-   本服务端程序。会打包为 docker 镜像上传。
