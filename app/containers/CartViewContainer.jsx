// import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartView from '../components/CartView';
// import {myFunc} from '../reducers/cart'

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
};
const mapDispatchToProps = dispatch => {
  // myFunc: (evt) => {
  //   evt.preventDefault();
  //   dispatch(myFunc)
  // }
};

export default connect(mapStateToProps)(CartView);