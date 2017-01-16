import React from 'react';
import Cart from './Cart';
import CartLineItem from './CartLineItem';

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

        <div id="cartRow" className="col-sm-6 col-xs-12 span12">
          <Cart />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          
            {props.cart.map((item) => <CartLineItem key={item.product.id} name={item.product.name} quantity={item.quantity} photo={ item.product.butt } description={ item.product.description } price={ item.product.price } />)}
          
        </div>
      </div>
    </div>
  )
};
