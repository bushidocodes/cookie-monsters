import React, { Component } from 'react';
import { Link } from 'react-router';
import MyOrdersItem from './MyOrdersItem';

export default (props) => {
  console.log("my props are ", props);
  return (
    <div className="container">
      <h1 className="display-4">My Orders</h1>
      {/* Loop over orders */}
      <div>
        {props.orders.map(order => <MyOrdersItem order={order} selectOrder={props.selectOrder}/>)}
      </div>
    </div>
  )
};
