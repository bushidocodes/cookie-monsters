import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import { logout } from '../reducers/auth';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps() {
  return {
    logout: logout
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
