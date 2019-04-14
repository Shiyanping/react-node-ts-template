import { controller, inject, interfaces, httpGet, Router, TAGS } from '../ioc/ioc';

@controller('/')
export default class IndexController implements interfaces.Controller {
  private indexService;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet('/')
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
    ctx.body = await ctx.render('index');
  }
}
