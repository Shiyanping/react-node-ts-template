import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container } from './ioc/ioc';

const container = new Container();

// load 所有资源
container.load();

const server = new InversifyKoaServer(container);

server
  .setConfig(app => {
    // 中间件
  })
  .setErrorConfig(app => {
    // 错误监控
  });

const app = server.build();

// 监听端口
app.listen(3000, () => {
  console.log('inversify启动成功');
});
