'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

import SignUp from './SignUp';
import Login from './Login';

export default () => (
                      <div id="nav" className={"container"}>
                        <div id="login" className="navAuth"><Login /></div>
                        <div className="navAuth"><SignUp /></div>
                      </div>
);
