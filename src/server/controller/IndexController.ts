import { interfaces, TYPE,controller, httpGet,TAGS,Router,inject,provideThrowable } from "../ioc/ioc";
import { Model } from "../model/User";
@controller("/")
@provideThrowable(TYPE.Controller,"IndexController")
export default class IndexController implements interfaces.Controller {
  private indexService;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet("/")
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
      const result:Model.User = this.indexService.getUser("1");
      ctx.body = await ctx.render('index',{data:result.email});
  }
}
