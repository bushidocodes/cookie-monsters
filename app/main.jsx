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
import Order from './components/Order'
import Reviews from './components/Reviews'
import Login from './components/Login'
import Signup from './components/SignUp'
import WhoAmI from './components/WhoAmI'
import AppContainer from './containers/AppContainer'

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
      store.dispatch(receiveProducts(products.data));
    });
};

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path="/products" component={Products} />
        <IndexRedirect to="/products" />
      </Route>
      <Route path="/order" component={Order} />
      <Route path="/reviews" component={Reviews} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
