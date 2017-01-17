import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartView from '../components/CartView';

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(CartView);
