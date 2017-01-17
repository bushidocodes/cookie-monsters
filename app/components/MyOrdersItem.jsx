'use strict';

import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  return (
    <div className="panel panel-success">
      <div className="panel-heading">
        {/* Link to order detail */}
        <Link to="/order"><h3 className="panel-title">ORDER DATE</h3></Link>
      </div>
      <div className="panel-body">
        <div className="media">
          <div className="media-body">
            {/* Shipping information */}
            <p>Shipped by USPS on January 15, 2017</p>
            {/* Order total */}
            <p>Total: $21.95</p>
          </div>
        </div>
      </div>
    </div>
  );
};
