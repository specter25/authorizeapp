import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import setAuthToken from './util/setAuthToken';
import store from './store';
import { loadUser } from './actions/authactions';
import PrivateRoute from './util/PrivateRoutes';
import Landing from './components/landing';
import Dashboard from './components/Dashboard';

if (localStorage.token) {
  // console.log(localStorage.token);
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <section>
          {/* <Alerts /> */}
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
