import React from 'react';
import Hero from './Hero';
import CartLineItem from './CartLineItem';

// Need to figure out how to access products added to the cart from the req.session

export default (props) => {
  console.log("My props are ", props.cart);

  return (
    <div className="container">
      <Hero />
      <div className="row">
        <div className="col-sm-6 col-xs-12">

          {props.cart.map((item) => <CartLineItem key={item.product.id} name={item.product.name} quantity={item.quantity} photo={item.product.photo} description={item.product.description} price={item.product.price} />)}

        </div>
      </div>
    </div>
  )
};
