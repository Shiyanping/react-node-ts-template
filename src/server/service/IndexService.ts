import { TAGS,inject, provide } from "../ioc/ioc";
import { IIdex } from "../interface/IIndex";
import { Model } from "../model/User";
import TYPES from "../constant/types";
@provide(TAGS.IndexService)
export class IndexService implements IIdex {
  private safeRequest;
  constructor(@inject(TYPES.SafeRequest) SafeRequest) {
    this.safeRequest = SafeRequest;
  }

  private userStorage: Model.User[] = [
    {
      email: "yuanzhijia@yidengfe.com",
      name: "zhijia"
    },
    {
      email: "Copyright © 2016 yidengfe.com All Rights Reversed.京ICP备16022242号-1",
      name: "laowang"
    }
  ];

  public getUser(id: string): Model.User {
    let result: Model.User;
    result = this.userStorage[id];
    return result;
  }
}
