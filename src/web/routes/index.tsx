import * as React from "react";
import { Route, Switch, RouteProps } from "react-router-dom";
import Loading from "@components/loading";
import Home from "@components/home";
const { lazy, Suspense } = React;

const Demo = lazy(() =>
  import(/* webpackChunkName:"demo" */ "@components/demo")
);
const Login = lazy(() =>
  import(/* webpackChunkName:"login" */ "@components/login")
);

export const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/login",
    exact: true,
    component: Login
  },
  {
    path: "/demos",
    exact: true,
    component: Demo
  }
];

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes.map(r => {
        const { path, exact, component } = r;
        const LazyCom = component;
        return (
          <Route
            key={path + ""}
            exact={exact}
            path={path}
            render={() => <LazyCom />}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export default Routes;
