import { provide } from "../ioc/ioc";
import TYPES from "../constant/types";
import { ISafeRequest } from "../interface/ISafeRequest";
import * as fetch from "node-fetch";
@provide(TYPES.SafeRequest)
export class SafeRequest implements ISafeRequest {
  public async fetch(url: string, arg?: Object, callback?: Function): Promise<Object> {
    let result = {code:"error"};
    await fetch(url)
      .then(res => res.json())
      .then(json => (result = json));
    return result;
  }
}
