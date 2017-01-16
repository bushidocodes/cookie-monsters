import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Product from './Product';
import Cart from './Cart';

// Need to figure out how to access products added to the cart from the req.session

export default (props) => {
  console.log("My props are ", props.cart);

  return (
    <div className="container">
      <div id="headerRow" className="row">
        <div className="col-sm-6 col-xs-12">
          <img className="cookieMonsterImg" src='/images/cookie-monster.jpg' />
          <h1>Cookie Monsters</h1>
          <h3 className="subtitle">Home of the world's greatest cookies</h3>
        </div>

        <div id="cartRow" className="col-sm-6 col-xs-12">
          <Cart />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <ul>
            {props.cart.map((item) => <li key={item.product.id}>{item.product.name} : {item.quantity}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
};
