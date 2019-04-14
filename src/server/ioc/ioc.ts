// 对外提供一个容器
import { Container, inject } from 'inversify';
import { controller, interfaces, httpGet } from 'inversify-koa-utils';
import { provide } from 'inversify-binding-decorators';
import * as Router from 'koa-router';
// 导入 service 的别名
import TAGS from '../constant/TAGS';
export { Container, inject, controller, interfaces, httpGet, Router, TAGS, provide };
