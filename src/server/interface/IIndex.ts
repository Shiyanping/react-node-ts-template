import { Model } from "../model/User";
export interface IIdex {
  getUser(id: string): Model.User;
}
