'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

export default ({ cookie, plusItemzToCart }) => (
  <div className="col-xs-18 col-sm-6 col-md-3">
    <div className="thumbnail">
      <div className="cookieContainer">
        <img className="cookieImage" src={cookie.photo} />
      </div>
      <div className="caption">
    {/* Handles case of Seinfeld's race relations cookie discussion */}
        <h4>{cookie.name === "Black & White Cookie" ? (
           <a href="https://www.youtube.com/watch?v=IlLPAIrmqvE">{cookie.name}</a>
           ) : (cookie.name) }</h4>
        <p>{cookie.description}</p>
        <p className="cookieCategory">{cookie.categories.map(category => category).join(', ')}</p>
        <p><Link to="/reviews">Reviews</Link></p>
        <p><span id="quantityText">Quantity: </span>
          <input id={`number_of_cookie_${cookie.id}`} className="form-control quantity" name="quantity" defaultValue="1" />
          <a className="btn btn-info btn-sm" role="button" onClick={(evt) => {
            evt.preventDefault();
            let quantity = parseInt($(`#number_of_cookie_${cookie.id}`).val());
            console.log("QUANTITY ", quantity);
            plusItemzToCart(cookie, quantity);
          } }>Add to cart</a>
        </p>
      </div>
    </div>
  </div>
);
