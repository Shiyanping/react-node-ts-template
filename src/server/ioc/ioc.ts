// 对外提供一个容器
import { Container, inject } from 'inversify';
import { controller, interfaces, httpGet, TYPE } from 'inversify-koa-utils';
import { provide, fluentProvide, buildProviderModule } from 'inversify-binding-decorators';
import * as Router from 'koa-router';
// 导入 service 的别名
import TAGS from '../constant/TAGS';
// import TYPES from '../constant/types';

// 流式的 provide
let provideThrowable = function(identifier, name) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
};
export { Container, inject, controller, interfaces, httpGet, Router, TAGS, TYPE, provide, provideThrowable, buildProviderModule };
