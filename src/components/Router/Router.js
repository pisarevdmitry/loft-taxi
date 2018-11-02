import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../Auth';
import PrivateRoute from '../PrivateRoute';
import styles from './Router.module.scss';
import Profile from '../Profile';

class Router extends PureComponent {
  privateRoute() {
    return <PrivateRoute Component={Profile} />;
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className={styles.root}>
          <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/profile" render={this.privateRoute} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
