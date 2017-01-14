import React from 'react'

export const Login = ({ login }) => (
  <div>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <input className="authFormField" name="username" placeholder="Username" />
      <input className="authFormField" name="password" type="password" placeholder="Password" />
      <input className={"btn" + " " + "btn-primary"} type="submit" value="Login" />
    </form>
  </div>
)

import {login} from '../reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
