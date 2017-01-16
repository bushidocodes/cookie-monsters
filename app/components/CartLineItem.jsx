'use strict';

import React from 'react';

export default (props) => {
	return (
		<div id="cart-line-item" className="container">
		<div className="panel panel-success">
		  <div className="panel-heading">
		    <h3 className="panel-title">{ props.name }</h3>
		  </div>
		  <div className="panel-body">
		    <div className="media">
				  <div className="media-left">
				    <a><img className="media-object" src={ props.photo } alt={ props.name }/></a>
				  </div>
				  <div className="media-body">
				    <p>{ props.description }</p>
				    <p>Qty: { props.quantity }</p>
				    <p>Price: ${ (props.price * props.quantity).toFixed(2) }</p>
				  </div>
				</div>
		  </div>
		</div>
		</div>

	);
};
