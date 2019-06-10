import { TAGS,inject, provide } from "../ioc/ioc";
import { IApi } from "../interface/IApi";
import TYPES from "../constant/types";
@provide(TAGS.ApiService)
export class ApiService implements IApi {
  private safeRequest;
  constructor(@inject(TYPES.SafeRequest) SafeRequest) {
    this.safeRequest = SafeRequest;
  }
  public getInfo(url: string, arg?: Object, callback?: Function): Promise<Object> {
   return this.safeRequest.fetch(url,arg,callback);
  }
}
