'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {receiveProducts} from './reducers/products';
import axios from 'axios';
import store from './store';

import AppContainer from './containers/AppContainer';
import CartView from './components/CartView';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Order from './components/Order';
import ProductsContainer from './containers/ProductsContainer';
import Reviews from './components/Reviews';

/* Commenting out example app because we can mimic its functionality, perhaps in the Navbar component
   Also: referencing Auther workshop for basic 'root' react component heirarchy (not for code style, but for structure)


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
);
*/

const onAppEnter = function () {
  axios.get('/api/products')
    .then(products => {
      store.dispatch(receiveProducts(products.data));
    });
};

render (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ AppContainer } onEnter={ onAppEnter }>
        <Route path="/products" component={ ProductsContainer } />
        <Route path="/viewcart" component={ CartView } />
        <Route path="/order" component={ Order } />
        <Route path="/reviews" component={ Reviews } />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
);
