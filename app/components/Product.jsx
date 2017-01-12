'use strict';

import React, { Component } from 'react';

export default ({ cookie }) => (
  <div>
    <h4>{cookie.name}</h4>
    <p>
      {cookie.description} <span>{"$" + cookie.price} each</span>
    </p>
  </div>
);
