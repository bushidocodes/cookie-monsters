'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

export default ({ cookie }) => (
  <div className="footer">
      <div className="container">
        <p className="text-muted">Created by <Link to="http://spmcb.com/" target="_blank" rel={"noopener" + " " + "noreferrer"}>Sean</Link>, <Link to="https://myspace.com/evandigiambattista" target="_blank" rel={"noopener" + " " + "noreferrer"}>Evan</Link>, and <Link to="http://rachelbird.com/" target="_blank" rel={"noopener" + " " + "noreferrer"}>Rachel</Link>: the Cookie Monsters of Fullstack Academy.</p>
      </div>
    </div>
);
