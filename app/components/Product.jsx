'use strict';

import React, { Component } from 'react';

export default ({ cookie }) => (
  <div className="col-xs-18 col-sm-6 col-md-3">
    <div className="thumbnail">
      <div className="cookieContainer">
        <img className="cookieImage" src={cookie.photo} />
      </div>
      <div className="caption">
        <h4>{cookie.name}</h4>
        <p>{cookie.description}</p>
        <p><a href="#" className="btn btn-info btn-xs" role="button">Add to cart</a></p>
      </div>
    </div>
  </div>
);
