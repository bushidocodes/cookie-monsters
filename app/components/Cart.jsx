'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

export default () => (
<div className="pull-right">
  <h5><i className="fa fa-shopping-cart"></i> <span>0</span> items totaling <span>$0.00</span> <Link className="btn btn-success btn-sm" to="#">Checkout</Link></h5>
</div>
);
