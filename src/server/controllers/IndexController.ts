import { controller, inject, interfaces, httpGet, Router, TAGS, TYPE, provideThrowable } from '../ioc/ioc';
import 'reflect-metadata';

@controller('/')
// 让当前 controller 唯一，当遇到 IndexController 这个类时，开始注入
@provideThrowable(TYPE.Controller, 'IndexController')
export default class IndexController implements interfaces.Controller {
  private indexService;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet('/')
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
    const result = await this.indexService.getUser(1);
    // ctx.body = await ctx.render('index');
    ctx.body = result;
  }
}
