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
    <div className="container">
      <div className="col-xs-12 col-sm-4">
        <h2>All the Cookie Monsters</h2>
        <div id="users" className="list-group">
          {users.map((user, index) => <li key={user.email} className="list-group-item list-group-item-action"><a onClick={(evt)=>{
          evt.preventDefault();
          selectUser(user);
        }}>{user.name}</a></li> )}
        </div>
      </div>
    </div>
  )
};
