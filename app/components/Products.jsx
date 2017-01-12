import React from 'react';
import {Link} from 'react-router';
import SignUp from './SignUp';
import Login from './Login';
import Product from './Product';

export default function (props) {

  const products = props.products;

  return (

    <div>
      <Login />
      <SignUp />
       <div className="container">
        <h1>Cookie Monsters</h1>
        <h3>Home of the world's greatest cookies</h3>
        <div className="container">
          <div className="row">
            {products.map( (cookie, index) => <Product key={index} cookie={cookie} /> )}
          </div>
        </div>
      </div>
    </div>
  );
};
