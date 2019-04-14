import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loading from '../components/loading';

const { lazy, Suspense } = React;
const Home = lazy(() => import(/* webpackChunkName:"home" */ './home/home'));

class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<Loading size="large" />}>
          <Switch>
            <Route path="/home" component={(props: any) => <Home {...props} />} />
            <Redirect to="/home" />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
