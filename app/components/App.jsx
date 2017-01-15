import React, { Component } from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default ({ children }) => (
  <div id="main" className="container-fluid">
    <Nav />
    { children }
    <Footer />
  </div>
);
