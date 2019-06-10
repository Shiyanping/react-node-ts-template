import * as bodyParser from "koa-bodyparser";
import { configure, getLogger } from 'log4js';
import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import errorHandler from "./util/errorHandler";
import { Container,buildProviderModule } from './ioc/ioc';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import co from 'co';
import * as render from "koa-swig";
import * as serve from "koa-static";
import './ioc/loader';
import configure from "./config";
// import {SocketHandler} from "./util/SocketHandler";
// isocketHandler.init();
configure({
  appenders: { cheese: { type: "file", filename: "./logs/msg.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = getLogger("cheese");
const container = new Container();
container.load(buildProviderModule());
let server = new InversifyKoaServer(container);
server
  .setConfig(app => {
    app.use(bodyParser());
    app.context.render = co.wrap(render({
      root: configure.viewDir,
      autoescape: true,
      // cache: 'memory', // disable, set to false 
      cache:'memory',
      ext: 'html',
      varControls: ["[[", "]]"],
      writeBody: false
    }));
    app.use(serve(configure.staticDir)); // 静态资源文件
    app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
  })
  .setErrorConfig(app => {
    errorHandler.error(app,logger);
  });
  //初始化socketio服务器
// const isocketHandler = new SocketHandler(container);
let app = server.build();
app.listen(3000, () => {
  console.log("数据监控系统🍺");
});
