import React, { Component } from 'react';
import {Link} from 'react-router';
import MyOrdersItem from './MyOrdersItem';

export default () => (
  <div className="container">
    <h1 className="display-4">My Orders</h1>
    {/* Loop over orders */}
    <div>
      <MyOrdersItem />
    </div>
  </div>
);
