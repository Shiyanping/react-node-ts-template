import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container, buildProviderModule } from './ioc/ioc';
import './ioc/loader';

const container = new Container();

// load 所有资源
container.load(buildProviderModule());

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
app.listen(3022, () => {
  // console.log('inversify启动成功');
});
