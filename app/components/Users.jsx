'use strict';

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default (props) => {
  let users = props.users.users;
  let selectedUser = props.users.selectedUser;
  let selectUser = props.selectUser;
  console.log("USERS: ", users);
  console.log("SELECTED USER: ", selectedUser);
  console.log("SELECT USER: ", selectUser);
  return (
    <div className="col-xs-18 col-sm-6 col-md-3">
      <h2>All Users</h2>
      <ul>
      {users.map((user, index) => <li key={user.email} onClick={(evt)=>{
        evt.preventDefault();
        selectUser(user);
      }}>{user.email}</li> )}
      </ul>
    </div>
  )
};
