'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default (props) => {
  let user = props.user;
  if (user === "") {
    browserHistory.push('/login');
  } else {
    console.log('USER IS: ', props.user);
    return (
      <div className="col-xs-18 col-sm-6 col-md-3">
        <h2>My User</h2>
        <h4>Name: {user.name}</h4>
        <h4>E-mail: {user.email}</h4>
        <h4>Billing Address: {user.billingAddress}</h4>
        <h4>Billing City: {user.billingCity}</h4>
        <h4>Billing State: {user.billingState}</h4>
        <h4>Billing ZIP: {user.billingZip}</h4>
        <h4>Shipping Address: {user.shippingAddress}</h4>
        <h4>Shipping City: {user.shippingCity}</h4>
        <h4>Shipping State: {user.shippingState}</h4>
        <h4>Shipping ZIP: {user.shippingZip}</h4>
        <h4>Is Admin?: {user.isAdmin.toString()}</h4>
      </div>
    )
  }
};

