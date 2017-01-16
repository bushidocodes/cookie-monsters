'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

export default ({ cookie }) => (
  <div className="col-xs-18 col-sm-6 col-md-3">
    <div className="thumbnail">
      <div className="cookieContainer">
        <img className="cookieImage" src={cookie.photo} />
      </div>
      <div className="caption">
        <h4>{cookie.name}</h4>
        <p>{cookie.description}</p>
        <p className="cookieCategory">{cookie.categories.map ( category => category ).join(', ')}</p>
        <p><Link to="/reviews">Reviews</Link></p>
        <p><span id="quantityText">Quantity: </span><input className="form-control quantity" name="quantity" placeholder="1" /> <a href="#" className="btn btn-info btn-sm" role="button">Add to cart</a></p>
      </div>
    </div>
  </div>
);
