'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import {receiveProducts} from './reducers/products';
import axios from 'axios';

import store from './store'
import Jokes from './components/Jokes'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/SignUp'
import WhoAmI from './components/WhoAmI'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        <Signup/>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onAppEnter = function () {
  axios.get('/api/products')
    .then(products => {
      store.dispatch(receiveProducts(products));
    });
};

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={onAppEnter}>
        <IndexRedirect to="/jokes" />
        <Route path="/products" component={Products} />
        <Route path="/jokes" component={Jokes} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
