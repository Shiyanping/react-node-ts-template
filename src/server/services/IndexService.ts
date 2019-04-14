// 使用 service 去实现接口
import { IIndex } from '../interface/IIndex';
import { Model } from '../models/User';
import { provide, TAGS } from '../ioc/ioc';

// 把当前的 service 灌入到 container 中
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  private userList: Model.User[] = [
    {
      email: 'shiyanping@qq.com',
      name: '石燕平'
    },
    {
      email: 'shiyanping@sina.com',
      name: '石燕平'
    }
  ];
  public getUser(id: string): Model.User {
    let result: Model.User;
    result = this.userList[id];
    return result;
  }
}
