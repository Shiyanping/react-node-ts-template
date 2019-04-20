import * as React from 'react'
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Loading from '../components/loading'

const {lazy, Suspense} = React

const Demo = lazy(() => import( /* webpackChunkName:"demo" */ '../pages/demo/demo'))
const Dashboard = lazy(() => import( /* webpackChunkName:"demo" */ '../pages/dashboard/dashboard'))
const Todolist = lazy(() => import( /* webpackChunkName:"demo" */ '../pages/todolist/todolist'))


export const routes: RouteProps[] = [
  {
    path: '/home',
    exact: true,
    component: Dashboard
  },
  {
    path: '/home/demos',
    exact: true,
    component: Demo
  },
  {
    path: '/home/todolist',
    exact: true,
    component: Todolist
  }
]

const Routes = (authorized: boolean) => <Suspense fallback={<Loading/>}>
  <Switch>
  {
    routes.map(r => {
      const {path, exact, component} = r
      const LazyCom = component
      return <Route key={path + ''} exact={exact} path={path} render={(props: any) => (authorized ? <LazyCom {...props}/> : <Redirect to="/login"/>)}/>
    })
  }
  </Switch>
</Suspense>

export default Routes