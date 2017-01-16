import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  cart: require('./cart').default,
  users: require('./users').default
})

export default rootReducer
