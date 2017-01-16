import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Product from './Product';
import Cart from './Cart';

export default function (props) {

  const products = props.products;
  const plusItemzToCart = props.plusItemzToCart;

  return (
    <div>
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
        <div className="container">
          <div className="row">
            {products.map( (cookie, index) => <Product key={index} cookie={cookie} plusItemzToCart={plusItemzToCart}/> )}
          </div>
        </div>
      </div>
    </div>
  );
}
