import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";


class App extends Component {

  render() {
    const routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
      </Switch>
    );
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}


export default withRouter(App);
