'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import SignUp from './SignUp';
import Login from './Login';

export default (props) => (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        {/* Brand and toggle get grouped for better mobile display */}
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/products">
            <img id="brand" alt="Brand" src="/images/brand.png" />
            <span id="brand-title">Cookie Monsters</span>
          </a>
        </div>
        {/* Collect the nav links, forms, and other content for toggling */}
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {/* handles if user is logged in or not */}
            {props.auth ? (
              <li><button onClick={evt => {
                evt.preventDefault()
                props.logout()
              } }>{props.auth.name} Logout</button></li>
            ) : (<div>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </div>
              )
            }
          </ul>
        </div>{/* /.navbar-collapse */}
      </div>{/* /.container-fluid */}
    </nav>
  );
