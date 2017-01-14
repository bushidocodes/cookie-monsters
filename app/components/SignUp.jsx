import React from 'react'

export const Signup = ({ signup }) => (
<div>
  <form onSubmit={evt => {
    evt.preventDefault()
    signup(evt.target.username.value, evt.target.password.value)
  } }>
    <input className="authFormField" name="username" placeholder="Username" />
    <input className="authFormField" name="password" type="password" placeholder="Password" />
    <input className={"btn" + " " + "btn-primary"} type="submit" value="Sign Up" />
  </form>
</div>
)

import {signup} from '../reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {signup},
) (Signup)
