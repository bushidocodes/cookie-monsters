'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

export default () => (
  <div className="container">
    <div>
      <img className="cookieMonsterImg" src='/images/cookie-monster.jpg' />
      <h1>Cookie Monsters</h1>
      <h3 className="subtitle">Home of the world's greatest cookies</h3>
    </div>
    <div id="orderDetail">
      <p className="lead">Cookie Order for USER NAME</p>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Cookie</th>
            <th>Totals</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td></td>
            <td className="pull-right orderTableFooterTitles">Flat Shipping Rate</td>
            <td>$3.95</td>
          </tr>
          <tr>
            <td></td>
            <td className="pull-right orderTableFooterTitles">Total</td>
            <td>$21.95</td>
          </tr>
        </tfoot>
        <tbody>
          {/* Need to make a loop for table rows */}
          <tr>
            <td>12</td>
            <td>Chocolate Chip</td>
            <td>$18.00</td>
          </tr>
        </tbody>
      </table>
      <div className="lead">
        Products shipped by <span id="shippingCarrier">USPS</span>. Receipt and tracking number emailed to you shortly.
      </div>
    </div>
  </div>
);
