'use strict';

import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  console.log("My Orders Item props ", props)
  return (
    <div className="panel panel-success">
      <div className="panel-heading">
        {/* Link to order detail */}
        <Link onClick={props.selectOrder(props.order)} to="/order"><h3 className="panel-title">{props.order.created_at}</h3></Link>
      </div>
      <div className="panel-body">
        <div className="media">
          <div className="media-body">
            {/* Shipping information */}
            <p>Shipped by {props.order.shippingCarrier || "Omri in a beige Dodge Van"} on January 15, 2017</p>
            {/* Order total */}
            <p>Total: ${props.order.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
