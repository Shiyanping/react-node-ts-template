## 本地环境：

### 前端：

1. 使用 webpack 编译 react，并且生成一个 js 到 dist 文件夹中。
2. 使用 html-webpack-plugin 生成一个 html，将编译好的 js 追加到 html 中。
3. 在开发环境使用 webpack 跑一个本地服务，进行实时更新，通过 proxy 进行跨域代理
4. 引入 react-router
5. 引入 redux，react-redux，redux-thunk，redux-logger。 redux不用说了，我是把它当成一个本地数据库使用，react-redux 帮助你完成数据订阅，redux-thunk 可以放你实现异步 action，redux-logger 是 redux 的日志中间件
6. 引入 antd。

### 服务端：

1. 使用 inversify + typescript 编写服务端代码。
2. 最终使用 gulp 编译到 dist 文件夹中。
3. 上线采用 pm2 跑服务。