import {
  fluentProvide,
  provide,
  buildProviderModule
} from "inversify-binding-decorators";
import * as Router from "koa-router";
import TAGS from "../constant/tags";
import { Container, injectable, inject } from "inversify";
import { interfaces, TYPE, controller, httpGet } from "inversify-koa-utils";
let provideThrowable = function(identifier, name) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done();
};
// container
//   .bind<interfaces.Controller>(TYPE.Controller)
//   .to(IndexController)
//   .whenTargetNamed("IndexController");
export {
  Router,
  TAGS,
  interfaces,
  TYPE,
  controller,
  httpGet,
  inject,
  provideThrowable,
  buildProviderModule,
  provide,
  Container
};
