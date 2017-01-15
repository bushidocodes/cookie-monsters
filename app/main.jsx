'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {receiveProducts} from './reducers/products';
import axios from 'axios';
import store from './store';

import AppContainer from './containers/AppContainer';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Login from './components/Login';
import Nav from './components/Nav';
import Order from './components/Order';
import Products from './components/Products';
import ProductsContainer from './containers/ProductsContainer';
import Reviews from './components/Reviews';
import SignUp from './components/SignUp';
import WhoAmI from './components/WhoAmI';

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
        <IndexRedirect to="/products" />
        <Route path="/order" component={ Order } />
        <Route path="/reviews" component={ Reviews } />
      </Route>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('main')
);
