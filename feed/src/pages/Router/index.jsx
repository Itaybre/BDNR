import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import path from 'enums/path';
import Feed from 'pages/Feed';
import Home from 'pages/Home';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Feed} path={path.Feed} />
      <Route component={Home} path={path.Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
